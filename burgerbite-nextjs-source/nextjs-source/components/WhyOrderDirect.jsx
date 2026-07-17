"use client";

import { motion } from "framer-motion";

const points = [
  {
    title: "Save 10% instantly",
    body: "No app markup. Ordering direct means the discount goes straight to you, not a delivery platform.",
  },
  {
    title: "Arrives hotter",
    body: "Your order goes straight from our kitchen to the rider — no extra pickup queue at a dark store.",
  },
  {
    title: "Supports our kitchen",
    body: "Third-party apps take a big cut per order. Ordering direct keeps more in the business that makes your food.",
  },
];

export default function WhyOrderDirect() {
  return (
    <section id="why-direct" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t-2 border-white/5">
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-display font-800 tracking-widest uppercase text-[#FF6B00] mb-3">
          Why order direct
        </span>
        <h2 className="font-display font-800 text-2xl sm:text-4xl uppercase tracking-tight">
          Skip the app. Get more for less.
        </h2>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-[#161616] border-2 border-white/5 hover:border-white/20 p-6 rounded-none transition-colors duration-300"
          >
            <h3 className="font-display font-800 text-base uppercase tracking-wider text-[#F5EFE6] mb-3">{p.title}</h3>
            <p className="text-sm text-[#F5EFE6]/60 leading-relaxed font-sans">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
