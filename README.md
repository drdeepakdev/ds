# deepusoman.com — IT Leadership & Certifications

Personal technology blog & educational portal for **Deepu Soman**, an IT
leader in Kuwait with 20+ years in infrastructure, project & programme
management and cyber security. Built as a fast, dependency-free static site:
no build step, no framework, no database. Upload the folder to any web host
and it runs.

## What's inside

| Page | Purpose |
|---|---|
| `index.html` | Home — hero, featured articles, topic tracks, newsletter |
| `blog.html` | Article hub with topic filters + live search |
| `articles/*.html` | 7 full-length, practical articles (the certification stack, PMP/PRINCE2/Agile, the ISACA trio, CEH/CHFI, TOGAF, ITIL, passkeys) |
| `credentials.html` | **Interactive certifications wall** — filterable, animated, data-driven from `assets/js/site-data.js`, each card showing its credential ID |
| `community.html` | Public log of talks, writing and community contributions |
| `toolbox.html` | Recommended tools — affiliate-monetization surface |
| `about.html` | Real profile — experience timeline, education, memberships, consulting CTA |
| `contact.html` | Contact channels + PayPal support widget |
| `privacy.html` | Privacy policy (required for AdSense approval) |
| `rss.xml` / `sitemap.xml` / `robots.txt` / `ads.txt` | Syndication + SEO + ad verification |
| `assets/js/monetize.js` | **The single money config file** — see below |

Design: dark-first with light-mode toggle, reading progress bar, sticky
table-of-contents on articles, mobile responsive, JSON-LD structured data
(Person + WebSite + BlogPosting) on every page. Fonts: Fraunces (display),
IBM Plex Sans (body), IBM Plex Mono (labels/terminal).

## 💰 Turning on the money (in order of payoff)

All revenue streams are wired but dormant. Activate each by editing
**`assets/js/monetize.js`** — no other file needs touching.

### 1. Google AdSense (earnings per click/impression)
1. Apply at [adsense.google.com](https://adsense.google.com) with `deepusoman.com`
   (the site must be live on the domain first; approval typically takes days–weeks).
2. Paste your publisher ID into `adsensePublisherId` in `monetize.js`
   (e.g. `"ca-pub-1234567890123456"`).
3. Uncomment and update the line in `ads.txt` with the same ID.
4. Every dashed "Ad slot" placeholder becomes a live, responsive ad unit, and
   the EU consent banner activates automatically.

### 2. PayPal support / donations
- Set `paypal.me` (your paypal.me handle) in `monetize.js`; the Support widget
  on the Contact page renders suggested-amount buttons automatically.

### 3. Affiliate links (commission per purchase)
- Join Amazon Associates and paste your tracking ID into `affiliates.amazonTag`.
  Every link with class `aff-link` (Toolbox page) is tagged automatically.

### 4. Newsletter (the long-term asset)
- Create a Buttondown/Mailchimp/ConvertKit account and paste the subscribe
  endpoint into `newsletterAction`. Both signup forms start posting immediately.

### 5. Sponsorship & consulting
- `sponsorEmail` / `buyMeACoffee` in `monetize.js`; About page carries the
  consulting CTA.

## 🚀 Deployment

The folder is host-agnostic:

- **cPanel/Apache**: upload the folder contents to `public_html/`. The included
  `.htaccess` handles HTTPS redirect, security headers, compression and caching.
- **GitHub Pages**: push to a repo → Settings → Pages → deploy from branch →
  add `deepusoman.com` as custom domain.
- **Netlify/Vercel/Cloudflare Pages**: drag-and-drop or connect the repo.

## 🎓 Certifications page (`credentials.html`)

The certification wall renders entirely from **`assets/js/site-data.js`** — no
HTML editing needed. Each entry carries `name`, `code`, `issuer`, `category`,
`year`, `id` (the credential/registry number from the record) and `verify` (a
public verification URL). Add the `verify` links as you obtain them (Credly /
issuer registry); set `credlyProfile` / `learnTranscript` to show the profile
buttons. The `focus` percentages at the bottom of the same file drive the
proficiency bars.

## Adding a new article

1. Copy any file in `articles/`, replace title/description/date/slug, write the
   body (headings need `id`s for the TOC).
2. Add a card to `blog.html` (set `data-topics`) and, if recent, `index.html`.
3. Add entries to `rss.xml` and `sitemap.xml`.
4. Update the prev/next links in the neighbouring articles.
