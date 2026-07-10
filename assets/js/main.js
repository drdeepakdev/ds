/* deepusoman.com — THE CALIBRATED LEDGER
   UI behaviours: theme, nav, scroll chrome, TOC, copy buttons, filters,
   footer year, the Credential Rule instrument, and the article margin gauge.
   Motion contract: nothing moves unless a reading changed. */
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* SVG icon set — drawn engravings, currentColor, 1.25px stroke ---- */
  var SVG = {
    menu: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square" aria-hidden="true"><line x1="2" y1="5.5" x2="18" y2="5.5"/><line x1="2" y1="10" x2="18" y2="10"/><line x1="2" y1="14.5" x2="18" y2="14.5"/></svg>',
    theme: '<svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M10 2.5 A7.5 7.5 0 0 1 10 17.5 Z" fill="currentColor"/></svg>',
    up: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square" aria-hidden="true"><line x1="10" y1="16" x2="10" y2="4"/><polyline points="5,9 10,4 15,9"/></svg>',
    check: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><polyline points="3,8.5 6.5,12 13,4"/></svg>'
  };

  /* Theme ---------------------------------------------------------- */
  var saved = null;
  try { saved = localStorage.getItem("ds-theme"); } catch (e) {}
  if (saved === "light") document.documentElement.setAttribute("data-theme", "light");

  function initThemeToggle() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      // Draw the half-shaded-circle glyph once (survives theme flips; CSS mirrors it).
      if (!btn.querySelector("svg")) btn.innerHTML = SVG.theme;
      function paint() {
        var light = document.documentElement.getAttribute("data-theme") === "light";
        btn.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
        btn.setAttribute("data-theme-state", light ? "light" : "dark");
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
          btn.innerHTML = "copied " + SVG.check;
          btn.classList.add("done");
          setTimeout(function () { btn.textContent = "copy"; btn.classList.remove("done"); }, 1600);
        });
      });
      pre.appendChild(btn);
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
    var counts = document.querySelectorAll("[data-group-count]");

    function apply() {
      var shown = 0;
      cards.forEach(function (c) {
        var okTopic = topic === "all" || (c.getAttribute("data-topics") || "").indexOf(topic) !== -1;
        var okTerm = !term || c.textContent.toLowerCase().indexOf(term) !== -1;
        var show = okTopic && okTerm;
        c.style.display = show ? "" : "none";
        if (show) shown++;
      });
      // Re-tally the double-ruled domain-group counts; folios keep their gaps.
      counts.forEach(function (badge) {
        var grp = badge.getAttribute("data-group-count");
        var n = 0;
        cards.forEach(function (c) {
          if (c.getAttribute("data-group") !== grp) return;
          if (c.style.display === "none") return;
          n++;
        });
        var head = badge.closest(".register-group-head");
        if (head) head.style.display = n ? "" : "none";
        badge.textContent = n + (n === 1 ? " ENTRY" : " ENTRIES");
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

  /* Footer year ------------------------------------------------------ */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* -----------------------------------------------------------------
     THE CREDENTIAL RULE — machined measuring scale (inline SVG listbox)
     Static-first: the server-rendered fallback list is already present;
     this only runs when SITE_DATA + SVG exist, then reveals the instrument.
  ------------------------------------------------------------------- */
  var CAT = {
    management:     { code: "PD", label: "DELIVERY" },
    security:       { code: "SA", label: "SECURITY & AUDIT" },
    architecture:   { code: "EA", label: "ARCHITECTURE" },
    infrastructure: { code: "IN", label: "INFRASTRUCTURE" },
    data:           { code: "DA", label: "DATA" }
  };
  var NS = "http://www.w3.org/2000/svg";
  function svgEl(name, attrs) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function buildCredentialRule(root) {
    var svg = root.querySelector("svg.crule-svg");
    var out = root.querySelector(".crule-readout");
    if (!svg || !out || !window.SITE_DATA || !SITE_DATA.certifications) return;
    var certs = SITE_DATA.certifications, N = certs.length;
    if (!N) return;
    var VB = svg.viewBox.baseVal, W = VB.width;
    var pad = 28, baseY = 64, tickTop = 52, tickBot = 76;
    function X(i) { return pad + i * ((W - pad * 2) / (N - 1)); }

    // clear
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // domain bands (consecutive same-category runs)
    var runs = [], start = 0;
    for (var i = 1; i <= N; i++) {
      if (i === N || certs[i].category !== certs[start].category) {
        runs.push({ cat: certs[start].category, a: start, b: i - 1 });
        start = i;
      }
    }
    runs.forEach(function (r) {
      var x0 = X(r.a) - 9, x1 = X(r.b) + 9;
      svg.appendChild(svgEl("rect", { "class": "band", x: x0, y: 8, width: (x1 - x0), height: 18, "data-cat": r.cat }));
      var t = svgEl("text", { "class": "band-label", x: (x0 + x1) / 2, y: 20, "text-anchor": "middle" });
      t.textContent = (CAT[r.cat] || { code: "" }).code;
      t.setAttribute("data-cat", r.cat);
      svg.appendChild(t);
    });

    // baseline + minor ticks (one minor between majors)
    svg.appendChild(svgEl("line", { "class": "baseline", x1: pad - 4, y1: baseY, x2: W - pad + 4, y2: baseY }));
    for (var m2 = 0; m2 < N - 1; m2++) {
      var mx = (X(m2) + X(m2 + 1)) / 2;
      svg.appendChild(svgEl("line", { "class": "minor", x1: mx, y1: baseY - 5, x2: mx, y2: baseY + 5 }));
    }

    // major ticks (one per cert) as listbox options
    var ticks = [];
    certs.forEach(function (c, idx) {
      var g = svgEl("g", { "class": "tick", role: "option", id: "tk" + idx, "data-cat": c.category, "aria-label": c.code + " " + c.issuer, tabindex: "-1" });
      g.appendChild(svgEl("line", { x1: X(idx), y1: tickTop, x2: X(idx), y2: tickBot }));
      var tx = svgEl("text", { x: 0, y: 0, transform: "translate(" + X(idx) + "," + (tickBot + 4) + ") rotate(90)" });
      tx.textContent = c.code;
      g.appendChild(tx);
      svg.appendChild(g);
      ticks.push(g);
    });

    // needle
    var needle = svgEl("g", { id: "needle" });
    needle.appendChild(svgEl("line", { x1: 0, y1: tickTop - 6, x2: 0, y2: tickBot + 2 }));
    needle.appendChild(svgEl("circle", { cx: 0, cy: tickTop - 8, r: 2.6 }));
    svg.appendChild(needle);
    if (!reduceMotion) needle.style.transition = "transform .28s cubic-bezier(.3,.7,.3,1)";

    // listbox semantics
    svg.setAttribute("role", "listbox");
    svg.setAttribute("aria-label", "Certification scale — 17 ticks across 5 domains");
    svg.setAttribute("tabindex", "0");

    var sel = N - 1;
    function set(idx) {
      sel = idx;
      var c = certs[idx];
      needle.setAttribute("transform", "translate(" + X(idx) + ",0)");
      svg.setAttribute("aria-activedescendant", "tk" + idx);
      ticks.forEach(function (g, k) { g.setAttribute("aria-selected", k === idx ? "true" : "false"); });
      out.innerHTML = '<span class="live">TICK ' + String(idx + 1).padStart(2, "0") + "/" + N + "</span> · " +
        c.code + " · " + c.issuer + " · " + (CAT[c.category] || { label: "" }).label;
    }
    set(sel);

    svg.addEventListener("keydown", function (e) {
      var k = e.key, n = sel;
      if (k === "ArrowLeft" || k === "ArrowDown") n = Math.max(0, sel - 1);
      else if (k === "ArrowRight" || k === "ArrowUp") n = Math.min(N - 1, sel + 1);
      else if (k === "Home") n = 0;
      else if (k === "End") n = N - 1;
      else if (k === "Enter" || k === " ") { driveFilter(certs[sel].category); e.preventDefault(); return; }
      else return;
      e.preventDefault(); set(n);
    });
    svg.addEventListener("pointermove", function (e) {
      var t = e.target.closest ? e.target.closest(".tick") : null;
      if (t) set(ticks.indexOf(t));
    });
    svg.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest("[data-cat]") : null;
      if (!t) return;
      driveFilter(t.getAttribute("data-cat"));
    });

    function driveFilter(cat) {
      // Drive the existing aria-pressed chips (single source of truth) if present…
      var chip = document.querySelector('.chip[data-cert-filter="' + cat + '"]');
      if (chip) { chip.click(); chip.scrollIntoView({ block: "nearest" }); return; }
      // …otherwise (home page) deep-link into the credentials filter.
      location.href = "credentials.html#" + cat;
    }

    root.classList.add("enhanced");

    // Theme repaint: CSS uses currentColor + var() so a class/attr swap suffices.
    new MutationObserver(function () { /* tokens repaint via CSS variables */ })
      .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  function initCredentialRule() {
    var root = document.getElementById("credential-rule");
    if (root) buildCredentialRule(root);
  }

  /* -----------------------------------------------------------------
     Article margin gauge — rotated credential rule as a scroll gauge.
     Needle = scroll fraction; minor ticks = h2 anchor positions.
  ------------------------------------------------------------------- */
  function initMarginGauge() {
    var body = document.querySelector(".article-body");
    if (!body) return;
    var gauge = document.createElement("div");
    gauge.className = "margin-gauge on";
    gauge.setAttribute("aria-hidden", "true");
    var H = 240, top = 12, bot = 228;
    var heads = [].slice.call(body.querySelectorAll("h2[id]"));
    var svg = '<svg viewBox="0 0 40 240"><line class="rail" x1="12" y1="' + top + '" x2="12" y2="' + bot + '"/>';
    // minor scale ticks
    for (var y = top; y <= bot; y += 12) {
      var major = (y - top) % 48 === 0;
      svg += '<line class="' + (major ? "htick" : "mtick") + '" x1="' + (major ? 6 : 8) + '" y1="' + y + '" x2="16" y2="' + y + '"/>';
    }
    svg += '<text class="g-label" x="20" y="' + (top + 4) + '" transform="rotate(90 20 ' + (top + 4) + ')">FOLIO</text>';
    svg += '<g id="mneedle"><line x1="4" y1="' + top + '" x2="20" y2="' + top + '"/><circle cx="20" cy="' + top + '" r="2.4"/></g></svg>';
    gauge.innerHTML = svg;
    document.body.appendChild(gauge);
    var mneedle = gauge.querySelector("#mneedle");
    if (!reduceMotion) mneedle.style.transition = "transform .15s linear";
    function onScroll() {
      var rect = body.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var done = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      var frac = total > 0 ? done / total : 0;
      mneedle.setAttribute("transform", "translate(0," + (frac * (bot - top)) + ")");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initNav();
    initScrollChrome();
    initToc();
    initCopyButtons();
    initFilters();
    initYear();
    initCredentialRule();
    initMarginGauge();
  });
})();
