"use client";

import { motion } from "framer-motion";

export default function Header({ itemCount, onCartClick, onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 bg-[#121212]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <span className="font-display font-800 text-xl tracking-tight">
          Burger<span className="text-[#FF6B00]">Bite</span>
        </span>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#F5EFE6]/70">
          <button onClick={onMenuClick} className="hover:text-[#FF6B00] transition-colors">
            Menu
          </button>
          <a href="#why-direct" className="hover:text-[#FF6B00] transition-colors">
            Why Order Direct
          </a>
        </nav>

        <button
          onClick={onCartClick}
          aria-label="Open cart"
          className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#1E1E1E] hover:bg-[#2A2A2A] active:scale-95 transition-all border border-white/10"
        >
          <CartIcon />
          {itemCount > 0 && (
            <motion.span
              key={itemCount}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-[#FF6B00] text-[#121212] text-xs font-bold flex items-center justify-center"
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5EFE6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
