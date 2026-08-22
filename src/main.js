/* =========================================================
   A to Z Automotive Limited — Interactions
   ========================================================= */
import "./styles.css";

(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Mobile nav toggle ---- */
  const toggle = $("#navToggle");
  const nav = $("#nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$(".nav__link, .nav__cta", nav).forEach((link) =>
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---- Active nav link by current path (multi-page) ---- */
  const path = location.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  const current = path === "" ? "/" : path.replace(/\/$/, "") || "/";
  $$(".nav__link").forEach((link) => {
    const target = (link.getAttribute("data-nav") || "").replace(/\/$/, "") || "/";
    if (target === current) link.classList.add("active");
  });

  /* ---- Header shadow + scroll progress ---- */
  const header = $("#header");
  const progress = $("#scrollProgress");
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
    const top = $("#toTop");
    if (top) top.classList.toggle("show", y > 600);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Back to top ---- */
  const toTop = $("#toTop");
  if (toTop) {
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })
    );
  }

  /* ---- Reveal on scroll (with stagger) ---- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && reveals.length && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            e.target.style.transitionDelay = Math.min(i * 60, 240) + "ms";
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---- Count-up stats ---- */
  const counters = $$("[data-count]");
  if (counters.length && "IntersectionObserver" in window && !prefersReduced) {
    const animate = (el) => {
      const end = parseFloat(el.getAttribute("data-count")) || 0;
      const suffix = el.getAttribute("data-suffix") || "";
      const dur = 1100;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cio.observe(el));
  }

  /* ---- Quote form -> WhatsApp ---- */
  const form = $("#quoteForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = (id) => (($(id) || {}).value || "").trim();
      const lines = [
        "Hello A to Z Automotive,",
        "",
        `My name is ${val("#name") || "(not given)"}.`,
        `I'm interested in: ${val("#need")}.`,
        val("#message") ? `Details: ${val("#message")}` : "",
        val("#phone") ? `You can reach me on: ${val("#phone")}` : "",
      ].filter(Boolean);
      window.open(
        "https://wa.me/260966310037?text=" + encodeURIComponent(lines.join("\n")),
        "_blank",
        "noopener"
      );
    });
  }

  /* ---- Footer year ---- */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();

  
  /* ---- Robust Real-time Part Search ---- */
  const partsDB = [{"name": "LandcruiserJ79 Brake shoes (new)", "price": 2250.0}, {"name": "LandcruiserJ79 Brake shoes (old)", "price": 1500.0}, {"name": "Landcruiser J79 Brake pads", "price": 1050.0}, {"name": "Engine Brake fluid Dot 4 500mls", "price": 228.0}, {"name": "Corolla AE 110 Brake pads", "price": 525.0}, {"name": "Corolla AE 110 Tie rod ends", "price": 262.5}, {"name": "Corolla AE 110  Ball Joints", "price": 337.5}, {"name": "Corolla AE 110 Brake Shoes", "price": 600.0}, {"name": "Auris 1NZ front break pads", "price": 825.0}, {"name": "Auris 1NZ rear brake pads", "price": 750.0}, {"name": "Allion 1NZ Front brake pads", "price": 675.0}, {"name": "Allion 1NZ brake Shoes", "price": 900.0}, {"name": "Landcruiser J79 Brake pads", "price": 1050.0}, {"name": "Landcruiser J79 Brake shoes", "price": 1500.0}, {"name": "Landcruiser 2015 brake shoes", "price": 2250.0}, {"name": "Landcruiser 2015 brake pads", "price": 1050.0}, {"name": "Corolla C V Joints", "price": 900.0}, {"name": "Corolla 1NR Clutch Plate", "price": 1500.0}, {"name": "Corolla 1NR Thrust bearing", "price": 1200.0}, {"name": "Corolla 1NR Pressure Plate", "price": 2700.0}, {"name": "Corolla 1NZ Ball Joints", "price": 450.0}, {"name": "Landcriuser 79 front Disc", "price": 2350.0}, {"name": "Landcruiser Air filter", "price": 4000.0}, {"name": "Landcruiser Fuel filter", "price": 350.0}, {"name": "Landcruiser Oil filter", "price": 250.0}, {"name": "Landcruiser brake pads", "price": 1500.0}, {"name": "Landcruiser brake shoes", "price": 2250.0}, {"name": "Hilux 1kD clutch kits", "price": 5500.0}, {"name": "Ball joints Auris", "price": 385.0}, {"name": "Tie rod ends Auris", "price": 420.0}, {"name": "Rack ends Auris", "price": 420.0}, {"name": "front  shocks Auris", "price": 1610.0}, {"name": "Rear shocks Auris", "price": 1050.0}, {"name": "Brake pads Auris", "price": 600.0}, {"name": "Stabilizer link Auris", "price": 420.0}, {"name": "Wheel bearing VVTI", "price": 2025.0}, {"name": "Wheel Drums VVTI", "price": 1275.0}, {"name": "Spinder bearing  VVTI", "price": 450.0}, {"name": "Ball joints Spacio", "price": 300.0}, {"name": "Tie rod ends Spacio", "price": 300.0}, {"name": "Rack ends  Spacio", "price": 300.0}, {"name": "Front  shocks Spacio", "price": 1120.0}, {"name": "Rear shocks Spacio", "price": 945.0}, {"name": "Radiator cap Spacio", "price": 250.0}, {"name": "Brake pads Spacio", "price": 250.0}, {"name": "Brake shoes Spacio", "price": 250.0}, {"name": "Landcruiser Slave master Cylinder", "price": 950.0}, {"name": "Landcruisser Suival bearing", "price": 550.0}, {"name": "Landcruiser Steering dumper", "price": 2800.0}, {"name": "Landcruiser Outer bearing", "price": 850.0}, {"name": "Landcruiser Brake discs", "price": 3000.0}, {"name": "Landcruiser Clutch master Cylinder", "price": 1200.0}, {"name": "Landcruiser Brake pads", "price": 375.0}, {"name": "Hiace oil filter", "price": 250.0}, {"name": "Hiace fuel filter", "price": 350.0}, {"name": "Spindle landcruiser76 series", "price": 3000.0}, {"name": "Hilux GD6 Brake pads", "price": 1500.0}, {"name": "Landcruiser 79series air filter", "price": 500.0}, {"name": "Landcruiser 79 series Fuel Filter", "price": 350.0}, {"name": "Landcruiser 79 series Oil filter", "price": 250.0}, {"name": "Mitsubishi Triton front shocks", "price": 3300.0}, {"name": "Mistubishi Triton Rear Shocks", "price": 1350.0}, {"name": "Mistubishi Triton Tie rod ends", "price": 750.0}, {"name": "Mistubishi Upper arm bushes", "price": 450.0}, {"name": "Mistubishi lower Arm bushes", "price": 600.0}, {"name": "Mistubishi front brake pads", "price": 975.0}, {"name": "Mistubishi Rear brake pads", "price": 675.0}, {"name": "Hiace  Aircon filter", "price": 450.0}, {"name": "Hiace Air filter", "price": 500.0}]
