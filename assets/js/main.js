/* deepusoman.com — editorial UI behaviours
   Theme (light default), mobile nav, back-to-top, header rule on scroll,
   TOC highlight, code copy buttons, blog filters, footer year.
   Nothing decorative; light is the default, dark is the toggle. */
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var SVG = {
    menu: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square" aria-hidden="true"><line x1="2" y1="5.5" x2="18" y2="5.5"/><line x1="2" y1="10" x2="18" y2="10"/><line x1="2" y1="14.5" x2="18" y2="14.5"/></svg>',
    theme: '<svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M10 2.5 A7.5 7.5 0 0 1 10 17.5 Z" fill="currentColor"/></svg>',
    up: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square" aria-hidden="true"><line x1="10" y1="16" x2="10" y2="4"/><polyline points="5,9 10,4 15,9"/></svg>',
    check: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><polyline points="3,8.5 6.5,12 13,4"/></svg>'
  };

  /* Theme — light is the default; dark is opt-in and persisted ------- */
  var saved = null;
  try { saved = localStorage.getItem("ds-theme"); } catch (e) {}
  if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");
  else if (saved === "light") document.documentElement.setAttribute("data-theme", "light");

  function isDark() {
    var attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark") return true;
    if (attr === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function initThemeToggle() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      if (!btn.querySelector("svg")) btn.innerHTML = SVG.theme;
      function paint() {
        var dark = isDark();
        btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
        btn.setAttribute("data-theme-state", dark ? "dark" : "light");
      }
      paint();
      btn.addEventListener("click", function () {
        var next = isDark() ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try { localStorage.setItem("ds-theme", next); } catch (e) {}
        paint();
      });
    });
  }

  /* Mobile nav ------------------------------------------------------ */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && !toggle.querySelector("svg")) toggle.innerHTML = SVG.menu;
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", links.classList.contains("open"));
      });
    }
  }

  /* Header rule + back-to-top on scroll ----------------------------- */
  function initScrollChrome() {
    var header = document.querySelector(".site-header");
    var toTop = document.createElement("button");
    toTop.className = "to-top";
    toTop.setAttribute("aria-label", "Back to top");
    toTop.innerHTML = SVG.up;
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });
    document.body.appendChild(toTop);
    function onScroll() {
      if (header) header.classList.toggle("scrolled", window.scrollY > 8);
      toTop.classList.toggle("show", window.scrollY > 700);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* TOC highlight --------------------------------------------------- */
  function initToc() {
    var links = document.querySelectorAll(".toc a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (l) { map[l.getAttribute("href").slice(1)] = l; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("current"); });
          var l = map[en.target.id];
          if (l) l.classList.add("current");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.keys(map).forEach(function (id) {
      var h = document.getElementById(id);
      if (h) obs.observe(h);
    });
  }

  /* Copy buttons on code blocks ------------------------------------- */
  function initCopyButtons() {
    if (!navigator.clipboard) return;
    document.querySelectorAll(".article-body pre").forEach(function (pre) {
      var btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.type = "button";
      btn.textContent = "copy";
      btn.setAttribute("aria-label", "Copy code to clipboard");
      btn.addEventListener("click", function () {
        navigator.clipboard.writeText(pre.textContent.replace(/^copy\s*/, "")).then(function () {
          btn.innerHTML = "copied " + SVG.check;
          btn.classList.add("done");
          setTimeout(function () { btn.textContent = "copy"; btn.classList.remove("done"); }, 1600);
        });
      });
      pre.appendChild(btn);
    });
  }

  /* Blog filters + search ------------------------------------------- */
  function initFilters() {
    var chips = document.querySelectorAll(".chip[data-filter]");
    var cards = document.querySelectorAll("[data-post]");
    var search = document.getElementById("post-search");
    var empty = document.getElementById("no-results");
    if (!cards.length) return;
    var topic = "all", term = "";

    function apply() {
      var shown = 0;
      cards.forEach(function (c) {
        var okTopic = topic === "all" || (c.getAttribute("data-topics") || "").indexOf(topic) !== -1;
        var okTerm = !term || c.textContent.toLowerCase().indexOf(term) !== -1;
        var show = okTopic && okTerm;
        c.style.display = show ? "" : "none";
        if (show) shown++;
      });
      if (empty) empty.style.display = shown ? "none" : "block";
    }
    function activate(ch) {
      chips.forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
      ch.classList.add("active");
      ch.setAttribute("aria-pressed", "true");
      topic = ch.getAttribute("data-filter");
      apply();
    }
    chips.forEach(function (ch) {
      ch.setAttribute("aria-pressed", ch.classList.contains("active") ? "true" : "false");
      ch.addEventListener("click", function () { activate(ch); });
    });
    var m = /^#t-([a-z]+)/.exec(location.hash || "");
    if (m) {
      var target = null;
      chips.forEach(function (ch) { if (ch.getAttribute("data-filter") === m[1]) target = ch; });
      if (target) activate(target);
    }
    if (search) search.addEventListener("input", function () { term = search.value.trim().toLowerCase(); apply(); });
    apply();
  }

  /* Footer year ----------------------------------------------------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initNav();
    initScrollChrome();
    initToc();
    initCopyButtons();
    initFilters();
    initYear();
  });
})();
