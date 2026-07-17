"use client";

/* ─────────────────────────────────────────────────────
   HiteBar Hero — Gen-Z Edition
   Font: Bebas Neue (hero title) + Space Grotesk (body)
   Vibes: fire gradient text, floating badge, marquee
          ticker, glassmorphism pill, neon CTA
───────────────────────────────────────────────────── */

const TICKER_ITEMS = [
  "🔥 FRESH OFF THE GRILL",
  "🍔 ORDER DIRECT. NO HIDDEN FEES",
  "⚡ SAVE 10% EVERY ORDER",
  "🌶️ LIMITED TIME SPECIALS",
  "🚀 HOT & DELIVERED FAST",
  "💯 100% REAL INGREDIENTS",
  "🔥 FRESH OFF THE GRILL",
  "🍔 ORDER DIRECT. NO HIDDEN FEES",
  "⚡ SAVE 10% EVERY ORDER",
  "🌶️ LIMITED TIME SPECIALS",
  "🚀 HOT & DELIVERED FAST",
  "💯 100% REAL INGREDIENTS",
];

export default function Hero({ onExploreClick }) {
  return (
    <section className="relative overflow-hidden w-full min-h-[100svh] flex flex-col bg-[#080808]">

      {/* ── Background Video + Image Poster ───────────── */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none noise-overlay">
        <video
          autoPlay muted loop playsInline
          poster="/hero_burger.jpg"
          className="w-full h-full object-cover brightness-[0.45] contrast-[1.2] saturate-[1.15]"
        >
          <source src="/burger_video.mp4" type="video/mp4" />
          <img src="/hero_burger.jpg" alt="Gourmet burger" className="w-full h-full object-cover" />
        </video>

        {/* Gradient overlays — bottom heavy so burger shows up top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-10" />

        {/* Subtle neon bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#ff6b00]/10 to-transparent z-10" />
      </div>

      {/* ── Floating Sticker Badge (top-right) ────────── */}
      <div className="absolute top-24 right-6 sm:right-10 z-30 badge-float select-none">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          {/* Spinning ring text */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full sticker-spin opacity-90">
            <defs>
              <path id="circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text className="fill-[#FF6B00]" fontSize="10" fontFamily="Space Grotesk, sans-serif" fontWeight="700" letterSpacing="2">
              <textPath href="#circle">🔥 ORDER NOW • SAVE 10% • </textPath>
            </text>
          </svg>
          {/* Center emoji */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl">🍔</span>
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────── */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-28 pb-4">

        {/* Gen-Z pill tag */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 sm:mb-8">
          <span className="relative flex h-2 w-2 pulse-ring">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b00] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b00]" />
          </span>
          <span className="text-[11px] font-sans font-700 tracking-[0.2em] uppercase text-[#F5EFE6]/80">
            Now Delivering Near You
          </span>
        </div>

        {/* ── HERO TITLE — Bebas Neue ───────────────── */}
        <h1 className="font-hero leading-[0.88] tracking-[0.03em] select-none mb-4">
          {/* Line 1 — outlined stroke text */}
          <span
            className="block text-[clamp(4.5rem,14vw,11rem)] text-transparent"
            style={{ WebkitTextStroke: "2px #FF6B00" }}
          >
            THE BEST
          </span>
          {/* Line 2 — gradient fire fill */}
          <span className="block text-[clamp(5rem,16vw,13rem)] text-gradient-fire drop-shadow-[0_0_60px_rgba(255,107,0,0.5)]">
            BURGER
          </span>
          {/* Line 3 — white */}
          <span className="block text-[clamp(3.5rem,11vw,9rem)] text-white/95 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            IN TOWN.
          </span>
        </h1>

        {/* Description */}
        <p className="font-sans text-sm sm:text-base max-w-xl text-[#F5EFE6]/65 leading-relaxed mb-8 sm:mb-10 font-500">
          No franchise fees. No commissions. Just hot, juicy, uncompromising flavour — delivered straight to your door.
        </p>

        {/* ── CTA Group ────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Primary CTA — shimmer gradient */}
          <button
            onClick={onExploreClick}
            className="shimmer-btn relative text-[#0a0a0a] font-sans font-700 tracking-widest uppercase text-sm px-9 py-4 rounded-none neon-box active:scale-95 transition-transform cursor-pointer"
          >
            🍔 Order Direct &amp; Save 10%
          </button>

          {/* Secondary CTA — glass */}
          <button
            onClick={onExploreClick}
            className="glass text-[#F5EFE6]/80 font-sans font-600 tracking-wider uppercase text-xs px-7 py-4 rounded-none hover:bg-white/10 active:scale-95 transition-all cursor-pointer border border-white/10"
          >
            View Menu →
          </button>
        </div>

        {/* ── Glass stat pills ──────────────────────── */}
        <div className="flex items-center gap-3 sm:gap-5 mt-10 sm:mt-12 flex-wrap justify-center">
          {[
            { icon: "⚡", stat: "30 min", label: "Avg delivery" },
            { icon: "💯", stat: "100%", label: "Fresh ingredients" },
            { icon: "💸", stat: "10%", label: "Direct savings" },
          ].map(({ icon, stat, label }) => (
            <div key={label} className="glass-dark rounded-none px-4 py-3 flex items-center gap-3 min-w-[130px]">
              <span className="text-xl">{icon}</span>
              <div className="text-left">
                <div className="font-hero text-xl text-[#FF6B00] leading-none">{stat}</div>
                <div className="font-sans text-[10px] text-[#F5EFE6]/50 uppercase tracking-widest mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Marquee Ticker Strip ──────────────────────── */}
      <div className="relative z-20 border-t border-b border-[#FF6B00]/30 bg-black/60 backdrop-blur-sm overflow-hidden py-3 mt-6">
        <div className="flex marquee-track gap-0">
          {TICKER_ITEMS.map((item, i) => (
            <span
              key={i}
              className="font-hero text-sm sm:text-base text-[#FF6B00] px-8 whitespace-nowrap shrink-0"
            >
              {item}
              <span className="mx-6 text-[#FF6B00]/30">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
