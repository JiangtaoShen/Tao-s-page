/* ==========================================================================
   Interface strings.

   This file holds chrome only: navigation, section headings, button labels.
   Content lives in data/*.js, where any field may be written either as a
   plain string (same in both languages) or as { en: "...", zh: "..." }.

   To add a string: add the same key under both `en` and `zh`, then reference
   it from HTML with data-i18n="key" or from script with tr("key").
   ========================================================================== */

window.I18N = {

  en: {
    "lang.switchTo":        "中文",
    "lang.switchToLabel":   "Switch to Chinese",
    "theme.toDark":         "Switch to dark theme",
    "theme.toLight":        "Switch to light theme",

    "nav.about":            "About",
    "nav.publications":     "Publications",
    "nav.projects":         "Projects",
    "nav.cv":               "CV",

    "section.interests":    "Research Interests",
    "section.news":         "News",
    "section.selectedPubs": "Selected Publications",
    "section.featured":     "Featured Projects",
    "section.contact":      "Contact",
    "contact.email":        "Email",
    "contact.address":      "Address",

    "link.allPubs":         "All publications →",
    "link.allProjects":     "All projects →",
    "link.backProjects":    "← All projects",

    "page.pubTitle":        "Publications",
    "page.pubLede":         "Grouped by year. Use the filters to narrow by type or topic.",
    "page.projTitle":       "Projects",
    "page.projLede":        "Code, datasets and interactive demos.",
    "page.cvTitle":         "Curriculum Vitae",
    "page.cvLede":          "A PDF version is available <a href=\"assets/pdf/cv.pdf\">here</a>.",

    "filter.all":           "All",
    "filter.allTopics":     "All topics",
    "filter.search":        "Search title, author, venue",
    "filter.searchLabel":   "Search publications",

    "type.journal":         "Journal",
    "type.conference":      "Conference",
    "type.preprint":        "Preprint",
    "type.thesis":          "Thesis",
    "type.patent":          "Patent",

    "empty.pubs":           "No matching publications.",
    "empty.projects":       "Nothing here yet.",
    "empty.news":           "No news yet.",

    "footer.updated":       "Last updated",

    "title.about":          "About",
    "title.publications":   "Publications",
    "title.projects":       "Projects",
    "title.cv":             "Curriculum Vitae",
    "title.project":        "Project"
  },

  zh: {
    "lang.switchTo":        "EN",
    "lang.switchToLabel":   "切换到英文",
    "theme.toDark":         "切换到深色主题",
    "theme.toLight":        "切换到浅色主题",

    "nav.about":            "个人简介",
    "nav.publications":     "论文发表",
    "nav.projects":         "项目成果",
    "nav.cv":               "简历",

    "section.interests":    "研究方向",
    "section.news":         "最新动态",
    "section.selectedPubs": "代表性论文",
    "section.featured":     "代表性项目",
    "section.contact":      "联系方式",
    "contact.email":        "邮箱",
    "contact.address":      "通讯地址",

    "link.allPubs":         "全部论文 →",
    "link.allProjects":     "全部项目 →",
    "link.backProjects":    "← 返回项目列表",

    "page.pubTitle":        "论文发表",
    "page.pubLede":         "按年份分组，可按类型或主题筛选。",
    "page.projTitle":       "项目成果",
    "page.projLede":        "代码、数据集与可交互演示。",
    "page.cvTitle":         "个人简历",
    "page.cvLede":          "PDF 版本请见<a href=\"assets/pdf/cv.pdf\">此处</a>。",

    "filter.all":           "全部",
    "filter.allTopics":     "全部主题",
    "filter.search":        "搜索标题、作者、期刊",
    "filter.searchLabel":   "搜索论文",

    "type.journal":         "期刊论文",
    "type.conference":      "会议论文",
    "type.preprint":        "预印本",
    "type.thesis":          "学位论文",
    "type.patent":          "专利",

    "empty.pubs":           "没有符合条件的论文。",
    "empty.projects":       "暂无内容。",
    "empty.news":           "暂无动态。",

    "footer.updated":       "最后更新于",

    "title.about":          "个人主页",
    "title.publications":   "论文发表",
    "title.projects":       "项目成果",
    "title.cv":             "个人简历",
    "title.project":        "项目"
  }

};
