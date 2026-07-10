# deepusoman.com — IT Leadership & Certifications

Personal technology blog & educational portal for **Deepu Soman**, built as a
fast, dependency-free static site: no build step, no framework, no database.
Upload the folder to any web host and it runs.

## What's inside

| Page | Purpose |
|---|---|
| `index.html` | Home — hero, featured articles, topic tracks, newsletter |
| `signal.html` | **Signal** — auto-updatable feed of dated dispatches on the latest trends (cybersecurity, AI governance, audit, architecture); see AUTOMATION.md |
| `blog.html` | Article hub with topic filters + live search |
| `articles/*.html` | 7 in-profile articles — 6 certification guides (PMP/PRINCE2, ISACA trio, CEH/CHFI, TOGAF, ITIL, the certification-stack essay) + Passkeys |
| `credentials.html` | Grouped, filterable list of 20+ real certifications with IDs — data-driven from `assets/js/site-data.js` |
| `community.html` | **MVP-evidence page** — timestamped contribution log (articles, talks, mentoring) |
| `toolbox.html` | Recommended tools — affiliate-monetization surface |
| `about.html` | Profile, focus areas, consulting CTA |
| `contact.html` | Contact channels + form |
| `privacy.html` | Privacy policy (required for AdSense approval) |
| `rss.xml` / `sitemap.xml` / `robots.txt` / `ads.txt` | Syndication + SEO + ad verification |
| `assets/js/monetize.js` | **The single money config file** — see below |

## Design — quiet editorial

Light warm-paper by default (dark is an optional, persisted toggle), navy accent,
Archivo headings + Source Serif 4 body + IBM Plex Mono labels. Separation by
whitespace and 1px hairlines only — no shadows, gradients, textures or card-lift.
Credential-forward and content-first, modelled on respected certification-educator
blogs. Every page: skip link, `:focus-visible`, `aria-pressed` filters, `<nav>`
landmark, `prefers-reduced-motion`, AA contrast in both themes, JSON-LD.

## 💰 Turning on the money (in order of payoff)

All revenue streams are wired but dormant. Activate each by editing
**`assets/js/monetize.js`** — no other file needs touching.

