# Jiangtao Shen — Academic Homepage

Source for <https://github.com/JiangtaoShen/Tao-s-page>.

A dependency-free bilingual single-page site, English and Chinese. No build
step, no package manager, no framework. Open `index.html` in a browser and it
works, including straight from the local filesystem.

## Structure

```
index.html            The whole site: about, experience, interests, news,
                      publications, projects, the rest of the CV, contact
projects/_template.html   Copy this to create a per-project detail page

data/site.js          Profile, contact links, news          <- edit these
data/publications.js  Publication list
data/projects.js      Project list
data/cv.js            CV sections

assets/fonts/         Source Serif 4, self-hosted Latin subsets
assets/js/i18n.js     Interface strings for both languages
assets/js/site.js     All rendering
assets/css/style.css  All styling, design tokens at the top
assets/img/           Photos, teaser images, favicon
assets/pdf/           Paper PDFs, cv.pdf
assets/demo/          Demo videos and GIFs
```

Content lives entirely in `data/*.js`. Adding a paper or a project means adding
one object to an array; no HTML is touched.

There is no navigation bar, because there is only one page. The header carries
the name and the language and theme toggles. A bookmark on the left edge opens
a drawer listing every section, and an inward arrow retracts it. The list is
generated from the headings on the page, so adding or removing a section
updates it with no extra step.

## Writing bilingual content

Any text field in a data file takes either form:

```js
title: "Same text in both languages"
title: { en: "English text", zh: "中文文本" }
```

Arrays work the same way, so a bio can have a different number of paragraphs in
each language:

```js
bio: { en: ["...", "..."], zh: ["..."] }
```

If one language is missing, the other is shown rather than an empty space. That
keeps the site usable while it is half translated.

Interface wording — section headings, button labels, empty states — is not
content and lives in `assets/js/i18n.js`. Add a key under both `en` and `zh`,
then reference it from HTML with `data-i18n="key"`.

The language toggle sits in the header, remembers the choice in `localStorage`,
and switches the page in place without reloading. First-time visitors get
Chinese if their browser prefers it, English otherwise.

## Adding content

**A publication.** Append an entry to `window.PUBLICATIONS` in
`data/publications.js`. Entries are grouped and sorted by year automatically.
Set `type` to say what it is. `book`, `chapter` and `monograph` appear in the
Books section; everything
else appears under Publications, where `journal` and `conference` can be
filtered apart. For a book, `venue` holds the publisher.

Set `corresponding: true` if you were a corresponding author; first authorship
is read off the author list, so it needs no field of its own. The two together
drive the author-position filter.

Set `topic` to one or more ids from `window.TOPICS` at the top of the same
file: `optimization`, `pinn` or `agentic`. Those three are the only filter the
reader gets, and they mirror the three research directions. To rename one, edit
its `label` in `window.TOPICS`; leave the `id` alone, since that is what every
publication stores.
Any key in `links` that has a value renders as a link; empty ones are skipped.
Paper titles and venue names normally stay in English in both languages.

**A project.** Append an entry to `window.PROJECTS` in `data/projects.js`. For a
project that needs its own page, copy `projects/_template.html` to
`projects/<id>.html` where `<id>` matches the entry's `id`, then set
`detail: true`. On that page the prose is hand written, so each block is marked
`data-lang="en"` or `data-lang="zh"` and only the matching one is shown.

**A contact link.** Each entry in `SITE.links` may carry an `icon` naming one of
the inline SVG icons in `assets/js/site.js`: email, scholar, github, orcid,
linkedin, cv, link. Omit it and the destination decides, so a mailto link gets
the envelope and a .pdf gets the document icon without any extra work. To add a
new icon, put its path in the `ICONS` map; do not pull in an icon font or a CDN.

**A section icon.** Every heading shows one. A heading written in
`index.html` names it with `data-icon`, a CV section with `icon` in
`data/cv.js`; both look the name up in `SECTION_ICONS` in `assets/js/site.js`,
which holds experience, interests, news, publications, projects, awards, talks,
teaching, service, skills and contact. Add a new one there, as inline SVG.

**Contact details.** `profile.email` and `profile.address` in `data/site.js` feed
the Contact section at the foot of the page. The address is one array entry per
line and stays in English in both languages, because a postal service has to
read it.

**A demo.** Put an `.mp4` or `.webm` in `assets/demo/` and point the project's
`media` field at it. Video files autoplay muted and loop on the card. Keep them
under a few megabytes; GitHub Pages has no streaming.

**A CV entry.** Append it to the right section in `data/cv.js`, anywhere in the
list. Sections whose entries all carry a date are sorted newest first for you,
so position in the file does not matter; an entry running to the present is
written as `2026.09 - present` or `2026.09 至今` and sorts above everything.
A section whose entries carry no date, such as Academic Service, keeps the
order you write.

A section marked `top: true` appears near the head of the page, above the
research interests. Experience is marked that way, and it holds posts and
degrees in one list; the rest sit below the projects.

**A PDF.** Put it in `assets/pdf/` and reference it as `assets/pdf/name.pdf`.

The `selected` flag on a publication and `featured` on a project are carried
over from the earlier multi-page layout and currently do nothing, since the one
page shows every entry. They still work if a shortened list is ever wanted.

## Local preview

Double-clicking `index.html` works, because the data files are plain scripts
rather than JSON fetched over XHR. To preview over HTTP instead:

```bash
npx serve .
```

## Deploying to GitHub Pages

Push to `main`, then in the repository settings enable Pages with source
"Deploy from a branch", branch `main`, folder `/ (root)`. The `.nojekyll` file
at the root stops GitHub from running Jekyll over the site.

The site will be served at `https://jiangtaoshen.github.io/Tao-s-page/`. For a
bare `https://jiangtaoshen.github.io/`, rename the repository to
`JiangtaoShen.github.io`.

## Conventions

- Colors are CSS custom properties on `:root` in `style.css`. Dark mode
  overrides only the token values, so never hardcode a color elsewhere.
- Dark mode follows the system setting and can be overridden by the toggle,
  which persists in `localStorage`.
- Pages in a subdirectory must set `window.BASE = "../"` before loading
  `assets/js/site.js`, so generated links resolve.
- Data files are UTF-8 and contain Chinese characters directly, not escape
  sequences. Keep them that way so they stay editable.
- The page uses three font sizes only: `--fs-lg` for the name, `--fs-base` for
  text, `--fs-sm` for metadata. Use a token, never a raw size.
- The whole page is set in one typeface, Source Serif 4, self-hosted in
  `assets/fonts/`. No CDN, so the page still works offline. Monospace is used
  for code blocks only. Chinese falls through to the platform font, because a
  CJK webfont would be several megabytes.
