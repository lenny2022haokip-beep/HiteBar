# Development Workflow & Deployment Guide — BurgerBite

This document provides a step-by-step workflow guide to set up the development environment, perform customization, verify changes, and deploy the BurgerBite direct ordering site to production.

---

## 1. Local Development Setup

To run the Next.js production codebase locally, follow these steps:

1. **Extract Source Files**
   The source files are located in `burgerbite-nextjs-source.zip` and have been extracted to the `burgerbite-nextjs-source/nextjs-source/` folder.

2. **Install Dependencies**
   Open a terminal, navigate to the source directory, and run `npm install`:
   ```bash
   cd "burgerbite-nextjs-source/nextjs-source"
   npm install
   ```

3. **Start the Development Server**
   Spin up the hot-reloading development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application live.

---

## 2. Configuration & Customization Checklist

Before deploying BurgerBite to production, you must complete the following configuration steps:

### A. Spline 3D Hero Asset
The header/hero graphic is set up to load a 3D spline asset inside an iframe:
- **File**: [`components/Hero.jsx`](file:///d:/Antigravity%20Files/Hitebar%28burger%20shop%29/burgerbite-nextjs-source/nextjs-source/components/Hero.jsx#L22-L28)
- **Action**: Export your 3D scene from [spline.design](https://spline.design) and replace the placeholder source URL `https://my.spline.design/PLACEHOLDER-SCENE/` with your production asset URL.

### B. Food Photography Asset Pipeline
By default, the menu cards display a sleek gradient-based placeholder with category text:
- **File**: [`components/MenuSection.jsx`](file:///d:/Antigravity%20Files/Hitebar%28burger%20shop%29/burgerbite-nextjs-source/nextjs-source/components/MenuSection.jsx#L87-L94)
- **Action**: 
  1. Save your food photography images inside the `/public/menu/` directory of the Next.js project.
  2. Verify that the file names match the image paths defined in [`lib/menuData.js`](file:///d:/Antigravity%20Files/Hitebar%28burger%20shop%29/burgerbite-nextjs-source/nextjs-source/lib/menuData.js) (e.g., `/menu/veg-burger.jpg`).
  3. In `MenuSection.jsx`, swap the `<PlaceholderArt />` block inside the card wrapper for an `<img />` tag:
     ```jsx
     <img 
       src={item.image} 
       alt={item.name} 
       className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
     />
     ```

### C. Store WhatsApp Configuration
Orders compiled from the cart are sent directly to the store's WhatsApp number:
- **File**: [`lib/menuData.js`](file:///d:/Antigravity%20Files/Hitebar%28burger%20shop%29/burgerbite-nextjs-source/nextjs-source/lib/menuData.js#L1-L2)
- **Action**: Update `STORE_WHATSAPP` with your store's WhatsApp number. Ensure you use the country code *without* the `+` sign or leading zeroes (e.g., `"919673483659"` for India). Also adjust the `DELIVERY_FEE` constant (default is `50`) if needed.

### D. Pricing Verification
A few Drinks & Desserts prices were extracted from laminates and flagged for double-checking:
- **File**: [`lib/menuData.js`](file:///d:/Antigravity%20Files/Hitebar%28burger%20shop%29/burgerbite-nextjs-source/nextjs-source/lib/menuData.js#L58-L65)
- **Action**: Check `verify: true` items (e.g., Cold Drink, Cold Blue, Mint Mojito) against the store POS. Correct their price values if necessary and remove the `verify: true` key-value pairs so the `"approx."` tag disappears from the menu cards.

---

## 3. Build & Verification Flow

Before deploying changes, always verify the production bundle compilation:

1. **Linting Check**
   Verify the codebase conforms to Next.js guidelines:
   ```bash
   npm run lint
   ```

2. **Production Compiling**
   Run the Next.js build script to make sure compilation succeeds without any errors:
   ```bash
   npm run build
   ```

---

## 4. Deployment Workflow

Since the site is a standard Next.js frontend with no database dependency, it is highly optimized for serverless edge hosting.

### Option A: Vercel (Recommended)
1. Commit the extracted source code to a GitHub/GitLab repository.
2. Log in to [Vercel](https://vercel.com).
3. Import the repository and select **Next.js** as the framework preset.
4. Click **Deploy**. Vercel will auto-build the site and provide a production domain.

### Option B: Self-Hosted / Node Server
1. Build the project:
   ```bash
   npm run build
   ```
2. Start the production Node server (binds to port 3000 by default):
   ```bash
   npm start
   ```
3. Set up a reverse proxy (like Nginx) to route traffic from your domain to `http://localhost:3000`.
