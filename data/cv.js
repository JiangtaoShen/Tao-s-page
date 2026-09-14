/* ==========================================================================
   CV sections. Each section renders as a two-column list: when | what.

   Item fields
     when    left column, free text
     what    bold first line
     where   second line, muted
     detail  optional third line, muted
     links   optional array of { label, url }

   Every text field accepts a plain string or { en: "...", zh: "..." }.
   ========================================================================== */

window.CV = [
  {
    heading: { en: "Education", zh: "教育经历" },
    items: [
      {
        when: "TODO - TODO",
        what: { en: "TODO: Ph.D. in Field", zh: "TODO: 某某专业 博士" },
        where: { en: "TODO: University", zh: "TODO: 某某大学" },
        detail: {
          en: "Advisor: TODO. Thesis: TODO.",
          zh: "导师：TODO。学位论文：TODO。"
        }
      },
      {
        when: "TODO - TODO",
        what: { en: "TODO: B.Eng. in Field", zh: "TODO: 某某专业 学士" },
        where: { en: "TODO: University", zh: "TODO: 某某大学" },
        detail: ""
      }
    ]
  },
  {
    heading: { en: "Experience", zh: "工作与实习" },
    items: [
      {
        when: { en: "TODO - present", zh: "TODO 至今" },
        what: { en: "Postdoctoral Researcher", zh: "博士后研究员" },
        where: { en: "Earlham Institute, Norwich, UK", zh: "Earlham Institute，英国诺里奇" },
        detail: {
          en: "TODO: One line on what you work on, and the group or supervisor.",
          zh: "TODO: 一句话说明你的研究内容，以及所在课题组或合作导师。"
        }
      },
      {
        when: "TODO - TODO",
        what: { en: "TODO: Earlier role", zh: "TODO: 此前的职位" },
        where: { en: "TODO: Lab or Company", zh: "TODO: 某实验室或公司" },
        detail: ""
      }
    ]
  },
  {
    heading: { en: "Awards and Honours", zh: "奖励与荣誉" },
    items: [
      {
        when: "TODO",
        what: { en: "TODO: Award name", zh: "TODO: 奖项名称" },
        where: { en: "TODO: Awarding body", zh: "TODO: 颁奖单位" },
        detail: ""
      }
    ]
  },
  {
    heading: { en: "Talks", zh: "学术报告" },
    items: [
      {
        when: "TODO",
        what: { en: "TODO: Talk title", zh: "TODO: 报告题目" },
        where: { en: "TODO: Venue", zh: "TODO: 场合" },
        detail: ""
      }
    ]
  },
  {
    heading: { en: "Teaching", zh: "教学" },
    items: [
      {
        when: "TODO",
        what: { en: "TODO: Course code and name", zh: "TODO: 课程编号与名称" },
        where: { en: "TODO: Role", zh: "TODO: 承担角色" },
        detail: ""
      }
    ]
  },
  {
    heading: { en: "Academic Service", zh: "学术服务" },
    items: [
      {
        when: "TODO",
        what: { en: "Reviewer", zh: "审稿人" },
        where: { en: "TODO: Venue list", zh: "TODO: 期刊或会议列表" },
        detail: ""
      }
    ]
  },
  {
    heading: { en: "Skills", zh: "技能" },
    items: [
      {
        when: { en: "Programming", zh: "编程" },
        what: "TODO: Python, MATLAB, C++",
        where: "",
        detail: ""
      },
      {
        when: { en: "Languages", zh: "语言" },
        what: {
          en: "TODO: Chinese (native), English (fluent)",
          zh: "TODO: 中文（母语）、英语（流利）"
        },
        where: "",
        detail: ""
      }
    ]
  }
];
