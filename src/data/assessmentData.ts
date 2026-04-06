export interface Question {
  id: string;
  fw: string;
  cat: string;
  cl: string;
  w: number;
  crit: boolean;
  q: string;
  ref: string;
  help: string;
  opts: { v: number; l: string; cls?: string }[];
}

export interface Penalty {
  max?: number;
  penaltyDisplay?: string;
  provision: string;
  label: string;
  schedule?: string;
  skipIfNA?: boolean;
  sdfOnly?: boolean;
}

export interface SectorConfig {
  icon: string;
  weight_boost: Record<string, number>;
  note: string;
  elevated: string[];
  crossrefs: string[];
}

export const SECTOR_CFG: Record<string, SectorConfig> = {
  'HealthTech / Hospital / Insurer': {
    icon: '🏥',
    weight_boost: { d9: 1.5, d11: 2, d15: 2, d10: 1.5, d14: 1.3 },
    note: 'Health data is Sensitive Personal Data under DPDPA. Security safeguards (s.8(5)) and breach notification (s.8(6)) carry the maximum ₹250 crore and ₹200 crore penalties respectively.',
    elevated: ['Security & Breach Notification', "Fiduciary Obligations", "Children's Data"],
    crossrefs: ['DPDPA s.8(5)', 'Rule 6 (Security)', 'DISHA (pending)'],
  },
  'FinTech / BFSI / Payments': {
    icon: '🏦',
    weight_boost: { d11: 2, d15: 1.8, d10: 2, d13: 1.5, d2: 1.5 },
    note: 'Financial institutions face overlapping obligations under DPDPA, RBI data localization guidelines, PCI-DSS, and SEBI regulations.',
    elevated: ['Security & Breach Notification', 'Cross-Border Transfers', 'Data Processing Agreements'],
    crossrefs: ['DPDPA s.8(2)', 'RBI Data Localization', 'PCI-DSS', 'SEBI Cybersecurity Framework'],
  },
  'EdTech / Education': {
    icon: '📚',
    weight_boost: { d14: 2.5, d2: 1.8, d1: 1.5, d5: 1.5 },
    note: 'EdTech platforms typically serve a large percentage of under-18 users, triggering DPDPA s.9\'s most stringent obligations.',
    elevated: ["Children's Data", 'Notice & Consent'],
    crossrefs: ['DPDPA s.9', 'Rule 10 (Children)', 'UGC Guidelines'],
  },
  'E-commerce / D2C / Retail': {
    icon: '🛍',
    weight_boost: { d13: 1.8, d2: 1.5, d10: 1.5, d9: 1.5, d1: 1.3 },
    note: 'E-commerce platforms handle cross-border data flows to payment gateways, ad networks, logistics, and fulfillment partners.',
    elevated: ['Cross-Border Transfers', 'Data Processing Agreements', 'Notice & Consent'],
    crossrefs: ['DPDPA s.8(2)', 's.16 (Transfers)', 'Consumer Protection Act 2019'],
  },
  'SaaS / Technology Platform': {
    icon: '💻',
    weight_boost: { d10: 2, d11: 1.8, d13: 1.5, d6: 1.5, d9: 1.3 },
    note: 'SaaS platforms operate in a dual capacity: as Data Fiduciaries for employee/internal data, and as Data Processors for customer data.',
    elevated: ['Data Processing Agreements', 'Security & Breach Notification', 'Data Principal Rights'],
    crossrefs: ['DPDPA s.8(2)', 'IT Act s.43A', 'CERT-In Directions 2022'],
  },
  'Media / Social Media / OTT': {
    icon: '📱',
    weight_boost: { d12: 2.5, d14: 2, d2: 1.8, d1: 1.5, d9: 1.3 },
    note: 'Social media platforms with significant Indian user bases are prime candidates for Significant Data Fiduciary classification (s.10).',
    elevated: ['Significant Data Fiduciary (SDF)', "Children's Data", 'Notice & Consent'],
    crossrefs: ['DPDPA s.10', 'Rule 12 (SDF)', 'IT (Intermediary) Rules 2021'],
  },
  'HR Tech / Recruitment': {
    icon: '👥',
    weight_boost: { d10: 1.8, d9: 1.5, d2: 1.5, d11: 1.5, d6: 1.3 },
    note: 'HR platforms process sensitive employee data including financial records, health declarations, and background verification data.',
    elevated: ['Data Processing Agreements', 'Data Minimization & Retention', 'Data Principal Rights'],
    crossrefs: ['DPDPA s.8(1)', 's.8(2)', 'Labour Laws', 'POSH Act considerations'],
  },
  'LegalTech': {
    icon: '⚖',
    weight_boost: { d10: 1.8, d11: 1.8, d9: 1.5, d2: 1.3 },
    note: 'LegalTech platforms may process privileged communications, sensitive case information, and confidential client data.',
    elevated: ['Security & Breach Notification', 'Data Processing Agreements', 'Data Minimization'],
    crossrefs: ['DPDPA s.8', 'BCI Rules', 'Advocates Act considerations'],
  },
  'Government / Public Sector': {
    icon: '🏛',
    weight_boost: { d11: 1.5, d15: 1.5, d5: 1.3 },
    note: 'Government entities and PSUs may qualify for certain DPDPA exemptions under s.17, particularly for national security and public order.',
    elevated: ['Security & Breach Notification', 'Data Principal Rights'],
    crossrefs: ['DPDPA s.17 (Exemptions)', 'RTI Act', 'e-Governance Guidelines'],
  },
  'Other / Mixed': {
    icon: '🔷',
    weight_boost: {},
    note: 'General DPDPA obligations apply. Review all provisions carefully.',
    elevated: [],
    crossrefs: ['DPDPA 2023', 'DPDP Rules 2025', 'IT Act 2000'],
  },
};

