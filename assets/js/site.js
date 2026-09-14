/* ==========================================================================
   Shared rendering for every page, bilingual (English / Chinese).

   Pages declare what they want by placing an element with a known id:
     #site-header  #site-footer  #hero  #news  #interests
     #pub-list (+ optional #pub-toolbar)  #project-list  #cv  #contact
   Anything absent is simply skipped, so one script serves all pages.

   Static markup is translated through attributes:
     data-i18n="key"        replaces textContent
     data-i18n-html="key"   replaces innerHTML, for strings containing links
     data-i18n-title="key"  sets the document title, brand name appended

   Content fields in data/*.js may be a plain string, used in both languages,
   or an object { en: "...", zh: "..." }. Arrays may be wrapped the same way.

   Pages inside a subdirectory must set  window.BASE = "../"  before loading
   this file, so generated links resolve correctly.
   ========================================================================== */

(function () {
  "use strict";

  var BASE = window.BASE || "";
  var SITE = window.SITE || {};
  var PUBS = window.PUBLICATIONS || [];
  var PROJECTS = window.PROJECTS || [];
  var CV = window.CV || [];
  var TOPICS = window.TOPICS || [];
  var DICT = window.I18N || { en: {}, zh: {} };
  var SELF = window.AUTHOR_SELF || {};

  var LANGS = ["en", "zh"];
  var lang = "en";

  /* --- language --------------------------------------------------------- */

  function storedLang() {
    var v = null;
    try { v = localStorage.getItem("lang"); } catch (e) { /* private mode */ }
    if (LANGS.indexOf(v) !== -1) return v;
    var nav = (navigator.language || "").toLowerCase();
    return nav.indexOf("zh") === 0 ? "zh" : "en";
  }

  function setLang(next) {
    lang = LANGS.indexOf(next) === -1 ? "en" : next;
    try { localStorage.setItem("lang", lang); } catch (e) { /* ignore */ }
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    render();
  }

  // Interface string by key.
  function tr(key) {
    var table = DICT[lang] || {};
    if (table[key] != null) return table[key];
    if (DICT.en && DICT.en[key] != null) return DICT.en[key];
    return key;
  }

  // Content value: plain, or { en, zh }. Falls back to the other language
  // rather than rendering nothing, which matters while a site is half filled.
  function t(v) {
    if (v == null) return "";
    if (typeof v !== "object" || Array.isArray(v)) return v;
    if (v[lang] != null && v[lang] !== "") return v[lang];
    var other = lang === "en" ? "zh" : "en";
    return v[other] != null ? v[other] : "";
  }

  // The same field in the other language, when it differs. Used to show the
  // Chinese name beside the English one and the other way round.
  function alt(v) {
    if (!v || typeof v !== "object" || Array.isArray(v)) return "";
    var other = lang === "en" ? "zh" : "en";
    if (!has(v[other]) || v[other] === v[lang]) return "";
    return v[other];
  }

  /* --- helpers ---------------------------------------------------------- */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Leaves absolute URLs, mailto: and anchors untouched; prefixes local paths.
  function url(u) {
    u = t(u);
    if (!u) return "";
    if (/^([a-z]+:|\/|#)/i.test(u)) return u;
    return BASE + u;
  }

  function has(v) { return v != null && String(v).trim() !== ""; }

  function mount(id) { return document.getElementById(id); }

  function isVideo(src) { return /\.(mp4|webm|ogv)$/i.test(src || ""); }

  function list(v) {
    var out = t(v);
    return Array.isArray(out) ? out : (has(out) ? [out] : []);
  }

  var LINK_LABELS = {
    pdf: "PDF", arxiv: "arXiv", code: "Code", project: "Project",
    video: "Video", slides: "Slides", poster: "Poster", doi: "DOI",
    bibtex: "BibTeX", demo: "Demo", paper: "Paper", data: "Data", doc: "Docs"
  };

  // Keeps a stable, sensible order regardless of how the data file lists them.
  var LINK_ORDER = ["pdf", "arxiv", "doi", "code", "demo", "project", "paper",
                    "data", "video", "slides", "poster", "doc", "bibtex"];

  function linkRow(links) {
    if (!links) return "";
    var keys = LINK_ORDER.filter(function (k) { return has(t(links[k])); });
    Object.keys(links).forEach(function (k) {
      if (LINK_ORDER.indexOf(k) === -1 && has(t(links[k]))) keys.push(k);
    });
    if (!keys.length) return "";
    return '<div class="linkrow">' + keys.map(function (k) {
      return '<a href="' + esc(url(links[k])) + '" target="_blank" rel="noopener">'
             + esc(LINK_LABELS[k] || k) + "</a>";
    }).join("") + "</div>";
  }

  /* --- link icons -------------------------------------------------------- */

  // Inline SVG, so the icons need no font, no icon library and no network.
  // All of them use currentColor, so they follow the link colour in both themes.

  function strokeIcon(inner) {
    return '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor"'
      + ' stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'
      + ' aria-hidden="true" focusable="false">' + inner + "</svg>";
  }

  function solidIcon(inner) {
    return '<svg class="ico" viewBox="0 0 24 24" fill="currentColor"'
      + ' aria-hidden="true" focusable="false">' + inner + "</svg>";
  }

  var ICONS = {
    email: strokeIcon('<rect x="2.6" y="4.6" width="18.8" height="14.8" rx="2.2"/>'
      + '<path d="M3.2 6.6 12 12.6l8.8-6"/>'),

    // A mortarboard, for Google Scholar.
    scholar: strokeIcon('<path d="M12 3.6 1.8 8.4 12 13.2l10.2-4.8L12 3.6Z"/>'
      + '<path d="M5.6 10.6V16c0 1.6 2.9 2.9 6.4 2.9s6.4-1.3 6.4-2.9v-5.4"/>'
      + '<path d="M21.6 9.1v5.1"/>'),

    github: solidIcon('<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>'),

    // The ORCID mark: a filled disc with the iD letterform reversed out.
    orcid: solidIcon('<path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.588-1.444 3.588-3.722 0-2.016-1.091-3.722-3.588-3.722h-2.297z"/>'),

    linkedin: solidIcon('<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>'),

    // A sheet of paper, for a CV or any other PDF.
    cv: strokeIcon('<path d="M14.2 2.8H7a2 2 0 0 0-2 2v14.4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.6Z"/>'
      + '<path d="M14.2 2.8v4.8H19"/>'
      + '<path d="M8.6 13h6.8M8.6 16.4h4.6"/>'),

    // Fallback for anything else: a box with an arrow leaving it.
    link: strokeIcon('<path d="M14 4.6h5.4V10"/>'
      + '<path d="M19.4 4.6 10.6 13.4"/>'
      + '<path d="M18.2 14.4v4.2a1.8 1.8 0 0 1-1.8 1.8H5.4a1.8 1.8 0 0 1-1.8-1.8V7.6a1.8 1.8 0 0 1 1.8-1.8h4.2"/>')
  };

  // An explicit `icon` on the link wins. Otherwise the destination decides, so
  // a link added later gets a sensible icon without touching this file.
  function iconFor(entry) {
    var name = entry.icon;
    if (!name) {
      var target = String(t(entry.url) || "").toLowerCase();
      if (target.indexOf("mailto:") === 0) name = "email";
      else if (target.indexOf("scholar.google") !== -1) name = "scholar";
      else if (target.indexOf("github.com") !== -1) name = "github";
      else if (target.indexOf("orcid.org") !== -1) name = "orcid";
      else if (target.indexOf("linkedin.com") !== -1) name = "linkedin";
      else if (/\.pdf($|[?#])/.test(target)) name = "cv";
      else name = "link";
    }
    return ICONS[name] || ICONS.link;
  }

  // Section heading icons, same inline-SVG approach as the link icons above.
  var SECTION_ICONS = {
    experience: strokeIcon('<rect x="2.6" y="7.4" width="18.8" height="12.6" rx="2"/>'
      + '<path d="M8.6 7.4V5.6a2 2 0 0 1 2-2h2.8a2 2 0 0 1 2 2v1.8"/>'
      + '<path d="M2.6 12.4h18.8"/>'),

    interests: strokeIcon('<path d="M12 3.2a5.8 5.8 0 0 0-3.4 10.5c.6.45.95 1.1.95 1.8v.5h4.9v-.5'
      + 'c0-.7.35-1.35.95-1.8A5.8 5.8 0 0 0 12 3.2Z"/>'
      + '<path d="M9.55 18.4h4.9"/><path d="M10.4 21h3.2"/>'),

    news: strokeIcon('<path d="M4 9.6h2.6L14 5.4v13.2L6.6 14.4H4a1.4 1.4 0 0 1-1.4-1.4v-2'
      + 'A1.4 1.4 0 0 1 4 9.6Z"/>'
      + '<path d="M17.6 9.4a3.6 3.6 0 0 1 0 5.2"/>'
      + '<path d="M7.6 15.4v2.4a1.8 1.8 0 0 0 1.8 1.8h.6"/>'),

    publications: strokeIcon('<path d="M3.4 5.2h4.8a3.8 3.8 0 0 1 3.8 3.8v10.6'
      + 'a2.8 2.8 0 0 0-2.8-2.8H3.4Z"/>'
      + '<path d="M20.6 5.2h-4.8a3.8 3.8 0 0 0-3.8 3.8v10.6a2.8 2.8 0 0 1 2.8-2.8h5.8Z"/>'),

    projects: strokeIcon('<path d="M3 6.6a2 2 0 0 1 2-2h3.6l2 2.6H19a2 2 0 0 1 2 2v8.2'
      + 'a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>'),

    awards: strokeIcon('<circle cx="12" cy="9" r="5.2"/>'
      + '<path d="M8.6 13.6 7.2 21l4.8-2.6L16.8 21l-1.4-7.4"/>'),

    talks: strokeIcon('<rect x="9.2" y="2.8" width="5.6" height="11" rx="2.8"/>'
      + '<path d="M5.8 11.6a6.2 6.2 0 0 0 12.4 0"/><path d="M12 17.8V21"/>'),

    teaching: strokeIcon('<path d="M12 3.6 1.8 8.4 12 13.2l10.2-4.8L12 3.6Z"/>'
      + '<path d="M5.6 10.6V16c0 1.6 2.9 2.9 6.4 2.9s6.4-1.3 6.4-2.9v-5.4"/>'),

    service: strokeIcon('<path d="M9 4.4H7a2 2 0 0 0-2 2v12.2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6.4'
      + 'a2 2 0 0 0-2-2h-2"/>'
      + '<rect x="9" y="2.6" width="6" height="3.6" rx="1"/>'
      + '<path d="m9.4 13.2 1.9 1.9 3.6-3.6"/>'),

    skills: strokeIcon('<path d="M14.6 6.4a3.6 3.6 0 0 1 4.9-3.3l-2.6 2.6.7 2.6 2.6.7 2.6-2.6'
      + 'a3.6 3.6 0 0 1-4.6 4.4L6.3 20.8a2 2 0 1 1-2.8-2.8L15.5 9.6a3.6 3.6 0 0 1-.9-3.2Z"/>'),

    contact: strokeIcon('<path d="M12 21.4s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/>'
      + '<circle cx="12" cy="10.4" r="2.6"/>')
  };

  function sectionIcon(name) {
    return name && SECTION_ICONS[name] ? SECTION_ICONS[name] : "";
  }

  /* --- theme ------------------------------------------------------------ */

  // Inline so the icons never depend on a font that lacks the glyph.
  var SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"'
          + ' stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">';
  var ICON_MOON = SVG + '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5z"/></svg>';
  var ICON_SUN = SVG + '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.4v2.2M12 19.4v2.2'
               + 'M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6'
               + 'M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"/></svg>';

  var ICON_EXPAND = SVG + '<path d="M5 5.5v13"/><path d="m12 6.5 5.5 5.5-5.5 5.5"/></svg>';
  var ICON_COLLAPSE = SVG + '<path d="M5 5.5v13"/><path d="m17.5 6.5-5.5 5.5 5.5 5.5"/></svg>';

  function isDark() {
    var set = document.documentElement.getAttribute("data-theme");
    if (set) return set === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function paintTheme(btn) {
    var dark = isDark();
    btn.innerHTML = dark ? ICON_SUN : ICON_MOON;
    btn.setAttribute("aria-label", dark ? tr("theme.toLight") : tr("theme.toDark"));
  }

  function applyStoredTheme() {
    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (e) { /* ignore */ }
    if (stored === "dark" || stored === "light") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  }

  function toggleTheme() {
    var next = isDark() ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  }

  /* --- header and footer ------------------------------------------------ */

  // The site is a single page, so the header carries no navigation: just the
  // name and the two toggles.
  function renderHeader() {
    var el = mount("site-header");
    if (!el) return;

    el.className = "site-header";
    el.innerHTML =
      '<div class="wrap">'
      + '<a class="brand" href="' + esc(BASE + "index.html") + '">'
      + esc(t(SITE.brand) || t(SITE.profile && SITE.profile.name) || "Home") + "</a>"
      + '<div class="controls">'
      + '<button class="lang-toggle" type="button" aria-label="' + esc(tr("lang.switchToLabel"))
      + '">' + esc(tr("lang.switchTo")) + "</button>"
      + '<button class="theme-toggle" type="button"></button>'
      + "</div></div>";

    var themeBtn = el.querySelector(".theme-toggle");
    paintTheme(themeBtn);
    themeBtn.addEventListener("click", function () {
      toggleTheme();
      paintTheme(themeBtn);
    });

    el.querySelector(".lang-toggle").addEventListener("click", function () {
      setLang(lang === "en" ? "zh" : "en");
    });

  }

  function renderFooter() {
    var el = mount("site-footer");
    if (!el) return;
    var f = SITE.footer || {};
    var name = t(SITE.profile && SITE.profile.name) || "";
    el.className = "site-footer";
    el.innerHTML = '<div class="wrap">'
      + "<span>© " + new Date().getFullYear() + " " + esc(name) + "</span>"
      + "<span>" + (has(f.updated) ? esc(tr("footer.updated")) + " " + esc(t(f.updated)) : "")
      + "</span></div>";
  }

  /* --- hero, news, interests -------------------------------------------- */

  function renderHero() {
    var el = mount("hero");
    if (!el) return;
    var p = SITE.profile || {};
    var photo = has(t(p.photo))
      ? '<img class="hero-photo" src="' + esc(url(p.photo)) + '" alt="' + esc(t(p.name)) + '">'
      : "";
    var links = (SITE.links || []).filter(function (l) { return has(t(l.url)); })
      .map(function (l) {
        var target = t(l.url);
        var ext = /^https?:/i.test(target);
        return '<a href="' + esc(url(l.url)) + '"'
               + (ext ? ' target="_blank" rel="noopener"' : "") + ">"
               + iconFor(l) + "<span>" + esc(t(l.label)) + "</span></a>";
      }).join("");
    var bio = list(p.bio).map(function (x) { return "<p>" + x + "</p>"; }).join("");
    // The Chinese name appears beside the English one only on the Chinese
    // page. The English page shows the English name on its own.
    var second = lang === "zh" ? alt(p.name) : "";

    el.className = "hero";
    el.innerHTML = photo
      + '<div class="hero-body">'
      + '<h1 class="hero-name">' + esc(t(p.name) || "")
      + (second ? ' <span class="hero-alt">' + esc(second) + "</span>" : "")
      + "</h1>"
      + '<p class="hero-role">' + esc(t(p.role) || "")
      + (has(t(p.affiliation)) ? '<span class="affil">' + esc(t(p.affiliation)) + "</span>" : "")
      + (has(t(p.location)) ? '<span class="affil">' + esc(t(p.location)) + "</span>" : "")
      + "</p>"
      + (links ? '<div class="hero-links">' + links + "</div>" : "")
      + (bio ? '<div class="bio">' + bio + "</div>" : "")
      + "</div>";
  }

  function renderInterests() {
    var el = mount("interests");
    if (!el) return;
    var items = list(SITE.profile && SITE.profile.interests);
    el.innerHTML = items.length
      ? '<ul class="interests">' + items.map(function (i) {
          return "<li>" + esc(i) + "</li>";
        }).join("") + "</ul>"
      : "";
  }

  // Reuses the CV two-column rows, so contact details line up the same way.
  function renderContact() {
    var el = mount("contact");
    if (!el) return;
    var p = SITE.profile || {};
    var rows = "";

    if (has(t(p.email))) {
      var mail = t(p.email);
      rows += '<div class="entry"><div class="entry-when">' + esc(tr("contact.email"))
        + '</div><div class="entry-what"><a href="mailto:' + esc(mail) + '">'
        + esc(mail) + "</a></div></div>";
    }

    var lines = list(p.address);
    if (lines.length) {
      rows += '<div class="entry"><div class="entry-when">' + esc(tr("contact.address"))
        + '</div><div class="entry-what"><address class="postal">'
        + lines.map(esc).join("<br>") + "</address></div></div>";
    }

    el.innerHTML = rows;
  }

  function renderNews() {
    var el = mount("news");
    if (!el) return;
    var items = (SITE.news || []).slice();
    var limit = SITE.newsLimit;
    if (limit && limit > 0) items = items.slice(0, limit);
    if (!items.length) {
      el.innerHTML = '<li class="empty">' + esc(tr("empty.news")) + "</li>";
      return;
    }
    el.className = "news";
    el.innerHTML = items.map(function (n) {
      return "<li><time>" + esc(t(n.date)) + "</time><span>" + t(n.text) + "</span></li>";
    }).join("");
  }

  /* --- publications ----------------------------------------------------- */

  // Collects every spelling of a value, so a name written { en, zh } matches
  // whichever language the reader is not currently looking at.
  function spellings(v) {
    var out = [];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      LANGS.forEach(function (l) { if (has(v[l])) out.push(String(v[l])); });
    } else if (has(v)) {
      out.push(String(v));
    }
    return out.map(function (x) { return x.replace(/\*+$/, "").trim().toLowerCase(); });
  }

  function isSelf(author) {
    var mine = spellings(SELF);
    return spellings(author).some(function (n) { return mine.indexOf(n) !== -1; });
  }

  // First author, or corresponding author as flagged in the data file. The
  // first author can be read off the list; who corresponded cannot, so that
  // one has to be stated.
  function isLeadAuthor(p) {
    if (p.corresponding === true) return true;
    var first = list(p.authors)[0];
    return first != null && isSelf(first);
  }

  function authorsHtml(authors) {
    return list(authors).map(function (a) {
      var shown = String(t(a)).replace(/\*+$/, "").trim();
      return isSelf(a) ? '<span class="me">' + esc(shown) + "</span>" : esc(shown);
    }).join(lang === "zh" ? "、" : ", ");
  }

  function pubHtml(p) {
    var thumb = has(t(p.thumb))
      ? '<img class="pub-thumb" src="' + esc(url(p.thumb)) + '" alt="" loading="lazy">'
      : "";
    var venue = [has(t(p.venue)) ? esc(t(p.venue)) : "", p.year ? esc(p.year) : ""]
      .filter(Boolean).join(", ");
    return '<article class="pub">' + thumb
      + '<div class="pub-body">'
      + '<h3 class="pub-title">' + esc(t(p.title)) + "</h3>"
      + '<p class="pub-authors">' + authorsHtml(p.authors) + "</p>"
      + '<p class="pub-venue">' + venue
      + (has(t(p.note)) ? '<span class="pub-note">' + esc(t(p.note)) + "</span>" : "")
      + "</p>"
      + linkRow(p.links)
      + "</div></article>";
  }

  function groupByYear(items) {
    var years = {};
    items.forEach(function (p) {
      var y = p.year || "Other";
      (years[y] = years[y] || []).push(p);
    });
    return Object.keys(years)
      .sort(function (a, b) { return Number(b) - Number(a); })
      .map(function (y) { return { year: y, items: years[y] }; });
  }

  // What a publication is, as opposed to what it is about. The structure lives
  // here because it is interface vocabulary, not the user's content; the words
  // come from assets/js/i18n.js. `types` lists the values a publication's
  // `type` field may hold to count as this kind.
  var KINDS = [
    { id: "book", key: "kind.book", types: ["book", "chapter", "monograph"] },
    {
      id: "paper",
      key: "kind.paper",
      types: ["journal", "conference", "preprint"],
      subtypes: [
        { id: "journal", key: "kind.journal" },
        { id: "conference", key: "kind.conference" }
      ]
    }
  ];

  function kindById(id) {
    var found = null;
    KINDS.forEach(function (k) { if (k.id === id) found = k; });
    return found;
  }

  // Filter state is kept outside the render so switching language does not
  // reset the chips the reader has chosen.
  var pubState = { topic: "all", role: "all", kind: "all", subtype: "all" };

  function renderPublications() {
    var el = mount("pub-list");
    if (!el) return;
    var selectedOnly = el.dataset.selected === "true";
    var pool = selectedOnly ? PUBS.filter(function (p) { return p.selected; }) : PUBS;

    var bar = mount("pub-toolbar");
    if (bar) buildToolbar(bar, pool, draw);
    draw();

    function draw() {
      var items = pool.filter(function (p) {
        if (pubState.topic !== "all"
            && list(p.topic).map(String).indexOf(pubState.topic) === -1) return false;
        if (pubState.role === "lead" && !isLeadAuthor(p)) return false;

        if (pubState.kind !== "all") {
          var kind = kindById(pubState.kind);
          if (!kind || kind.types.indexOf(String(p.type)) === -1) return false;
          if (pubState.subtype !== "all" && String(p.type) !== pubState.subtype) return false;
        }
        return true;
      });

      if (!items.length) {
        el.innerHTML = '<p class="empty">' + esc(tr("empty.pubs")) + "</p>";
        return;
      }
      if (selectedOnly) {
        items = items.slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
        el.innerHTML = items.map(pubHtml).join("");
        return;
      }
      el.innerHTML = groupByYear(items).map(function (g) {
        return '<div class="year-group"><p class="year-label">' + esc(g.year) + "</p>"
          + g.items.map(pubHtml).join("") + "</div>";
      }).join("");
    }
  }

  // Only topics filter the list. The chips follow the order declared in
  // window.TOPICS; a topic with no publications is still shown, so the three
  // research directions always read as a complete set.
  // Rows of chips: topic, author position, publication kind, and the kind's
  // subtypes. They all narrow the same list, so they combine. The subtype row
  // is always in the DOM and merely hidden, so choosing a kind never rebuilds
  // the toolbar and never takes focus off the chip just clicked.
  function buildToolbar(bar, pool, draw) {
    var known = TOPICS.map(function (x) { return String(x.id); });

    // Anything tagged with an id that is not registered still gets a chip,
    // rather than becoming unreachable.
    pool.forEach(function (p) {
      list(p.topic).forEach(function (x) {
        if (known.indexOf(String(x)) === -1) known.push(String(x));
      });
    });

    function topicLabel(id) {
      var found = null;
      TOPICS.forEach(function (x) { if (String(x.id) === id) found = x; });
      return found ? t(found.label) : id;
    }

    function chip(key, value, text) {
      return '<button class="chip" type="button" data-value="' + esc(value)
        + '" aria-pressed="' + (pubState[key] === value) + '">' + esc(text) + "</button>";
    }

    function row(key, chips, hidden) {
      return '<div class="filters" data-key="' + key + '"' + (hidden ? " hidden" : "")
        + ">" + chips.join("") + "</div>";
    }

    // Only one kind declares subtypes today, and the row belongs to it.
    var nested = null;
    KINDS.forEach(function (k) { if (k.subtypes && !nested) nested = k; });

    bar.className = "toolbar";
    bar.innerHTML =
      row("topic", [chip("topic", "all", tr("filter.allTopics"))].concat(
        known.map(function (id) { return chip("topic", id, topicLabel(id)); })
      ))
      + row("role", [
          chip("role", "all", tr("filter.allRoles")),
          chip("role", "lead", tr("filter.lead"))
        ])
      + row("kind", [chip("kind", "all", tr("filter.allKinds"))].concat(
          KINDS.map(function (k) { return chip("kind", k.id, tr(k.key)); })
        ))
      + (nested
          ? row("subtype",
              [chip("subtype", "all", tr("filter.allSubtypes"))].concat(
                nested.subtypes.map(function (x) { return chip("subtype", x.id, tr(x.key)); })
              ),
              pubState.kind !== nested.id)
          : "");

    var subtypeRow = bar.querySelector('.filters[data-key="subtype"]');

    function syncSubtypeRow() {
      if (!subtypeRow || !nested) return;
      var show = pubState.kind === nested.id;
      subtypeRow.hidden = !show;
      if (!show && pubState.subtype !== "all") {
        pubState.subtype = "all";
        subtypeRow.querySelectorAll(".chip").forEach(function (c) {
          c.setAttribute("aria-pressed", String(c.dataset.value === "all"));
        });
      }
    }

    bar.querySelectorAll(".filters").forEach(function (group) {
      group.addEventListener("click", function (e) {
        var btn = e.target.closest(".chip");
        if (!btn) return;
        group.querySelectorAll(".chip").forEach(function (c) {
          c.setAttribute("aria-pressed", String(c === btn));
        });
        pubState[group.dataset.key] = btn.dataset.value;
        if (group.dataset.key === "kind") syncSubtypeRow();
        draw();
      });
    });

    syncSubtypeRow();
  }

  /* --- projects --------------------------------------------------------- */

  function projectHtml(p) {
    var src = t(p.media);
    var media = "";
    if (has(src)) {
      media = isVideo(src)
        ? '<video class="card-media" src="' + esc(url(p.media))
          + '" autoplay muted loop playsinline></video>'
        : '<img class="card-media" src="' + esc(url(p.media)) + '" alt="" loading="lazy">';
    }
    var href = p.detail
      ? url("projects/" + p.id + ".html")
      : (p.links && (t(p.links.demo) || t(p.links.code) || t(p.links.paper))) || "";
    var title = href
      ? '<a href="' + esc(href) + '">' + esc(t(p.title)) + "</a>"
      : esc(t(p.title));
    var tags = list(p.tags).map(function (x) {
      return '<span class="tag">' + esc(x) + "</span>";
    }).join("");

    return '<article class="card">' + media
      + '<div class="card-body">'
      + '<h3 class="card-title">' + title + "</h3>"
      + (has(t(p.period)) ? '<p class="card-period">' + esc(t(p.period)) + "</p>" : "")
      + '<p class="card-text">' + esc(t(p.blurb) || "") + "</p>"
      + (tags ? '<div class="tags">' + tags + "</div>" : "")
      + linkRow(p.links)
      + "</div></article>";
  }

  function renderProjects() {
    var el = mount("project-list");
    if (!el) return;
    var featuredOnly = el.dataset.featured === "true";
    var items = featuredOnly ? PROJECTS.filter(function (p) { return p.featured; }) : PROJECTS;
    el.className = "grid";
    el.innerHTML = items.length
      ? items.map(projectHtml).join("")
      : '<p class="empty">' + esc(tr("empty.projects")) + "</p>";
  }

  /* --- cv --------------------------------------------------------------- */

  // Ranks a `when` string so entries can be ordered newest first. Reads every
  // year in the text and keeps the latest, so a range like "2025.04 - 2026.09"
  // ranks on its end date. An ongoing entry outranks everything. Returns null
  // when there is no date at all.
  var ONGOING = 9e6;

  function whenRank(v) {
    var texts = [];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      LANGS.forEach(function (l) { if (has(v[l])) texts.push(String(v[l])); });
    } else if (has(v)) {
      texts.push(String(v));
    }
    var joined = texts.join(" ");
    if (/present|current|ongoing|\u81F3\u4ECA|\u73B0\u5728/i.test(joined)) return ONGOING;

    var re = /(?:19|20)\d{2}(?:[.\-\/](\d{1,2}))?/g;
    var best = null;
    var m;
    while ((m = re.exec(joined)) !== null) {
      var score = parseInt(m[0].slice(0, 4), 10) * 12 + (m[1] ? parseInt(m[1], 10) : 0);
      if (best === null || score > best) best = score;
    }
    return best;
  }

  // Sorts newest first, but only when every entry carries a date. Sections like
  // Skills, whose left column holds a category rather than a year, are left in
  // the order the data file declares.
  function sortItems(items) {
    var ranked = items.map(function (it, i) { return { it: it, r: whenRank(it.when), i: i }; });
    var datedThroughout = ranked.every(function (x) { return x.r !== null; });
    if (!datedThroughout) return items;
    return ranked.sort(function (a, b) { return (b.r - a.r) || (a.i - b.i); })
      .map(function (x) { return x.it; });
  }

  function cvSectionHtml(sec) {
    var items = sortItems(sec.items || []).map(function (it) {
      var links = (it.links || []).filter(function (l) { return has(t(l.url)); })
        .map(function (l) {
          return '<a href="' + esc(url(l.url)) + '" target="_blank" rel="noopener">'
                 + esc(t(l.label)) + "</a>";
        }).join("");
      return '<div class="entry">'
        + '<div class="entry-when">' + esc(t(it.when) || "") + "</div>"
        + '<div class="entry-what"><strong>' + esc(t(it.what) || "") + "</strong>"
        + (has(t(it.where)) ? '<div class="where">' + esc(t(it.where)) + "</div>" : "")
        + (has(t(it.detail)) ? '<p class="detail">' + esc(t(it.detail)) + "</p>" : "")
        + (links ? '<div class="linkrow">' + links + "</div>" : "")
        + "</div></div>";
    }).join("");
    var id = sec.icon ? "cv-" + sec.icon : "";
    return '<section' + (id ? ' id="' + esc(id) + '"' : "")
      + '><h2 class="section-title" data-icon="' + esc(sec.icon || "") + '">'
      + sectionIcon(sec.icon)
      + "<span>" + esc(t(sec.heading)) + "</span></h2>"
      + items + "</section>";
  }

  // Sections flagged `top: true` render into #cv-top, near the head of the page;
  // the rest go to #cv. With only one of the two mounts present, everything
  // lands there.
  function renderCV() {
    var top = mount("cv-top");
    var rest = mount("cv");
    if (!top && !rest) return;

    function html(list) { return list.map(cvSectionHtml).join(""); }

    if (!top) { rest.innerHTML = html(CV); return; }
    if (!rest) { top.innerHTML = html(CV); return; }

    top.innerHTML = html(CV.filter(function (sec) { return sec.top; }));
    rest.innerHTML = html(CV.filter(function (sec) { return !sec.top; }));
  }

  /* --- contents drawer --------------------------------------------------- */

  // The drawer is built from the headings the page actually rendered, so it
  // cannot fall out of step with the sections, and it follows the language
  // without a second list to translate.

  var tocOpen = false;

  // restoreFocus is false when the drawer closes because the reader chose a
  // section: focus belongs at the destination then, not back on the button.
  // preventScroll matters too, or moving focus fights the scroll that follows.
  function setToc(open, restoreFocus) {
    tocOpen = !!open;
    document.documentElement.classList.toggle("toc-open", tocOpen);
    var btn = mount("toc-tab");
    if (btn) btn.setAttribute("aria-expanded", String(tocOpen));
    var panel = mount("toc");
    if (tocOpen) {
      var first = panel && panel.querySelector("a");
      if (first) first.focus({ preventScroll: true });
    } else if (btn && restoreFocus !== false) {
      btn.focus({ preventScroll: true });
    }
  }

  function renderToc() {
    var panel = mount("toc");
    if (!panel) return;

    var entries = [];
    document.querySelectorAll("main .section-title").forEach(function (h, i) {
      var sec = h.closest("section");
      if (!sec) return;
      if (!sec.id) sec.id = "section-" + i;
      entries.push({
        id: sec.id,
        icon: h.getAttribute("data-icon") || "",
        label: (h.textContent || "").trim()
      });
    });

    panel.innerHTML =
      '<div class="toc-head">'
      + '<p class="toc-title">' + esc(tr("toc.title")) + "</p>"
      + '<button class="toc-close" type="button" aria-label="' + esc(tr("toc.close")) + '">'
      + ICON_COLLAPSE + "</button>"
      + "</div>"
      + '<nav><ul class="toc-list">'
      + entries.map(function (e) {
          return '<li><a href="#' + esc(e.id) + '">' + sectionIcon(e.icon)
            + "<span>" + esc(e.label) + "</span></a></li>";
        }).join("")
      + "</ul></nav>";

    panel.querySelector(".toc-close").addEventListener("click", function () {
      setToc(false);
    });

    // Scrolling is driven here rather than left to the browser. A link whose
    // hash already matches the address bar is a no-op otherwise, so the second
    // click on the same section would do nothing.
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function (e) {
        var href = a.getAttribute("href");
        var target = href && document.querySelector(href);
        setToc(false, false);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ block: "start" });
        if (history.replaceState) history.replaceState(null, "", href);
      });
    });

    // The bookmark: the only way in, and the thing the drawer retracts into.
    var tab = mount("toc-tab");
    if (tab) {
      tab.innerHTML = ICON_EXPAND;
      tab.setAttribute("aria-label", tr("toc.title"));
      tab.setAttribute("title", tr("toc.title"));
      tab.setAttribute("aria-controls", "toc");
      tab.setAttribute("aria-expanded", String(tocOpen));
      if (!tab.dataset.wired) {
        tab.dataset.wired = "1";
        tab.addEventListener("click", function () { setToc(!tocOpen); });
      }
    }

    var backdrop = mount("toc-backdrop");
    if (backdrop && !backdrop.dataset.wired) {
      backdrop.dataset.wired = "1";
      backdrop.addEventListener("click", function () { setToc(false); });
    }

    document.documentElement.classList.toggle("toc-open", tocOpen);
  }

  /* --- static markup ---------------------------------------------------- */

  function applyStatic() {
    document.querySelectorAll("[data-i18n]").forEach(function (n) {
      var icon = sectionIcon(n.getAttribute("data-icon"));
      if (icon) {
        n.innerHTML = icon + "<span>" + esc(tr(n.getAttribute("data-i18n"))) + "</span>";
      } else {
        n.textContent = tr(n.getAttribute("data-i18n"));
      }
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (n) {
      n.innerHTML = tr(n.getAttribute("data-i18n-html"));
    });
    // Hand written blocks on project pages, one copy per language.
    document.querySelectorAll("[data-lang]").forEach(function (n) {
      n.hidden = n.getAttribute("data-lang") !== lang;
    });
    var titleEl = document.querySelector("title[data-i18n-title]");
    if (titleEl) {
      var brand = t(SITE.brand);
      titleEl.textContent = tr(titleEl.getAttribute("data-i18n-title"))
        + (brand ? " · " + brand : "");
    }
  }

  /* --- boot ------------------------------------------------------------- */

  function render() {
    applyStatic();
    renderHeader();
    renderHero();
    renderInterests();
    renderNews();
    renderContact();
    renderPublications();
    renderProjects();
    renderCV();
    renderFooter();
    renderToc();
  }

  function boot() {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && tocOpen) setToc(false);
    });
    applyStoredTheme();
    lang = storedLang();
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
