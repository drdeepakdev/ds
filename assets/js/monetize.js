/* ==========================================================================
   monetize.js — ONE place to switch on every revenue + analytics stream.
   Fill in the IDs below; nothing else in the site needs editing.
   ========================================================================== */

window.MONETIZE = {
  /* ---------------------------------------------------------------
     1) GOOGLE ADSENSE  — pay-per-click + per-impression display ads
     ----------------------------------------------------------------
     a) Apply at https://adsense.google.com with deepusoman.com (site must be
        live on the domain first; approval takes days–weeks).
     b) Paste the publisher ID below, e.g. "ca-pub-1234567890123456".
     c) Put the same ID in ads.txt at the site root.
     d) (Optional) create ad units in AdSense and paste their slot IDs below;
        leave them empty to use Auto Ads only.
  ----------------------------------------------------------------- */
  adsensePublisherId: "",            // "ca-pub-XXXXXXXXXXXXXXXX"
  adsenseAutoAds: true,
  adSlots: { leaderboard: "", inArticle: "", sidebar: "", footer: "" },

  /* Alternative / additional PPC network (use instead of or with AdSense).
     Media.net (Yahoo/Bing contextual) — paste your customer ID + site ID. */
  medianet: { cid: "", crid: "" },

  /* ---------------------------------------------------------------
     2) PAYPAL — reader support / donations / paid help
        Easiest: a PayPal.me handle (create at https://paypal.me).
        Optional: a hosted Donate button ID from PayPal.
  ----------------------------------------------------------------- */
  paypal: {
    me: "",                          // e.g. "deepusoman"  -> https://paypal.me/deepusoman
    donateButtonId: "",              // hosted PayPal "Donate" button id (optional)
    suggestedAmounts: [5, 15, 50],   // quick-pick amounts shown on support widgets
    currency: "USD"
  },
  buyMeACoffee: "",                  // optional alt: "https://buymeacoffee.com/deepusoman"

  /* ---------------------------------------------------------------
     3) AFFILIATE PROGRAMS — commission per click-through purchase
        Used by links with class "aff-link" (Toolbox page).
  ----------------------------------------------------------------- */
  affiliates: { amazonTag: "", genericSuffix: "" },

  /* ---------------------------------------------------------------
     4) NEWSLETTER — audience -> sponsorships & paid issues later
        Buttondown / Mailchimp / ConvertKit embed-subscribe URL.
  ----------------------------------------------------------------- */
  newsletterAction: "",

  /* ---------------------------------------------------------------
     5) ANALYTICS & SEM — measure traffic and ad/campaign conversions
        - Google Analytics 4 measurement id ("G-XXXXXXX"), and/or
        - Google Tag Manager container id ("GTM-XXXXXXX") for Google Ads /
          SEM conversion tracking and remarketing.
        - Google Search Console site-verification token (SEO).
  ----------------------------------------------------------------- */
  ga4Id: "",
  gtmId: "",
  googleSiteVerification: "",        // also mirror into <meta> if you prefer

  /* Sponsorship / contact */
  sponsorEmail: "hello@deepusoman.com"
};

/* ====================================================================
   Engine — no need to edit below for normal configuration.
   ==================================================================== */