export const PENALTY: Record<string, Penalty> = {
  d11: { max: 250, provision: 'DPDPA s.8(5)', label: 'Failure to implement security safeguards', schedule: 'Schedule Item 1' },
  d15: { max: 200, provision: 'DPDPA s.8(6)', label: 'Failure to notify data breach to DPAB and data principals', schedule: 'Schedule Item 2' },
  d14: { max: 200, provision: 'DPDPA s.9', label: "Breach of children's data obligations", schedule: 'Schedule Item 3', skipIfNA: true },
  d12: { max: 150, provision: 'DPDPA s.10', label: 'Non-compliance with SDF-specific obligations', schedule: 'Schedule Item 4', sdfOnly: true, skipIfNA: true },
  d1: { max: 50, provision: 'DPDPA s.5–6', label: 'Non-compliant privacy notice' },
  d2: { max: 50, provision: 'DPDPA s.6(1)', label: 'Invalid consent mechanism' },
  d3: { max: 50, provision: 'DPDPA s.6(4)', label: 'No consent withdrawal mechanism' },
  d4: { max: 50, provision: 'DPDPA s.5(3)', label: 'No multilingual notice' },
  d5: { max: 50, provision: 'DPDPA s.11', label: 'Denial of right to access personal data' },
  d6: { max: 50, provision: 'DPDPA ss.12–13', label: 'Denial of correction / erasure rights' },
  d7: { max: 50, provision: 'DPDPA s.13(3)', label: 'No grievance redressal mechanism' },
  d8: { max: 50, provision: 'DPDPA s.14', label: 'No nomination mechanism' },
  d9: { max: 50, provision: 'DPDPA s.8(1),(7)', label: 'Purpose limitation or retention violation' },
  d10: { max: 50, provision: 'DPDPA s.8(2)', label: 'No data processor agreements' },
  d13: { max: 50, provision: 'DPDPA s.16', label: 'Unauthorized cross-border transfer', skipIfNA: true },
  // Saudi PDPL
  sa6: { penaltyDisplay: 'SAR 5,000,000 / SAR 3,000,000 (sensitive)', provision: 'Saudi PDPL Art. 35-36 | Implementing Regs Art. 24', label: 'Failure to notify SDAIA of data breach within 72 hours' },
  sa4: { penaltyDisplay: 'SAR 3,000,000 + up to 2 yrs imprisonment', provision: 'Saudi PDPL Art. 36', label: 'Unauthorized disclosure of sensitive personal data', skipIfNA: true },
  sa5: { penaltyDisplay: 'SAR 1,000,000 + up to 1 yr imprisonment', provision: 'Saudi PDPL Art. 37', label: 'Unlawful cross-border transfer of personal data', skipIfNA: true },
  // Brazil LGPD
  br1: { penaltyDisplay: '2% Brazil revenues / BRL 50,000,000 max', provision: 'LGPD Arts. 7, 52', label: 'Processing without a valid Art. 7 lawful basis' },
  br6: { penaltyDisplay: '2% Brazil revenues / BRL 50,000,000 max', provision: 'LGPD Arts. 48, 52', label: 'Failure to notify ANPD of breach within 3 business days' },
  // Singapore PDPA
  sg3: { penaltyDisplay: 'SGD 1,000,000 or 10% SG annual turnover', provision: 'Singapore PDPA Secs. 24, 48J', label: 'Failure to implement reasonable security arrangements' },
  sg4: { penaltyDisplay: 'SGD 1,000,000 or 10% SG annual turnover', provision: 'Singapore PDPA Secs. 26D, 48J', label: 'Failure to notify PDPC within 3 calendar days of notifiable breach' },
  // Thailand PDPA
  th2: { penaltyDisplay: 'THB 3,000,000 (administrative)', provision: 'Thailand PDPA Secs. 26, 82', label: 'Processing sensitive personal data without Sec. 26 basis', skipIfNA: true },
  th4: { penaltyDisplay: 'THB 3,000,000 (administrative) + criminal liability', provision: 'Thailand PDPA Secs. 37, 82-83', label: 'Failure to notify PDPC within 72 hours of data breach' },
  // UK GDPR / DUAA 2025
  uk1: { penaltyDisplay: 'GBP 17,500,000 or 4% global annual turnover', provision: 'UK GDPR Art. 83(5) | DUAA 2025', label: 'Processing without UK GDPR lawful basis' },
  uk3: { penaltyDisplay: 'GBP 17,500,000 or 4% global annual turnover', provision: 'UK GDPR Art. 83(5)', label: 'Breach of data subject rights obligations' },
  uk4: { penaltyDisplay: 'GBP 17,500,000 or 4% global annual turnover', provision: 'UK GDPR Art. 83(5)', label: 'Unlawful international data transfer from the UK', skipIfNA: true },
  uk5: { penaltyDisplay: 'Criminal offence (ICO reg.) + GBP 8,750,000 or 2%', provision: 'DP (Charges) Regs 2018 | UK GDPR Art. 83(4)', label: 'Failure to register with ICO or appoint DPO where required' },
  // UAE PDPL
  ae3: { penaltyDisplay: 'AED 5,000,000 (breach notification failure)', provision: 'UAE PDPL Art. 17 | Cabinet Resolution 33/2022', label: 'Failure to notify UAE Data Office of personal data breach' },
  ae4: { penaltyDisplay: 'AED 5,000,000 max (AED 10,000,000 for repeat violations)', provision: 'UAE PDPL | Cabinet Resolution 33/2022', label: 'Unlawful cross-border transfer of UAE personal data', skipIfNA: true },
  // CCPA CPPA Regulations
  c8: { penaltyDisplay: 'USD 7,500 per intentional violation (CCPA)', provision: 'CCPA §1798.155 | CPPA Art. 10 Regs', label: 'Failure to conduct required CPPA Risk Assessment (Art. 10)', skipIfNA: true },
  c9: { penaltyDisplay: 'USD 7,500 per intentional violation (CCPA)', provision: 'CCPA §1798.155 | CPPA Art. 9 Regs', label: 'Failure to conduct required Cybersecurity Audit (Art. 9)', skipIfNA: true },
  c10: { penaltyDisplay: 'USD 7,500 per intentional violation (CCPA)', provision: 'CCPA §1798.155 | CPPA Art. 11 Regs', label: 'Non-compliance with ADMT obligations (Art. 11)', skipIfNA: true },
};

