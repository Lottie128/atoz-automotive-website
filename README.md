# A to Z Automotive Limited — Official Website

> **New Thinking · New Ideas · Endless Possibilities**

The official marketing website for **A to Z Automotive Limited**, a Lusaka-based
automotive company supplying OEM-approved spare parts, tyres, lubricants, vehicle
sales, suspension, cooling, auto glass, auto electrical and professional auto-body
repairs — for light & heavy-duty fleets across Zambia.

---

## ✨ Highlights

- **Multi-page, Vite-powered, fully responsive** site — Home · About · Services · Parts · Contact.
- **Ultra-light** — vanilla Vite, *no framework runtime*. Shared bundle is **~7.3 KB gzipped** (CSS + JS) and reused across every page.
- **Clean URLs** — `/about`, `/services`… in dev, preview and production (no `.html`, no redirects).
- **DRY** — shared header/footer/head injected at build time via a tiny zero-dependency HTML-partials plugin.
- **World-class UX** — animated hero + stat counters, scroll-reveal, scroll-progress bar, page-hero banners with breadcrumbs, sticky nav with active state, back-to-top, micro-interactions.
- **Optimised build** — minified + content-hashed CSS/JS, immutable CDN caching, small assets inlined.
- **SEO-ready** — per-page titles/meta/canonical/Open Graph, JSON-LD `AutoPartsStore` schema, `sitemap.xml`, `robots.txt`.
- **Accessible** — keyboard-friendly nav, ARIA labels, reduced-motion support.

## 🗂️ Structure

```
atoz/
├── index.html              # Home          ┐
├── about.html              # About         │ page entry points
├── services.html           # Services      │ (Vite multi-page)
├── parts.html              # Parts         │
├── contact.html            # Contact       ┘
├── partials/               # Shared markup injected at build time
│   ├── head-assets.html    #   fonts, favicon, <script> module
│   ├── header.html         #   top bar + sticky nav + scroll progress
│   └── footer.html         #   CTA band, footer, floating WhatsApp, back-to-top
├── src/
│   ├── main.js             # Imports CSS + all interactions
│   └── styles.css          # All styling (bundled & hashed by Vite)
├── public/                 # Copied verbatim to the site root
│   ├── img/                # Logo lockup & emblem (1-week cache)
│   ├── favicon.png · robots.txt · sitemap.xml
├── brand-source/           # Original source material (PDFs, brochure, business card)
├── vite.config.js          # Multi-page build + partials + clean-URL plugins
├── vercel.json             # Vercel preset + cache/security headers
└── package.json
```

## 🎨 Brand

| Token        | Value     |
|--------------|-----------|
| Red          | `#F50000` |
| Black        | `#000000` |
| Grey         | `#7D7B7B` |
| Off-white    | `#F7F7F7` |
| Heading font | Montserrat (Gilroy ExtraBold in print) |
| Body font    | Inter     |

## 🚀 Run locally (Bun)

```bash
bun install      # one-time
bun run dev      # dev server with hot reload → http://localhost:5173
bun run build    # production build → dist/
bun run preview  # serve the built dist/ locally to verify
```

## 🌐 Deploy to Vercel

The repo includes `vercel.json` (Bun install + Vite build), so Vercel needs no manual config.

**Option A — Dashboard (recommended):**
1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repo.
2. Vercel detects the **Vite** preset and the `bun.lock` lockfile:
   - Install command: `bun install`
   - Build command: `bun run build`
   - Output directory: `dist`
3. Click **Deploy**. Every push to `main` redeploys automatically.

**Option B — CLI:**
```bash
bun add -g vercel   # or: npm i -g vercel
vercel              # preview deployment
vercel --prod       # production deployment
```

### Custom domain
In the Vercel project: **Settings → Domains → Add `www.azautomotiveltd.com`**,
then add the DNS records Vercel shows you at your domain registrar. Update the
absolute `og:image` / canonical URLs in `index.html` if the final domain differs.

## 📞 Company details

- **Address:** Unit 5, D&D Shopping Centre, Makishi Road, Lusaka, Zambia
- **Phone / WhatsApp:** +260 966 310 037 · +260 973 664 240 · +260 770 800 847
- **Email:** sales@azautomotiveltd.com
- **Hours:** Mon–Sat 08:00–17:00 · Sun & public holidays closed
- **Social:** [Instagram](https://www.instagram.com/a2z_automotive_limited) · [Facebook](https://www.facebook.com/share/1GtxtCVeUp/) · [TikTok](https://vm.tiktok.com/ZS925K5E5cLdN-SmfIH/)
- **Reg. No.** 120230046202 (incorporated in Zambia, 2022/2023)

---

© A to Z Automotive Limited. Logo and brand assets are property of the company.