(function () {
  var M = window.MONETIZE;
  var consent = null;
  try { consent = localStorage.getItem("ds-consent"); } catch (e) {}

  /* ---- Analytics (loads regardless of ad consent; no PII) ---------- */
  function loadAnalytics() {
    if (M.gtmId) {
      (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({ "gtm.start": +new Date(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
        j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", M.gtmId);
    }
    if (M.ga4Id) {
      var g = document.createElement("script"); g.async = true;
      g.src = "https://www.googletagmanager.com/gtag/js?id=" + M.ga4Id;
      document.head.appendChild(g);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", M.ga4Id, { anonymize_ip: true });
    }
  }

  /* ---- AdSense (PPC) — gated on consent in EU flow ----------------- */
  function loadAdSense() {
    if (!M.adsensePublisherId) return;
    if (consent === "declined") return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + M.adsensePublisherId;
    s.crossOrigin = "anonymous";
    document.head.appendChild(s);
    document.querySelectorAll(".ad-slot").forEach(function (slot) {
      var kind = slot.getAttribute("data-ad") || "inArticle";
      var slotId = M.adSlots[kind] || "";
      slot.innerHTML = "";
      var ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.style.display = "block";
      ins.setAttribute("data-ad-client", M.adsensePublisherId);
      if (slotId) ins.setAttribute("data-ad-slot", slotId);
      if (kind === "inArticle") { ins.setAttribute("data-ad-format", "fluid"); ins.setAttribute("data-ad-layout", "in-article"); }
      else { ins.setAttribute("data-ad-format", "auto"); ins.setAttribute("data-full-width-responsive", "true"); }
      slot.appendChild(ins);
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });
  }

  /* ---- PayPal support widgets ------------------------------------- */
  function renderPayPal() {
    var url = M.paypal.me ? ("https://paypal.me/" + M.paypal.me) : (M.buyMeACoffee || "");
    document.querySelectorAll("[data-paypal]").forEach(function (host) {
      if (!url) { host.style.display = "none"; return; }
      var amts = M.paypal.me && M.paypal.suggestedAmounts ? M.paypal.suggestedAmounts : null;
      var html = '<div class="support-widget">';
      html += '<div class="support-amts">';
      if (amts) amts.forEach(function (a) {
        html += '<a class="btn btn-ghost" href="' + url + "/" + a + M.paypal.currency + '" target="_blank" rel="noopener">' +
                (M.paypal.currency === "USD" ? "$" : "") + a + '</a>';
      });
      html += '<a class="btn btn-primary" href="' + url + '" target="_blank" rel="noopener">Support via PayPal ↗</a>';
      html += '</div></div>';
      host.innerHTML = html;
    });
  }

  function decorateAffiliateLinks() {
    document.querySelectorAll("a.aff-link").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (M.affiliates.amazonTag && /amazon\./.test(href) && href.indexOf("tag=") === -1) {
        href += (href.indexOf("?") === -1 ? "?" : "&") + "tag=" + M.affiliates.amazonTag;
      } else if (M.affiliates.genericSuffix && !/amazon\./.test(href) && href.indexOf("ref=") === -1) {
        href += M.affiliates.genericSuffix;
      }
      a.setAttribute("href", href);
      a.setAttribute("rel", "sponsored noopener");
      a.setAttribute("target", "_blank");
    });
  }

  function wireNewsletter() {
    document.querySelectorAll("form.newsletter-form").forEach(function (f) {
      if (M.newsletterAction) { f.setAttribute("action", M.newsletterAction); f.setAttribute("method", "post"); }
      else f.addEventListener("submit", function (e) {
        e.preventDefault();
        var box = f.querySelector(".nl-done");
        if (box) { box.style.display = "block"; var i = f.querySelector("input[type=email]"); if (i) i.value = ""; }
      });
    });
  }

  function consentBanner() {
    if (!M.adsensePublisherId) { return; }        // no ads yet -> no banner
    if (consent) { loadAdSense(); return; }
    var el = document.getElementById("consent");
    if (!el) { loadAdSense(); return; }
    el.classList.add("show");
    el.querySelector("[data-consent=accept]").addEventListener("click", function () {
      try { localStorage.setItem("ds-consent", "accepted"); } catch (e) {}
      el.classList.remove("show"); consent = "accepted"; loadAdSense();
    });
    el.querySelector("[data-consent=decline]").addEventListener("click", function () {
      try { localStorage.setItem("ds-consent", "declined"); } catch (e) {}
      el.classList.remove("show");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    loadAnalytics();
    decorateAffiliateLinks();
    wireNewsletter();
    renderPayPal();
    consentBanner();
  });
})();
