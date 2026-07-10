/* ==========================================================================
   site-data.js — edit THIS file to update the Credentials page.
   No HTML knowledge needed: each certification is one object below.

   Fields:
     name      – certification title as it appears on the certificate
     code      – exam/cert code shown as a chip (e.g. "AZ-305"); "" to hide
     issuer    – organisation ("Microsoft", "AWS", "Google", "Scrum.org", …)
     category  – one of: "cloud" | "ai" | "security" | "devops" | "management"
     year      – year earned (number) — cards sort newest first
     verify    – public verification URL (Credly / Microsoft Learn transcript);
                 "" hides the verify button
     sample    – true shows a small "sample entry" tag. REPLACE these with
                 Deepu's real credentials (from LinkedIn/Credly) and set
                 sample:false — or delete entries that don't apply.
   ========================================================================== */

window.SITE_DATA = {
  credlyProfile: "",   // e.g. "https://www.credly.com/users/deepu-soman" — shows a "full badge wall" button when set
  learnTranscript: "", // e.g. Microsoft Learn transcript share URL

  certifications: [
    { name: "Microsoft Certified: Azure Solutions Architect Expert", code: "AZ-305", issuer: "Microsoft", category: "cloud",      year: 2025, verify: "", sample: true },
    { name: "Microsoft Certified: Azure Administrator Associate",    code: "AZ-104", issuer: "Microsoft", category: "cloud",      year: 2024, verify: "", sample: true },
    { name: "Microsoft Certified: Azure AI Engineer Associate",      code: "AI-102", issuer: "Microsoft", category: "ai",         year: 2025, verify: "", sample: true },
    { name: "Microsoft Certified: Azure Fundamentals",               code: "AZ-900", issuer: "Microsoft", category: "cloud",      year: 2023, verify: "", sample: true },
    { name: "Microsoft Certified: DevOps Engineer Expert",           code: "AZ-400", issuer: "Microsoft", category: "devops",     year: 2025, verify: "", sample: true },
    { name: "Microsoft Certified: Security, Compliance & Identity Fundamentals", code: "SC-900", issuer: "Microsoft", category: "security", year: 2024, verify: "", sample: true },
    { name: "AWS Certified Solutions Architect – Associate",         code: "SAA-C03", issuer: "AWS",      category: "cloud",      year: 2024, verify: "", sample: true },
    { name: "Professional Scrum Master I",                           code: "PSM I",  issuer: "Scrum.org", category: "management", year: 2023, verify: "", sample: true }
  ],

  /* Focus areas shown as the proficiency radar under the cert wall */
  focus: [
    { label: "Cloud architecture",  level: 90 },
    { label: "AI engineering",      level: 86 },
    { label: "DevOps & platform",   level: 82 },
    { label: "Security & identity", level: 74 },
    { label: "Leadership & agile",  level: 78 }
  ]
};
