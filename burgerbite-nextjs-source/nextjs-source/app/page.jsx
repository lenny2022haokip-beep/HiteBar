"use client";

import { useState, useMemo, useRef } from "react";
import { menuData, categories, STORE_WHATSAPP, DELIVERY_FEE, formatINR } from "@/lib/menuData";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyOrderDirect from "@/components/WhyOrderDirect";
import MenuSection from "@/components/MenuSection";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

/* ------------------------------------------------------------------ */
/*  BurgerBite — Direct Ordering Page                                  */
/*  Menu data extracted from the physical "Hitebar" menu boards.       */
/*  NOTE: The photographed boards had two overlapping laminate panels  */
/*  in places (Drinks/Dessert column), so those few prices are best-   */
/*  effort estimates — flagged with `verify: true` in lib/menuData.js. */
/* ------------------------------------------------------------------ */

export default function BurgerBitePage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [cart, setCart] = useState({}); // { itemId: qty }
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const menuRef = useRef(null);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => ({ ...menuData.find((m) => m.id === id), qty }));
  }, [cart]);

  const itemCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.qty * i.price, 0);
  const total = cartItems.length > 0 ? subtotal + DELIVERY_FEE : 0;

  function updateQty(id, delta) {
    setCart((prev) => {
      const next = { ...prev };
      const newQty = (next[id] || 0) + delta;
      if (newQty <= 0) {
        delete next[id];
      } else {
        next[id] = newQty;
      }
      return next;
    });
  }

  function scrollToMenu() {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function validate() {
    const e = {};
    if (!customer.name.trim()) e.name = "Enter your name";
    if (!customer.phone.trim() || customer.phone.trim().length < 8) e.phone = "Enter a valid phone number";
    if (!customer.address.trim()) e.address = "Enter your delivery address";
    if (cartItems.length === 0) e.cart = "Your cart is empty";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function sendOrderToWhatsApp() {
    if (!validate()) return;

    const itemLines = cartItems
      .map((i) => `- ${i.qty}x ${i.name} (₹${formatINR(i.qty * i.price)})`)
      .join("\n");

    const message = `🍔 *NEW BURGERBITE DIRECT ORDER!* 🍦
----------------------------------
*Customer:* ${customer.name}
*Phone:* ${customer.phone}
*Delivery Address:* ${customer.address}

*Order Items:*
${itemLines}

----------------------------------
*Subtotal:* ₹${formatINR(subtotal)}
*Delivery Fee:* ₹${DELIVERY_FEE}
*Total Amount:* ₹${formatINR(total)}
----------------------------------
⚡ *Please confirm this order and share the payment link!*`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${STORE_WHATSAPP}?text=${encoded}`, "_blank");
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5EFE6] font-sans antialiased">
      <Header itemCount={itemCount} onCartClick={() => setIsCartOpen(true)} onMenuClick={scrollToMenu} />
      <Hero onExploreClick={scrollToMenu} />
      
      {/* Cinematic Burger Showcase Section */}
      <section className="relative overflow-hidden bg-[#080808]">
        {/* Full-width hero image */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[420px] max-h-[680px] overflow-hidden">
          <img
            src="/showcase_burger.jpg"
            alt="Gourmet smash burger with fries on rustic wooden board"
            className="w-full h-full object-cover object-[center_60%] scale-105 hover:scale-100 transition-transform duration-[2000ms] ease-out"
          />
          {/* Dark gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />

          {/* Overlaid text content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-6xl mx-auto w-full px-6 sm:px-10">
              <div className="max-w-lg">
                <span className="block text-[10px] sm:text-xs font-display font-800 tracking-[0.3em] uppercase text-[#FF6B00] mb-3 sm:mb-4">
                  Crafted to perfection
                </span>
                <h2 className="font-display font-800 text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.9] text-white mb-4 sm:mb-6">
                  FLAME-GRILLED.<br />
                  <span className="text-[#FF6B00]">PURE FLAVOR.</span>
                </h2>
                <p className="text-sm sm:text-base text-[#F5EFE6]/75 leading-relaxed font-sans max-w-sm mb-6 sm:mb-8">
                  Hand-pressed patties, signature spice rub, grilled to order. No shortcuts — because you don&apos;t compromise on taste.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-[2px] bg-[#FF6B00]" />
                  <span className="text-[10px] font-display font-800 tracking-[0.25em] uppercase text-[#FF6B00]/80">
                    Order Direct. Save 10%.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="border-t-2 border-white/10 bg-[#0d0d0d]">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-3 divide-x-2 divide-white/10">
              {[
                { number: "100%", label: "Fresh Beef" },
                { number: "10%", label: "Direct Savings" },
                { number: "30min", label: "Avg. Delivery" },
              ].map(({ number, label }) => (
                <div key={label} className="py-6 sm:py-8 px-4 sm:px-8 text-center">
                  <div className="font-display font-800 text-2xl sm:text-4xl text-[#FF6B00] tracking-tighter uppercase">{number}</div>
                  <div className="text-[10px] sm:text-xs font-display font-800 tracking-[0.2em] uppercase text-[#F5EFE6]/50 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WhyOrderDirect />
      <div ref={menuRef}>
        <MenuSection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          cart={cart}
          updateQty={updateQty}
        />
      </div>
      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQty={updateQty}
        subtotal={subtotal}
        total={total}
        customer={customer}
        setCustomer={setCustomer}
        errors={errors}
        onSubmit={sendOrderToWhatsApp}
      />
    </div>
  );
}
