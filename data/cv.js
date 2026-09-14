/* ==========================================================================
   CV sections. Each section renders as a two-column list: when | what.

   A section marked `top: true` renders near the head of the page, above the
   research interests. Everything else renders further down.

   Entries are sorted newest first automatically, whenever every entry in the
   section carries a date, so the order they are written in does not matter.

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
    top: true,
    heading: { en: "Education", zh: "教育经历" },
    items: [
      {
        when: "2021.03 - 2025.03",
        what: {
          en: "Ph.D. (Doctor of Engineering)",
          zh: "工学博士"
        },
        where: {
          en: "School of Marine Science and Technology, Northwestern Polytechnical University, Xi'an, China",
          zh: "西北工业大学 航海学院"
        },
        detail: {
          en: "Advisor: TODO. Thesis: TODO.",
          zh: "导师：TODO。学位论文：TODO。"
        }
      },
      {
        when: "2018.09 - 2021.02",
        what: {
          en: "M.Eng. (Master of Engineering)",
          zh: "工学硕士"
        },
        where: {
          en: "School of Marine Science and Technology, Northwestern Polytechnical University, Xi'an, China",
          zh: "西北工业大学 航海学院"
        },
        detail: ""
      },
      {
        when: "2014.09 - 2018.06",
        what: {
          en: "B.Eng. (Bachelor of Engineering)",
          zh: "工学学士"
        },
        where: {
          en: "Petroleum Engineering Institute, China University of Petroleum (East China), Qingdao, China",
          zh: "中国石油大学（华东） 石油工程学院"
        },
        detail: ""
      }
    ]
  },
  {
    top: true,
    heading: { en: "Experience", zh: "工作经历" },
    items: [
      {
        when: { en: "2026.09 - present", zh: "2026.09 至今" },
        what: { en: "Postdoctoral Researcher", zh: "博士后研究员" },
        where: { en: "Earlham Institute, Norwich, UK", zh: "Earlham Institute，英国诺里奇" },
        detail: {
          en: "Supervisor: Ke Li. TODO: one line on what you work on here.",
          zh: "合作导师：Ke Li。TODO: 一句话说明你在这里的研究内容。"
        }
      },
      {
        when: { en: "2025.04 - 2026.09", zh: "2025.04 - 2026.09" },
        what: {
          en: "Research Fellow, Computer Science",
          zh: "博士后研究员（Research Fellow），计算机科学"
        },
        where: { en: "University of Exeter, Exeter, UK", zh: "英国埃克塞特大学" },
        detail: {
          en: "Supervisor: Ke Li. TODO: one line on what you worked on.",
          zh: "合作导师：Ke Li。TODO: 一句话说明你当时的研究内容。"
        }
      }
    ]
  },
  {
    heading: { en: "Awards and Honours", zh: "奖励与荣誉" },
    items: [
      {
        when: "2025 - 2027",
        what: {
          en: "Postdoctoral Fellowship",
          zh: "博士后项目资助"
        },
        where: {
          en: "China Scholarship Council",
          zh: "国家留学基金委（CSC）"
        },
        detail: ""
      },
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
        when: { en: "Journal reviewer", zh: "期刊审稿人" },
        what: {
          en: "Swarm and Evolutionary Computation",
          zh: "Swarm and Evolutionary Computation"
        },
        where: "",
        detail: ""
      },
      {
        when: "",
        what: "Information Sciences",
        where: "",
        detail: ""
      },
      {
        when: "",
        what: "European Journal of Operational Research",
        where: "",
        detail: ""
      },
      {
        when: "",
        what: "Expert Systems with Applications",
        where: "",
        detail: ""
      },
      {
        when: "",
        what: "Computer Science Review",
        where: "",
        detail: ""
      },
      {
        when: "",
        what: "Engineering Structures",
        where: "",
        detail: ""
      },
      {
        when: "",
        what: "Big Data Research",
        where: "",
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