### 1. Google AdSense (earnings per click/impression)
1. Apply at [adsense.google.com](https://adsense.google.com) with `deepusoman.com`
   (the site must be live on the domain first; approval typically takes days–weeks).
2. Paste your publisher ID into `adsensePublisherId` in `monetize.js`
   (e.g. `"ca-pub-1234567890123456"`).
3. Uncomment and update the line in `ads.txt` with the same ID.
4. Done — every dashed "Ad slot" placeholder on the site becomes a live,
   responsive ad unit, and the EU consent banner activates automatically.
   Optionally create specific ad units in AdSense and paste their slot IDs
   into `adSlots` for finer control.

### 2. Affiliate links (commission per purchase)
- Join Amazon Associates (`amazon.in` for India) and paste your tracking ID
  into `affiliates.amazonTag`. Every Amazon link with class `aff-link`
  (Toolbox page) is tagged automatically.
- Non-Amazon partner ref suffixes go in `affiliates.genericSuffix`.
- Disclosure text is already on the Toolbox page and privacy policy.

### 3. Newsletter (the long-term asset)
- Create a free [Buttondown](https://buttondown.com) (or Mailchimp/ConvertKit)
  account and paste the embed/subscribe endpoint into `newsletterAction`.
  Both signup forms (home + community) start posting to it immediately.
- Once the list grows: sponsorship slots in the newsletter are typically the
  highest-RPM revenue a technical blog has.

### 4. Sponsorship & consulting
- `sponsorEmail` / `buyMeACoffee` in `monetize.js`; About page carries the
  consulting CTA.

## 🎯 Logo & brand mark

The logo is a **DS monogram + instrument needle** (a red needle taking a reading on a ledger rule beneath the initials) — a dial with five graduations (one per
certification domain) and a red needle taking a reading — echoing the site's
"Calibrated Ledger" identity and the Credential Rule instrument.

- **In-page:** an inline SVG inside the header bezel (`<span class="mark">`),
  drawn in `currentColor` (brass) + `var(--accent)` (needle-red), so it recolours
  itself in both light and dark themes automatically.
- **`assets/logo.svg`** — horizontal lockup (mark + "Deepu Soman / ENGINEERING
  NOTES") for social cards, email signatures, print, slide decks.
- **`assets/mark.svg`** — square mark only, for avatars / app icons / favicons.
- **Favicon** — the same gauge, inlined as a data-URI on every page (graphite
  ground, brass gauge, red needle).

To recolour the brand, change `--brass` and `--accent` in `assets/css/style.css`;
the in-page mark and header follow automatically (the standalone SVG files and
favicon carry hardcoded hex and would be updated by hand).


## 💵 PayPal support / donations

Set `paypal.me` in `assets/js/monetize.js` to your PayPal.me handle (create one
free at https://paypal.me). The **Support the site** block on the Contact page
then shows quick-pick amount buttons + a "Support via PayPal" button. Optional:
a hosted Donate button id in `paypal.donateButtonId`, or a Buy-Me-A-Coffee URL
in `buyMeACoffee`. No PayPal config = the block stays hidden automatically.

## 🖱️ Pay-per-click (PPC)

Google AdSense **is** the pay-per-click engine — you earn per valid click and per
impression. Turn it on by pasting the publisher id into `adsensePublisherId`
(step 1 above). An alternative/second network, **Media.net** (Bing/Yahoo
contextual), is also wired: set `medianet.cid`/`crid`. Ad slots are placed on the
home, articles, credentials and signal pages and are styled as quiet
"Advertisement" blocks until activated.

## 🔎 SEO / SEM

Already built in, every page:
- Unique `<title>` + meta description, `author`, `keywords`, and
  `robots: index,follow,max-image-preview:large`.
- Open Graph + Twitter `summary_large_image` cards, sharing `assets/og-image.png`
  (1200×630). Regenerate that image from `scratchpad/og.html` if you rebrand.
- Structured data (JSON-LD): `WebSite` (+ SearchAction for the Google sitelinks
  search box) and `Person` on the home page; `BlogPosting` on every article;
  `BreadcrumbList` on articles.
- `sitemap.xml`, `robots.txt`, `rss.xml` kept in sync with the live pages.

To finish SEO/SEM setup after launch:
1. Verify the domain in **Google Search Console** and submit `sitemap.xml`.
2. Paste your **GA4** id (`ga4Id`) and/or **Google Tag Manager** id (`gtmId`) in
   `monetize.js` — GTM is what you use to record **Google Ads / SEM conversions**
   and build remarketing audiences.
3. For SEM campaigns, point Google Ads at the cert-topic pages (each article
   targets a real search term — "PMP vs PRINCE2", "CISA CISM CRISC", etc.).

## 🚀 Deployment

The folder is host-agnostic:

- **cPanel/Apache** (matches the current "coming soon" host): upload the folder
  contents to `public_html/`. The included `.htaccess` handles HTTPS redirect,
  security headers, compression and caching.
- **GitHub Pages**: push to a repo → Settings → Pages → deploy from branch →
  add `deepusoman.com` as custom domain (a `CNAME` file will be created).
- **Netlify/Vercel/Cloudflare Pages**: drag-and-drop or connect the repo.

### Moving to its own repository (recommended)
The GitHub app in this workspace wasn't permitted to create repositories, so:

1. Create an empty repo `deepusoman.com` under your GitHub account (no README).
2. From a machine with this folder:
   ```bash
   cd deepusoman.com
   git init -b main && git add -A && git commit -m "deepusoman.com v1"
   git remote add origin https://github.com/drdeepakdev/deepusoman.com.git
   git push -u origin main
   ```

## 🎓 Certifications page (`credentials.html`)

The certification wall renders entirely from **`assets/js/site-data.js`** — no HTML
editing needed. Each entry currently shipped is marked `sample: true` and shows a
visible "sample entry" tag on the page. **Before launch:** replace them with
Deepu's real credentials (name, code, issuer, year, Credly/Microsoft Learn verify
URL) and set `sample: false`, or delete entries that don't apply. Also set
`credlyProfile` / `learnTranscript` to show the profile buttons. The focus-map
percentages at the bottom of the same file drive the proficiency bars.

## ✏️ Personalising the profile (do this before launch)

Deepu's LinkedIn profile couldn't be read programmatically (LinkedIn blocks
bots), so bio content is written professionally but generically. Update these
spots with his real details — each is plain HTML text:

- `about.html` — the "What this site is" / role line / skill bars.
- `community.html` — add real talks, certifications and community activity to
  the timeline as they happen (**this page is the MVP application evidence —
  keep it current**).
- `index.html` hero paragraph, and the JSON-LD `jobTitle` in `index.html` /
  `about.html`.
- Email: `hello@deepusoman.com` is used site-wide — create this mailbox on the
  domain, or search-and-replace with the preferred address.

## 🏆 Microsoft MVP application notes

The MVP award needs **nomination + ~12 months of documented, sustained
community contribution**. This site is structured to generate that evidence:

- Publish consistently (the article hub and RSS feed are the record).
- Log everything on `community.html` with dates and links — reviewers get one URL.
- Add speaking engagements, forum answers (Microsoft Q&A, Stack Overflow),
  and open-source work to the same timeline.
- When ready, seek nomination via a current MVP or Microsoft employee at
  [mvp.microsoft.com](https://mvp.microsoft.com).

## Adding a new article

1. Copy any file in `articles/`, replace title/description/date/slug, write the
   body (headings need `id`s for the TOC).
2. Add a card to `blog.html` (set `data-topics`) and, if recent, `index.html`.
3. Add entries to `rss.xml`, `sitemap.xml`, and the `community.html` timeline.
4. Update the prev/next links in the neighbouring articles.
