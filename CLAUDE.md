# Project notes for Claude

Academic homepage for Jiangtao Shen. Deploys to
`https://github.com/JiangtaoShen/Tao-s-page` and is served by GitHub Pages.

## Hard constraints

- **No build step and no dependencies.** The site must keep working when opened
  directly from the filesystem. Do not introduce npm packages, bundlers, CSS
  frameworks or a static site generator without being asked.
- **Content goes in `data/*.js`, never inline in HTML.** The four data files are
  the only place a human edits to publish something new.
- **Colors come from the tokens on `:root` in `assets/css/style.css`.** Dark mode
  overrides token values only. A hardcoded hex anywhere else is a bug.
- **Do not invent academic facts.** Titles, venues, coauthors, dates, awards and
  affiliations come only from material the user supplies. Placeholders are marked
  `TODO:` and must stay obviously fake until replaced.

## Visual direction

Minimal academic: white ground, a single restrained blue accent, hairline rules,
generous whitespace, narrow measure of 760px. Serif only for the name and page
titles. No gradients, no drop shadows, no animation beyond a link underline.

## Rendering model

`assets/js/site.js` renders every page. A page opts into a block by including an
element with a known id, and the script skips anything absent:

| id             | renders                                            |
|----------------|----------------------------------------------------|
| `site-header`  | brand, nav, theme toggle                           |
| `hero`         | photo, name, role, contact links, bio              |
| `interests`    | research interest bullets                          |
| `news`         | news list, capped by `SITE.newsLimit`              |
| `pub-toolbar`  | type and topic filter chips plus search box        |
| `pub-list`     | publications; `data-selected="true"` limits to the homepage subset |
| `project-list` | project cards; `data-featured="true"` for homepage |
| `cv`           | CV sections                                        |
| `site-footer`  | copyright and last-updated line                    |

Pages in a subdirectory set `window.BASE = "../"` before the script tag. The
`url()` helper prefixes local paths with it and leaves absolute URLs alone.

## Status

Scaffold complete as of 2026-09-14, filled with `TODO:` placeholders. Real
content pending from the user.