export const QS: Question[] = [
  // DPDPA Questions
  {
    id: 'd1',
    fw: 'dpdpa',
    cat: 'notice_consent',
    cl: 'Notice & Consent',
    w: 3,
    crit: true,
    q: 'Does your privacy notice clearly specify: (a) categories of personal data collected, (b) purpose of processing, (c) how data principals can exercise rights, and (d) how to lodge a complaint with the Data Protection Board of India?',
    ref: 'DPDPA s.5, s.6 | Rule 3',
    help: 'All four elements are mandatory. The DPAB contact information is frequently omitted. Non-compliant notices are directly penalizable under s.5–6.',
    opts: [
      { v: 2, l: 'Yes: all four elements clearly present in the notice', cls: 'best' },
      { v: 1, l: 'Partially: notice exists but missing some required elements' },
      { v: 0, l: 'No privacy notice or critically deficient', cls: 'worst' },
    ],
  },
  {
    id: 'd2',
    fw: 'dpdpa',
    cat: 'notice_consent',
    cl: 'Notice & Consent',
    w: 3,
    crit: true,
    q: 'Is consent obtained through a clear affirmative action (no pre-ticked boxes, implied consent, or silence), with separate consent per processing purpose?',
    ref: 'DPDPA s.6(1) | Rule 3',
    help: "Consent must be 'free, specific, informed, unconditional and unambiguous' under s.6. Bundled consent is prohibited. Unlike GDPR, DPDPA does not recognize legitimate interests as an alternative.",
    opts: [
      { v: 2, l: 'Yes: explicit opt-in, no bundling, per-purpose granularity', cls: 'best' },
      { v: 1, l: 'Partially: consent exists but may be bundled or implied in some flows' },
      { v: 0, l: 'Relies on pre-ticked boxes, silence, or bundled consent', cls: 'worst' },
    ],
  },
  {
    id: 'd3',
    fw: 'dpdpa',
    cat: 'notice_consent',
    cl: 'Notice & Consent',
    w: 2,
    crit: false,
    q: 'Can data principals withdraw consent as easily as they gave it, without any penalty, detriment, or service denial?',
    ref: 'DPDPA s.6(4)',
    help: 's.6(4) requires withdrawal to be equally easy. Any mechanism that makes withdrawal harder than consent (or penalizes withdrawal) violates this provision.',
    opts: [
      { v: 2, l: 'Yes: one-click or equivalently simple withdrawal available', cls: 'best' },
      { v: 1, l: 'Withdrawal possible but more complex than giving consent' },
      { v: 0, l: 'No withdrawal mechanism, or withdrawal triggers service denial', cls: 'worst' },
    ],
  },
  {
    id: 'd5',
    fw: 'dpdpa',
    cat: 'rights',
    cl: 'Data Principal Rights',
    w: 3,
    crit: true,
    q: 'Is there a clear, accessible process for data principals to request a summary of personal data held and processing activities undertaken?',
    ref: 'DPDPA s.11 | Rule 14',
    help: 's.11 grants the right to obtain a summary of personal data and processing activities. Publish a clear process and a self-committed reasonable SLA.',
    opts: [
      { v: 2, l: 'Yes: published process with a clear, committed response timeline', cls: 'best' },
      { v: 1, l: 'Process exists but response timeline not published or communicated' },
      { v: 0, l: 'No process for data access requests', cls: 'worst' },
    ],
  },
  {
    id: 'd6',
    fw: 'dpdpa',
    cat: 'rights',
    cl: 'Data Principal Rights',
    w: 3,
    crit: true,
    q: 'Can data principals request correction of inaccurate data, erasure of data no longer needed for its purpose, and restriction of processing?',
    ref: 'DPDPA ss.12–13 | Rule 14',
    help: 's.12 mandates correction (including completion and updating), erasure (unless retention required by law), and downstream notification to processors.',
    opts: [
      { v: 2, l: 'Yes: all three rights operational with published process and internal SLA', cls: 'best' },
      { v: 1, l: 'Some rights available but process not clearly published or internal SLA absent' },
      { v: 0, l: 'No mechanism for correction, erasure, or restriction', cls: 'worst' },
    ],
  },
  {
    id: 'd9',
    fw: 'dpdpa',
    cat: 'fiduciary',
    cl: 'Fiduciary Obligations',
    w: 3,
    crit: true,
    q: 'Is personal data collection limited to what is necessary for the specified purpose, with documented retention schedules and automatic erasure/de-identification on expiry?',
    ref: 'DPDPA s.8(1), s.8(7)',
    help: 's.8(7) requires erasure or de-identification once the purpose is fulfilled. "Indefinite retention" is explicitly prohibited.',
    opts: [
      { v: 2, l: 'Yes: documented purpose limitations and retention schedules enforced', cls: 'best' },
      { v: 1, l: 'General policy exists but not consistently enforced or documented' },
      { v: 0, l: 'No purpose limitation or retention policy in place', cls: 'worst' },
    ],
  },
  {
    id: 'd10',
    fw: 'dpdpa',
    cat: 'fiduciary',
    cl: 'Fiduciary Obligations',
    w: 2,
    crit: false,
    q: 'Are all data processors (vendors, SaaS tools, cloud providers, analytics platforms) bound by written DPDPA-compliant contracts?',
    ref: 'DPDPA s.8(2)',
    help: 's.8(2) requires contractual safeguards with every processor. DPAs must specify permitted purposes, security standards, sub-processing restrictions, and breach notification obligations.',
    opts: [
      { v: 2, l: 'Yes: all processors have signed DPAs with DPDPA-compliant clauses', cls: 'best' },
      { v: 1, l: 'Some processors have DPAs; others on informal or legacy contracts' },
      { v: 0, l: 'No data processor agreements in place', cls: 'worst' },
    ],
  },
  {
    id: 'd11',
    fw: 'dpdpa',
    cat: 'security',
    cl: 'Security Safeguards',
    w: 3,
    crit: true,
    q: 'Do you have documented technical and organizational security measures (including encryption at rest and in transit, access controls, and regular security audits)?',
    ref: 'DPDPA s.8(5) | Rule 6',
    help: 'Maximum DPDPA penalty: ₹250 crore. Rule 6 mandates: encryption (at rest and in transit), access controls, continuous logging and monitoring, backup/recovery mechanisms.',
    opts: [
      { v: 2, l: 'Yes: documented security policy, encryption, RBAC, and audit schedule', cls: 'best' },
      { v: 1, l: 'Basic security in place but not formally documented or audited' },
      { v: 0, l: 'No documented security measures', cls: 'worst' },
    ],
  },
  {
    id: 'd14',
    fw: 'dpdpa',
    cat: 'children',
    cl: "Children's Data",
    w: 3,
    crit: true,
    q: "If you process personal data of children (under 18), do you obtain verifiable parental consent and ensure zero behavioral tracking, targeted advertising, or profiling of children?",
    ref: 'DPDPA s.9 | Rule 10',
    help: "DPDPA sets 18 as the age threshold (2 years stricter than GDPR's default 16). Parental consent must be verifiable. Behavioral tracking and targeted advertising of children is categorically prohibited under s.9(3).",
    opts: [
      { v: 2, l: 'Yes: verifiable parental consent; no child tracking, profiling, or targeted ads', cls: 'best' },
      { v: 1, l: 'Age verification exists but parental consent mechanism not robust' },
      { v: 0, l: "Process children's data without verifiable parental consent", cls: 'worst' },
      { v: -1, l: "Not applicable: platform does not serve under-18 users" },
    ],
  },
  {
    id: 'd15',
    fw: 'dpdpa',
    cat: 'breach',
    cl: 'Breach Notification',
    w: 3,
    crit: true,
    q: 'Do you have a documented incident response plan that covers: breach detection, containment, notification to affected Data Principals, and detailed report to DPAB within 72 hours?',
    ref: 'DPDPA s.8(6) | Rule 7(1), 7(2)(a), 7(2)(b)',
    help: 'Rule 7 establishes a two-step notification regime: (1) notify DPAB and all affected Data Principals "without delay", (2) detailed report to DPAB within 72 hours.',
    opts: [
      { v: 2, l: 'Yes: documented IRP with DPAB notification templates and data principal notification process', cls: 'best' },
      { v: 1, l: 'General breach process exists but not DPDPA-specific' },
      { v: 0, l: 'No breach notification process', cls: 'worst' },
    ],
  },
  // GDPR Questions
  {
    id: 'g1',
    fw: 'gdpr',
    cat: 'lawful_basis',
    cl: 'Lawful Basis & Transparency',
    w: 3,
    crit: true,
    q: 'Is a specific GDPR Art. 6 lawful basis documented for each category of processing activity in your Record of Processing Activities (ROPA)?',
    ref: 'GDPR Art. 6 | Art. 30',
    help: "DPDPA note: GDPR's legitimate interests basis (Art. 6(1)(f)) does not exist under DPDPA. Organizations relying on LI for Indian data must switch to consent.",
    opts: [
      { v: 2, l: 'Yes: lawful basis documented per processing activity in ROPA', cls: 'best' },
      { v: 1, l: 'Some activities documented; others rely on assumed legitimate interests' },
      { v: 0, l: 'No documentation of lawful basis per processing activity', cls: 'worst' },
    ],
  },
  {
    id: 'g4',
    fw: 'gdpr',
    cat: 'dsr',
    cl: 'Data Subject Rights',
    w: 3,
    crit: true,
    q: 'Do you have operational processes to handle all seven GDPR data subject rights within one month?',
    ref: 'GDPR Arts. 15–22',
    help: 'Note: DPDPA does not explicitly provide data portability or a right to object. GDPR is stricter on these two rights.',
    opts: [
      { v: 2, l: 'Yes: all rights operational with documented processes and timelines', cls: 'best' },
      { v: 1, l: 'Core rights handled; portability or right to object not fully operational' },
      { v: 0, l: 'No structured DSR handling process', cls: 'worst' },
    ],
  },
  {
    id: 'g8',
    fw: 'gdpr',
    cat: 'transfers',
    cl: 'International Transfers',
    w: 3,
    crit: true,
    q: 'Are all transfers of personal data outside the EEA protected by adequacy decision, SCCs + Transfer Impact Assessment, BCRs, or another Art. 49 derogation?',
    ref: 'GDPR Arts. 44–49',
    help: 'Post-Schrems II, SCCs must be accompanied by a Transfer Impact Assessment. EU-US Data Privacy Framework may be used for US transfers.',
    opts: [
      { v: 2, l: 'Yes: all transfers covered by adequacy, SCCs + TIA, or BCRs', cls: 'best' },
      { v: 1, l: 'Some transfers protected; others lack documented safeguards' },
      { v: 0, l: 'Transfers occur without adequate safeguards', cls: 'worst' },
      { v: -1, l: 'Not applicable: no transfers outside EEA' },
    ],
  },
  // CCPA Questions
  {
    id: 'c1',
    fw: 'ccpa',
    cat: 'notice',
    cl: 'Privacy Notice',
    w: 3,
    crit: true,
    q: "Does your at-collection privacy notice disclose: PI categories collected, processing purposes, whether PI is sold or shared for targeted advertising, retention periods, and all consumer rights?",
    ref: 'CCPA §1798.100 | CPRA',
    help: 'CPRA (2023 amendments) added requirements around cross-context behavioral advertising disclosure and Sensitive PI categories.',
    opts: [
      { v: 2, l: 'Yes: compliant at-collection notice with all required CCPA/CPRA disclosures', cls: 'best' },
      { v: 1, l: 'Notice exists but missing some required disclosures' },
      { v: 0, l: 'No at-collection notice or critically deficient', cls: 'worst' },
    ],
  },
  {
    id: 'c2',
    fw: 'ccpa',
    cat: 'rights',
    cl: 'Consumer Rights',
    w: 3,
    crit: true,
    q: 'Do you honor all CCPA/CPRA consumer rights: Know, Delete, Correct, Opt-out of Sale/Sharing, Limit Use of Sensitive PI, and Non-discrimination?',
    ref: 'CCPA §1798.100–135 | CPRA',
    help: 'CPRA added Correct and Limit Sensitive PI rights. Non-discrimination (§1798.125): consumers cannot be penalized for exercising rights.',
    opts: [
      { v: 2, l: 'Yes: all rights including CPRA additions operational', cls: 'best' },
      { v: 1, l: 'Core rights operational; CPRA additions (Correct, Limit SPI) pending' },
      { v: 0, l: 'No operational consumer rights infrastructure', cls: 'worst' },
    ],
  },
];

