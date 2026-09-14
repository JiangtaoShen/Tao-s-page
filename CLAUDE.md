# Project notes for Claude

Academic homepage for Jiangtao Shen, bilingual in English and Chinese. Deploys
to `https://github.com/JiangtaoShen/Tao-s-page` and is served by GitHub Pages.

## Hard constraints

- **No build step and no dependencies.** The site must keep working when opened
  directly from the filesystem. Do not introduce npm packages, bundlers, CSS
  frameworks or a static site generator without being asked.
- **Content goes in `data/*.js`, never inline in HTML.** The four data files are
  the only place a human edits to publish something new.
- **Every user-facing string must exist in both languages.** Content strings use
  `{ en, zh }` in the data files. Interface strings get a key in
  `assets/js/i18n.js` under both `en` and `zh`, referenced from markup with
  `data-i18n`. Never hardcode display text in `site.js` or in a page.
- **Colors come from the tokens on `:root` in `assets/css/style.css`.** Dark mode
  overrides token values only. A hardcoded hex anywhere else is a bug.
- **Do not invent academic facts.** Titles, venues, coauthors, dates, awards and
  affiliations come only from material the user supplies. Placeholders are marked
  `TODO:` and must stay obviously fake until replaced.
- **Do not machine-translate the user's academic content.** If only one language
  is supplied for a bio, award or project description, leave the other absent;
  the renderer falls back to the language that exists.

## Visual direction

Minimal academic: white ground, a single restrained blue accent, hairline rules,
generous whitespace, narrow measure of 760px. Serif only for the name and page
titles. No gradients, no drop shadows, no animation beyond a link underline.

## Rendering model

`assets/js/site.js` renders every page. A page opts into a block by including an
element with a known id, and the script skips anything absent:

| id             | renders                                            |
|----------------|----------------------------------------------------|
| `site-header`  | brand, nav, language toggle, theme toggle          |
| `hero`         | photo, name, role, contact links, bio              |
| `interests`    | research interest bullets                          |
| `news`         | news list, capped by `SITE.newsLimit`              |
| `pub-toolbar`  | type and topic filter chips plus search box        |
| `pub-list`     | publications; `data-selected="true"` limits to the homepage subset |
| `project-list` | project cards; `data-featured="true"` for homepage |
| `cv`           | CV sections                                        |
| `site-footer`  | copyright and last-updated line                    |

Static markup is translated through `data-i18n` (textContent), `data-i18n-html`
(innerHTML, for strings containing links) and `data-i18n-title` (document
title). Hand written bilingual blocks on project detail pages use
`data-lang="en"` or `data-lang="zh"`; the script toggles their `hidden` flag.

Two helpers matter. `tr(key)` resolves an interface string. `t(value)` resolves
a content field that may be plain or `{ en, zh }`, falling back to the other
language when one is empty.

Switching language re-runs `render()` in place, no reload. Publication filter
state is deliberately held outside the render so the reader's chips survive a
language switch.

Pages in a subdirectory set `window.BASE = "../"` before the script tag. The
`url()` helper prefixes local paths with it and leaves absolute URLs alone.

## Status

Scaffold complete as of 2026-09-14, filled with `TODO:` placeholders in both
languages. Real content pending from the user.
