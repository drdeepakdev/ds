/* ==========================================================================
   site-data.js — the Credentials page renders from this file.
   Source: Deepu Soman's CV (Sep 2022 / Jun 2025). Credential IDs are as listed
   on the CV; add public verify URLs (Credly / issuer registry) as you obtain them.

   Fields: name, code, issuer, category
     ("management" | "security" | "architecture" | "infrastructure" | "data"),
     year (or null), id (credential/registry ID or ""), verify (public URL or "").
   ========================================================================== */

window.SITE_DATA = {
  credlyProfile: "",
  learnTranscript: "",

  certifications: [
    /* — Project, programme & service delivery — */
    { name: "Project Management Professional",              code: "PMP",       issuer: "PMI",                 category: "management",     year: null, id: "PMI 4843505",        verify: "" },
    { name: "PMI Agile Certified Practitioner",             code: "PMI-ACP",   issuer: "PMI",                 category: "management",     year: null, id: "",                   verify: "" },
    { name: "PRINCE2 Practitioner",                         code: "PRINCE2-P", issuer: "PeopleCert / AXELOS", category: "management",     year: null, id: "GR657118602DS",       verify: "" },
    { name: "PRINCE2 Foundation",                           code: "PRINCE2-F", issuer: "PeopleCert / AXELOS", category: "management",     year: null, id: "GR656293409DS",       verify: "" },
    { name: "Certified ScrumMaster",                        code: "CSM",       issuer: "Scrum Alliance",      category: "management",     year: null, id: "",                   verify: "" },
    { name: "ITIL Foundation — IT Service Management",      code: "ITIL-F",    issuer: "PeopleCert / AXELOS", category: "management",     year: null, id: "203370.20792025",    verify: "" },

    /* — Security, audit & risk — */
    { name: "Certified Information Systems Auditor",        code: "CISA",      issuer: "ISACA",               category: "security",       year: null, id: "20166197",           verify: "" },
    { name: "Certified Information Security Manager",       code: "CISM",      issuer: "ISACA",               category: "security",       year: null, id: "2052844",            verify: "" },
    { name: "Certified in Risk & Information Systems Control", code: "CRISC",  issuer: "ISACA",               category: "security",       year: null, id: "242459361",          verify: "" },
    { name: "Certified Ethical Hacker",                     code: "CEH",       issuer: "EC-Council",          category: "security",       year: null, id: "ECC2405391678",      verify: "" },
    { name: "Computer Hacking Forensic Investigator",       code: "CHFI",      issuer: "EC-Council",          category: "security",       year: null, id: "ECC8356240971",      verify: "" },
    { name: "Microsoft Certified: Cybersecurity Architect Expert", code: "SC-100", issuer: "Microsoft",       category: "security",       year: null, id: "",                   verify: "" },

    /* — Enterprise architecture — */
    { name: "TOGAF 9 Certified",                            code: "TOGAF 9",   issuer: "The Open Group",      category: "architecture",   year: null, id: "163867",             verify: "" },

    /* — Infrastructure, cloud & networking — */
    { name: "Microsoft 365 Certified: Enterprise Administrator Expert", code: "M365", issuer: "Microsoft",   category: "infrastructure", year: null, id: "",                   verify: "" },
    { name: "Microsoft Certified Solutions Expert: Cloud Platform & Infrastructure", code: "MCSE-Cloud", issuer: "Microsoft", category: "infrastructure", year: null, id: "", verify: "" },
    { name: "Microsoft Certified Solutions Expert: Server Infrastructure", code: "MCSE-Server", issuer: "Microsoft", category: "infrastructure", year: null, id: "", verify: "" },
    { name: "Cisco Certified Network Professional",         code: "CCNP",      issuer: "Cisco",               category: "infrastructure", year: null, id: "CSCO11644360",       verify: "" },
    { name: "Cisco Certified Network Associate",            code: "CCNA",      issuer: "Cisco",               category: "infrastructure", year: null, id: "CSCO11644360",       verify: "" },
    { name: "Microsoft Certified IT Professional",          code: "MCITP",     issuer: "Microsoft",           category: "infrastructure", year: null, id: "",                   verify: "" },

    /* — Data & platforms — */
    { name: "Oracle Database 10g/11g Administrator Certified Professional", code: "OCP", issuer: "Oracle",    category: "data",           year: null, id: "OC0862899",          verify: "" }
  ],

  /* Focus map — where the certifications translate into 20+ years of day-to-day depth */
  focus: [
    { label: "IT infrastructure & operations", level: 94 },
    { label: "Project & programme delivery",   level: 92 },
    { label: "Cyber security, audit & risk",   level: 90 },
    { label: "Cloud (Azure) & M365",           level: 86 },
    { label: "Enterprise architecture",        level: 82 }
  ]
};
