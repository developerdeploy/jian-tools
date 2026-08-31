import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Rotate3d, 
  Layers, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw
} from 'lucide-react';

export type CoatingType = 'altin' | 'carbide' | 'tin';

interface CadEndMillViewerProps {
  className?: string;
  onOpenEnquiry?: () => void;
}

export const CadEndMillViewer: React.FC<CadEndMillViewerProps> = ({
  className = '',
  onOpenEnquiry
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State controls - default to AlTiN (Bronze-Copper) to match native SolidWorks CAD
  const [coating, setCoating] = useState<CoatingType>('altin');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [viewPreset, setViewPreset] = useState<'iso' | 'tip' | 'flutes' | 'shank'>('iso');

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<{
    solid: THREE.MeshStandardMaterial;
    shank: THREE.MeshStandardMaterial;
    wireframe: THREE.MeshBasicMaterial;
    edgeLine: THREE.LineBasicMaterial;
  } | null>(null);

  // Drag & Touch interaction state (Initial angle matches SolidWorks 3D isometric view)
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const touchDistanceRef = useRef<number | null>(null);
  const targetRotationRef = useRef({ x: 0.55, y: -0.65 });
  const currentRotationRef = useRef({ x: 0.55, y: -0.65 });
  const targetZoomRef = useRef<number>(14.2);
  const currentZoomRef = useRef<number>(14.2);
  const isVisibleRef = useRef<boolean>(true);

  // Color schemes for coatings matching authentic CAD materials
  const coatingColors = {
    altin: {
      name: 'Rose Gold / Copper',
      subtext: 'High-Performance Nano Coating // Heat Barrier',
      color: 0xcb7858,       // Copper / Rose Gold
      shankColor: 0x9ca3af,  // Polished Silver Steel Shank
      roughness: 0.28,
      metalness: 0.88,
      edgeColor: 0xffd5bf
    },
    carbide: {
      name: 'Dark Grey / Tungsten',
      subtext: 'TiCN Hardened Coating // Wear Resistant',
      color: 0x3a3f44,       // Dark Grey
      shankColor: 0x9ca3af,  // Polished Silver Steel Shank
      roughness: 0.20,
      metalness: 0.85,
      edgeColor: 0x5a5f64
    },
    tin: {
      name: 'Balinit TiN Gold Coating',
      subtext: '2300 HV Hardness // Anti-Galling Lubricity',
      color: 0xdfb13c,
      shankColor: 0x9ca3af,
      roughness: 0.24,
      metalness: 0.92,
      edgeColor: 0xffea9f
    }
  };

  // Hotspots definitions
  const hotspots = [
    {
      id: 1,
      title: '4-Flute Helical Chip Gullets',
      description: 'Asymmetric 4-flute high-capacity spiral geometry engineered for heavy metal removal rates in aerospace alloys and steel.',
      target: { x: 0.40, y: -0.85, zoom: 7.5 }
    },
    {
      id: 2,
      title: '4-Tooth Center Dish Cutting Head',
      description: 'Concave conical center dish pocket with 4 radial cutting lips forming a perfect cross (+) for direct Z-ramping.',
      target: { x: 1.45, y: 0, zoom: 5.5 }
    },
    {
      id: 3,
      title: 'Ø12.0 mm h6 Precision Shank',
      description: 'Ultra-low Total Indicated Runout (TIR < 0.002 mm) with precision ground cylindrical clamping surface.',
      target: { x: -0.6, y: -0.2, zoom: 7.8 }
    },
    {
      id: 4,
      title: 'Polished Radial Clearance Lands',
      description: 'Eccentric radial relief behind cutting edges minimizes friction, cutting forces, and work-piece deflection.',
      target: { x: 0.25, y: -1.6, zoom: 7.0 }
    }
  ];

  // Build the 3D Solid Carbide End Mill Geometry matching user's SolidWorks CAD model
  const createEndMillGeometry = useCallback(() => {
    const group = new THREE.Group();

    // Standard Authentic Dimensions (Ø12 mm x 30 mm flute x 75 mm OAL)
    const radius = 0.38;               // Ø12mm scaled
    const cutLength = 2.4;             // Flute length
    const neckLength = 0.4;            // Neck blend
    const shankLength = 2.8;           // Shank length
    const coreRadius = radius * 0.50;  // 3-Flute deep core web (50% of OD)
    const totalLength = cutLength + neckLength + shankLength; // 5.6 total

    // Symmetrically center whole model at Y = 0
    const yCenterOffset = - (totalLength / 2); // -2.8
    const tipY = yCenterOffset;               // -2.8 (bottom cutting head)
    const cutTopY = tipY + cutLength;         // -0.4
    const neckTopY = cutTopY + neckLength;    // 0.0
    const shankTopY = neckTopY + shankLength; // +2.8 (top of shank)

    // -------------------------------------------------------------
    // 1. SHANK SECTION (Graphite Carbide Cylinder + Chamfered Top)
    // -------------------------------------------------------------
    const shankGeo = new THREE.CylinderGeometry(
      radius,
      radius,
      shankLength,
      64,
      1,
      false
    );
    const shankMesh = new THREE.Mesh(shankGeo, materialsRef.current!.shank);
    shankMesh.position.y = neckTopY + (shankLength / 2);
    shankMesh.castShadow = true;
    shankMesh.receiveShadow = true;
    group.add(shankMesh);

    // Top lead-in chamfer
    const chamferGeo = new THREE.CylinderGeometry(
      radius * 0.88,
      radius,
      0.12,
      64
    );
    const chamferMesh = new THREE.Mesh(chamferGeo, materialsRef.current!.shank);
    chamferMesh.position.y = shankTopY + 0.06;
    group.add(chamferMesh);

    // Laser Etch Metadata Band on Shank
    const etchCanvas = document.createElement('canvas');
    etchCanvas.width = 1024;
    etchCanvas.height = 128;
    const ctx = etchCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#14171a';
      ctx.fillRect(0, 0, 1024, 128);
      ctx.fillStyle = '#c5ccd6';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('JIAN TOOLS // END-MILLING.SLDPRT // 4F HELICAL // NANO-AlTiN // h6', 24, 72);
    }
    const etchTexture = new THREE.CanvasTexture(etchCanvas);
    etchTexture.wrapS = THREE.RepeatWrapping;

    const laserBandGeo = new THREE.CylinderGeometry(
      radius + 0.0015,
      radius + 0.0015,
      0.35,
      64
    );
    const laserBandMat = new THREE.MeshBasicMaterial({
      map: etchTexture,
      transparent: true,
      opacity: 0.95
    });
    const laserBandMesh = new THREE.Mesh(laserBandGeo, laserBandMat);
    laserBandMesh.position.y = neckTopY + (shankLength * 0.65);
    group.add(laserBandMesh);

    // -------------------------------------------------------------
    // 2. NECK TRANSITION SECTION (Tapered Cylinder)
    // -------------------------------------------------------------
    const neckGeo = new THREE.CylinderGeometry(
      radius,
      radius * 0.96,
      neckLength,
      64
    );
    const neckMesh = new THREE.Mesh(neckGeo, materialsRef.current!.shank);
    neckMesh.position.y = cutTopY + (neckLength / 2);
    group.add(neckMesh);

    // -------------------------------------------------------------
    // 3. 3-FLUTE HELICAL CUTTING BODY (Exact SolidWorks 3-Flute Profile)
    // -------------------------------------------------------------
    const radialSegments = 180;
    const heightSegments = 120;
    const numFlutes = 4;
    const helixTurns = 0.95; // ~38°-40° helix angle

    const flutePositions: number[] = [];
    const fluteNormals: number[] = [];
    const fluteUvs: number[] = [];
    const fluteIndices: number[] = [];

    // Parametric vertex generation for 3-flute helical geometry
    for (let j = 0; j <= heightSegments; j++) {
      const v = j / heightSegments;
      const y = tipY + (v * cutLength);
      const helixAngle = v * helixTurns * Math.PI * 2;

      for (let i = 0; i <= radialSegments; i++) {
        const u = i / radialSegments;
        const baseAngle = u * Math.PI * 2;
        const currentAngle = baseAngle + helixAngle;

        // 3-Flute local phase (0 to 2pi/3 for each of the 3 flutes)
        const flutePhase = (baseAngle * numFlutes) % (Math.PI * 2);
        const normPhase = flutePhase / (Math.PI * 2); // 0 to 1

        let rMod: number;
        // 3-Flute Cross Section:
        // 0.00 - 0.10: Sharp Cutting Edge & Outer Cylindrical Margin Land
        // 0.10 - 0.35: Primary & Secondary Radial Relief (smooth curve down)
        // 0.35 - 0.78: Deep Wide Chip Gullet Basin (plunging to core radius)
        // 0.78 - 1.00: Curved Rake Face (climbing steeply to cutting edge)
        if (normPhase < 0.10) {
          const t = normPhase / 0.10;
          rMod = radius * (1.0 - (t * 0.015));
        } else if (normPhase < 0.35) {
          const t = (normPhase - 0.10) / 0.25;
          rMod = (radius * 0.985) - (t * (radius - coreRadius) * 0.35);
        } else if (normPhase < 0.78) {
          const t = (normPhase - 0.35) / 0.43;
          const sinus = Math.sin(t * Math.PI);
          const baseR = (radius * 0.985) - (0.35 * (radius - coreRadius));
          rMod = baseR - (sinus * (baseR - coreRadius) * 1.25);
        } else {
          const t = (normPhase - 0.78) / 0.22;
          rMod = coreRadius + (Math.pow(t, 1.4) * (radius - coreRadius));
        }

        const finalRadius = Math.max(coreRadius * 0.90, Math.min(radius, rMod));

        const x = Math.cos(currentAngle) * finalRadius;
        const z = Math.sin(currentAngle) * finalRadius;

        flutePositions.push(x, y, z);
        fluteUvs.push(u, v);

        // Calculate smooth vertex normals
        const nx = Math.cos(currentAngle);
        const nz = Math.sin(currentAngle);
        fluteNormals.push(nx, 0, nz);
      }
    }

    // Generate indices
    for (let j = 0; j < heightSegments; j++) {
      for (let i = 0; i < radialSegments; i++) {
        const a = (j * (radialSegments + 1)) + i;
        const b = ((j + 1) * (radialSegments + 1)) + i;
        const c = ((j + 1) * (radialSegments + 1)) + (i + 1);
        const d = (j * (radialSegments + 1)) + (i + 1);

        fluteIndices.push(a, b, d);
        fluteIndices.push(b, c, d);
      }
    }

    const fluteGeo = new THREE.BufferGeometry();
    fluteGeo.setAttribute('position', new THREE.Float32BufferAttribute(flutePositions, 3));
    fluteGeo.setAttribute('uv', new THREE.Float32BufferAttribute(fluteUvs, 2));
    fluteGeo.setIndex(fluteIndices);
    fluteGeo.computeVertexNormals();

    const fluteMesh = new THREE.Mesh(fluteGeo, materialsRef.current!.solid);
    fluteMesh.castShadow = true;
    fluteMesh.receiveShadow = true;
    group.add(fluteMesh);

    // -------------------------------------------------------------
    // 4. CUTTING HEAD (Exact 3-Tooth End Face + Conical Center Dish)
    // -------------------------------------------------------------
    // In the user's CAD screenshot, the head features:
    // - Central conical dish / recess pocket
    // - 3 curved radial cutting teeth / wings radiating outward
    // - Hooked outer corner teeth with plunge gashes
    const headRadialRings = 16;
    const headAngularSlices = 120;
    const headPositions: number[] = [];
    const headNormals: number[] = [];
    const headIndices: number[] = [];

    // Center point (Apex of conical recess dish)
    const centerApexY = tipY + 0.12; // Inverted conical cup in center
    headPositions.push(0, centerApexY, 0);
    headNormals.push(0, -1, 0);

    for (let ring = 1; ring <= headRadialRings; ring++) {
      const ringRatio = ring / headRadialRings; // 0 to 1 (center to OD)
      const curRadius = ringRatio * radius;

      for (let slice = 0; slice <= headAngularSlices; slice++) {
        const angle = (slice / headAngularSlices) * Math.PI * 2;
        
        // 3-Tooth phase
        const toothPhase = (angle * numFlutes) % (Math.PI * 2);
        const normTooth = toothPhase / (Math.PI * 2); // 0 to 1

        let yOffset = 0;
        // Central Conical Dish Zone (r < 0.38 radius)
        if (ringRatio < 0.38) {
          const t = ringRatio / 0.38;
          yOffset = centerApexY - (t * 0.08); // slopes down from apex into cup
        } else {
          // 3-Tooth Radial Cutting Wings Zone
          const t = (ringRatio - 0.38) / 0.62;
          
          // Tooth relief contour:
          // 0.00 - 0.20: Sharp radial cutting lip (lowest / forward-most cutting plane)
          // 0.20 - 0.70: Axial relief slope facet
          // 0.70 - 1.00: Plunge gash pocket scooped upward
          let toothRelief = 0;
          if (normTooth < 0.20) {
            toothRelief = 0; // cutting lip at base plane
          } else if (normTooth < 0.70) {
            const relT = (normTooth - 0.20) / 0.50;
            toothRelief = relT * 0.045; // clearance relief slope
          } else {
            const gashT = (normTooth - 0.70) / 0.30;
            toothRelief = 0.045 + (Math.sin(gashT * Math.PI) * 0.06); // plunge gash cup
          }

          yOffset = tipY + 0.04 - (t * 0.04) + toothRelief;
        }

        const x = Math.cos(angle) * curRadius;
        const z = Math.sin(angle) * curRadius;

        headPositions.push(x, yOffset, z);
        headNormals.push(0, -1, 0);
      }
    }

    // Connect apex to ring 1
    for (let slice = 0; slice < headAngularSlices; slice++) {
      headIndices.push(0, slice + 1, slice + 2);
    }

    // Connect concentric rings
    for (let ring = 0; ring < headRadialRings - 1; ring++) {
      const ringStart = 1 + (ring * (headAngularSlices + 1));
      const nextRingStart = 1 + ((ring + 1) * (headAngularSlices + 1));

      for (let slice = 0; slice < headAngularSlices; slice++) {
        const a = ringStart + slice;
        const b = nextRingStart + slice;
        const c = nextRingStart + slice + 1;
        const d = ringStart + slice + 1;

        headIndices.push(a, b, d);
        headIndices.push(b, c, d);
      }
    }

    const headGeo = new THREE.BufferGeometry();
    headGeo.setAttribute('position', new THREE.Float32BufferAttribute(headPositions, 3));
    headGeo.setIndex(headIndices);
    headGeo.computeVertexNormals();

    const headMesh = new THREE.Mesh(headGeo, materialsRef.current!.solid);
    headMesh.castShadow = true;
    headMesh.receiveShadow = true;
    group.add(headMesh);

    // -------------------------------------------------------------
    // 5. HELICAL CUTTING EDGE ACCENT LINES (Sharp 3-Flute Edges)
    // -------------------------------------------------------------
    const edgePositions: number[] = [];
    for (let fluteIdx = 0; fluteIdx < numFlutes; fluteIdx++) {
      const fluteStartAngle = (fluteIdx / numFlutes) * Math.PI * 2;
      
      // Spiral cutting lines along the 3 flutes
      for (let j = 0; j < heightSegments; j++) {
        const v1 = j / heightSegments;
        const v2 = (j + 1) / heightSegments;
        
        const y1 = tipY + (v1 * cutLength);
        const y2 = tipY + (v2 * cutLength);

        const a1 = fluteStartAngle + (v1 * helixTurns * Math.PI * 2);
        const a2 = fluteStartAngle + (v2 * helixTurns * Math.PI * 2);

        edgePositions.push(
          Math.cos(a1) * (radius + 0.002), y1, Math.sin(a1) * (radius + 0.002),
          Math.cos(a2) * (radius + 0.002), y2, Math.sin(a2) * (radius + 0.002)
        );
      }

      // Radial cutting lip lines across the 3-tooth face
      for (let rStep = 0; rStep < 10; rStep++) {
        const r1 = (0.35 + (rStep * 0.065)) * radius;
        const r2 = (0.35 + ((rStep + 1) * 0.065)) * radius;
        
        const lipAngle = fluteStartAngle;
        const y1 = tipY + (rStep === 0 ? 0.04 : 0);
        const y2 = tipY;

        edgePositions.push(
          Math.cos(lipAngle) * r1, y1, Math.sin(lipAngle) * r1,
          Math.cos(lipAngle) * r2, y2, Math.sin(lipAngle) * r2
        );
      }
    }

    const edgeLineGeo = new THREE.BufferGeometry();
    edgeLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
    const edgeLines = new THREE.LineSegments(edgeLineGeo, materialsRef.current!.edgeLine);
    edgeLines.name = 'edgeLines';
    group.add(edgeLines);

    // -------------------------------------------------------------
    // 6. WIREFRAME OVERLAY MESH
    // -------------------------------------------------------------
    const wireframeFlute = new THREE.Mesh(fluteGeo, materialsRef.current!.wireframe);
    wireframeFlute.visible = wireframe;
    wireframeFlute.name = 'wireframeOverlay';
    group.add(wireframeFlute);

    const wireframeHead = new THREE.Mesh(headGeo, materialsRef.current!.wireframe);
    wireframeHead.visible = wireframe;
    wireframeHead.name = 'wireframeHead';
    group.add(wireframeHead);

    const wireframeShank = new THREE.Mesh(shankGeo, materialsRef.current!.wireframe);
    wireframeShank.position.copy(shankMesh.position);
    wireframeShank.visible = wireframe;
    wireframeShank.name = 'wireframeShank';
    group.add(wireframeShank);

    return group;
  }, [wireframe]);

  // Update Materials based on Coating Selection & Wireframe
  useEffect(() => {
    if (!materialsRef.current) return;

    const conf = coatingColors[coating];

    // Solid Cutting Body Material (Bronze/Copper or Carbide)
    materialsRef.current.solid.color.setHex(conf.color);
    materialsRef.current.solid.roughness = conf.roughness;
    materialsRef.current.solid.metalness = conf.metalness;
    materialsRef.current.solid.needsUpdate = true;

    // Shank Material (Graphite)
    materialsRef.current.shank.color.setHex(conf.shankColor);
    materialsRef.current.shank.roughness = conf.roughness * 0.9;
    materialsRef.current.shank.metalness = conf.metalness;
    materialsRef.current.shank.needsUpdate = true;

    // Edge Accent Color
    materialsRef.current.edgeLine.color.setHex(conf.edgeColor);
    materialsRef.current.edgeLine.needsUpdate = true;

    // Wireframe Visibility
    if (modelGroupRef.current) {
      const wireOverlay = modelGroupRef.current.getObjectByName('wireframeOverlay');
      const wireHead = modelGroupRef.current.getObjectByName('wireframeHead');
      const wireShank = modelGroupRef.current.getObjectByName('wireframeShank');
      if (wireOverlay) wireOverlay.visible = wireframe;
      if (wireHead) wireHead.visible = wireframe;
      if (wireShank) wireShank.visible = wireframe;
    }
  }, [coating, wireframe]);

  // Main Three.js Scene Setup and Animation Loop
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera - FOV 34° for low distortion, positioned to fit full tool
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0, targetZoomRef.current);
    cameraRef.current = camera;

    // WebGL Renderer with High Performance & Crisp AA
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    rendererRef.current = renderer;

    // Materials Creation
    const initialConf = coatingColors[coating];
    const solidMat = new THREE.MeshStandardMaterial({
      color: initialConf.color,
      roughness: initialConf.roughness,
      metalness: initialConf.metalness,
      envMapIntensity: 1.5
    });

    const shankMat = new THREE.MeshStandardMaterial({
      color: initialConf.shankColor,
      roughness: initialConf.roughness * 0.9,
      metalness: initialConf.metalness,
      envMapIntensity: 1.3
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });

    const edgeLineMat = new THREE.LineBasicMaterial({
      color: initialConf.edgeColor,
      transparent: true,
      opacity: 0.85
    });

    materialsRef.current = {
      solid: solidMat,
      shank: shankMat,
      wireframe: wireframeMat,
      edgeLine: edgeLineMat
    };

    // Lights Rig - Studio Lighting for metallic tooling
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    // Key Studio Light (Cool white sharp reflection)
    const keyLight = new THREE.DirectionalLight(0xf0f6ff, 3.4);
    keyLight.position.set(5, 8, 7);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Rim Light (Highlighting helical flutes and edges)
    const rimLight = new THREE.DirectionalLight(0x00e5ff, 2.6);
    rimLight.position.set(-6, 2, -6);
    scene.add(rimLight);

    // Cutting Tip Uplight (Directly illuminates the 3-tooth face and center cup)
    const tipLight = new THREE.DirectionalLight(0xfff5ea, 2.8);
    tipLight.position.set(2, -8, 6);
    scene.add(tipLight);

    // Warm Side Fill Light
    const fillLight = new THREE.DirectionalLight(0xffecd2, 1.8);
    fillLight.position.set(4, 0, 4);
    scene.add(fillLight);

    // Generate End Mill Model
    const modelGroup = createEndMillGeometry();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Animation Loop with Inertia & Visibility Check
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      // Auto-rotation when not dragging
      if (autoRotate && !isDraggingRef.current) {
        targetRotationRef.current.y += 0.008;
      }

      // Smooth inertia interpolation
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;
      currentZoomRef.current += (targetZoomRef.current - currentZoomRef.current) * 0.08;

      if (modelGroupRef.current) {
        modelGroupRef.current.rotation.x = currentRotationRef.current.x;
        modelGroupRef.current.rotation.y = currentRotationRef.current.y;
      }

      if (cameraRef.current) {
        cameraRef.current.position.z = currentZoomRef.current;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // IntersectionObserver to pause rendering when scrolled out of view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisibleRef.current = entry.isIntersecting;
      });
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      renderer.dispose();
    };
  }, [createEndMillGeometry]);

  // Mouse & Touch 360° Orbit Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    targetRotationRef.current.y += deltaX * 0.009;
    targetRotationRef.current.x += deltaY * 0.009;

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      touchDistanceRef.current = null;
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchDistanceRef.current = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.009;
      targetRotationRef.current.x += deltaY * 0.009;

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2 && touchDistanceRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.hypot(dx, dy);
      const deltaDist = touchDistanceRef.current - distance;

      targetZoomRef.current = Math.max(5.0, Math.min(24.0, targetZoomRef.current + deltaDist * 0.02));
      touchDistanceRef.current = distance;
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    touchDistanceRef.current = null;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.005;
    targetZoomRef.current = Math.max(5.0, Math.min(24.0, targetZoomRef.current + zoomDelta));
  };

  // Preset Views Switcher matching SolidWorks angles
  const handleSetPreset = (preset: 'iso' | 'tip' | 'flutes' | 'shank') => {
    setViewPreset(preset);
    setActiveHotspot(null);
    if (preset === 'iso') {
      // Classic 3D SolidWorks Isometric view showing full bit with generous margin
      targetRotationRef.current = { x: 0.55, y: -0.65 };
      targetZoomRef.current = 14.2;
    } else if (preset === 'tip') {
      // Direct view of the 3-tooth cutting face and center cup
      targetRotationRef.current = { x: 1.45, y: 0 };
      targetZoomRef.current = 7.5;
    } else if (preset === 'flutes') {
      // Zoomed on 3-flute helical spiral basins
      targetRotationRef.current = { x: 0.25, y: -1.6 };
      targetZoomRef.current = 9.5;
    } else if (preset === 'shank') {
      // View of precision ground shank
      targetRotationRef.current = { x: -0.6, y: -0.2 };
      targetZoomRef.current = 10.5;
    }
  };

  // Hotspot Click
  const handleHotspotClick = (spot: typeof hotspots[0]) => {
    setActiveHotspot(spot.id);
    targetRotationRef.current = { x: spot.target.x, y: spot.target.y };
    targetZoomRef.current = spot.target.zoom;
  };

  // Zoom In / Out Handlers
  const handleZoomIn = () => {
    targetZoomRef.current = Math.max(5.0, targetZoomRef.current - 2.2);
  };

  const handleZoomOut = () => {
    targetZoomRef.current = Math.min(24.0, targetZoomRef.current + 2.2);
  };

  const handleResetView = () => {
    handleSetPreset('iso');
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[460px] lg:min-h-[520px] rounded-2xl bg-white dark:bg-[#0b0e12] border border-black/[0.08] dark:border-white/[0.12] overflow-hidden flex flex-col justify-between shadow-xl transition-colors duration-300 select-none ${className}`}
    >
      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0 touch-none"
      />

      {/* Floating CAD Zoom & View Reset Widget */}
      <div className="absolute right-3.5 top-20 z-20 flex flex-col items-center space-y-1 pointer-events-auto bg-white/90 dark:bg-[#111417]/90 backdrop-blur-md p-1 rounded-xl border border-black/[0.08] dark:border-white/[0.12] shadow-lg">
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-lg text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
          title="Zoom In (+)"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-lg text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
          title="Zoom Out (-)"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-4 h-px bg-black/[0.08] dark:bg-white/[0.08] my-0.5" />
        <button
          onClick={handleResetView}
          className="p-2 rounded-lg text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
          title="Reset 3D View (ISO)"
          aria-label="Reset View"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top Header HUD */}
      <div className="relative z-10 p-4 flex flex-wrap items-center justify-between gap-2 border-b border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-b from-white/95 dark:from-[#080A0C]/90 to-transparent pointer-events-none">
        
        {/* Left Badge: Native SolidWorks CAD Reference */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-precision-blue animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#080A0C] dark:text-white uppercase">
            END MILLING.SLDPRT
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-precision-blue/15 text-precision-blue border border-precision-blue/30 font-medium">
            3D CAD
          </span>
        </div>

        {/* Right HUD: Coating Selector */}
        <div className="flex items-center space-x-1.5 pointer-events-auto">
          <button
            onClick={() => setCoating('altin')}
            className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all border cursor-pointer ${
              coating === 'altin'
                ? 'bg-amber-600 dark:bg-amber-600 text-white font-bold border-amber-600 shadow-xs'
                : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white border-black/[0.08] dark:border-white/[0.08]'
            }`}
            title="Rose Gold / Copper Coating"
          >
            ROSE GOLD
          </button>

          <button
            onClick={() => setCoating('carbide')}
            className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all border cursor-pointer ${
              coating === 'carbide'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-black font-bold border-slate-900 dark:border-white shadow-xs'
                : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white border-black/[0.08] dark:border-white/[0.08]'
            }`}
            title="Dark Grey / Tungsten"
          >
            DARK GREY
          </button>

          <button
            onClick={() => setCoating('tin')}
            className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all border cursor-pointer ${
              coating === 'tin'
                ? 'bg-amber-400 text-black font-bold border-amber-400 shadow-xs'
                : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white border-black/[0.08] dark:border-white/[0.08]'
            }`}
            title="Balinit TiN Gold"
          >
            TiN GOLD
          </button>
        </div>
      </div>

      {/* Center Interactive Hotspots Layer */}
      <div className="relative z-10 flex-1 pointer-events-none p-4 flex flex-col justify-center">
        {/* Active Hotspot Callout Card */}
        {activeHotspot !== null && (
          <div className="absolute top-16 right-4 max-w-xs bg-white/95 dark:bg-[#111417]/95 backdrop-blur-md border border-precision-blue/40 rounded-xl p-3.5 shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between text-[10px] font-mono text-precision-blue font-bold mb-1">
              <span>FEATURE // 0{activeHotspot}</span>
              <button 
                onClick={() => setActiveHotspot(null)}
                className="text-[#64748B] hover:text-[#080A0C] dark:hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>
            <h4 className="text-xs font-bold text-[#080A0C] dark:text-white mb-1">
              {hotspots.find(h => h.id === activeHotspot)?.title}
            </h4>
            <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              {hotspots.find(h => h.id === activeHotspot)?.description}
            </p>
          </div>
        )}
      </div>

      {/* Floating View Presets & Hotspot Navigation Bar */}
      <div className="relative z-10 px-4 py-2 flex items-center justify-between pointer-events-auto bg-white/80 dark:bg-[#080A0C]/50 backdrop-blur-sm border-t border-black/[0.04] dark:border-transparent">
        {/* View Presets */}
        <div className="flex items-center space-x-1">
          <span className="text-[9px] font-mono text-[#64748B] dark:text-[#94A3B8] mr-1 uppercase">VIEW:</span>
          {(['iso', 'tip', 'flutes', 'shank'] as const).map((preset) => (
            <button
              key={preset}
              onClick={() => handleSetPreset(preset)}
              className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase transition-colors cursor-pointer ${
                viewPreset === preset && activeHotspot === null
                  ? 'bg-black/10 dark:bg-white/20 text-[#080A0C] dark:text-white font-bold'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white bg-black/[0.03] dark:bg-white/[0.04]'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Feature Hotspots Selector */}
        <div className="flex items-center space-x-1.5">
          <span className="text-[9px] font-mono text-[#64748B] dark:text-[#94A3B8] mr-1 uppercase">SPECS:</span>
          {hotspots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => handleHotspotClick(spot)}
              className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-mono font-bold transition-all cursor-pointer ${
                activeHotspot === spot.id
                  ? 'bg-precision-blue text-white ring-2 ring-precision-blue/40'
                  : 'bg-black/[0.04] dark:bg-white/[0.08] text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/20'
              }`}
              title={spot.title}
            >
              {spot.id}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Engineering Status & Action Footer */}
      <div className="relative z-10 p-3 sm:p-4 border-t border-black/[0.06] dark:border-white/[0.08] bg-white/90 dark:bg-[#080A0C]/90 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        
        {/* Model Engineering Specifications */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2.5 text-[11px] font-mono text-[#080A0C] dark:text-white font-semibold">
            <span>Ø 12.0 mm</span>
            <span className="text-[#64748B]">•</span>
            <span>4-FLUTE HELIX</span>
            <span className="text-[#64748B]">•</span>
            <span className="text-precision-blue">38° HELIX</span>
          </div>
          <span className="text-[9px] font-mono text-[#64748B] dark:text-[#94A3B8] mt-0.5">
            {coatingColors[coating].name}
          </span>
        </div>

        {/* Interactive Action Controls */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          
          {/* Wireframe Toggle */}
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`p-2 rounded-lg text-xs font-mono transition-colors border cursor-pointer ${
              wireframe
                ? 'bg-precision-blue/20 text-precision-blue border-precision-blue/50'
                : 'bg-black/[0.04] dark:bg-white/[0.05] text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white border-black/[0.08] dark:border-white/[0.08]'
            }`}
            title="Toggle CAD Wireframe Mesh"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          {/* Auto-Rotation Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-lg text-xs font-mono transition-colors border cursor-pointer ${
              autoRotate
                ? 'bg-black/[0.08] dark:bg-white/[0.12] text-[#080A0C] dark:text-white border-black/[0.12] dark:border-white/[0.2]'
                : 'bg-black/[0.03] dark:bg-white/[0.05] text-[#64748B] border-black/[0.06] dark:border-white/[0.08]'
            }`}
            title="Toggle 360° Auto-Rotation"
          >
            <Rotate3d className="w-3.5 h-3.5" />
          </button>

          {/* Direct CAD Download */}
          <a
            href="/assets/cad/End-Milling.SLDPRT"
            download="End-Milling.SLDPRT"
            className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] text-[#080A0C] dark:text-white text-[10px] font-mono font-medium tracking-wider uppercase transition-colors border border-black/[0.08] dark:border-white/[0.12] cursor-pointer"
            title="Download SolidWorks Part File (1.85 MB)"
          >
            <Download className="w-3 h-3 text-precision-blue" />
            <span>DOWNLOAD .SLDPRT</span>
          </a>

          {/* Quote Button */}
          {onOpenEnquiry && (
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-[10px] font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-md"
            >
              <span>QUOTE</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