;
  const searchInput = $("#partSearchInput");
  const searchForm = $("#partSearchForm");
  const searchResults = $("#searchResults");
  
  if (searchInput && searchForm && searchResults) {
    const renderResults = (query) => {
      const q = query.toLowerCase().trim();
      if (!q) {
        searchResults.style.display = "none";
        // Reset generic cards
        $$(".part-card").forEach(card => {
          card.style.display = "";
          $$("li", card).forEach(li => li.style.display = "");
        });
        return;
      }
      
      searchResults.style.display = "block";
      
      // 1. Filter generic cards (same as before)
      $$(".part-card").forEach(card => {
        let cardHasVisibleItem = false;
        const titleText = (card.querySelector("h2")?.textContent || "").toLowerCase();
        $$("li", card).forEach(li => {
          const itemText = li.textContent.toLowerCase();
          const matches = itemText.includes(q) || titleText.includes(q);
          li.style.display = matches ? "" : "none";
          if (matches) cardHasVisibleItem = true;
        });
        card.style.display = cardHasVisibleItem ? "" : "none";
      });
      
      // 2. Search specific parts from DB
      const dbMatches = partsDB.filter(p => p.name.toLowerCase().includes(q));
      
      let html = '<h4 style="margin-bottom: 12px; font-size: 1.05rem; color: var(--ink);">Specific Parts Found</h4>';
      if (dbMatches.length > 0) {
        html += '<ul class="part-list" style="padding: 0!important;">';
        dbMatches.forEach(p => {
          const waMsg = `Hi A to Z Automotive, I'm inquiring about: ${p.name}`;
          const waUrl = `https://wa.me/260966310037?text=${encodeURIComponent(waMsg)}`;
          html += `
            <li>
              <div class="part-item">
                <span class="part-name">${p.name}</span>
                <div class="part-action">
                  <span class="part-price">K${p.price.toFixed(2)}</span>
                  <a href="${waUrl}" target="_blank" rel="noopener" class="part-btn part-btn--text">Inquire</a>
                </div>
              </div>
            </li>
          `;
        });
        html += '</ul>';
      } else {
        const waMsg = `Hi A to Z Automotive, do you have: ${query}?`;
        const waUrl = `https://wa.me/260966310037?text=${encodeURIComponent(waMsg)}`;
        html += `
          <div style="padding: 16px; background: #fff8f8; border: 1px dashed var(--red); border-radius: 8px; text-align: center;">
            <p style="color: var(--ink); margin-bottom: 8px;">We couldn't find an exact match for "<b>${query}</b>" in our quick list.</p>
            <p style="color: var(--muted); font-size: .9rem; margin-bottom: 14px;">We have thousands of parts in stock. Check with our team instantly!</p>
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn--primary btn--sm">Check Availability on WhatsApp</a>
          </div>
        `;
      }
      
      searchResults.innerHTML = html;
    };

    searchInput.addEventListener("input", (e) => renderResults(e.target.value));
    
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      renderResults(searchInput.value);
      // Optional: scroll to results if on mobile
      searchResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
