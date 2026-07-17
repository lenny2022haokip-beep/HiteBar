"use client";

import { motion } from "framer-motion";
import Script from "next/script";

export default function Hero({ onExploreClick }) {
  return (
    <section className="relative overflow-hidden">
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        strategy="afterInteractive"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D]"
        >
          {/*
            Placeholder 3D asset: a generated stylized burger (/models/burgerbite-placeholder.glb).
            To swap in a real Spline scene instead, replace this <model-viewer> block with:
            <iframe src="https://my.spline.design/YOUR-SCENE-ID/" ... />
          */}
          {/* @ts-ignore -- model-viewer is a web component, not a typed React element */}
          <model-viewer
            src="/models/burgerbite-placeholder.glb"
            alt="A 3D model of a BurgerBite burger"
            auto-rotate
            camera-controls
            disable-zoom
            shadow-intensity="1"
            exposure="1.1"
            style={{ width: "100%", height: "100%", "--poster-color": "transparent" }}
          />
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
