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
