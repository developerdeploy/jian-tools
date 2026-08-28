import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Rotate3d, 
  Layers, 
  Download, 
  Sparkles, 
  Info, 
  Sliders
} from 'lucide-react';

export type CoatingType = 'carbide' | 'altin' | 'tin';

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
  
  // State controls
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
  } | null>(null);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.35, y: -0.6 });
  const currentRotationRef = useRef({ x: 0.35, y: -0.6 });
  const targetZoomRef = useRef<number>(6.2);
  const currentZoomRef = useRef<number>(6.2);
  const isVisibleRef = useRef<boolean>(true);

  // Color schemes for coatings
  const coatingColors = {
    carbide: {
      name: 'Micrograin Tungsten Carbide',
      subtext: 'Polished Mirror Finish (92.5 HRA)',
      color: 0x8c949e,
      shankColor: 0x9aa2ac,
      roughness: 0.2,
      metalness: 0.95
    },
    altin: {
      name: 'AlTiN Nano-Composite Coating',
      subtext: '3600 HV Hardness // 900°C Thermal Barrier',
      color: 0x27242c,
      shankColor: 0x3d3844,
      roughness: 0.28,
      metalness: 0.88
    },
    tin: {
      name: 'Balinit TiN Gold Coating',
      subtext: '2300 HV Hardness // Anti-Galling Lubricity',
      color: 0xd4af37,
      shankColor: 0xb5932a,
      roughness: 0.22,
      metalness: 0.92
    }
  };

  // Hotspots definitions
  const hotspots = [
    {
      id: 1,
      title: '38° Variable Helix Flutes',
      description: 'Asymmetric 4-flute spiral geometry disrupts acoustic harmonics to eliminate chattering during heavy trochoidal milling.',
      target: { x: 0.45, y: -0.8, zoom: 5.5 }
    },
    {
      id: 2,
      title: 'Center-Cutting 4-Tooth End Face',
      description: 'Precision gash geometry with 45° corner chamfers engineered for direct Z-axis plunge cutting and helical ramping.',
      target: { x: 1.45, y: 0, zoom: 4.8 }
    },
    {
      id: 3,
      title: 'Ø12.0 mm h6 Precision Shank',
      description: 'Ultra-low Total Indicated Runout (TIR < 0.002 mm) with precision ground cylindrical clamping surface.',
      target: { x: -0.6, y: -0.3, zoom: 5.8 }
    },
    {
      id: 4,
      title: 'Micro-Polished Chip Gullets',
      description: 'Parabolic flute core provides maximum web rigidity while mirror-polished flutes ensure uninterrupted chip evacuation.',
      target: { x: 0.2, y: -1.6, zoom: 5.0 }
    }
  ];

  // Build the 3D Solid Carbide End Mill Geometry
  const createEndMillGeometry = useCallback(() => {
    const group = new THREE.Group();

    // Dimensions (normalized scale)
    const shankRadius = 0.55;
    const shankLength = 3.2;
    const cutLength = 2.8;
    const neckLength = 0.5;
    const coreRadius = shankRadius * 0.58;

    // -------------------------------------------------------------
    // 1. SHANK SECTION (Cylinder + Chamfered Base)
    // -------------------------------------------------------------
    const shankGeo = new THREE.CylinderGeometry(
      shankRadius,
      shankRadius,
      shankLength,
      48,
      1,
      false
    );
    const shankMesh = new THREE.Mesh(shankGeo, materialsRef.current!.shank);
    shankMesh.position.y = (shankLength / 2) + neckLength + (cutLength / 2);
    shankMesh.castShadow = true;
    shankMesh.receiveShadow = true;
    group.add(shankMesh);

    // Shank chamfer ring at top
    const chamferGeo = new THREE.CylinderGeometry(
      shankRadius * 0.88,
      shankRadius,
      0.15,
      48
    );
    const chamferMesh = new THREE.Mesh(chamferGeo, materialsRef.current!.shank);
    chamferMesh.position.y = shankMesh.position.y + (shankLength / 2) + 0.075;
    group.add(chamferMesh);

    // Laser Etch Ring Metadata
    const etchCanvas = document.createElement('canvas');
    etchCanvas.width = 1024;
    etchCanvas.height = 128;
    const ctx = etchCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, 1024, 128);
      ctx.fillStyle = '#c0c5cc';
      ctx.font = 'bold 24px monospace';
      ctx.fillText('JIAN TOOLS // END-MILL Ø12.0x30x75 // 4F // NANO-COAT // h6', 30, 72);
    }
    const etchTexture = new THREE.CanvasTexture(etchCanvas);
    etchTexture.wrapS = THREE.RepeatWrapping;
    etchTexture.repeat.set(1, 1);

    const laserBandGeo = new THREE.CylinderGeometry(
      shankRadius + 0.002,
      shankRadius + 0.002,
      0.4,
      48
    );
    const laserBandMat = new THREE.MeshBasicMaterial({
      map: etchTexture,
      transparent: true,
      opacity: 0.95
    });
    const laserBandMesh = new THREE.Mesh(laserBandGeo, laserBandMat);
    laserBandMesh.position.y = shankMesh.position.y + 0.5;
    group.add(laserBandMesh);

    // -------------------------------------------------------------
    // 2. NECK TRANSITION SECTION (Tapered Cylinder)
    // -------------------------------------------------------------
    const neckGeo = new THREE.CylinderGeometry(
      shankRadius,
      shankRadius * 0.95,
      neckLength,
      48
    );
    const neckMesh = new THREE.Mesh(neckGeo, materialsRef.current!.shank);
    neckMesh.position.y = (cutLength / 2) + (neckLength / 2);
    group.add(neckMesh);

    // -------------------------------------------------------------
    // 3. FLUTED CUTTING BODY (High Precision Parametric 4-Flute Mesh)
    // -------------------------------------------------------------
    const radialSegments = 120;
    const heightSegments = 80;
    const numFlutes = 4;
    const helixTurns = 0.85; // ~38 degree helix over cut length

    const flutePositions: number[] = [];
    const fluteNormals: number[] = [];
    const fluteUvs: number[] = [];
    const fluteIndices: number[] = [];

    // Parametric vertex generation for 4-flute helical geometry
    for (let j = 0; j <= heightSegments; j++) {
      const v = j / heightSegments;
      const y = - (cutLength / 2) + (v * cutLength);
      const helixAngle = v * helixTurns * Math.PI * 2;

      for (let i = 0; i <= radialSegments; i++) {
        const u = i / radialSegments;
        const baseAngle = u * Math.PI * 2;
        const currentAngle = baseAngle + helixAngle;

        // 4-Flute modulated cross-section radius
        const flutePhase = (baseAngle * numFlutes) % (Math.PI * 2);
        
        // Asymmetric flute shape: sharp cutting land, relief drop, deep circular gullet
        let rMod: number;
        if (flutePhase < Math.PI * 0.3) {
          // Cutting edge & primary circular land
          const t = flutePhase / (Math.PI * 0.3);
          rMod = shankRadius * (1.0 - (t * 0.04));
        } else if (flutePhase < Math.PI * 0.85) {
          // Deep chip gullet curve plunging to core radius
          const t = (flutePhase - Math.PI * 0.3) / (Math.PI * 0.55);
          const sinus = Math.sin(t * Math.PI);
          rMod = (shankRadius * 0.96) - (sinus * (shankRadius - coreRadius) * 1.15);
        } else {
          // Rising flute face toward next tooth
          const t = (flutePhase - Math.PI * 0.85) / (Math.PI * 1.15);
          rMod = coreRadius + (t * (shankRadius - coreRadius));
        }

        // Clamp radius
        const finalRadius = Math.max(coreRadius * 0.9, Math.min(shankRadius, rMod));

        const x = Math.cos(currentAngle) * finalRadius;
        const z = Math.sin(currentAngle) * finalRadius;

        flutePositions.push(x, y, z);
        fluteUvs.push(u, v);

        // Normals
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
    // 4. CUTTING TIP (Center-Cutting 4-Tooth End Face + Gash)
    // -------------------------------------------------------------
    const tipSegments = 48;
    const tipPositions: number[] = [];
    const tipNormals: number[] = [];
    const tipIndices: number[] = [];

    // Center chisel point
    tipPositions.push(0, -(cutLength / 2) - 0.08, 0);
    tipNormals.push(0, -1, 0);

    for (let i = 0; i <= tipSegments; i++) {
      const angle = (i / tipSegments) * Math.PI * 2;
      const toothPhase = (angle * 4) % (Math.PI * 2);
      
      const dishY = -(cutLength / 2) + (Math.sin(toothPhase) * 0.03);
      const x = Math.cos(angle) * shankRadius;
      const z = Math.sin(angle) * shankRadius;

      tipPositions.push(x, dishY, z);
      tipNormals.push(0, -1, 0);
    }

    for (let i = 1; i <= tipSegments; i++) {
      tipIndices.push(0, i, i + 1);
    }

    const tipGeo = new THREE.BufferGeometry();
    tipGeo.setAttribute('position', new THREE.Float32BufferAttribute(tipPositions, 3));
    tipGeo.setAttribute('normal', new THREE.Float32BufferAttribute(tipNormals, 3));
    tipGeo.setIndex(tipIndices);
    tipGeo.computeVertexNormals();

    const tipMesh = new THREE.Mesh(tipGeo, materialsRef.current!.solid);
    group.add(tipMesh);

    // -------------------------------------------------------------
    // 5. WIREFRAME OVERLAY MESH
    // -------------------------------------------------------------
    const wireframeFlute = new THREE.Mesh(fluteGeo, materialsRef.current!.wireframe);
    wireframeFlute.visible = wireframe;
    wireframeFlute.name = 'wireframeOverlay';
    group.add(wireframeFlute);

    const wireframeShank = new THREE.Mesh(shankGeo, materialsRef.current!.wireframe);
    wireframeShank.position.copy(shankMesh.position);
    wireframeShank.visible = wireframe;
    wireframeShank.name = 'wireframeShank';
    group.add(wireframeShank);

    // Center model at origin
    group.position.y = 0.2;

    return group;
  }, [wireframe]);

  // Update Materials based on Coating Selection & Wireframe
  useEffect(() => {
    if (!materialsRef.current) return;

    const conf = coatingColors[coating];

    // Solid Cutting Body Material
    materialsRef.current.solid.color.setHex(conf.color);
    materialsRef.current.solid.roughness = conf.roughness;
    materialsRef.current.solid.metalness = conf.metalness;
    materialsRef.current.solid.needsUpdate = true;

    // Shank Material
    materialsRef.current.shank.color.setHex(conf.shankColor);
    materialsRef.current.shank.roughness = conf.roughness * 0.9;
    materialsRef.current.shank.metalness = conf.metalness;
    materialsRef.current.shank.needsUpdate = true;

    // Wireframe Visibility
    if (modelGroupRef.current) {
      const wireOverlay = modelGroupRef.current.getObjectByName('wireframeOverlay');
      const wireShank = modelGroupRef.current.getObjectByName('wireframeShank');
      if (wireOverlay) wireOverlay.visible = wireframe;
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

    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.5, targetZoomRef.current);
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
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    // Materials Creation
    const initialConf = coatingColors[coating];
    const solidMat = new THREE.MeshStandardMaterial({
      color: initialConf.color,
      roughness: initialConf.roughness,
      metalness: initialConf.metalness,
      envMapIntensity: 1.4
    });

    const shankMat = new THREE.MeshStandardMaterial({
      color: initialConf.shankColor,
      roughness: initialConf.roughness * 0.9,
      metalness: initialConf.metalness,
      envMapIntensity: 1.2
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });

    materialsRef.current = {
      solid: solidMat,
      shank: shankMat,
      wireframe: wireframeMat
    };

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Key Studio Light
    const keyLight = new THREE.DirectionalLight(0xf0f6ff, 3.2);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Rim Light (Highlighting helical flutes)
    const rimLight = new THREE.DirectionalLight(0x00e5ff, 2.4);
    rimLight.position.set(-6, -2, -5);
    scene.add(rimLight);

    // Warm Fill Light
    const fillLight = new THREE.DirectionalLight(0xffecd2, 1.6);
    fillLight.position.set(4, -5, 4);
    scene.add(fillLight);

    // Ground Bounce Light
    const groundLight = new THREE.DirectionalLight(0x384252, 1.2);
    groundLight.position.set(0, -8, 2);
    scene.add(groundLight);

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

  // Mouse & Touch Orbit Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    targetRotationRef.current.y += deltaX * 0.008;
    targetRotationRef.current.x += deltaY * 0.008;

    // Limit vertical pitch
    targetRotationRef.current.x = Math.max(-1.4, Math.min(1.4, targetRotationRef.current.x));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.003;
    targetZoomRef.current = Math.max(3.8, Math.min(8.5, targetZoomRef.current + zoomDelta));
  };

  // Preset Views Switcher
  const handleSetPreset = (preset: 'iso' | 'tip' | 'flutes' | 'shank') => {
    setViewPreset(preset);
    setActiveHotspot(null);
    if (preset === 'iso') {
      targetRotationRef.current = { x: 0.35, y: -0.6 };
      targetZoomRef.current = 6.2;
    } else if (preset === 'tip') {
      targetRotationRef.current = { x: 1.48, y: 0 };
      targetZoomRef.current = 4.8;
    } else if (preset === 'flutes') {
      targetRotationRef.current = { x: 0.15, y: -1.8 };
      targetZoomRef.current = 5.2;
    } else if (preset === 'shank') {
      targetRotationRef.current = { x: -0.85, y: -0.2 };
      targetZoomRef.current = 5.8;
    }
  };

  // Hotspot Click
  const handleHotspotClick = (spot: typeof hotspots[0]) => {
    setActiveHotspot(spot.id);
    targetRotationRef.current = { x: spot.target.x, y: spot.target.y };
    targetZoomRef.current = spot.target.zoom;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[460px] lg:min-h-[500px] rounded-2xl bg-[#0b0e12] border border-white/[0.12] overflow-hidden flex flex-col justify-between shadow-2xl select-none ${className}`}
    >
      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
      />

      {/* Top Header HUD */}
      <div className="relative z-10 p-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] bg-gradient-to-b from-[#080A0C]/90 to-transparent pointer-events-none">
        
        {/* Left Badge: Native SolidWorks CAD Reference */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-precision-blue animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-white uppercase">
            END MILLING.SLDPRT
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-precision-blue/20 text-precision-blue border border-precision-blue/30 font-medium">
            3D CAD
          </span>
        </div>

        {/* Right HUD: Coating Selector */}
        <div className="flex items-center space-x-1.5 pointer-events-auto">
          <button
            onClick={() => setCoating('carbide')}
            className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all border cursor-pointer ${
              coating === 'carbide'
                ? 'bg-white text-black font-bold border-white shadow-sm'
                : 'bg-white/[0.06] text-[#94A3B8] hover:text-white border-white/[0.08]'
            }`}
            title="Uncoated Solid Micrograin Carbide"
          >
            CARBIDE
          </button>

          <button
            onClick={() => setCoating('altin')}
            className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all border cursor-pointer ${
              coating === 'altin'
                ? 'bg-precision-blue text-white font-bold border-precision-blue shadow-sm'
                : 'bg-white/[0.06] text-[#94A3B8] hover:text-white border-white/[0.08]'
            }`}
            title="AlTiN Nano-Composite Coating"
          >
            AlTiN NANO
          </button>

          <button
            onClick={() => setCoating('tin')}
            className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all border cursor-pointer ${
              coating === 'tin'
                ? 'bg-amber-400 text-black font-bold border-amber-400 shadow-sm'
                : 'bg-white/[0.06] text-[#94A3B8] hover:text-white border-white/[0.08]'
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
          <div className="absolute top-16 right-4 max-w-xs bg-[#111417]/95 backdrop-blur-md border border-precision-blue/40 rounded-xl p-3.5 shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between text-[10px] font-mono text-precision-blue font-bold mb-1">
              <span>FEATURE // 0{activeHotspot}</span>
              <button 
                onClick={() => setActiveHotspot(null)}
                className="text-[#64748B] hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>
            <h4 className="text-xs font-bold text-white mb-1">
              {hotspots.find(h => h.id === activeHotspot)?.title}
            </h4>
            <p className="text-[11px] text-[#94A3B8] leading-relaxed">
              {hotspots.find(h => h.id === activeHotspot)?.description}
            </p>
          </div>
        )}
      </div>

      {/* Floating View Presets & Hotspot Navigation Bar */}
      <div className="relative z-10 px-4 py-2 flex items-center justify-between pointer-events-auto bg-[#080A0C]/50 backdrop-blur-sm">
        {/* View Presets */}
        <div className="flex items-center space-x-1">
          <span className="text-[9px] font-mono text-[#64748B] mr-1 uppercase">VIEW:</span>
          {(['iso', 'tip', 'flutes', 'shank'] as const).map((preset) => (
            <button
              key={preset}
              onClick={() => handleSetPreset(preset)}
              className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase transition-colors cursor-pointer ${
                viewPreset === preset && activeHotspot === null
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-[#94A3B8] hover:text-white bg-white/[0.04]'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Feature Hotspots Selector */}
        <div className="flex items-center space-x-1.5">
          <span className="text-[9px] font-mono text-[#64748B] mr-1 uppercase">SPECS:</span>
          {hotspots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => handleHotspotClick(spot)}
              className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-mono font-bold transition-all cursor-pointer ${
                activeHotspot === spot.id
                  ? 'bg-precision-blue text-white ring-2 ring-precision-blue/40'
                  : 'bg-white/[0.08] text-[#94A3B8] hover:text-white hover:bg-white/20'
              }`}
              title={spot.title}
            >
              {spot.id}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Engineering Status & Action Footer */}
      <div className="relative z-10 p-3 sm:p-4 border-t border-white/[0.08] bg-[#080A0C]/90 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        
        {/* Model Engineering Specifications */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2.5 text-[11px] font-mono text-white font-semibold">
            <span>Ø 12.0 mm</span>
            <span className="text-[#64748B]">•</span>
            <span>4-FLUTE HELIX</span>
            <span className="text-[#64748B]">•</span>
            <span className="text-precision-blue">38° HELIX</span>
          </div>
          <span className="text-[9px] font-mono text-[#64748B] mt-0.5">
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
                : 'bg-white/[0.05] text-[#94A3B8] hover:text-white border-white/[0.08]'
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
                ? 'bg-white/[0.12] text-white border-white/[0.2]'
                : 'bg-white/[0.05] text-[#64748B] border-white/[0.08]'
            }`}
            title="Toggle 360° Auto-Rotation"
          >
            <Rotate3d className="w-3.5 h-3.5" />
          </button>

          {/* Direct CAD Download */}
          <a
            href="/assets/cad/End-Milling.SLDPRT"
            download="End-Milling.SLDPRT"
            className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.14] text-white text-[10px] font-mono font-medium tracking-wider uppercase transition-colors border border-white/[0.12] cursor-pointer"
            title="Download SolidWorks Part File (1.85 MB)"
          >
            <Download className="w-3 h-3 text-precision-blue" />
            <span>DOWNLOAD .SLDPRT</span>
          </a>

          {/* Quote Button */}
          {onOpenEnquiry && (
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-[10px] font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-md"
            >
              <span>QUOTE</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
