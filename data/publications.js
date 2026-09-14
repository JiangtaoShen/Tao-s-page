/* ==========================================================================
   Publications. Imported from https://orcid.org/0000-0002-2070-940X
   on 2026-09-14. Please check author orders and venue names.

   Order does not matter, entries are grouped and sorted by year automatically.

   Fields
     title     required. Paper titles stay in English in both languages, so a
               plain string is normal. Use { en, zh } for a translated title.
     authors   required, array of names. A name may be bilingual:
               { en: "Jiangtao Shen", zh: "申江涛" }.
     venue     journal or conference name, no year
     year      number, required, used for grouping
     type      "journal" | "conference" | "preprint" | "thesis" | "patent"
               The filter chip label comes from assets/js/i18n.js.
     note      short badge, e.g. { en: "Oral", zh: "口头报告" }
     topic     optional array of tags, drives the topic filter. Keep these in
               one language: the chip value is also the filter key, so a
               translated tag would break the filter on a language switch.
     thumb     optional teaser image, 4:3 works best
     selected  true to also show it on the homepage
     links     any subset of pdf, arxiv, doi, code, demo, project, paper,
               data, video, slides, poster, doc, bibtex. Empty ones are
               skipped, missing ones simply do not render.
   ========================================================================== */

// Your own name, so it can be rendered bold in the author list.
window.AUTHOR_SELF = { en: "Jiangtao Shen", zh: "申江涛" };

