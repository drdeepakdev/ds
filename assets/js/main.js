/* deepusoman.com — UI behaviours: theme, nav, progress, TOC, filters,
   scroll reveals, copy buttons, back-to-top */
(function () {
  /* Theme ---------------------------------------------------------- */
  var saved = null;
  try { saved = localStorage.getItem("ds-theme"); } catch (e) {}
  if (saved === "light") document.documentElement.setAttribute("data-theme", "light");

  function initThemeToggle() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      function paint() {
        var light = document.documentElement.getAttribute("data-theme") === "light";
        btn.textContent = light ? "☾" : "☀";
        btn.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
      }
      paint();
      btn.addEventListener("click", function () {
        var light = document.documentElement.getAttribute("data-theme") === "light";
        if (light) document.documentElement.removeAttribute("data-theme");
        else document.documentElement.setAttribute("data-theme", "light");
        try { localStorage.setItem("ds-theme", light ? "dark" : "light"); } catch (e) {}
        paint();
      });
    });
  }

  /* Mobile nav ------------------------------------------------------ */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", links.classList.contains("open"));
      });
    }
  }

  /* Header shadow + back-to-top on scroll ---------------------------- */
  function initScrollChrome() {
    var header = document.querySelector(".site-header");
    var toTop = document.createElement("button");
    toTop.className = "to-top";
    toTop.setAttribute("aria-label", "Back to top");
    toTop.textContent = "↑";
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    document.body.appendChild(toTop);
    function onScroll() {
      if (header) header.classList.toggle("scrolled", window.scrollY > 8);
      toTop.classList.toggle("show", window.scrollY > 700);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Reading progress (articles) ------------------------------------- */
  function initProgress() {
    var bar = document.getElementById("progress");
    var body = document.querySelector(".article-body");
    if (!bar || !body) return;
    window.addEventListener("scroll", function () {
      var rect = body.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var done = Math.min(Math.max(-rect.top, 0), total);
      bar.style.width = (total > 0 ? (done / total) * 100 : 0) + "%";
    }, { passive: true });
  }

  /* TOC highlight ---------------------------------------------------- */
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

  /* Copy buttons on code blocks --------------------------------------- */
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
          btn.textContent = "copied ✓";
          btn.classList.add("done");
          setTimeout(function () { btn.textContent = "copy"; btn.classList.remove("done"); }, 1600);
        });
      });
      pre.appendChild(btn);
    });
  }

  /* Scroll reveals ----------------------------------------------------- */
  function initReveals() {
    var candidates = document.querySelectorAll(
      ".post-card, .topic-tile, .res-card, .tl-item, .newsletter, .contact-list .item, .cert-card"
    );
    if (!candidates.length || !("IntersectionObserver" in window)) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    candidates.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min((i % 6) * 60, 300) + "ms";
      obs.observe(el);
    });
  }

  /* Blog filters + search -------------------------------------------- */
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
    chips.forEach(function (ch) {
      ch.addEventListener("click", function () {
        chips.forEach(function (x) { x.classList.remove("active"); });
        ch.classList.add("active");
        topic = ch.getAttribute("data-filter");
        apply();
      });
    });
    if (search) search.addEventListener("input", function () { term = search.value.trim().toLowerCase(); apply(); });
  }

  /* Footer year ------------------------------------------------------ */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initNav();
    initScrollChrome();
    initProgress();
    initToc();
    initCopyButtons();
    initReveals();
    initFilters();
    initYear();
  });
})();
