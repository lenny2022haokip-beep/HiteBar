"use client";

export default function Hero({ onExploreClick }) {
  return (
    <section 
      className="relative overflow-hidden w-full min-h-[90vh] flex items-center justify-center border-b-2 border-white/10 bg-[#0A0A0A] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('/burger_bite.jpg')",
        backgroundAttachment: "fixed" // Smooth parallax scroll effect
      }}
    >
      {/* Hero content overlaid on top of the fullscreen background image */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="bg-black/60 backdrop-blur-[4px] p-8 sm:p-12 inline-block border border-white/10 max-w-2xl">
          <h1 className="font-display font-800 text-5xl sm:text-7xl leading-[1.05] tracking-tighter uppercase text-[#F5EFE6] select-none">
            Craving a BurgerBite?
            <br />
            <span className="text-[#FF6B00]">Order Direct &amp; Save 10%.</span>
          </h1>
          <p className="mt-6 text-[#F5EFE6]/90 text-base sm:text-xl max-w-xl mx-auto font-medium select-none font-sans">
            Handmade burgers, rolls &amp; shawarma — straight from our grill to your door.
          </p>
          <div>
            <button
              onClick={onExploreClick}
              className="mt-8 inline-flex items-center gap-2 bg-[#FF6B00] text-[#121212] font-display font-800 tracking-wider uppercase px-8 py-4 rounded-none border-2 border-[#FF6B00] hover:bg-transparent hover:text-[#FF6B00] active:scale-95 hover:brightness-110 transition-all cursor-pointer shadow-[0_8px_30px_rgba(255,107,0,0.25)]"
            >
              Explore Menu
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
