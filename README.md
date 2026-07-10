# deepusoman.com — Engineering Notes

Personal technology blog & educational portal for **Deepu Soman**, built as a
fast, dependency-free static site: no build step, no framework, no database.
Upload the folder to any web host and it runs.

## What's inside

| Page | Purpose |
|---|---|
| `index.html` | Home — hero, featured articles, topic tracks, newsletter |
| `signal.html` | **Signal** — auto-updatable feed of dated dispatches on the latest trends (cybersecurity, AI governance, audit, architecture); see AUTOMATION.md |
| `blog.html` | Article hub with topic filters + live search |
| `articles/*.html` | 8 full-length, code-first articles (AI agents, MCP, RAG, platform engineering, passkeys, serverless cost, .NET on Azure, WebAssembly) |
| `credentials.html` | **Interactive certifications wall** — filterable, animated, data-driven from `assets/js/site-data.js` |
| `community.html` | **MVP-evidence page** — timestamped contribution log (articles, talks, mentoring) |
| `toolbox.html` | Recommended tools — affiliate-monetization surface |
| `about.html` | Profile, focus areas, consulting CTA |
| `contact.html` | Contact channels + form |
| `privacy.html` | Privacy policy (required for AdSense approval) |
| `rss.xml` / `sitemap.xml` / `robots.txt` / `ads.txt` | Syndication + SEO + ad verification |
| `assets/js/monetize.js` | **The single money config file** — see below |

## Design — "The Calibrated Ledger"

The site is styled as a precision measuring instrument: a machined rule + audit
ledger. Rules (hairlines + double head-rules) and paper-tint do the work cards
and shadows used to — `box-shadow`, glassmorphism, blueprint grid and glow washes
are all removed.

- **Palette** (token-driven, both themes AA): dark = matte instrument-face
  graphite `#14181A`; light = ledger-paper cream `#F4F1E7`. One pointer colour —
  Needle Red (`--accent`) — used only where something is "reading" (active nav,
  focus ring, primary button, the live needle). Ledger Green (`--verified`) for
  links/PASS, Brass (`--brass`) for cert codes, folios and stamps.
- **Type = three materials**: Archivo (engraved plate — headings/UI, width axis),
  Source Serif 4 (ledger prose at a 76ch measure), IBM Plex Mono (every *measured*
  number — dates, folios, tick labels — always `tabular-nums slashed-zero`). One
  Google Fonts request; isolate code in the `--font-code` token.
- **The Credential Rule** (signature, `assets/js/main.js` → `buildCredentialRule`):
  an inline-SVG machined scale — 17 ticks in 5 domain bands with a red needle and a
  live `aria-live` readout, exposed as a `role="listbox"` (roving focus,
  `aria-activedescendant`, keyboard + pointer). It is **static-first**: the
  server-rendered fallback list of all 17 certs is in the HTML, so no-JS / LCP /
  `<640px` always see real content; JS enhances it and adds `.enhanced`. Clicking a
  band drives the existing `aria-pressed` filter chips (single source of truth).
  Built purely from `window.SITE_DATA` — edit `assets/js/site-data.js` only.
- **The Register**: `blog.html` and the home lists are one continuous ruled ledger
  — 48px baseline rows `[No. folio · date · title · domain stamp · read]`, grouped
  under double-ruled domain headings whose counts re-tally on filter while the
  canonical folio numbers keep their gaps (the gaps are the filter feedback).
- **Icons**: every emoji is replaced by a drawn inline-SVG engraving
  (`currentColor`, 1.25px stroke) or a typographic stamp — including the theme
  toggle (half-shaded circle) and nav menu (three hairlines).
- **Motion contract**: nothing moves unless a reading changed — needle travel on
  selection, the credentials count-up on filter, article margin scroll-gauge. All
  hover-lifts / staggered reveals removed; everything respects
  `prefers-reduced-motion`.

Still: dark-first with light-mode toggle, sticky table-of-contents on articles,
skip link + `:focus-visible`, mobile responsive, JSON-LD structured data
(Person + BlogPosting) on every page. Monetization plumbing (`.ad-slot`/`data-ad`,
`monetize.js`, consent banner) is unchanged — ad regions are now ruled-off
"Advertisement" ledger blocks.

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
