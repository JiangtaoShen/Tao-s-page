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

Every section heading carries a small icon. Static headings in `index.html`
name theirs with `data-icon` beside `data-i18n`; CV sections name theirs with
`icon` in `data/cv.js`. Both resolve against the `SECTION_ICONS` map in
`site.js`. A heading without a match simply renders without an icon, so add the
path to that map rather than inlining SVG in the markup.

Contact link icons are inline SVG in the `ICONS` map in `site.js`, drawn in
`currentColor` so they follow the link colour in both themes. Brand marks are
stored as one unbroken string each: splitting a path across concatenated lines
drops the separator and silently corrupts the glyph.

## Visual direction

Minimal academic: white ground, a single restrained blue accent, hairline rules,
generous whitespace, a measure of 880px. No gradients, no drop shadows, no
animation beyond a link underline.

**Three sizes, and no others.** `--fs-lg` is the name, `--fs-base` is anything
a reader actually reads, `--fs-sm` is metadata and chrome: dates, section
labels, authors, venues, chips, tags, captions, the footer. Never write a raw
`font-size` value; reach for the token that fits the tier. The name is the only
size that changes on a phone, and it changes by redefining `--fs-lg` in the
media query rather than by overriding the rule.

**One typeface, everywhere.** The page is set entirely in Source Serif 4, which
is self-hosted in `assets/fonts/` as the Latin subsets of the variable font, so
nothing is fetched from a CDN and the page still works offline. Do not
introduce a second Latin face for headings, labels or chips. Monospace survives
for code blocks alone, which appear only on project detail pages. Chinese has
no webfont, since a CJK face runs to megabytes and subsetting needs a build
step, so it falls through to the platform UI face.

The measure is tied to the typeface and the small size together. Source Serif
at 15px sets the longest affiliation line at 664px beside the 131px date
column, so the measure cannot drop below 858px without wrapping it. The font is
self-hosted, so those metrics hold on every machine. Re-measure before changing
any of the three.

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
goes to `#cv-top`, directly under the hero: today that is the single
Experience section, which holds the posts and the degrees together. The rest
go to `#cv`, below the projects. With only one of the two mounts on a page,
everything lands there.

CV entries are ordered newest first by `sortItems`, which ranks the `when` text
by the latest year it contains, treats present and 至今 as ongoing, and reads
both languages so the order never changes with the language. A section is only
sorted when every entry yields a date, which leaves Academic Service in the
order the data file declares. So do not hand-order dated sections.

Both CV blocks are bare divs wrapping several sections, so vertical rhythm keys
off `main > * + *` as well as `section + section`. Dropping either rule leaves
them touching their neighbours.

## Status

Profile, links, publications, education and service are real, imported from the
user and from ORCID. Still `TODO:`: the bio paragraphs, the PhD advisor and
thesis title, two publication author lists, the news items, and the avatar.
