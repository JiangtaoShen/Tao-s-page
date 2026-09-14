/* ==========================================================================
   Profile, contact links and news.
   Edit this file to update the homepage header and the News section.
   ========================================================================== */

window.SITE = {
  // Shown in the header and in the browser tab.
  brand: "Jiangtao Shen",

  profile: {
    name: "Jiangtao Shen",
    nameCn: "沈江涛",              // optional, remove if not wanted
    role: "TODO: PhD Candidate / Postdoc / Assistant Professor",
    affiliation: "TODO: Department, University",
    location: "TODO: City, Country",
    photo: "assets/img/avatar.svg",            // 400x400 or larger, square
    email: "TODO@example.edu",                 // also set the mailto: link below
    // One paragraph per string.
    bio: [
      "TODO: One or two sentences on who you are and where you work.",
      "TODO: Your research interests, stated so a non-specialist can follow. Mention the problems you care about rather than only the methods you use.",
      "TODO: What you are looking for right now, for example collaborations, students, or a position."
    ],
    interests: [
      "TODO: Research direction 1",
      "TODO: Research direction 2",
      "TODO: Research direction 3"
    ]
  },

  // Anything with an empty url is skipped when rendering.
  links: [
    { label: "Email",           url: "mailto:TODO@example.edu" },
    { label: "Google Scholar",  url: "" },
    { label: "GitHub",          url: "https://github.com/JiangtaoShen" },
    { label: "ORCID",           url: "" },
    { label: "LinkedIn",        url: "" },
    { label: "CV (PDF)",        url: "assets/pdf/cv.pdf" }
  ],

  // Newest first. `date` is free text, keep it short.
  news: [
    { date: "2026-09", text: "TODO: Paper accepted at <em>Venue</em>." },
    { date: "2026-06", text: "TODO: Gave a talk at <em>Workshop</em>." },
    { date: "2026-03", text: "TODO: Released code for <a href=\"projects.html\">Project</a>." }
  ],

  // How many news items the homepage shows. Set to 0 for all of them.
  newsLimit: 5,

  footer: {
    note: "Built with plain HTML and CSS.",
    updated: "2026-09"
  }
};
