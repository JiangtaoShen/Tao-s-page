/* ==========================================================================
   Publications.
   Order does not matter, entries are grouped and sorted by year automatically.

   Fields
     title     required
     authors   required, array. Use "*" as a marker on your own name, e.g.
               "Jiangtao Shen*" renders bold. Keep the asterisk out of the
               string if you prefer, and set `me` below to match instead.
     venue     journal or conference name, no year
     year      number, required
     type      "journal" | "conference" | "preprint" | "thesis" | "patent"
     note      short badge, e.g. "Oral", "Spotlight", "Best Paper", "Under review"
     topic     optional array of tags, used by the topic filter
     thumb     optional teaser image, assets/img/xxx.png, 4:3 works best
     selected  true to also show it on the homepage
     links     any subset, empty values are skipped
   ========================================================================== */

// Your own name as it appears in the `authors` arrays. Matching entries render bold.
window.AUTHOR_SELF = "Jiangtao Shen";

window.PUBLICATIONS = [
  {
    title: "TODO: Title of your most recent paper",
    authors: ["Jiangtao Shen", "Coauthor A", "Coauthor B"],
    venue: "TODO: Conference or Journal Name",
    year: 2026,
    type: "conference",
    note: "Oral",
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
    authors: ["Coauthor A", "Jiangtao Shen"],
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
