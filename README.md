# EPOC — Brutalist Gen-Z E-Commerce Platform

> **Unapologetic raw energy with luxury minimalism.**  
> Built to reject sterile modern design. Every interaction features physical weight, multi-layer cascading shadows, and high-frequency tactile physics.

---

## ⚡ Quick Start

You can run the project locally with zero setup using any static file server:

### Option 1: Python (Built-in)
```bash
python3 -m http.server 3333
```
Then navigate to: **`http://localhost:3333/`**

### Option 2: Node.js / NPM
```bash
npm start
# or: npx serve . -p 3333
```

---

## 📂 Project Architecture

```
EPOC/
├── index.html            # Flagship Storefront (Hero, Lookbook, Drops Grid)
├── product.html          # Dynamic Artifact Detail View (?id=steel-chair, etc.)
├── cart.html             # Reserved Inventory Shopping Bag (Promos & Steppers)
├── checkout.html         # Multi-step Secure Transmission Checkout
├── confirmation.html     # Order Secured Transmission Receipt & Barcode
├── manifesto.html        # Brand Manifesto (Form, Force, Future Pillars)
│
├── css/
│   └── styles.css        # Brutalist Design Tokens, Cascading Shadows & Keyframes
│
├── js/
│   └── app.js           # Shared Cart (localStorage), Web Audio API FX, Slide-over Drawer
│
├── assets/               # High-Resolution Curated Photography & Logos
│   ├── logo.png
│   ├── hero-bg.jpg
│   ├── steel-chair.jpg
│   ├── brutalist-vase.jpg
│   ├── abstract-light.jpg
│   └── velvet-lounge.jpg
│
├── .superdesign/         # Superdesign CLI Project Sync & Components
│   ├── design-system.md  # Official Design System & Token Spec
│   ├── components/       # Petite-Vue Reusable Templates (NavigationBar, BrutalFooter)
│   └── resume.json       # Project Draft Context & Node Fingerprints
│
├── package.json          # Node scripts & project metadata
├── .gitignore            # Clean git configuration
└── README.md             # Documentation
```

---

## 🎨 Design System DNA

### 1. Color Palette
| Token | Hex | Role |
| :--- | :--- | :--- |
| **Primary Red** | `#DA3C2F` | Brand aggression, CTAs, urgent badges |
| **Cream** | `#F4E7DA` | Backgrounds, negative space, high-contrast borders |
| **Dark** | `#0f0f0f` | Text, structural slab borders, deep drop shadows |
| **Purple** | `#3a0c2e` | Subterranean depth, multi-layer cascading shadow layers |

### 2. Typography
- **Display Headlines**: `Tanker` (Bold geometric sans-serif for aggressive titles)
- **Body & Metadata**: `Satoshi` (Refined geometric sans-serif in weights 400, 700, 900)

### 3. Shadow System
- **`brutal`**: `16px 16px 0px 0px #0f0f0f`
- **`brutal-cream`**: `12px 12px 0px 0px #F4E7DA`
- **`brutal-red`**: `12px 12px 0px 0px #DA3C2F`
- **`cascading`**: `8px 8px 0px 0px #F4E7DA, 16px 16px 0px 0px #0f0f0f, 24px 24px 0px 0px #DA3C2F, 32px 32px 0px 0px #3a0c2e`

### 4. Motion & Interactivity
- **Violent Hover**: `scale(1.08) translate(-6px, -6px) rotate(2deg)` with amplified shadows.
- **Glitch Text**: Fast skew animation with dual RGB split text-shadows.
- **Breathe Animation**: 3-second gentle pulse with 1.05 scale and 75% opacity floor.
- **Marquee Ticker**: 10s linear continuous ticker.

---

## 🛠️ Key Technical Features

1. **Self-Contained & Zero Dependencies**: Built with modern Vanilla HTML5, CSS3, and JavaScript. No build step or heavy bundlers required.
2. **Persistent Cart Engine**: Cross-page shopping bag synchronized via `localStorage` with real-time badges, quantity steppers, and slide-over drawer.
3. **Dynamic URL Routing**: Product view (`product.html?id=...`) dynamically renders specifications, dimensions, materials, and photo galleries for each artifact.
4. **Synthesized Web Audio API Sound FX**: Built-in mechanical click and item addition tones synthesized entirely via browser oscillator nodes (no external `.mp3` files needed).
5. **Promo Verification Engine**: Validates discount tokens (`EPOC10`, `GENZ`, `EPOC`) with live price recalculation and shipping thresholds.
6. **Transmission Receipts**: Dynamic SVG barcode generation, unique transmission ID hashes, and print receipt capabilities.

---

## 📜 License
MIT License • Built by the EPOC Collective.
