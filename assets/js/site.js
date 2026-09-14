/* ==========================================================================
   Shared rendering for every page, bilingual (English / Chinese).

   Pages declare what they want by placing an element with a known id:
     #site-header  #site-footer  #hero  #news  #interests
     #pub-list (+ optional #pub-toolbar)  #project-list  #cv
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

  /* --- theme ------------------------------------------------------------ */

  // Inline so the icons never depend on a font that lacks the glyph.
  var SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"'
          + ' stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">';
  var ICON_MOON = SVG + '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5z"/></svg>';
  var ICON_SUN = SVG + '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.4v2.2M12 19.4v2.2'
               + 'M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6'
               + 'M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"/></svg>';

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

  var NAV = [
    { href: "index.html",        key: "nav.about" },
    { href: "publications.html", key: "nav.publications" },
    { href: "projects.html",     key: "nav.projects" },
    { href: "cv.html",           key: "nav.cv" }
  ];

  function currentPage() {
    var p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  function renderHeader() {
    var el = mount("site-header");
    if (!el) return;
    var here = currentPage();
    var inSub = BASE !== "";
    var nav = NAV.map(function (n) {
      var active = !inSub && n.href === here;
      return '<a href="' + esc(BASE + n.href) + '"'
             + (active ? ' aria-current="page"' : "") + ">" + esc(tr(n.key)) + "</a>";
    }).join("");

    el.className = "site-header";
    el.innerHTML =
      '<div class="wrap">'
      + '<a class="brand" href="' + esc(BASE + "index.html") + '">'
      + esc(t(SITE.brand) || t(SITE.profile && SITE.profile.name) || "Home") + "</a>"
      + '<nav class="nav">' + nav
      + '<button class="lang-toggle" type="button" aria-label="' + esc(tr("lang.switchToLabel"))
      + '">' + esc(tr("lang.switchTo")) + "</button>"
      + '<button class="theme-toggle" type="button"></button>'
      + "</nav></div>";

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
               + esc(t(l.label)) + "</a>";
      }).join("");
    var bio = list(p.bio).map(function (x) { return "<p>" + x + "</p>"; }).join("");
    var second = alt(p.name);

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

  function authorsHtml(authors) {
    var self = t(SELF);
    return list(authors).map(function (a) {
      var clean = String(t(a)).replace(/\*+$/, "").trim();
      var mine = self && clean.toLowerCase() === String(self).toLowerCase();
      return mine ? '<span class="me">' + esc(clean) + "</span>" : esc(clean);
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

  // Filter state is kept outside the render so switching language does not
  // reset the chips the reader has chosen.
  var pubState = { type: "all", topic: "all", q: "" };

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
        if (pubState.type !== "all" && p.type !== pubState.type) return false;
        if (pubState.topic !== "all"
            && list(p.topic).map(String).indexOf(pubState.topic) === -1) return false;
        if (pubState.q) {
          var hay = [t(p.title), t(p.venue), authorsPlain(p.authors), list(p.topic).join(" ")]
            .join(" ").toLowerCase();
          if (hay.indexOf(pubState.q) === -1) return false;
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

  // Searching should match a name in either language.
  function authorsPlain(authors) {
    return list(authors).map(function (a) {
      if (a && typeof a === "object") {
        return LANGS.map(function (l) { return a[l] || ""; }).join(" ");
      }
      return String(a);
    }).join(" ");
  }

  function buildToolbar(bar, pool, draw) {
    var types = [];
    var topics = [];
    pool.forEach(function (p) {
      if (has(p.type) && types.indexOf(p.type) === -1) types.push(p.type);
      list(p.topic).forEach(function (x) {
        if (topics.indexOf(String(x)) === -1) topics.push(String(x));
      });
    });

    function typeLabel(v) {
      var key = "type." + v;
      var label = tr(key);
      return label === key ? v.charAt(0).toUpperCase() + v.slice(1) : label;
    }

    function chips(values, key, allLabel, label) {
      return '<div class="filters" data-key="' + key + '">'
        + '<button class="chip" type="button" data-value="all" aria-pressed="'
        + (pubState[key] === "all") + '">' + esc(allLabel) + "</button>"
        + values.map(function (v) {
            return '<button class="chip" type="button" data-value="' + esc(v)
              + '" aria-pressed="' + (pubState[key] === v) + '">'
              + esc(label(v)) + "</button>";
          }).join("")
        + "</div>";
    }

    bar.className = "toolbar";
    bar.innerHTML = chips(types, "type", tr("filter.all"), typeLabel)
      + (topics.length
          ? chips(topics, "topic", tr("filter.allTopics"), function (v) { return v; })
          : "")
      + '<input class="search" type="search" placeholder="' + esc(tr("filter.search"))
      + '" aria-label="' + esc(tr("filter.searchLabel")) + '" value="'
      + esc(pubState.q) + '">';

    bar.querySelectorAll(".filters").forEach(function (row) {
      row.addEventListener("click", function (e) {
        var btn = e.target.closest(".chip");
        if (!btn) return;
        row.querySelectorAll(".chip").forEach(function (c) {
          c.setAttribute("aria-pressed", String(c === btn));
        });
        pubState[row.dataset.key] = btn.dataset.value;
        draw();
      });
    });

    var input = bar.querySelector(".search");
    input.addEventListener("input", function () {
      pubState.q = input.value.trim().toLowerCase();
      draw();
    });
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

  function renderCV() {
    var el = mount("cv");
    if (!el) return;
    el.innerHTML = CV.map(function (sec) {
      var items = (sec.items || []).map(function (it) {
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
      return '<section><h2 class="section-title">' + esc(t(sec.heading)) + "</h2>"
        + items + "</section>";
    }).join("");
  }

  /* --- static markup ---------------------------------------------------- */

  function applyStatic() {
    document.querySelectorAll("[data-i18n]").forEach(function (n) {
      n.textContent = tr(n.getAttribute("data-i18n"));
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
    renderPublications();
    renderProjects();
    renderCV();
    renderFooter();
  }

  function boot() {
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
