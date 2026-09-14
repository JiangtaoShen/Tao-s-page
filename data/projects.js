/* ==========================================================================
   Projects and demos.

   Fields
     id        slug, also the filename of the detail page: projects/<id>.html
     title     required
     blurb     one or two sentences for the card
     period    free text, e.g. "2025 - present"
     tags      array of short labels
     media     card image or looping video, assets/img/... or assets/demo/...
               .mp4 and .webm render as a muted autoplaying loop
     detail    true if projects/<id>.html exists, the card title links to it
     featured  true to also show it on the homepage
     links     demo | code | paper | data | video | doc, empty values skipped
   ========================================================================== */

window.PROJECTS = [
  {
    id: "todo-project",
    title: "TODO: Project name",
    blurb: "TODO: One or two sentences on what it does and why it matters.",
    period: "2026 - present",
    tags: ["TODO-tag", "TODO-tag"],
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
