import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface CadModularDrillViewerProps {
  depthMultiplier: number;
  isAutoSpinning: boolean;
  className?: string;
  materialMode?: 'solid' | '3d-render';
  enableRotation?: boolean;
  alignBottom?: boolean;
}

export const CadModularDrillViewer: React.FC<CadModularDrillViewerProps> = ({
  depthMultiplier,
  isAutoSpinning,
  className = '',
  materialMode = '3d-render',
  enableRotation = true,
  alignBottom = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  // Re-generate geometry when depth changes
  useEffect(() => {
    if (!sceneRef.current || !modelGroupRef.current) return;
    
    // clear old group
    while (modelGroupRef.current.children.length > 0) {
      const child = modelGroupRef.current.children[0] as THREE.Mesh;
      modelGroupRef.current.remove(child);
      if (child.geometry) child.geometry.dispose();
    }

    const radius = 0.4;
    const shankLength = 2.5;
    // Scale cut length linearly based on D multiplier (1D to 12D)
    const cutLength = 1.0 + (depthMultiplier * 0.45);
    const neckLength = 0.2;
    const totalLength = cutLength + neckLength + shankLength;
    
    // Materials
    const basicSolidMat = new THREE.MeshStandardMaterial({
      color: 0x777777, // darker grey to contrast with white background
      roughness: 0.8,
      metalness: 0.1,
    });
    
    // Hyper-realistic silver metal (darkened base color for better contrast and detail)
    const realisticSilverMat = new THREE.MeshPhysicalMaterial({
      color: 0x9a9fa3, // darker gunmetal/carbide silver
      roughness: 0.1,
      metalness: 0.95,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
    });

    const activeMat = materialMode === '3d-render' ? realisticSilverMat : basicSolidMat;

    const modelPath = `/models/${depthMultiplier}D.stl`;
    const loader = new STLLoader();
    
    loader.load(
      modelPath,
      (geometry) => {
        geometry.computeVertexNormals();
        geometry.center();

        const mesh = new THREE.Mesh(geometry, activeMat);
        
        geometry.computeBoundingBox();
        if (geometry.boundingBox) {
          const size = new THREE.Vector3();
          geometry.boundingBox.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          
          // Force the visual length to grow linearly based on depth multiplier.
          // 1D -> ~3 units, 12D -> ~9 units.
          const targetLength = 2.5 + (depthMultiplier * 0.55);
          const scale = targetLength / maxDim;
          mesh.scale.set(scale, scale, scale);
          
          // Auto-orientation: ensure the longest dimension is aligned with the Y-axis (up)
          if (size.z >= size.x && size.z >= size.y) {
            // Longest is Z
            mesh.rotation.x = -Math.PI / 2;
          } else if (size.x > size.y && size.x > size.z) {
            // Longest is X
            mesh.rotation.z = Math.PI / 2;
          } else {
            // Longest is Y
            mesh.rotation.set(0, 0, 0);
          }
          
          // Align bottoms to a consistent baseline so they grow upwards like a staircase.
          if (alignBottom) {
            mesh.position.y = -4.5 + targetLength / 2;
          } else {
            mesh.position.y = 0; // centered in the single view
          }
        }
        
        if (modelGroupRef.current) {
          modelGroupRef.current.add(mesh);
        }
      },
      undefined,
      (error) => console.error(`Error loading STL for ${depthMultiplier}D:`, error)
    );

  }, [depthMultiplier, materialMode]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    const w = container.clientWidth;
    const h = container.clientHeight;
    
    const canvas = document.createElement('canvas');
    canvas.className = "w-full h-full cursor-grab active:cursor-grabbing outline-none";
    canvas.style.touchAction = 'none';
    container.appendChild(canvas);
    
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0, 0, 11);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85; // Lowered to prevent white blowout
    rendererRef.current = renderer;
    
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    
    const group = new THREE.Group();
    modelGroupRef.current = group;
    scene.add(group);
    
    const amb = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(amb);
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(5, 5, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xe0eaff, 1.2);
    fill.position.set(-5, -2, -5);
    scene.add(fill);
    
    // Add rim lights for metallic realism (moved to the side to avoid blinding the tip)
    const rim = new THREE.DirectionalLight(0xffffff, 2.5);
    rim.position.set(10, 0, -10);
    scene.add(rim);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotateSpeed = 2.0;
    // Negative rotateSpeed inverts the camera orbit, making it feel like 1:1 object rotation
    controls.rotateSpeed = -0.6;
    controls.zoomSpeed = 0.6;
    controls.enablePan = false; // Prevents the drill from being dragged off-screen
    // Limit zoom to prevent clipping
    controls.minDistance = 5;
    controls.maxDistance = 50;
    
    // Allow complete freedom for vertical movement
    // (Removed polar angle constraints)

    if (!enableRotation) {
      controls.enableRotate = false;
      controls.enableZoom = false;
      controls.enablePan = false;
    }
    
    controlsRef.current = controls;

    const handleResize = () => {
      if (!containerRef.current) return;
      const nw = containerRef.current.clientWidth;
      const nh = containerRef.current.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.forceContextLoss();
      renderer.dispose();
      pmremGenerator.dispose();
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, []);

  useEffect(() => {
    let frame: number;
    const render = () => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = isAutoSpinning;
        controlsRef.current.update();
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      frame = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frame);
  }, [isAutoSpinning]);

  return (
    <div ref={containerRef} className={`w-full h-full relative ${className}`} />
  );
};
