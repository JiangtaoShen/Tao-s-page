# Jiangtao Shen — Academic Homepage

Source for <https://github.com/JiangtaoShen/Tao-s-page>.

A dependency-free bilingual single-page site, English and Chinese. No build
step, no package manager, no framework. Open `index.html` in a browser and it
works, including straight from the local filesystem.

## Structure

```
index.html            The whole site: about, interests, news, publications,
                      projects, CV and contact, in that order
projects/_template.html   Copy this to create a per-project detail page

data/site.js          Profile, contact links, news          <- edit these
data/publications.js  Publication list
data/projects.js      Project list
data/cv.js            CV sections

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
the name and the language and theme toggles.

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

**Contact details.** `profile.email` and `profile.address` in `data/site.js` feed
the Contact section at the foot of the page. The address is one array entry per
line and stays in English in both languages, because a postal service has to
read it.

**A demo.** Put an `.mp4` or `.webm` in `assets/demo/` and point the project's
`media` field at it. Video files autoplay muted and loop on the card. Keep them
under a few megabytes; GitHub Pages has no streaming.

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
