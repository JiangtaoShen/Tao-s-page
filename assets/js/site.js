/* ==========================================================================
   Shared rendering for every page.

   Pages declare what they want by placing an element with a known id:
     #site-header  #site-footer  #hero  #news  #interests
     #pub-list (+ optional #pub-toolbar)  #project-list  #cv
   Anything absent is simply skipped, so one script serves all pages.

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
  var SELF = (window.AUTHOR_SELF || "").trim();

  /* --- helpers ---------------------------------------------------------- */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Leaves absolute URLs, mailto: and anchors untouched; prefixes local paths.
  function url(u) {
    if (!u) return "";
    if (/^([a-z]+:|\/|#)/i.test(u)) return u;
    return BASE + u;
  }

  function has(v) { return v != null && String(v).trim() !== ""; }

  function mount(id) { return document.getElementById(id); }

  function isVideo(src) { return /\.(mp4|webm|ogv)$/i.test(src || ""); }

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
    var out = [];
    LINK_ORDER.forEach(function (k) {
      if (has(links[k])) {
        out.push('<a href="' + esc(url(links[k])) + '" target="_blank" rel="noopener">'
                 + esc(LINK_LABELS[k] || k) + "</a>");
      }
    });
    Object.keys(links).forEach(function (k) {
      if (LINK_ORDER.indexOf(k) === -1 && has(links[k])) {
        out.push('<a href="' + esc(url(links[k])) + '" target="_blank" rel="noopener">'
                 + esc(LINK_LABELS[k] || k) + "</a>");
      }
    });
    return out.length ? '<div class="linkrow">' + out.join("") + "</div>" : "";
  }

  /* --- theme ------------------------------------------------------------ */

  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (e) { /* private mode */ }
    if (stored === "dark" || stored === "light") {
      document.documentElement.setAttribute("data-theme", stored);
    }
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    paint(btn);
    btn.addEventListener("click", function () {
      var sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var cur = document.documentElement.getAttribute("data-theme")
                || (sysDark ? "dark" : "light");
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
      paint(btn);
    });
    function paint(b) {
      var sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var dark = (document.documentElement.getAttribute("data-theme")
                  || (sysDark ? "dark" : "light")) === "dark";
      b.textContent = dark ? "☀" : "☽";
      b.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  /* --- header and footer ------------------------------------------------ */

  var NAV = [
    { href: "index.html",        label: "About" },
    { href: "publications.html", label: "Publications" },
    { href: "projects.html",     label: "Projects" },
    { href: "cv.html",           label: "CV" }
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
             + (active ? ' aria-current="page"' : "") + ">" + esc(n.label) + "</a>";
    }).join("");
    el.className = "site-header";
    el.innerHTML =
      '<div class="wrap">'
      + '<a class="brand" href="' + esc(BASE + "index.html") + '">'
      + esc(SITE.brand || (SITE.profile && SITE.profile.name) || "Home") + "</a>"
      + '<nav class="nav">' + nav
      + '<button class="theme-toggle" type="button"></button>'
      + "</nav></div>";
  }

  function renderFooter() {
    var el = mount("site-footer");
    if (!el) return;
    var f = SITE.footer || {};
    var name = (SITE.profile && SITE.profile.name) || "";
    el.className = "site-footer";
    el.innerHTML =
      '<div class="wrap" style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:0">'
      + "<span>© " + new Date().getFullYear() + " " + esc(name) + "</span>"
      + "<span>" + (has(f.updated) ? "Last updated " + esc(f.updated) : "") + "</span>"
      + "</div>";
  }

  /* --- hero, news, interests -------------------------------------------- */

  function renderHero() {
    var el = mount("hero");
    if (!el) return;
    var p = SITE.profile || {};
    var photo = has(p.photo)
      ? '<img class="hero-photo" src="' + esc(url(p.photo)) + '" alt="' + esc(p.name) + '">'
      : "";
    var links = (SITE.links || []).filter(function (l) { return has(l.url); })
      .map(function (l) {
        var ext = /^https?:/i.test(l.url);
        return '<a href="' + esc(url(l.url)) + '"'
               + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(l.label) + "</a>";
      }).join("");
    var bio = (p.bio || []).map(function (t) { return "<p>" + t + "</p>"; }).join("");

    el.className = "hero";
    el.innerHTML = photo
      + '<div class="hero-body">'
      + '<h1 class="hero-name">' + esc(p.name || "")
      + (has(p.nameCn) ? ' <span style="font-size:0.62em;color:var(--fg-muted)">'
                         + esc(p.nameCn) + "</span>" : "")
      + "</h1>"
      + '<p class="hero-role">' + esc(p.role || "")
      + (has(p.affiliation) ? '<span class="affil">' + esc(p.affiliation) + "</span>" : "")
      + (has(p.location) ? '<span class="affil">' + esc(p.location) + "</span>" : "")
      + "</p>"
      + (links ? '<div class="hero-links">' + links + "</div>" : "")
      + (bio ? '<div class="bio" style="margin-top:1.2rem">' + bio + "</div>" : "")
      + "</div>";
  }

  function renderInterests() {
    var el = mount("interests");
    if (!el) return;
    var list = (SITE.profile && SITE.profile.interests) || [];
    if (!list.length) { el.remove(); return; }
    el.innerHTML = '<ul style="margin:0;padding-left:1.15rem">'
      + list.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("")
      + "</ul>";
  }

  function renderNews() {
    var el = mount("news");
    if (!el) return;
    var items = SITE.news || [];
    var limit = SITE.newsLimit;
    if (limit && limit > 0) items = items.slice(0, limit);
    if (!items.length) { el.innerHTML = '<p class="empty">No news yet.</p>'; return; }
    el.className = "news";
    el.innerHTML = items.map(function (n) {
      return "<li><time>" + esc(n.date) + "</time><span>" + n.text + "</span></li>";
    }).join("");
  }

  /* --- publications ----------------------------------------------------- */

  function authorsHtml(authors) {
    return (authors || []).map(function (a) {
      var clean = String(a).replace(/\*+$/, "").trim();
      var mine = SELF && clean.toLowerCase() === SELF.toLowerCase();
      return mine ? '<span class="me">' + esc(clean) + "</span>" : esc(clean);
    }).join(", ");
  }

  function pubHtml(p) {
    var thumb = has(p.thumb)
      ? '<img class="pub-thumb" src="' + esc(url(p.thumb)) + '" alt="" loading="lazy">'
      : "";
    var venue = [has(p.venue) ? esc(p.venue) : "", p.year ? esc(p.year) : ""]
      .filter(Boolean).join(", ");
    return '<article class="pub">' + thumb
      + '<div class="pub-body">'
      + '<h3 class="pub-title">' + esc(p.title) + "</h3>"
      + '<p class="pub-authors">' + authorsHtml(p.authors) + "</p>"
      + '<p class="pub-venue">' + venue
      + (has(p.note) ? '<span class="pub-note">' + esc(p.note) + "</span>" : "")
      + "</p>"
      + linkRow(p.links)
      + "</div></article>";
  }

  function groupByYear(list) {
    var years = {};
    list.forEach(function (p) {
      var y = p.year || "Other";
      (years[y] = years[y] || []).push(p);
    });
    return Object.keys(years)
      .sort(function (a, b) { return Number(b) - Number(a); })
      .map(function (y) { return { year: y, items: years[y] }; });
  }

  function renderPublications() {
    var el = mount("pub-list");
    if (!el) return;
    var selectedOnly = el.dataset.selected === "true";
    var pool = selectedOnly ? PUBS.filter(function (p) { return p.selected; }) : PUBS;

    var state = { type: "all", topic: "all", q: "" };
    var bar = mount("pub-toolbar");
    if (bar) buildToolbar(bar, pool, state, draw);
    draw();

    function draw() {
      var list = pool.filter(function (p) {
        if (state.type !== "all" && p.type !== state.type) return false;
        if (state.topic !== "all" && (p.topic || []).indexOf(state.topic) === -1) return false;
        if (state.q) {
          var hay = [p.title, p.venue, (p.authors || []).join(" "), (p.topic || []).join(" ")]
            .join(" ").toLowerCase();
          if (hay.indexOf(state.q) === -1) return false;
        }
        return true;
      });

      if (!list.length) { el.innerHTML = '<p class="empty">No matching publications.</p>'; return; }

      if (selectedOnly) {
        list.sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
        el.innerHTML = list.map(pubHtml).join("");
        return;
      }
      el.innerHTML = groupByYear(list).map(function (g) {
        return '<div class="year-group"><p class="year-label">' + esc(g.year) + "</p>"
          + g.items.map(pubHtml).join("") + "</div>";
      }).join("");
    }
  }

  function buildToolbar(bar, pool, state, draw) {
    var types = [];
    var topics = [];
    pool.forEach(function (p) {
      if (has(p.type) && types.indexOf(p.type) === -1) types.push(p.type);
      (p.topic || []).forEach(function (t) { if (topics.indexOf(t) === -1) topics.push(t); });
    });

    function chips(values, key, allLabel) {
      return '<div class="filters" data-key="' + key + '">'
        + '<button class="chip" type="button" data-value="all" aria-pressed="true">'
        + esc(allLabel) + "</button>"
        + values.map(function (v) {
            return '<button class="chip" type="button" data-value="' + esc(v)
              + '" aria-pressed="false">' + esc(v.charAt(0).toUpperCase() + v.slice(1))
              + "</button>";
          }).join("")
        + "</div>";
    }

    bar.className = "toolbar";
    bar.innerHTML = chips(types, "type", "All")
      + (topics.length ? chips(topics, "topic", "All topics") : "")
      + '<input class="search" type="search" placeholder="Search title, author, venue"'
      + ' aria-label="Search publications">';

    bar.querySelectorAll(".filters").forEach(function (row) {
      row.addEventListener("click", function (e) {
        var btn = e.target.closest(".chip");
        if (!btn) return;
        row.querySelectorAll(".chip").forEach(function (c) {
          c.setAttribute("aria-pressed", String(c === btn));
        });
        state[row.dataset.key] = btn.dataset.value;
        draw();
      });
    });

    var input = bar.querySelector(".search");
    input.addEventListener("input", function () {
      state.q = input.value.trim().toLowerCase();
      draw();
    });
  }

  /* --- projects --------------------------------------------------------- */

  function projectHtml(p) {
    var media = "";
    if (has(p.media)) {
      media = isVideo(p.media)
        ? '<video class="card-media" src="' + esc(url(p.media))
          + '" autoplay muted loop playsinline></video>'
        : '<img class="card-media" src="' + esc(url(p.media)) + '" alt="" loading="lazy">';
    }
    var href = p.detail ? url("projects/" + p.id + ".html")
                        : (p.links && (p.links.demo || p.links.code || p.links.paper)) || "";
    var title = href
      ? '<a href="' + esc(href) + '">' + esc(p.title) + "</a>"
      : esc(p.title);
    var tags = (p.tags || []).map(function (t) {
      return '<span class="tag">' + esc(t) + "</span>";
    }).join("");

    return '<article class="card">' + media
      + '<div class="card-body">'
      + '<h3 class="card-title">' + title + "</h3>"
      + (has(p.period) ? '<p class="card-text" style="color:var(--fg-faint);font-size:0.8rem;margin-bottom:0.35rem">'
                         + esc(p.period) + "</p>" : "")
      + '<p class="card-text">' + esc(p.blurb || "") + "</p>"
      + (tags ? '<div class="tags">' + tags + "</div>" : "")
      + linkRow(p.links)
      + "</div></article>";
  }

  function renderProjects() {
    var el = mount("project-list");
    if (!el) return;
    var featuredOnly = el.dataset.featured === "true";
    var list = featuredOnly ? PROJECTS.filter(function (p) { return p.featured; }) : PROJECTS;
    el.className = "grid";
    el.innerHTML = list.length
      ? list.map(projectHtml).join("")
      : '<p class="empty">Nothing here yet.</p>';
  }

  /* --- cv --------------------------------------------------------------- */

  function renderCV() {
    var el = mount("cv");
    if (!el) return;
    el.innerHTML = CV.map(function (sec) {
      var items = (sec.items || []).map(function (it) {
        var links = (it.links || []).filter(function (l) { return has(l.url); })
          .map(function (l) {
            return '<a href="' + esc(url(l.url)) + '" target="_blank" rel="noopener">'
                   + esc(l.label) + "</a>";
          }).join("");
        return '<div class="entry">'
          + '<div class="entry-when">' + esc(it.when || "") + "</div>"
          + '<div class="entry-what"><strong>' + esc(it.what || "") + "</strong>"
          + (has(it.where) ? '<div class="where">' + esc(it.where) + "</div>" : "")
          + (has(it.detail) ? '<p class="detail">' + esc(it.detail) + "</p>" : "")
          + (links ? '<div class="linkrow">' + links + "</div>" : "")
          + "</div></div>";
      }).join("");
      return "<section><h2 class=\"section-title\">" + esc(sec.heading) + "</h2>" + items + "</section>";
    }).join("");
  }

  /* --- boot ------------------------------------------------------------- */

  function boot() {
    renderHeader();
    initTheme();
    renderHero();
    renderInterests();
    renderNews();
    renderPublications();
    renderProjects();
    renderCV();
    renderFooter();

    var t = document.querySelector("title");
    if (t && t.dataset.suffix && SITE.brand) {
      t.textContent = t.dataset.suffix + " · " + SITE.brand;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
