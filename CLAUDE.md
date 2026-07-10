# deepusoman.com — project notes for Claude sessions

- This is the personal tech blog / educational portal for the client **Deepu Soman**
  (deepusoman.com). Canonical repo: `drdeepakdev/ds`, branch `main`.
- **Standing requirement:** the user (Deepu) keeps a local mirror of every client
  project in `/Users/deepu/Library/CloudStorage/OneDrive-Personal/Claude/Clients Projects`
  on his Mac. Cloud sessions cannot write there — so after pushing changes to
  GitHub, ALWAYS remind him to sync the local copy (double-click
  `update-local-copy.command` in the project folder, or `git pull`).
- Site is a dependency-free static site: no build step. Deploy = upload folder
  contents to the web host (`.htaccess` included for Apache/cPanel).
- Monetization (AdSense/affiliates/newsletter) is configured only in
  `assets/js/monetize.js`; the certifications wall only in `assets/js/site-data.js`
  (entries marked `sample: true` must be replaced with real credentials before launch).
- Before launch, personalise bio content — see README.md "Personalising the profile".