window.PUBLICATIONS = [

  {
    title: "Top-K-Aware Set Optimization for Component-Sharing Multiobjective Optimization",
    authors: ["Liang Zhao", "Peng Wang", "Jiangtao Shen", "Luziwei Leng", "Zhichao Lu", "Qingfu Zhang"],
    venue: "IEEE Transactions on Evolutionary Computation",
    year: 2026,
    type: "journal",
    topic: ["Multi-objective"],
    links: { doi: "https://doi.org/10.1109/TEVC.2026.3678952" }
  },

  {
    title: "Component-Sharing Preference in Expensive Multiobjective Optimization",
    authors: ["Liang Zhao", "Peng Wang", "Jiangtao Shen", "Baowei Song", "Qingfu Zhang"],
    venue: "IEEE Transactions on Evolutionary Computation",
    year: 2026,
    type: "journal",
    topic: ["Multi-objective", "Expensive optimization"],
    selected: true,
    links: { doi: "https://doi.org/10.1109/TEVC.2025.3583302" }
  },

  {
    title: "Data-driven multi-task global optimization with two-stage knowledge transfer for blended-wing-body underwater gliders design",
    authors: ["Huachao Dong", "Jing Wang", "Wenxin Wang", "Jiangtao Shen"],
    venue: "Applied Soft Computing",
    year: 2026,
    type: "journal",
    topic: ["Glider design", "Expensive optimization"],
    links: { doi: "https://doi.org/10.1016/j.asoc.2026.114867" }
  },

  {
    title: "Surrogate-assisted evolutionary algorithm with decomposition-based local learning for high-dimensional multi-objective optimization",
    authors: ["Jiangtao Shen", "Peng Wang", "Huachao Dong", "Wenxin Wang", "Jinglu Li"],
    venue: "Expert Systems with Applications",
    year: 2024,
    type: "journal",
    topic: ["Surrogate-assisted", "Multi-objective"],
    selected: true,
    links: { doi: "https://doi.org/10.1016/j.eswa.2023.122575" }
  },

  {
    title: "A model-based shape conceptual design framework of blend-wing-body underwater gliders with curved wings",
    authors: ["Wenxin Wang", "Xinjing Wang", "Huachao Dong", "Peng Wang", "Jiangtao Shen"],
    venue: "Ships and Offshore Structures",
    year: 2024,
    type: "journal",
    topic: ["Glider design"],
    links: { doi: "https://doi.org/10.1080/17445302.2023.2181494" }
  },

  {
    title: "A dual surrogate assisted evolutionary algorithm based on parallel search for expensive multi/many-objective optimization",
    authors: ["Jiangtao Shen", "Peng Wang", "Ye Tian", "Huachao Dong"],
    venue: "Applied Soft Computing",
    year: 2023,
    type: "journal",
    topic: ["Surrogate-assisted", "Expensive optimization"],
    links: { doi: "https://doi.org/10.1016/j.asoc.2023.110879" }
  },

  {
    title: "A model-based multidisciplinary conceptual design for blended-wing-body underwater gliders",
    authors: ["Wenxin Wang", "Huachao Dong", "Peng Wang", "Jinglu Li", "Jiangtao Shen"],
    venue: "Ships and Offshore Structures",
    year: 2023,
    type: "journal",
    topic: ["Glider design"],
    links: { doi: "https://doi.org/10.1080/17445302.2022.2126126" }
  },

  {
    title: "An inverse model-guided two-stage evolutionary algorithm for multi-objective optimization",
    authors: ["Jiangtao Shen", "Huachao Dong", "Peng Wang", "Jinglu Li", "Wenxin Wang"],
    venue: "Expert Systems with Applications",
    year: 2023,
    type: "journal",
    topic: ["Multi-objective"],
    links: { doi: "https://doi.org/10.1016/j.eswa.2023.120198" }
  },

  {
    title: "Bi-indicator driven surrogate-assisted multi-objective evolutionary algorithms for computationally expensive problems",
    authors: ["Wenxin Wang", "Huachao Dong", "Peng Wang", "Jiangtao Shen"],
    venue: "Complex & Intelligent Systems",
    year: 2023,
    type: "journal",
    topic: ["Surrogate-assisted", "Expensive optimization"],
    links: { doi: "https://doi.org/10.1007/s40747-023-00969-w" }
  },

  {
    title: "Expensive Many-Objective Optimization by Learning of the Strengthened Dominance Relation",
    authors: ["Jiangtao Shen", "Peng Wang", "Huachao Dong", "Wenxin Wang"],
    venue: "IEEE Congress on Evolutionary Computation (CEC)",
    year: 2023,
    type: "conference",
    topic: ["Many-objective", "Expensive optimization"],
    links: { doi: "https://doi.org/10.1109/CEC53210.2023.10254133" }
  },

  {
    title: "A Two-stage Surrogate-Assisted Evolutionary Algorithm (TS-SAEA) for Expensive Multi/Many-objective Optimization",
    authors: ["Jinglu Li", "Peng Wang", "Huachao Dong", "Jiangtao Shen"],
    venue: "Swarm and Evolutionary Computation",
    year: 2022,
    type: "journal",
    topic: ["Surrogate-assisted", "Expensive optimization"],
    links: { doi: "https://doi.org/10.1016/j.swevo.2022.101107" }
  },

  {
    title: "Multi/many-objective evolutionary algorithm assisted by radial basis function models for expensive optimization",
    authors: ["Jinglu Li", "Peng Wang", "Huachao Dong", "Jiangtao Shen"],
    venue: "Applied Soft Computing",
    year: 2022,
    type: "journal",
    topic: ["Surrogate-assisted", "Expensive optimization"],
    links: { doi: "https://doi.org/10.1016/j.asoc.2022.108798" }
  },

  {
    title: "A Controlled Strengthened Dominance Relation for Evolutionary Many-Objective Optimization",
    authors: ["Jiangtao Shen", "Peng Wang", "Xinjing Wang"],
    venue: "IEEE Transactions on Cybernetics",
    year: 2022,
    type: "journal",
    topic: ["Many-objective"],
    selected: true,
    links: { doi: "https://doi.org/10.1109/TCYB.2020.3015998" }
  },

  {
    title: "A classification surrogate-assisted multi-objective evolutionary algorithm for expensive optimization",
    authors: ["Jinglu Li", "Peng Wang", "Huachao Dong", "Jiangtao Shen", "Caihua Chen"],
    venue: "Knowledge-Based Systems",
    year: 2022,
    type: "journal",
    topic: ["Surrogate-assisted", "Expensive optimization"],
    links: { doi: "https://doi.org/10.1016/j.knosys.2022.108416" }
  },

  {
    // ORCID lists no contributors for this entry.
    title: "A multistage evolutionary algorithm for many-objective optimization",
    authors: ["TODO: author list"],
    venue: "Information Sciences",
    year: 2022,
    type: "journal",
    topic: ["Many-objective"],
    links: { doi: "https://doi.org/10.1016/j.ins.2021.12.096" }
  },

  {
    // ORCID lists no contributors for this entry.
    title: "Managing Radial Basis Functions for Evolutionary Many-Objective Optimization",
    authors: ["TODO: author list"],
    venue: "IEEE Congress on Evolutionary Computation (CEC)",
    year: 2020,
    type: "conference",
    topic: ["Many-objective", "Surrogate-assisted"],
    links: { doi: "https://doi.org/10.1109/CEC48606.2020.9185610" }
  }

];
