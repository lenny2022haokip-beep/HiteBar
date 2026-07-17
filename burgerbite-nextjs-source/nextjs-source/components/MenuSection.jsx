"use client";

import { motion, AnimatePresence } from "framer-motion";
import { menuData, categories, formatINR } from "@/lib/menuData";

export default function MenuSection({ activeCategory, setActiveCategory, cart, updateQty }) {
  const items = menuData.filter((m) => m.category === activeCategory);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 scroll-mt-16 border-t-2 border-white/5">
      <h2 className="font-display font-800 text-2xl sm:text-4xl mb-8 text-center uppercase tracking-tighter">Our Menu</h2>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative whitespace-nowrap px-5 py-3 rounded-none text-xs font-display font-800 tracking-wider uppercase border-2 transition-all ${
              activeCategory === cat
                ? "bg-[#FF6B00] text-[#121212] border-[#FF6B00]"
                : "bg-transparent text-[#F5EFE6]/60 border-white/10 hover:border-white hover:text-[#F5EFE6]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Item grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} qty={cart[item.id] || 0} updateQty={updateQty} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

const CATEGORY_ACCENTS = {
  Burgers: "#FF6B00",
  "Rolls & Shawarma": "#E07A3F",
  "Sides & Fries": "#C68C3C",
  "Drinks & Desserts": "#789682",
};

function PlaceholderArt({ name, category }) {
  const accent = CATEGORY_ACCENTS[category] || "#FF6B00";
  return (
    <div
      className="w-full h-full relative flex items-end p-5"
      style={{
        background: `linear-gradient(155deg, #1A1A1A 0%, #141414 55%, ${accent}15 100%)`,
      }}
    >
      <div
        className="absolute -top-6 -right-6 w-24 h-24 opacity-35"
        style={{ border: `3px solid ${accent}` }}
      />
      <span
        className="absolute top-4 left-4 text-[9px] font-display font-800 tracking-widest uppercase"
        style={{ color: accent }}
      >
        {category}
      </span>
      <span className="font-display font-800 text-base leading-snug uppercase tracking-wide text-[#F5EFE6]/90 relative z-10">
        {name}
      </span>
    </div>
  );
}

function MenuCard({ item, qty, updateQty }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.2 }}
      className="bg-[#161616] border-2 border-white/5 hover:border-white/20 rounded-none overflow-hidden flex flex-col transition-colors duration-300"
    >
      <div className="aspect-[4/3] bg-[#0D0D0D] overflow-hidden">
        <PlaceholderArt name={item.name} category={item.category} />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-800 text-base leading-snug uppercase tracking-wide">{item.name}</h3>
        <p className="text-xs text-[#F5EFE6]/50 mt-2 leading-relaxed flex-1 font-sans">{item.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-display font-800 text-[#FF6B00] text-lg">
            ₹{formatINR(item.price)}
            {item.verify && <span className="ml-1 text-[9px] text-[#F5EFE6]/30 font-sans font-normal lowercase tracking-normal">approx.</span>}
          </span>

          {qty === 0 ? (
            <button
              onClick={() => updateQty(item.id, 1)}
              className="px-5 py-2 rounded-none border-2 border-[#FF6B00] bg-transparent text-[#FF6B00] text-xs font-display font-800 tracking-wider uppercase active:scale-95 hover:bg-[#FF6B00] hover:text-[#121212] transition-colors cursor-pointer"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-[#121212] rounded-none px-1.5 py-1 border-2 border-white/10 shrink-0">
              <button
                onClick={() => updateQty(item.id, -1)}
                aria-label={`Remove one ${item.name}`}
                className="w-7 h-7 rounded-none flex items-center justify-center text-[#FF6B00] hover:bg-white/5 active:scale-90 transition-all font-display font-800"
              >
                −
              </button>
              <span className="text-sm font-display font-800 w-4 text-center">{qty}</span>
              <button
                onClick={() => updateQty(item.id, 1)}
                aria-label={`Add one more ${item.name}`}
                className="w-7 h-7 rounded-none flex items-center justify-center text-[#FF6B00] hover:bg-white/5 active:scale-90 transition-all font-display font-800"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
