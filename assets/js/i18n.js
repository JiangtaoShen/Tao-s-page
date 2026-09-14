/* ==========================================================================
   Interface strings.

   This file holds chrome only: section headings, button labels, empty states.
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

    "section.interests":    "Research Interests",
    "section.news":         "News",
    "section.publications": "Publications",
    "section.projects":     "Projects",
    "section.contact":      "Contact",

    "contact.email":        "Email",
    "contact.address":      "Address",

    "filter.allTopics":     "All topics",
    "filter.allRoles":      "Any role",
    "filter.lead":          "First or corresponding author",
    "filter.coauthor":      "Co-author",

    "empty.pubs":           "No matching publications.",
    "empty.projects":       "Nothing here yet.",
    "empty.news":           "No news yet.",

    "footer.updated":       "Last updated",

    "title.about":          "Academic Homepage",

    // Used only by the per-project detail pages under projects/.
    "link.backProjects":    "← Back to the homepage",
    "title.project":        "Project"
  },

  zh: {
    "lang.switchTo":        "EN",
    "lang.switchToLabel":   "切换到英文",
    "theme.toDark":         "切换到深色主题",
    "theme.toLight":        "切换到浅色主题",

    "section.interests":    "研究方向",
    "section.news":         "最新动态",
    "section.publications": "论文发表",
    "section.projects":     "项目成果",
    "section.contact":      "联系方式",

    "contact.email":        "邮箱",
    "contact.address":      "通讯地址",

    "filter.allTopics":     "全部主题",
    "filter.allRoles":      "不限身份",
    "filter.lead":          "第一作者或通讯作者",
    "filter.coauthor":      "非第一非通讯",

    "empty.pubs":           "没有符合条件的论文。",
    "empty.projects":       "暂无内容。",
    "empty.news":           "暂无动态。",

    "footer.updated":       "最后更新于",

    "title.about":          "个人主页",

    // 仅用于 projects/ 下的项目详情页
    "link.backProjects":    "← 返回主页",
    "title.project":        "项目"
  }

};
