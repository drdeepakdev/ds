/* ==========================================================================
   site-data.js — edit THIS file to update the Credentials page.
   No HTML knowledge needed: each certification is one object below.

   Fields:
     name      – certification title
     code      – short designation shown as a chip (e.g. "PMP"); "" to hide
     issuer    – certifying body
     category  – "management" | "security" | "architecture" | "infrastructure" | "data"
     year      – year earned (number), or null to hide the year
     verify    – public verification URL (Credly / issuer registry); "" hides the button
   ========================================================================== */

window.SITE_DATA = {
  credlyProfile: "",   // e.g. "https://www.credly.com/users/deepu-soman" — shows a "full badge wall" button when set
  learnTranscript: "", // e.g. Microsoft Learn transcript share URL

  certifications: [
    /* — Project, programme & delivery — */
    { name: "Project Management Professional",            code: "PMP",      issuer: "PMI",             category: "management",     year: null, verify: "" },
    { name: "PMI Agile Certified Practitioner",           code: "PMI-ACP",  issuer: "PMI",             category: "management",     year: null, verify: "" },
    { name: "PRINCE2 Practitioner",                       code: "PRINCE2",  issuer: "AXELOS / PeopleCert", category: "management", year: null, verify: "" },
    { name: "Certified ScrumMaster",                      code: "CSM",      issuer: "Scrum Alliance",  category: "management",     year: null, verify: "" },
    { name: "ITIL Foundation",                            code: "ITIL-F",   issuer: "AXELOS / PeopleCert", category: "management", year: null, verify: "" },

    /* — Security, audit & risk — */
    { name: "Certified Information Systems Auditor",      code: "CISA",     issuer: "ISACA",           category: "security",       year: null, verify: "" },
    { name: "Certified Information Security Manager",     code: "CISM",     issuer: "ISACA",           category: "security",       year: null, verify: "" },
    { name: "Certified in Risk & Information Systems Control", code: "CRISC", issuer: "ISACA",         category: "security",       year: null, verify: "" },
    { name: "Certified Ethical Hacker",                   code: "CEH",      issuer: "EC-Council",      category: "security",       year: null, verify: "" },
    { name: "Computer Hacking Forensic Investigator",     code: "CHFI",     issuer: "EC-Council",      category: "security",       year: null, verify: "" },

    /* — Enterprise architecture — */
    { name: "TOGAF Certified",                            code: "TOGAF",    issuer: "The Open Group",  category: "architecture",   year: null, verify: "" },

    /* — Infrastructure & networking — */
    { name: "Cisco Certified Network Professional",       code: "CCNP",     issuer: "Cisco",           category: "infrastructure", year: null, verify: "" },
    { name: "Microsoft Certified Solutions Expert",       code: "MCSE",     issuer: "Microsoft",       category: "infrastructure", year: null, verify: "" },
    { name: "Microsoft Certified Solutions Associate",    code: "MCSA",     issuer: "Microsoft",       category: "infrastructure", year: null, verify: "" },
    { name: "Microsoft Certified IT Professional",        code: "MCITP",    issuer: "Microsoft",       category: "infrastructure", year: null, verify: "" },
    { name: "Microsoft Certified Technology Specialist",  code: "MCTS",     issuer: "Microsoft",       category: "infrastructure", year: null, verify: "" },

    /* — Data & platforms — */
    { name: "Oracle Certified Professional",              code: "OCP",      issuer: "Oracle",          category: "data",           year: null, verify: "" }
  ],

  /* Focus areas shown as the proficiency map under the cert wall */
  focus: [
    { label: "Programme & project delivery", level: 94 },
    { label: "Security, audit & risk",       level: 90 },
    { label: "Enterprise architecture",      level: 84 },
    { label: "Infrastructure & networking",  level: 88 },
    { label: "Service management (ITIL)",    level: 82 }
  ]
};
