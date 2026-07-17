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
