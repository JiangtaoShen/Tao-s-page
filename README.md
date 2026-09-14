# Jiangtao Shen — Academic Homepage

Source for <https://github.com/JiangtaoShen/Tao-s-page>.

A dependency-free static site. No build step, no package manager, no framework.
Open `index.html` in a browser and it works, including from the local filesystem.

## Structure

```
index.html            About, news, selected publications, featured projects
publications.html     Full list, grouped by year, filter by type/topic + search
projects.html         Project and demo cards
cv.html               Full CV
projects/_template.html   Copy this to create a per-project detail page

data/site.js          Profile, contact links, news          <- edit these
data/publications.js  Publication list
data/projects.js      Project list
data/cv.js            CV sections

assets/css/style.css  All styling, design tokens at the top
assets/js/site.js     All rendering, shared by every page
assets/img/           Photos, teaser images, favicon
assets/pdf/           Paper PDFs, cv.pdf
assets/demo/          Demo videos and GIFs
```

Content lives entirely in `data/*.js`. Adding a paper or a project means adding
one object to an array; no HTML is touched.

## Adding content

**A publication.** Append an entry to `window.PUBLICATIONS` in
`data/publications.js`. Set `selected: true` to also surface it on the homepage.
Any key in `links` that has a value renders as a link; empty ones are skipped.

**A project.** Append an entry to `window.PROJECTS` in `data/projects.js`. For a
project that needs its own page, copy `projects/_template.html` to
`projects/<id>.html` where `<id>` matches the entry's `id`, then set
`detail: true`.

**A demo.** Put an `.mp4` or `.webm` in `assets/demo/` and point the project's
`media` field at it. Video files autoplay muted and loop on the card. Keep them
under a few megabytes; GitHub Pages has no streaming.

**A PDF.** Put it in `assets/pdf/` and reference it as `assets/pdf/name.pdf`.

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
