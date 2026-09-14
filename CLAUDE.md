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
  overrides token values only. A hardcoded hex anywhere else is a bug. The light
  palette is warm throughout: the ground is cream, and the greys carry the same
  warmth, so never drop a cool grey into it.
- **Do not invent academic facts.** Titles, venues, coauthors, dates, awards and
  affiliations come only from material the user supplies. Placeholders are marked
  `TODO:` and must stay obviously fake until replaced.
- **Do not machine-translate the user's academic content.** If only one language
  is supplied for a bio, award or project description, leave the other absent;
  the renderer falls back to the language that exists.

Publications are filtered by rows of chips and nothing else, no search box:
topic, author position, publication kind, and, when the kind is papers, the
kind of paper. All of them combine.

The kind hierarchy is declared in `KINDS` in `site.js`: structure there,
wording in `i18n.js`, because what a publication is counts as interface
vocabulary rather than the user content `TOPICS` holds. Each kind lists the
`type` values that belong to it, so a new type joins a kind by being added to
that list. The subtype row is always in the DOM and merely hidden, so choosing
a kind never rebuilds the toolbar and never pulls focus off the chip just
clicked.

Author position is derived, not stored twice. First authorship is read off the
first entry of `authors` by `isLeadAuthor`, which compares against
`AUTHOR_SELF` in either language, so it cannot drift from the author list.
Being a corresponding author cannot be read off anything, so it is stated as
`corresponding: true` on the publication. Lead means either one.

The topics are fixed to the three research directions and are
declared once in `window.TOPICS` in `data/publications.js`, each with a stable
`id` and a bilingual `label`. A publication stores ids, never labels, so the
chip text can change with the language while the filter keeps working. A chip
is rendered for every declared topic even when nothing is tagged with it, so
the three directions always read as a complete set.

Section headings are sentence case, not small caps and not title case: only
the first letter is capital, so "Awards and honours", never "Awards and
Honours". Job titles and degrees inside an entry keep their own capitals.

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

Minimal academic: a warm cream ground in light mode, a single restrained blue
accent, hairline rules,
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
| `site-header`  | brand, language toggle, theme toggle                |
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
| `toc`          | the contents drawer, built from the rendered headings |
| `toc-tab`      | the bookmark on the left edge that opens the drawer  |

The drawer opens from a bookmark protruding from the left edge, not from a
header button, and closes on an inward arrow that reads as retracting it into
that edge. The bookmark slides away with the drawer, so the two read as one
object in two states.

The contents drawer is generated from the `.section-title` headings the page
actually rendered, so it cannot drift from the sections and it follows the
language for free. Each section carries an anchor id: the static ones are
written in `index.html` with a `sec-` prefix, the CV ones are emitted as
`cv-<icon>`. **The prefix is not decoration.** Several sections wrap a mount
point of the same name, so a section with `id="contact"` around `<div
id="contact">` is a duplicate id, and the renderer then overwrites the heading.

The drawer drives its own scrolling rather than leaving it to the browser,
because a link whose hash already matches the address bar scrolls nowhere.
Closing it after a link click deliberately does not return focus to the
button, and every `focus()` passes `preventScroll`, or focus fights the scroll.

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
