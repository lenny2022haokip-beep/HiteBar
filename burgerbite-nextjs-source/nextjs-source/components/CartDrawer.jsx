"use client";

import { motion, AnimatePresence } from "framer-motion";
import { formatINR } from "@/lib/menuData";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  updateQty,
  subtotal,
  total,
  customer,
  setCustomer,
  errors,
  onSubmit,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#161616] z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-white/5">
              <h2 className="font-display font-800 text-lg">Your Order</h2>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5EFE6" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cartItems.length === 0 ? (
                <p className="text-sm text-[#F5EFE6]/40 text-center mt-10">
                  Your cart is empty — add something tasty from the menu.
                </p>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 bg-[#1E1E1E] rounded-xl p-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-display font-700 truncate">{item.name}</p>
                        <p className="text-xs text-[#F5EFE6]/40 mt-0.5">₹{formatINR(item.price)} each</p>
                      </div>
                      <div className="flex items-center gap-2 bg-[#121212] rounded-full px-1 py-1 border border-white/10 shrink-0">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#FF6B00] hover:bg-white/5 active:scale-90"
                        >
                          −
                        </button>
                        <span className="text-sm font-display font-700 w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#FF6B00] hover:bg-white/5 active:scale-90"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-display font-700 w-16 text-right shrink-0">
                        ₹{formatINR(item.qty * item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Delivery details */}
              <div className="mt-6 space-y-3">
                <h3 className="font-display font-700 text-sm text-[#F5EFE6]/70">Delivery Details</h3>
                <div>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={customer.name}
                    onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                    className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-[#F5EFE6]/30 focus:outline-none focus:border-[#FF6B00]"
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={customer.phone}
                    onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                    className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-[#F5EFE6]/30 focus:outline-none focus:border-[#FF6B00]"
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <textarea
                    placeholder="Full delivery address"
                    rows={3}
                    value={customer.address}
                    onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
                    className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-[#F5EFE6]/30 focus:outline-none focus:border-[#FF6B00] resize-none"
                  />
                  {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
                </div>
                {errors.cart && <p className="text-xs text-red-400">{errors.cart}</p>}
              </div>
            </div>

            {/* Summary + CTA */}
            <div className="border-t border-white/5 px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm text-[#F5EFE6]/60">
                <span>Subtotal</span>
                <span>₹{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#F5EFE6]/60">
                <span>Delivery Fee</span>
                <span>₹{formatINR(cartItems.length > 0 ? 50 : 0)}</span>
              </div>
              <div className="flex justify-between font-display font-800 text-base pt-1">
                <span>Total</span>
                <span className="text-[#FF6B00]">₹{formatINR(total)}</span>
              </div>
              <button
                onClick={onSubmit}
                className="w-full mt-3 bg-[#25D366] text-[#0B1A0F] font-display font-800 py-4 rounded-full flex items-center justify-center gap-2 active:scale-95 hover:brightness-105 transition-all"
              >
                <WhatsAppIcon />
                Confirm Order via WhatsApp
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-1.5-.7-2.5-1.3-3.5-3-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-1 1-1 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3.1 4.9 4.3 2.2.9 2.7.7 3.2.7.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.4-.3z" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.1c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 14.9 3.5 13.5 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8.5-8.5 8.5z" />
    </svg>
  );
}