export const frameworks = [
  { id: 'dpdpa', name: 'DPDPA 2023', flag: '🇮🇳', color: '#0D0D0D' },
  { id: 'gdpr', name: 'GDPR', flag: '🇪🇺', color: '#1D4ED8' },
  { id: 'ccpa', name: 'CCPA/CPRA', flag: '🇺🇸', color: '#D97706' },
  { id: 'saudpdl', name: 'Saudi PDPL', flag: '🇸🇦', color: '#15803D' },
  { id: 'lgpd', name: 'Brazil LGPD', flag: '🇧🇷', color: '#0E7490' },
  { id: 'sgpdpa', name: 'Singapore PDPA', flag: '🇸🇬', color: '#9F1239' },
  { id: 'thpdpa', name: 'Thailand PDPA', flag: '🇹🇭', color: '#4338CA' },
  { id: 'ukgdpr', name: 'UK GDPR', flag: '🇬🇧', color: '#7C3AED' },
  { id: 'uaepdpl', name: 'UAE PDPL', flag: '🇦🇪', color: '#B45309' },
];

export const sectors = [
  { id: 'healthtech', name: 'HealthTech / Hospital / Insurer', icon: '🏥', risk: 'Highest Risk Sector' },
  { id: 'fintech', name: 'FinTech / BFSI / Payments', icon: '🏦', risk: 'High Risk Sector' },
  { id: 'edtech', name: 'EdTech / Education', icon: '📚', risk: "Children's Data Risk" },
  { id: 'ecommerce', name: 'E-commerce / D2C / Retail', icon: '🛍', risk: 'Transfer Risk' },
  { id: 'saas', name: 'SaaS / Technology Platform', icon: '💻', risk: 'Processor Risk' },
  { id: 'media', name: 'Media / Social Media / OTT', icon: '📱', risk: 'Likely SDF Risk' },
  { id: 'hrtech', name: 'HR Tech / Recruitment', icon: '👥', risk: 'Employee Data Risk' },
  { id: 'legaltech', name: 'LegalTech', icon: '⚖', risk: 'Privileged Data Risk' },
  { id: 'government', name: 'Government / Public Sector', icon: '🏛', risk: 'Exemption Analysis' },
  { id: 'other', name: 'Other / Mixed', icon: '🔷', risk: 'General Framework' },
];
