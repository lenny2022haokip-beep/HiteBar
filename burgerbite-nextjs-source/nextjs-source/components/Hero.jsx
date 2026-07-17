"use client";

export default function Hero({ onExploreClick }) {
  return (
    <section className="relative overflow-hidden w-full min-h-[92vh] flex items-center justify-center border-b-2 border-white/10 bg-[#0A0A0A]">
      {/* Background: Video with image poster for instant clear display */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero_burger.jpg"
          className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.15] saturate-[1.1]"
        >
          <source src="/burger_video.mp4" type="video/mp4" />
          {/* Fallback image if video fails */}
          <img
            src="/hero_burger.jpg"
            alt="Juicy gourmet burger"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Multi-layer vignette for depth and text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10" />
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>

      {/* Overlaid content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="inline-block select-none">
          {/* Tagline */}
          <span className="text-xs font-display font-800 tracking-[0.25em] uppercase text-[#FF6B00] mb-4 block animate-pulse">
            Hot &amp; Fresh from the Grill
          </span>
          {/* Main Title */}
          <h1 className="font-display font-800 text-5xl sm:text-8xl leading-[0.95] tracking-tighter uppercase text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            THE BEST BURGER
            <br />
            <span className="text-[#FF6B00]">IN TOWN.</span>
          </h1>
          {/* Refined Description */}
          <p className="text-sm sm:text-lg max-w-2xl mx-auto font-display font-700 tracking-wider text-[#F5EFE6] leading-relaxed uppercase opacity-95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            NO FRANCHISE FEES. NO COMMISSIONS. JUST HOT, JUICY, UNCOMPROMISING BEEF DELIVERED DIRECTLY TO YOUR DOOR.
          </p>
          {/* Action button */}
          <div className="mt-10">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-3 bg-[#FF6B00] text-[#121212] font-display font-800 tracking-widest uppercase px-10 py-5 rounded-none border-2 border-[#FF6B00] hover:bg-transparent hover:text-[#FF6B00] active:scale-95 hover:brightness-110 transition-all cursor-pointer shadow-[0_12px_40px_rgba(255,107,0,0.4)]"
            >
              Order Direct &amp; Save 10%
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
