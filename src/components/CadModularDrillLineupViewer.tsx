import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { modularDrillVariations } from '../data/modularDrillData';

interface LineupViewerProps {
  onSelectDrill: (index: number) => void;
  className?: string;
}

export const CadModularDrillLineupViewer: React.FC<LineupViewerProps> = ({ onSelectDrill, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const onSelectDrillRef = useRef(onSelectDrill);

  useEffect(() => {
    onSelectDrillRef.current = onSelectDrill;
  }, [onSelectDrill]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight;

    const canvas = document.createElement('canvas');
    canvas.className = "w-full h-full outline-none";
    canvas.style.touchAction = 'pan-x pan-y';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100);
    // Position camera closer to fill the screen
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setSize(w, h);
    // Hardcap pixel ratio to 1 for the lineup to prevent massive GPU overload on mobile
    renderer.setPixelRatio(1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    rendererRef.current = renderer;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    const group = new THREE.Group();
    scene.add(group);

    const amb = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(amb);
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(5, 5, 5);
    scene.add(key);

    // Use a simpler standard material instead of Physical to save huge amounts of GPU power
    const optimizedSilverMat = new THREE.MeshStandardMaterial({
      color: 0xd4d7d9,
      roughness: 0.3,
      metalness: 0.8,
    });

    const loader = new STLLoader();
    const meshes: THREE.Mesh[] = [];
    
    // Load STLs sequentially to prevent CPU RAM spikes (OOM) on mobile
    let isMounted = true;
    
    const loadSequential = async () => {
      for (let i = 0; i < modularDrillVariations.length; i++) {
        if (!isMounted) break;
        
        const drill = modularDrillVariations[i];
        try {
          const geometry = await new Promise<THREE.BufferGeometry>((resolve, reject) => {
            loader.load(
              `/models/${drill.depthMultiplier}D.stl`,
              resolve,
              undefined,
              reject
            );
          });
          
          if (!isMounted) {
            geometry.dispose();
            break;
          }

          geometry.computeVertexNormals();
          geometry.center();
          const mesh = new THREE.Mesh(geometry, optimizedSilverMat);
          mesh.userData = { index: i }; // Store index for raycasting

          geometry.computeBoundingBox();
          if (geometry.boundingBox) {
            const size = new THREE.Vector3();
            geometry.boundingBox.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z);
            
            const targetLength = 2.5 + (drill.depthMultiplier * 0.55);
            const scale = targetLength / maxDim;
            mesh.scale.set(scale, scale, scale);
            
            if (size.z >= size.x && size.z >= size.y) {
              mesh.rotation.x = -Math.PI / 2;
            } else if (size.x > size.y && size.x > size.z) {
              mesh.rotation.z = Math.PI / 2;
            } else {
              mesh.rotation.set(0, 0, 0);
            }

            mesh.position.y = -4.5 + targetLength / 2;
            mesh.position.x = (i - 5.5) * 2.2;
          }
          
          group.add(mesh);
          meshes.push(mesh);
          
          // Tiny delay to let browser garbage collect and render the new drill
          await new Promise(r => setTimeout(r, 50));
        } catch (e) {
          console.error(`Failed to load ${drill.depthMultiplier}D.stl`, e);
        }
      }
    };
    
    loadSequential();

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableRotate = false; // Just zoom and pan
    controls.enablePan = true;
    controls.minDistance = 10;
    controls.maxDistance = 60;

    // Raycaster for hover/click interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredMesh: THREE.Mesh | null = null;

    const getMousePosition = (event: MouseEvent | TouchEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      let clientX, clientY;
      if ('changedTouches' in event) {
        clientX = event.changedTouches[0].clientX;
        clientY = event.changedTouches[0].clientY;
      } else {
        clientX = event.clientX;
        clientY = event.clientY;
      }
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      return mouse;
    };

    const onClick = (event: MouseEvent | TouchEvent) => {
      const pos = getMousePosition(event);
      raycaster.setFromCamera(pos, camera);
      const intersects = raycaster.intersectObjects(group.children);
      
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        if (clickedMesh.userData.index !== undefined) {
          onSelectDrillRef.current(clickedMesh.userData.index);
        }
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      const pos = getMousePosition(event);
      raycaster.setFromCamera(pos, camera);
      const intersects = raycaster.intersectObjects(group.children);
      
      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        const object = intersects[0].object as THREE.Mesh;
        if (hoveredMesh !== object) {
          if (hoveredMesh) hoveredMesh.scale.multiplyScalar(1 / 1.15); // revert
          hoveredMesh = object;
          hoveredMesh.scale.multiplyScalar(1.15); // scale up
        }
      } else {
        document.body.style.cursor = 'default';
        if (hoveredMesh) {
          hoveredMesh.scale.multiplyScalar(1 / 1.15);
          hoveredMesh = null;
        }
      }
    };

    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchend', onClick, { passive: true });
    canvas.addEventListener('mousemove', onMouseMove);

    const handleResize = () => {
      if (!containerRef.current) return;
      const nw = containerRef.current.clientWidth;
      const nh = containerRef.current.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    let frame: number;
    const render = () => {
      controls.update();
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('touchend', onClick);
      canvas.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'default';
      cancelAnimationFrame(frame);
      controls.dispose();
      
      renderer.forceContextLoss();
      renderer.dispose();
      pmremGenerator.dispose();
      
      meshes.forEach(m => m.geometry.dispose());
      optimizedSilverMat.dispose();
      
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full relative ${className}`} />
  );
};
