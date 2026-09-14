/* ==========================================================================
   Publications.
   Order does not matter, entries are grouped and sorted by year automatically.

   Fields
     title     required. Paper titles usually stay in English for both
               languages, so a plain string is normal here. Use
               { en: "...", zh: "..." } if you do want a translated title.
     authors   required, array of names. A name may itself be bilingual:
               { en: "Jiangtao Shen", zh: "沈江涛" }.
     venue     journal or conference name, no year
     year      number, required, used for grouping
     type      "journal" | "conference" | "preprint" | "thesis" | "patent"
               The filter chip label comes from assets/js/i18n.js.
     note      short badge, e.g. { en: "Oral", zh: "口头报告" }
     topic     optional array of tags, drives the topic filter
     thumb     optional teaser image, 4:3 works best
     selected  true to also show it on the homepage
     links     any subset, empty values are skipped
   ========================================================================== */

// Your own name, so it can be rendered bold in the author list.
window.AUTHOR_SELF = { en: "Jiangtao Shen", zh: "沈江涛" };

window.PUBLICATIONS = [
  {
    title: "TODO: Title of your most recent paper",
    authors: [
      { en: "Jiangtao Shen", zh: "沈江涛" },
      "Coauthor A",
      "Coauthor B"
    ],
    venue: "TODO: Conference or Journal Name",
    year: 2026,
    type: "conference",
    note: { en: "Oral", zh: "口头报告" },
    topic: ["TODO-topic"],
    thumb: "",
    selected: true,
    links: {
      pdf: "assets/pdf/TODO.pdf",
      arxiv: "",
      code: "",
      project: "",
      video: "",
      slides: "",
      poster: "",
      doi: "",
      bibtex: ""
    }
  },
  {
    title: "TODO: An earlier paper",
    authors: [
      "Coauthor A",
      { en: "Jiangtao Shen", zh: "沈江涛" }
    ],
    venue: "TODO: Journal Name",
    year: 2025,
    type: "journal",
    note: "",
    topic: ["TODO-topic"],
    thumb: "",
    selected: true,
    links: {
      pdf: "",
      arxiv: "",
      code: "",
      doi: ""
    }
  }
];
