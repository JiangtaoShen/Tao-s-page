# Project notes for Claude

Academic homepage for Jiangtao Shen: one page, bilingual in English and
Chinese. Deploys to `https://github.com/JiangtaoShen/Tao-s-page` and is served
by GitHub Pages.

## Hard constraints

- **No build step and no dependencies.** The site must keep working when opened
  directly from the filesystem. Do not introduce npm packages, bundlers, CSS
  frameworks or a static site generator without being asked.
- **Content goes in `data/*.js`, never inline in HTML.** The four data files are
  the only place a human edits to publish something new.
- **One page only.** Everything lives in `index.html` and there is no navigation
  bar. Do not split content back out into separate pages. The exception is
  `projects/<id>.html`, an optional detail page for a single project.
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

Publications are filtered by topic and by nothing else: no type chips, no
search box. The topics are fixed to the three research directions and are
declared once in `window.TOPICS` in `data/publications.js`, each with a stable
`id` and a bilingual `label`. A publication stores ids, never labels, so the
chip text can change with the language while the filter keeps working. A chip
is rendered for every declared topic even when nothing is tagged with it, so
the three directions always read as a complete set.

Contact link icons are inline SVG in the `ICONS` map in `site.js`, drawn in
`currentColor` so they follow the link colour in both themes. Brand marks are
stored as one unbroken string each: splitting a path across concatenated lines
drops the separator and silently corrupts the glyph.

## Visual direction

Minimal academic: white ground, a single restrained blue accent, hairline rules,
generous whitespace, narrow measure of 760px. Serif only for the name and page
titles. No gradients, no drop shadows, no animation beyond a link underline.

## Rendering model

`assets/js/site.js` renders the page. A block appears only if an element with
its id is present, so the script also serves the project detail pages, which
mount just the header and footer:

| id             | renders                                            |
|----------------|----------------------------------------------------|
| `site-header`  | brand, nav, language toggle, theme toggle          |
| `hero`         | photo, name, role, contact links, bio              |
| `interests`    | research interest bullets                          |
| `news`         | news list, capped by `SITE.newsLimit`              |
| `contact`      | email and postal address, as CV-style rows          |
| `pub-toolbar`  | type and topic filter chips plus search box        |
| `pub-list`     | publications, grouped by year; `data-selected="true"` would narrow it to the flagged subset |
| `project-list` | project cards; `data-featured="true"` would narrow it likewise |
| `cv-top`       | CV sections flagged `top: true`, rendered near the head of the page |
| `cv`           | the remaining CV sections, each with its own heading |
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

The CV renders in two places. A section carrying `top: true` in `data/cv.js`
goes to `#cv-top`, directly under the hero: today that is education and
experience. The rest go to `#cv`, below the projects. With only one of the two
mounts on a page, everything lands there.

CV entries are ordered newest first by `sortItems`, which ranks the `when` text
by the latest year it contains, treats present and 至今 as ongoing, and reads
both languages so the order never changes with the language. A section is only
sorted when every entry yields a date, which leaves Skills and Academic Service
in the order the data file declares. So do not hand-order dated sections.

Both CV blocks are bare divs wrapping several sections, so vertical rhythm keys
off `main > * + *` as well as `section + section`. Dropping either rule leaves
them touching their neighbours.

## Status

Profile, links, publications, education and service are real, imported from the
user and from ORCID. Still `TODO:`: the bio paragraphs, the PhD advisor and
thesis title, two publication author lists, the news items, and the avatar.
