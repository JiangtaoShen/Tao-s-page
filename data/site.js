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
  brand: { en: "Jiangtao Shen", zh: "申江涛" },

  profile: {
    name: { en: "Jiangtao Shen", zh: "申江涛" },

    role: {
      en: "Postdoctoral Researcher",
      zh: "博士后研究员"
    },
    // Earlham Institute has no standard Chinese name, so the English form is
    // kept in both languages. Replace the zh value if you prefer otherwise.
    affiliation: {
      en: "Earlham Institute",
      zh: "Earlham Institute (EI)"
    },
    location: {
      en: "Norwich, United Kingdom",
      zh: "英国 诺里奇"
    },

    photo: "assets/img/avatar.svg",   // square, 400px or larger
    email: "Jiangtao.Shen@earlham.ac.uk",

    // Postal address, one line per array item. Deliberately not translated:
    // it has to stay readable to the postal service that delivers it.
    address: [
      "Room 102a",
      "Earlham Institute",
      "Norwich Research Park",
      "Colney Lane",
      "Norwich, Norfolk, NR4 7UZ, UK"
    ],

    // One paragraph per array item. The two languages may differ in length.
    bio: {
      en: [
        "TODO: One or two sentences on what you work on at the Earlham Institute.",
        "TODO: Your research interests, stated so a non-specialist can follow. Mention the problems you care about rather than only the methods you use.",
        "TODO: What you are looking for right now, for example collaborations or a next position."
      ],
      zh: [
        "TODO: 一两句话介绍你在 Earlham Institute 做什么。",
        "TODO: 你的研究兴趣，尽量让非同行也能读懂。侧重你关心的问题，而不只是你用的方法。",
        "TODO: 你目前在寻找什么，例如合作或下一份职位。"
      ]
    },

    // Taken from the keyword list on ORCID.
    interests: {
      en: [
        "Knowledge-based optimization",
        "Expensive optimization",
        "Evolutionary algorithms",
        "Surrogate modelling"
      ],
      zh: [
        "知识驱动的优化",
        "昂贵优化问题",
        "演化算法",
        "代理模型"
      ]
    }
  },

  // Anything with an empty url is skipped when rendering.
  links: [
    { label: { en: "Email", zh: "邮箱" }, url: "mailto:Jiangtao.Shen@earlham.ac.uk" },
    { label: "Google Scholar", url: "https://scholar.google.com/citations?user=qWzre2gAAAAJ" },
    { label: "GitHub",         url: "https://github.com/JiangtaoShen" },
    { label: "ORCID",          url: "https://orcid.org/0000-0002-2070-940X" },
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
