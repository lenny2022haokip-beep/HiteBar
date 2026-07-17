# BurgerBite — Direct Ordering Site

## Two things in this folder

1. **preview.html** — open this directly in any browser (or click it in the
   chat) for a fully working, click-through version of the entire site:
   category tabs, add-to-cart, quantity steppers, the slide-out cart drawer,
   the delivery form with validation, and the "Confirm Order via WhatsApp"
   button that builds the exact formatted message and opens wa.me with your
   number pre-filled. No install needed.

2. **burgerbite-nextjs-source.zip** — the real production codebase: a
   modular Next.js 13+ (App Router) + Tailwind + Framer Motion project,
   split into `lib/menuData.js` (all 54 items) and `components/` (Header,
   Hero, WhyOrderDirect, MenuSection, CartDrawer, Footer) plus `app/page.jsx`
   tying it together. This is what you'd actually deploy.

## Running the Next.js version
1. Unzip `burgerbite-nextjs-source.zip`
2. `cd nextjs-source && npm install`
3. `npm run dev` → open http://localhost:3000

## Things to plug in before launch
- **Spline 3D asset**: The hero has a placeholder iframe pointing at
  `https://my.spline.design/PLACEHOLDER-SCENE/`. Replace with your real
  exported scene URL from spline.design.
- **Food photography**: Cards currently show branded placeholder art
  (gradient tile + item name) instead of photos, since none were provided.
  In `components/MenuSection.jsx`, swap the `<PlaceholderArt />` block for
  `<img src={item.image} ... />` once real photos are in `public/menu/`.
- **WhatsApp number**: Set to +91 9673483659 (`STORE_WHATSAPP` constant in
  `lib/menuData.js`). Update if needed.
- **Prices marked "approx."**: A handful of Drinks & Desserts prices sat on
  a section of the photographed menu board where two laminate panels
  overlapped — flagged with `verify: true` in `lib/menuData.js`. Double
  check against your till/POS and remove the flag once confirmed.

## What's included
- Full `menuData` array (54 items across Burgers, Rolls & Shawarma,
  Sides & Fries, Drinks & Desserts) extracted from your menu photos
- Sticky header with live cart badge
- Hero with Spline placeholder + smooth-scroll "Explore Menu" CTA
- "Why Order Direct" trust section
- Category-tabbed menu grid with add/quantity controls and hover/tap
  micro-interactions
- Slide-out cart drawer with quantity editing, live subtotal/delivery
  fee/total, and a validated delivery details form
- "Confirm Order via WhatsApp" button that builds the exact formatted
  order message and opens wa.me with it pre-filled
