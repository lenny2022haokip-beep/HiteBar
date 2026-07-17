"use client";

import { motion } from "framer-motion";

export default function Header({ itemCount, onCartClick, onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-md border-b-2 border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <span className="font-display font-800 text-xl tracking-widest uppercase text-[#F5EFE6]">
          Burger<span className="text-[#FF6B00]">Bite</span>
        </span>

        <nav className="hidden md:flex items-center gap-8 text-xs font-display font-700 tracking-widest">
          <button onClick={onMenuClick} className="hover:text-[#FF6B00] transition-colors uppercase cursor-pointer">
            Menu
          </button>
          <a href="#why-direct" className="hover:text-[#FF6B00] transition-colors uppercase">
            Why Order Direct
          </a>
        </nav>

        <button
          onClick={onCartClick}
          aria-label="Open cart"
          className="relative flex items-center justify-center w-11 h-11 rounded-none bg-transparent hover:bg-white/5 active:scale-95 transition-all border-2 border-white/20 hover:border-[#FF6B00]"
        >
          <CartIcon />
          {itemCount > 0 && (
            <motion.span
              key={itemCount}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-none bg-[#FF6B00] text-[#121212] text-[10px] font-display font-800 flex items-center justify-center border border-[#121212]"
            >
              {itemCount}
            </motion.span>
          )}
        </button>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5EFE6" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
      <rect x="1" y="1" width="1" height="1" style={{ display: 'none' }} />
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
