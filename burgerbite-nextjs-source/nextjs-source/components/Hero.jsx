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
    camera.position.set(0, 0.4, 4.5);

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 8, 5);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    dirLight1.shadow.bias = -0.001;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffa500, 0.4); // Orange warm rim light
    dirLight2.position.set(-5, -2, -5);
    scene.add(dirLight2);

    // 3. Procedural Burger Construction
    const burgerGroup = new THREE.Group();
    scene.add(burgerGroup);

    // Common Material definitions for juicy/realistic textures
    const bunMaterial = new THREE.MeshStandardMaterial({
      color: 0xd28d43, // Golden brown
      roughness: 0.6,
      metalness: 0.1,
    });
    const pattyMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d2314, // Dark grilled brown
      roughness: 0.8,
      metalness: 0.15,
    });
    const cheeseMaterial = new THREE.MeshStandardMaterial({
      color: 0xffcc00, // Melted cheddar yellow
      roughness: 0.3,
      metalness: 0.05,
    });
    const lettuceMaterial = new THREE.MeshStandardMaterial({
      color: 0x559632, // Fresh green
      roughness: 0.8,
      metalness: 0.0,
    });
    const tomatoMaterial = new THREE.MeshStandardMaterial({
      color: 0xd9381e, // Tomato red
      roughness: 0.2,
      metalness: 0.05,
    });
    const seedMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5efe6, // Sesame cream
      roughness: 0.5,
    });

    // 3A. Top Bun Group
    const bunTopGroup = new THREE.Group();
    
    // Dome shape for top bun
    const bunTopGeo = new THREE.SphereGeometry(1.0, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const bunTopMesh = new THREE.Mesh(bunTopGeo, bunMaterial);
    bunTopMesh.scale.set(1.1, 0.6, 1.1); // Make it burger shaped
    bunTopMesh.castShadow = true;
    bunTopGroup.add(bunTopMesh);

    // Add sesame seeds to top bun
    const seedGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.06, 8);
    seedGeo.rotateX(Math.PI / 2);
    for (let i = 0; i < 40; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * (Math.PI / 3.5); // Focus on upper half
      const r = 1.0;
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) * 0.6; // adjust for scale y
      const z = r * Math.sin(phi) * Math.sin(theta);

      const seed = new THREE.Mesh(seedGeo, seedMaterial);
      seed.position.set(x * 1.05, y * 1.05, z * 1.05);
      
      // Orient seed to lie flat on the dome surface
      seed.lookAt(new THREE.Vector3(x * 2, y * 2, z * 2));
      seed.rotateZ(Math.random() * Math.PI); // random orientation
      bunTopGroup.add(seed);
    }
    burgerGroup.add(bunTopGroup);

    // 3B. Tomato Group (Two slices side-by-side)
    const tomatoGroup = new THREE.Group();
    const sliceGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.1, 24);
    sliceGeo.rotateX(Math.PI / 2);

    const slice1 = new THREE.Mesh(sliceGeo, tomatoMaterial);
    slice1.position.set(-0.35, 0, 0.1);
    slice1.rotation.set(0.1, 0.2, 0.4);
    slice1.castShadow = true;
    tomatoGroup.add(slice1);

    const slice2 = new THREE.Mesh(sliceGeo, tomatoMaterial);
    slice2.position.set(0.35, 0, -0.1);
    slice2.rotation.set(-0.15, -0.1, -0.2);
    slice2.castShadow = true;
    tomatoGroup.add(slice2);
    
    burgerGroup.add(tomatoGroup);

    // 3C. Cheese Group (Thin sheet rotated)
    const cheeseGroup = new THREE.Group();
    const cheeseGeo = new THREE.BoxGeometry(1.6, 0.04, 1.6);
    const cheeseMesh = new THREE.Mesh(cheeseGeo, cheeseMaterial);
    cheeseMesh.rotation.y = Math.PI / 6; // Angled corner drop
    cheeseMesh.castShadow = true;
    cheeseGroup.add(cheeseMesh);
    burgerGroup.add(cheeseGroup);

    // 3D. Patty Group
    const pattyGroup = new THREE.Group();
    const pattyGeo = new THREE.CylinderGeometry(0.98, 0.98, 0.22, 32);
    const pattyMesh = new THREE.Mesh(pattyGeo, pattyMaterial);
    pattyMesh.castShadow = true;
    pattyGroup.add(pattyMesh);
    burgerGroup.add(pattyGroup);

    // 3E. Lettuce Group (Wavy textured layer)
    const lettuceGroup = new THREE.Group();
    const lettuceGeo = new THREE.CylinderGeometry(1.05, 1.05, 0.07, 32);
    const lettuceMesh = new THREE.Mesh(lettuceGeo, lettuceMaterial);
    lettuceMesh.castShadow = true;
    lettuceGroup.add(lettuceMesh);
    burgerGroup.add(lettuceGroup);

    // 3F. Bottom Bun Group
    const bunBottomGroup = new THREE.Group();
    const bunBottomGeo = new THREE.CylinderGeometry(1.06, 1.06, 0.28, 32);
    const bunBottomMesh = new THREE.Mesh(bunBottomGeo, bunMaterial);
    bunBottomMesh.castShadow = true;
    bunBottomGroup.add(bunBottomMesh);
    burgerGroup.add(bunBottomGroup);

    // 4. Initial Stack Offsets (Assembled state positions)
    const basePositions = {
      bunTop: 0.45,
      tomato: 0.18,
      cheese: 0.06,
      patty: -0.12,
      lettuce: -0.32,
      bunBottom: -0.52,
    };

    // Set initial positions
    bunTopGroup.position.y = basePositions.bunTop;
    tomatoGroup.position.y = basePositions.tomato;
    cheeseGroup.position.y = basePositions.cheese;
    pattyGroup.position.y = basePositions.patty;
    lettuceGroup.position.y = basePositions.lettuce;
    bunBottomGroup.position.y = basePositions.bunBottom;

    // Center the whole burger group vertically in view
    burgerGroup.position.y = 0.05;

    // 5. Scroll Handler
    let scrollFraction = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 450; // The distance over which the full burst happens
      scrollFraction = Math.min(scrollY / maxScroll, 1.0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 6. Mouse Interaction (Subtle Tilt)
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. Window Resize Handler
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    window.addEventListener("resize", handleResize);

    // 8. Animation & Render Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto-rotation
      burgerGroup.rotation.y += 0.006;
      
      // Mouse follow lag (smoothing)
      burgerGroup.rotation.x += (mouseY * 0.6 - burgerGroup.rotation.x) * 0.05;
      burgerGroup.rotation.z += (-mouseX * 0.4 - burgerGroup.rotation.z) * 0.05;

      // Animate Vertical Burst based on Scroll Progress
      // Top layers move up, bottom layers move down
      bunTopGroup.position.y = basePositions.bunTop + scrollFraction * 2.2;
      tomatoGroup.position.y = basePositions.tomato + scrollFraction * 1.35;
      cheeseGroup.position.y = basePositions.cheese + scrollFraction * 0.65;
      pattyGroup.position.y = basePositions.patty - scrollFraction * 0.15;
      lettuceGroup.position.y = basePositions.lettuce - scrollFraction * 0.85;
      bunBottomGroup.position.y = basePositions.bunBottom - scrollFraction * 1.65;

      renderer.render(scene, camera);
    };
    animate();

    // 9. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Recursive disposal of Three.js assets to prevent WebGL memory leaks
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
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block focus:outline-none cursor-grab active:cursor-grabbing"
            style={{ minHeight: "320px" }}
          />
          <div className="absolute top-4 left-4 pointer-events-none bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
            <span className="text-[10px] uppercase tracking-widest text-[#F5EFE6]/50 font-display font-700">
              Interactive 3D — Scroll to Explode
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10 text-center max-w-2xl mx-auto"
        >
          <h1 className="font-display font-800 text-4xl sm:text-6xl leading-[1.05] tracking-tight">
            Craving a BurgerBite?
            <br />
            <span className="text-[#FF6B00]">Order Direct &amp; Save 10%.</span>
          </h1>
          <p className="mt-5 text-[#F5EFE6]/60 text-base sm:text-lg">
            Handmade burgers, rolls &amp; shawarma — straight from our grill to your door.
          </p>
          <button
            onClick={onExploreClick}
            className="mt-8 inline-flex items-center gap-2 bg-[#FF6B00] text-[#121212] font-display font-700 px-8 py-4 rounded-full text-base active:scale-95 hover:brightness-110 transition-all shadow-[0_8px_30px_rgba(255,107,0,0.35)]"
          >
            Explore Menu
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </button>
        </motion.div>
      </div>
      <div className="grill-divider" />
    </section>
  );
}
