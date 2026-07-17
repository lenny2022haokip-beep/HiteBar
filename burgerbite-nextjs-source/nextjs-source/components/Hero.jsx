"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

export default function Hero({ onExploreClick }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      45,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(5, 8, 5);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    dirLight1.shadow.bias = -0.001;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffa500, 0.5); // Orange warm rim light
    dirLight2.position.set(-5, -2, -5);
    scene.add(dirLight2);

    // 3. Procedural Burger Construction
    const burgerGroup = new THREE.Group();
    burgerGroup.scale.set(1.4, 1.4, 1.4); // Scale up to fill the full hero section
    scene.add(burgerGroup);

    // Material definitions for detailed food textures
    const bunMaterial = new THREE.MeshStandardMaterial({
      color: 0xd28d43, // Golden brown
      roughness: 0.55,
      metalness: 0.05,
    });
    const pattyMaterial = new THREE.MeshStandardMaterial({
      color: 0x381f12, // Dark grilled brown
      roughness: 0.85,
      metalness: 0.1,
    });
    const cheeseMaterial = new THREE.MeshStandardMaterial({
      color: 0xffb300, // Melted cheddar yellow
      roughness: 0.35,
      metalness: 0.02,
    });
    const lettuceMaterial = new THREE.MeshStandardMaterial({
      color: 0x4d8a29, // Fresh green
      roughness: 0.75,
    });
    const tomatoMaterial = new THREE.MeshStandardMaterial({
      color: 0xd62810, // Tomato red
      roughness: 0.25,
      metalness: 0.05,
    });
    const onionMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a1b52, // Red onion purple/magenta
      roughness: 0.3,
      metalness: 0.05,
    });
    const pickleMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d4f21, // Dark pickle green
      roughness: 0.5,
    });
    const seedMaterial = new THREE.MeshStandardMaterial({
      color: 0xf2ebd9, // Sesame cream
      roughness: 0.5,
    });

    // 3A. Top Bun Group
    const bunTopGroup = new THREE.Group();
    const bunTopGeo = new THREE.SphereGeometry(1.0, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const bunTopMesh = new THREE.Mesh(bunTopGeo, bunMaterial);
    bunTopMesh.scale.set(1.1, 0.6, 1.1);
    bunTopMesh.castShadow = true;
    bunTopGroup.add(bunTopMesh);

    // Sesame seeds
    const seedGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.06, 8);
    seedGeo.rotateX(Math.PI / 2);
    for (let i = 0; i < 45; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * (Math.PI / 3.5);
      const r = 1.0;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) * 0.6;
      const z = r * Math.sin(phi) * Math.sin(theta);

      const seed = new THREE.Mesh(seedGeo, seedMaterial);
      seed.position.set(x * 1.04, y * 1.04, z * 1.04);
      seed.lookAt(new THREE.Vector3(x * 2, y * 2, z * 2));
      seed.rotateZ(Math.random() * Math.PI);
      bunTopGroup.add(seed);
    }
    burgerGroup.add(bunTopGroup);

    // 3B. Cheese Group (Draped sheet)
    const cheeseGroup = new THREE.Group();
    const cheeseGeo = new THREE.BoxGeometry(1.65, 0.04, 1.65);
    const cheeseMesh = new THREE.Mesh(cheeseGeo, cheeseMaterial);
    cheeseMesh.rotation.y = Math.PI / 6;
    cheeseMesh.castShadow = true;
    cheeseGroup.add(cheeseMesh);
    burgerGroup.add(cheeseGroup);

    // 3C. Patty Group
    const pattyGroup = new THREE.Group();
    const pattyGeo = new THREE.CylinderGeometry(0.98, 0.98, 0.24, 32);
    const pattyMesh = new THREE.Mesh(pattyGeo, pattyMaterial);
    pattyMesh.castShadow = true;
    pattyGroup.add(pattyMesh);
    burgerGroup.add(pattyGroup);

    // 3D. Red Onion Group (Two rings)
    const onionGroup = new THREE.Group();
    const onionGeo = new THREE.TorusGeometry(0.65, 0.07, 8, 32);
    onionGeo.rotateX(Math.PI / 2);
    
    const ring1 = new THREE.Mesh(onionGeo, onionMaterial);
    ring1.position.set(-0.25, 0, 0.25);
    ring1.rotation.set(0.1, -0.05, 0.2);
    ring1.castShadow = true;
    onionGroup.add(ring1);

    const ring2 = new THREE.Mesh(onionGeo, onionMaterial);
    ring2.position.set(0.25, 0, -0.25);
    ring2.rotation.set(-0.15, 0.1, -0.3);
    ring2.castShadow = true;
    onionGroup.add(ring2);
    burgerGroup.add(onionGroup);

    // 3E. Tomato Group (Two discs)
    const tomatoGroup = new THREE.Group();
    const sliceGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.1, 24);
    sliceGeo.rotateX(Math.PI / 2);

    const tomato1 = new THREE.Mesh(sliceGeo, tomatoMaterial);
    tomato1.position.set(-0.35, 0, 0.1);
    tomato1.rotation.set(0.1, 0.2, 0.4);
    tomato1.castShadow = true;
    tomatoGroup.add(tomato1);

    const tomato2 = new THREE.Mesh(sliceGeo, tomatoMaterial);
    tomato2.position.set(0.35, 0, -0.1);
    tomato2.rotation.set(-0.15, -0.1, -0.2);
    tomato2.castShadow = true;
    tomatoGroup.add(tomato2);
    burgerGroup.add(tomatoGroup);

    // 3F. Pickles Group (Two small olive-green discs)
    const pickleGroup = new THREE.Group();
    const pickleGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.05, 16);
    pickleGeo.rotateX(Math.PI / 2);

    const pickle1 = new THREE.Mesh(pickleGeo, pickleMaterial);
    pickle1.position.set(-0.2, 0, -0.35);
    pickle1.rotation.set(0.08, 0.1, 0.5);
    pickle1.castShadow = true;
    pickleGroup.add(pickle1);

    const pickle2 = new THREE.Mesh(pickleGeo, pickleMaterial);
    pickle2.position.set(0.2, 0, 0.35);
    pickle2.rotation.set(-0.05, -0.1, -0.4);
    pickle2.castShadow = true;
    pickleGroup.add(pickle2);
    burgerGroup.add(pickleGroup);

    // 3G. Lettuce Group (Wavy textured layer)
    const lettuceGroup = new THREE.Group();
    const lettuceGeo = new THREE.CylinderGeometry(1.06, 1.06, 0.07, 32);
    const lettuceMesh = new THREE.Mesh(lettuceGeo, lettuceMaterial);
    lettuceMesh.castShadow = true;
    lettuceGroup.add(lettuceMesh);
    burgerGroup.add(lettuceGroup);

    // 3H. Bottom Bun Group
    const bunBottomGroup = new THREE.Group();
    const bunBottomGeo = new THREE.CylinderGeometry(1.06, 1.06, 0.28, 32);
    const bunBottomMesh = new THREE.Mesh(bunBottomGeo, bunMaterial);
    bunBottomMesh.castShadow = true;
    bunBottomGroup.add(bunBottomMesh);
    burgerGroup.add(bunBottomGroup);

    // 4. Detailed Stack Offsets (Assembled state positions)
    const basePositions = {
      bunTop: 0.55,
      cheese: 0.26,
      patty: 0.12,
      onion: -0.04,
      tomato: -0.20,
      pickle: -0.34,
      lettuce: -0.44,
      bunBottom: -0.62,
    };

    // Set initial positions
    bunTopGroup.position.y = basePositions.bunTop;
    cheeseGroup.position.y = basePositions.cheese;
    pattyGroup.position.y = basePositions.patty;
    onionGroup.position.y = basePositions.onion;
    tomatoGroup.position.y = basePositions.tomato;
    pickleGroup.position.y = basePositions.pickle;
    lettuceGroup.position.y = basePositions.lettuce;
    bunBottomGroup.position.y = basePositions.bunBottom;

    // Center the whole burger group vertically in view
    burgerGroup.position.y = 0.05;

    // 5. Steam/Smoke Particle System (Floating from patty)
    const steamParticles = [];
    const steamGeo = new THREE.SphereGeometry(0.06, 8, 8);
    
    // We'll create 12 floating steam puffs
    for (let i = 0; i < 12; i++) {
      const steamMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.0,
      });
      const puff = new THREE.Mesh(steamGeo, steamMat);
      
      // Initialize position
      puff.position.x = (Math.random() - 0.5) * 1.2;
      puff.position.y = basePositions.patty + (Math.random() * 1.5);
      puff.position.z = (Math.random() - 0.5) * 1.2;
      
      // Scale variation
      const s = Math.random() * 0.8 + 0.6;
      puff.scale.set(s, s, s);
      
      scene.add(puff);
      steamParticles.push({
        mesh: puff,
        mat: steamMat,
        speedY: Math.random() * 0.006 + 0.004,
        speedX: (Math.random() - 0.5) * 0.002,
        life: Math.random(),
      });
    }

    // 6. Scroll Handler
    let scrollFraction = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 600; // Increased to cover a larger portion of the page scroll
      scrollFraction = Math.min(scrollY / maxScroll, 1.0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 7. Mouse Interaction (Subtle Tilt)
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 8. Window Resize Handler
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    window.addEventListener("resize", handleResize);

    // 9. Animation & Render Loop
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto-rotation
      burgerGroup.rotation.y += 0.004;
      
      // Mouse follow lag (smoothing)
      burgerGroup.rotation.x += (mouseY * 0.5 - burgerGroup.rotation.x) * 0.05;
      burgerGroup.rotation.z += (-mouseX * 0.3 - burgerGroup.rotation.z) * 0.05;

      // Animate Vertical Burst based on Scroll Progress
      // Top layers move up, bottom layers move down to span across the screen
      bunTopGroup.position.y = basePositions.bunTop + scrollFraction * 2.8;
      cheeseGroup.position.y = basePositions.cheese + scrollFraction * 1.8;
      pattyGroup.position.y = basePositions.patty + scrollFraction * 1.0;
      onionGroup.position.y = basePositions.onion + scrollFraction * 0.2;
      tomatoGroup.position.y = basePositions.tomato - scrollFraction * 0.6;
      pickleGroup.position.y = basePositions.pickle - scrollFraction * 1.3;
      lettuceGroup.position.y = basePositions.lettuce - scrollFraction * 2.0;
      bunBottomGroup.position.y = basePositions.bunBottom - scrollFraction * 2.8;

      // Animate Steam particles
      steamParticles.forEach((p) => {
        p.life += 0.005;
        if (p.life >= 1.0) {
          // Reset particle to starting position on top of the patty
          p.mesh.position.x = (Math.random() - 0.5) * 1.0 * burgerGroup.scale.x;
          p.mesh.position.y = (basePositions.patty + scrollFraction * 1.0) * burgerGroup.scale.y;
          p.mesh.position.z = (Math.random() - 0.5) * 1.0 * burgerGroup.scale.x;
          p.life = 0;
          const s = Math.random() * 0.8 + 0.6;
          p.mesh.scale.set(s, s, s);
        } else {
          // Rise and disperse
          p.mesh.position.y += p.speedY;
          p.mesh.position.x += p.speedX;
          p.mesh.scale.x += 0.008;
          p.mesh.scale.y += 0.008;
          p.mesh.scale.z += 0.008;
          
          // Fade in then fade out opacity curve
          if (p.life < 0.2) {
            p.mat.opacity = (p.life / 0.2) * 0.12;
          } else {
            p.mat.opacity = (1.0 - (p.life - 0.2) / 0.8) * 0.12;
          }
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // 10. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Recursive disposal
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative overflow-hidden w-full min-h-[85vh] flex items-center justify-center border-b-2 border-white/10 bg-[#0A0A0A]">
      {/* 3D WebGL Canvas spanning the full background with no borders */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full block focus:outline-none"
        />
      </div>

      {/* Hero content overlaid on top of the borderless WebGL canvas */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center pointer-events-none">
        <div className="bg-black/40 backdrop-blur-[3px] p-8 sm:p-12 inline-block border border-white/5">
          <h1 className="font-display font-800 text-5xl sm:text-7xl leading-[1.05] tracking-tighter uppercase text-[#F5EFE6] select-none">
            Craving a BurgerBite?
            <br />
            <span className="text-[#FF6B00]">Order Direct &amp; Save 10%.</span>
          </h1>
          <p className="mt-6 text-[#F5EFE6]/80 text-base sm:text-xl max-w-xl mx-auto font-medium select-none font-sans">
            Handmade burgers, rolls &amp; shawarma — straight from our grill to your door.
          </p>
          <div className="pointer-events-auto">
            <button
              onClick={onExploreClick}
              className="mt-8 inline-flex items-center gap-2 bg-[#FF6B00] text-[#121212] font-display font-800 tracking-wider uppercase px-8 py-4 rounded-none border-2 border-[#FF6B00] hover:bg-transparent hover:text-[#FF6B00] active:scale-95 hover:brightness-110 transition-all cursor-pointer shadow-[0_8px_30px_rgba(255,107,0,0.2)]"
            >
              Explore Menu
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating UI description label */}
      <div className="absolute bottom-4 left-4 pointer-events-none bg-black/60 border border-white/20 px-3 py-1.5 rounded-none z-10">
        <span className="text-[10px] uppercase tracking-widest text-[#F5EFE6]/60 font-display font-800">
          Interactive 3D — Scroll to Explode
        </span>
      </div>
    </section>
  );
}
