/* ==========================================================================
   Projects and demos.

   Fields
     id        slug, also the filename of the detail page: projects/<id>.html
     title     required, plain string or { en, zh }
     blurb     one or two sentences for the card
     period    free text, e.g. "2025 - present"
     tags      array of short labels, or { en: [...], zh: [...] }
     media     card image or looping video, assets/img/... or assets/demo/...
               .mp4 and .webm render as a muted autoplaying loop
     detail    true if projects/<id>.html exists, the card title links to it
     featured  true to also show it on the homepage
     links     demo | code | paper | data | video | doc, empty values skipped
   ========================================================================== */

window.PROJECTS = [
  {
    id: "todo-project",
    title: { en: "TODO: Project name", zh: "TODO: 项目名称" },
    blurb: {
      en: "TODO: One or two sentences on what it does and why it matters.",
      zh: "TODO: 一两句话说明它做什么、为什么重要。"
    },
    period: { en: "2026 - present", zh: "2026 至今" },
    tags: {
      en: ["TODO-tag", "TODO-tag"],
      zh: ["TODO-标签", "TODO-标签"]
    },
    media: "",
    detail: false,
    featured: true,
    links: {
      demo: "",
      code: "",
      paper: "",
      data: "",
      video: "",
      doc: ""
    }
  }
];
