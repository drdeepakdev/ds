/* ==========================================================================
   monetize.js — single place to switch on every revenue stream.
   Nothing else in the site needs editing to start earning.
   ========================================================================== */

window.MONETIZE = {
  /* ---------------------------------------------------------------
     1) GOOGLE ADSENSE  (pay-per-click + per-impression display ads)
     ----------------------------------------------------------------
     a) Apply at https://adsense.google.com with deepusoman.com
     b) Once approved, paste your publisher ID below, e.g. "ca-pub-1234567890123456"
     c) Update ads.txt in the site root with the same ID
     d) (Optional) create ad units in AdSense and paste slot IDs below;
        leave slots empty to use Auto Ads only.
  ----------------------------------------------------------------- */
  adsensePublisherId: "",            // <-- paste "ca-pub-XXXXXXXXXXXXXXXX" here
  adsenseAutoAds: true,              // let Google place additional ads automatically
  adSlots: {
    leaderboard: "",                 // header/below-hero banner unit id
    inArticle: "",                   // in-article fluid unit id
    sidebar: "",                     // sticky sidebar rectangle unit id
    footer: ""                       // above-footer unit id
  },

  /* ---------------------------------------------------------------
     2) AFFILIATE PROGRAMS (commission per click-through purchase)
        Used by the Toolbox page cards (data-aff attribute) and any
        link with class "aff-link".
  ----------------------------------------------------------------- */
  affiliates: {
    amazonTag: "",                   // Amazon Associates tracking ID, e.g. "deepusoman-21" (India: .in)
    genericSuffix: ""                // e.g. "?ref=deepusoman.com" appended to partner links
  },

  /* ---------------------------------------------------------------
     3) NEWSLETTER (audience -> sponsorships & paid issues later)
        Create a free account at https://buttondown.com (or Mailchimp/
        ConvertKit) and paste the form action URL.
  ----------------------------------------------------------------- */
  newsletterAction: "",              // e.g. "https://buttondown.com/api/emails/embed-subscribe/deepusoman"

  /* ---------------------------------------------------------------
     4) SPONSORSHIP / SUPPORT
  ----------------------------------------------------------------- */
  sponsorEmail: "hello@deepusoman.com",
  buyMeACoffee: ""                   // e.g. "https://buymeacoffee.com/deepusoman"
};

/* ====================================================================
   Engine — do not edit below this line for normal configuration.
   ==================================================================== */
(function () {
  var M = window.MONETIZE;
  var consent = null;
  try { consent = localStorage.getItem("ds-consent"); } catch (e) {}

  function loadAdSense() {
    if (!M.adsensePublisherId) return;           // not configured yet
    if (consent === "declined") return;          // respect visitor choice
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
      if (kind === "inArticle") {
        ins.setAttribute("data-ad-format", "fluid");
        ins.setAttribute("data-ad-layout", "in-article");
      } else {
        ins.setAttribute("data-ad-format", "auto");
        ins.setAttribute("data-full-width-responsive", "true");
      }
      slot.appendChild(ins);
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
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
      if (M.newsletterAction) {
        f.setAttribute("action", M.newsletterAction);
        f.setAttribute("method", "post");
      } else {
        f.addEventListener("submit", function (e) {
          e.preventDefault();
          var box = f.querySelector(".nl-done");
          if (box) { box.style.display = "block"; f.querySelector("input[type=email]").value = ""; }
        });
      }
    });
  }

  function consentBanner() {
    if (!M.adsensePublisherId) return;           // no ads yet -> no banner needed
    if (consent) { loadAdSense(); return; }
    var el = document.getElementById("consent");
    if (!el) { loadAdSense(); return; }
    el.classList.add("show");
    el.querySelector("[data-consent=accept]").addEventListener("click", function () {
      try { localStorage.setItem("ds-consent", "accepted"); } catch (e) {}
      el.classList.remove("show");
      consent = "accepted";
      loadAdSense();
    });
    el.querySelector("[data-consent=decline]").addEventListener("click", function () {
      try { localStorage.setItem("ds-consent", "declined"); } catch (e) {}
      el.classList.remove("show");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    decorateAffiliateLinks();
    wireNewsletter();
    consentBanner();
  });
})();
