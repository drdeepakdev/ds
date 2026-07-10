# Signal auto-publish — the automated trends pipeline

The **Signal** page (`signal.html`) is a running feed of short, dated dispatches
on the latest developments in Deepu's expertise areas (cybersecurity, AI
governance, IT audit & risk, enterprise architecture, delivery). It is designed
to be **refreshed automatically on a schedule** by an AI agent that researches
genuine sources and writes new dispatches in Deepu's voice.

## How it works

The "database" is `signal.html` itself (static HTML, so it's fully indexable by
Google and AdSense — no JS rendering needed). Each dispatch is one
`<article class="dispatch">` block. A scheduled agent:

1. Researches genuine, current sources (last ~2 weeks) from reputable outlets.
2. Writes 2–3 new dispatches in the existing voice — technical, first-person,
   no marketing tone, no emoji, each with a "Monday move" takeaway and a real
   source link.
3. Prepends them to the top of `.signal-feed`, adds matching `<item>`s to
   `rss.xml`, caps the feed at ~12 entries.
4. Commits and pushes to `drdeepakdev/ds` `main`.

## The exact prompt (paste into a fresh Claude Code session weekly)

> You maintain the "Signal" trends feed on Deepu Soman's blog (repo:
> drdeepakdev/ds — the deepusoman.com static site). Publish this week's
> dispatches. **1.** Clone the repo and cd in. **2.** Research GENUINE, current
> developments from the last ~2 weeks across: cybersecurity & threat intel,
> AI governance & compliance (EU AI Act, ISO/IEC 42001, NIST), IT audit & risk
> (ISACA themes), enterprise architecture (TOGAF, AI-in-the-estate), and
> project/service delivery (PMP/PRINCE2/ITIL). Use only reputable, verifiable
> sources and record each exact URL. Do NOT invent sources or statistics.
> **3.** Write 2–3 NEW dispatches for developments not already in signal.html.
> Read 3–4 existing `<article class="dispatch">` blocks first and copy their
> exact structure, class names, and data-domain/stamp conventions (sec/gov/arch).
> Match the voice exactly: first-person practitioner POV, no emoji, no filler.
> Each = the news in 2–3 tight sentences + a "Monday move" tied to one of his
> certifications + a real source link. Use today's date. **4.** Prepend to the
> top of `.signal-feed`; add `<item>`s to rss.xml; bump `<lastBuildDate>`; cap
> the feed at ~12. **5.** Verify it renders; internal-link check. **6.** Commit
> and `git push -u origin main`. Report a summary with source links.

## Scheduling options (pick one)

1. **Claude Code scheduled task / Routine** — create a weekly recurring task
   (e.g. Mondays 09:00) that fires the prompt above into a fresh session. This
   is the hands-off option; confirm the first run pushes successfully.
2. **Manual weekly** — paste the prompt into a Claude Code session whenever you
   want a refresh. Takes ~5 minutes of agent time.
3. **GitHub Action + API** — a scheduled workflow that calls the Claude API
   with the prompt and opens a PR. More setup; fully server-side.

## Guardrails (already baked into the prompt)

- **Genuine sources only** — every dispatch links a real, fetched source; no
  invented figures.
- **Client's voice** — first-person, practitioner POV, human-writer level.
- **No AI slop** — no emoji, no "in today's fast-paced world" filler, no
  uniform hype; matches the existing dispatch style.
- **Bounded** — caps the feed at ~12 so the page stays fast and focused.

> Note on "the moment something trends": a static site can't watch the news in
> real time by itself — that needs a always-on backend. The practical,
> reliable version is the **scheduled refresh** above (weekly, or more often if
> you want). Between runs you can always fire the prompt manually for a
> breaking item.
