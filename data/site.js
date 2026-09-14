/* ==========================================================================
   Profile, contact links and news.

   Any text field may be written two ways:
     "plain string"              used in both languages
     { en: "...", zh: "..." }    switched with the language toggle
   Arrays work the same way: { en: [...], zh: [...] }.
   If one language is missing the other is shown, rather than nothing.
   ========================================================================== */

window.SITE = {

  // Shown in the header and appended to every page title.
  brand: { en: "Jiangtao Shen", zh: "沈江涛" },

  profile: {
    name: { en: "Jiangtao Shen", zh: "沈江涛" },

    role: {
      en: "TODO: PhD Candidate / Postdoc / Assistant Professor",
      zh: "TODO: 博士研究生 / 博士后 / 助理教授"
    },
    affiliation: {
      en: "TODO: Department, University",
      zh: "TODO: 某某大学 某某学院"
    },
    location: {
      en: "TODO: City, Country",
      zh: "TODO: 中国 某某市"
    },

    photo: "assets/img/avatar.svg",   // square, 400px or larger
    email: "TODO@example.edu",        // also set the mailto: link below

    // One paragraph per array item. The two languages may differ in length.
    bio: {
      en: [
        "TODO: One or two sentences on who you are and where you work.",
        "TODO: Your research interests, stated so a non-specialist can follow. Mention the problems you care about rather than only the methods you use.",
        "TODO: What you are looking for right now, for example collaborations, students, or a position."
      ],
      zh: [
        "TODO: 一两句话介绍你是谁、在哪里工作。",
        "TODO: 你的研究兴趣，尽量让非同行也能读懂。侧重你关心的问题，而不只是你用的方法。",
        "TODO: 你目前在寻找什么，例如合作、招生或职位。"
      ]
    },

    interests: {
      en: [
        "TODO: Research direction 1",
        "TODO: Research direction 2",
        "TODO: Research direction 3"
      ],
      zh: [
        "TODO: 研究方向一",
        "TODO: 研究方向二",
        "TODO: 研究方向三"
      ]
    }
  },

  // Anything with an empty url is skipped when rendering.
  links: [
    { label: { en: "Email", zh: "邮箱" }, url: "mailto:TODO@example.edu" },
    { label: "Google Scholar", url: "" },
    { label: "GitHub",         url: "https://github.com/JiangtaoShen" },
    { label: "ORCID",          url: "" },
    { label: "LinkedIn",       url: "" },
    { label: { en: "CV (PDF)", zh: "简历 (PDF)" }, url: "assets/pdf/cv.pdf" }
  ],

  // Newest first. Simple HTML such as <em> and <a> is allowed in `text`.
  news: [
    {
      date: "2026-09",
      text: {
        en: "TODO: Paper accepted at <em>Venue</em>.",
        zh: "TODO: 论文被 <em>某会议</em> 录用。"
      }
    },
    {
      date: "2026-06",
      text: {
        en: "TODO: Gave a talk at <em>Workshop</em>.",
        zh: "TODO: 在 <em>某研讨会</em> 作报告。"
      }
    },
    {
      date: "2026-03",
      text: {
        en: "TODO: Released code for <a href=\"projects.html\">Project</a>.",
        zh: "TODO: 开源了<a href=\"projects.html\">某项目</a>的代码。"
      }
    }
  ],

  // How many news items the homepage shows. Set to 0 for all of them.
  newsLimit: 5,

  footer: {
    updated: "2026-09"
  }
};
