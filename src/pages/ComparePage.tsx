import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, Check, AlertCircle, ChevronDown, ChevronUp, Globe
} from 'lucide-react';

interface ComparisonPoint {
  category: string;
  points: {
    label: string;
    description: string;
    dpdpa: string;
    gdpr: string;
    ccpa: string;
    saudi: string;
    brazil: string;
    singapore: string;
    thailand: string;
    uk: string;
    uae: string;
  }[];
}

const comparisonData: ComparisonPoint[] = [
  {
    category: 'Consent & Lawful Basis',
    points: [
      {
        label: 'Consent Required',
        description: 'Is explicit consent the primary lawful basis?',
        dpdpa: 'Yes (primary basis)',
        gdpr: 'One of 6 lawful bases',
        ccpa: 'Opt-out for sale/sharing',
        saudi: 'Yes (primary basis)',
        brazil: 'One of 10 lawful bases',
        singapore: 'Consent or deemed consent',
        thailand: 'Consent or legal basis',
        uk: 'One of 6 lawful bases',
        uae: 'Consent or legal basis',
      },
      {
        label: 'Legitimate Interests',
        description: 'Is legitimate interests recognized as a lawful basis?',
        dpdpa: '❌ No',
        gdpr: '✅ Yes (Art. 6(1)(f))',
        ccpa: 'N/A',
        saudi: '❌ No',
        brazil: '✅ Yes (Art. 7)',
        singapore: '⚠️ Limited',
        thailand: '✅ Yes',
        uk: '✅ Yes',
        uae: '✅ Yes',
      },
      {
        label: 'Consent Withdrawal',
        description: 'Must withdrawal be as easy as giving consent?',
        dpdpa: '✅ Yes (s.6(4))',
        gdpr: '✅ Yes (Art. 7(3))',
        ccpa: '✅ Yes (opt-out link)',
        saudi: '✅ Yes',
        brazil: '✅ Yes',
        singapore: '✅ Yes',
        thailand: '✅ Yes',
        uk: '✅ Yes',
        uae: '✅ Yes',
      },
    ],
  },
  {
    category: 'Data Subject Rights',
    points: [
      {
        label: 'Access Right',
        description: 'Right to access personal data',
        dpdpa: '✅ Yes (s.11)',
        gdpr: '✅ Yes (Art. 15)',
        ccpa: '✅ Yes (Know)',
        saudi: '✅ Yes',
        brazil: '✅ Yes',
        singapore: '✅ Yes',
        thailand: '✅ Yes',
        uk: '✅ Yes',
        uae: '✅ Yes',
      },
      {
        label: 'Correction Right',
        description: 'Right to correct inaccurate data',
        dpdpa: '✅ Yes (s.12)',
        gdpr: '✅ Yes (Art. 16)',
        ccpa: '✅ Yes (CPRA)',
        saudi: '✅ Yes',
        brazil: '✅ Yes',
        singapore: '✅ Yes',
        thailand: '✅ Yes',
        uk: '✅ Yes',
        uae: '✅ Yes',
      },
      {
        label: 'Erasure (Right to be Forgotten)',
        description: 'Right to deletion of personal data',
        dpdpa: '✅ Yes (s.12)',
        gdpr: '✅ Yes (Art. 17)',
        ccpa: '✅ Yes (Delete)',
        saudi: '✅ Yes',
        brazil: '✅ Yes',
        singapore: '✅ Yes',
        thailand: '✅ Yes',
        uk: '✅ Yes',
        uae: '✅ Yes',
      },
      {
        label: 'Data Portability',
        description: 'Right to receive data in portable format',
        dpdpa: '❌ No',
        gdpr: '✅ Yes (Art. 20)',
        ccpa: '❌ No',
        saudi: '✅ Yes',
        brazil: '✅ Yes',
        singapore: '❌ No',
        thailand: '❌ No',
        uk: '✅ Yes',
        uae: '✅ Yes',
      },
      {
        label: 'Right to Object',
        description: 'Right to object to processing',
        dpdpa: '❌ No',
        gdpr: '✅ Yes (Art. 21)',
        ccpa: '✅ Yes (Opt-out)',
        saudi: '✅ Yes',
        brazil: '✅ Yes',
        singapore: '✅ Yes',
        thailand: '✅ Yes',
        uk: '✅ Yes',
        uae: '✅ Yes',
      },
    ],
  },
  {
    category: 'Security & Breach',
    points: [
      {
        label: 'Security Safeguards Required',
        description: 'Are technical and organizational measures mandatory?',
        dpdpa: '✅ Yes (s.8(5))',
        gdpr: '✅ Yes (Art. 32)',
        ccpa: '✅ Yes (reasonable security)',
        saudi: '✅ Yes',
        brazil: '✅ Yes',
        singapore: '✅ Yes',
        thailand: '✅ Yes',
        uk: '✅ Yes',
        uae: '✅ Yes',
      },
      {
        label: 'Breach Notification Deadline',
        description: 'Time limit to notify supervisory authority',
        dpdpa: '72 hours (Rule 7)',
        gdpr: '72 hours (Art. 33)',
        ccpa: 'Without delay',
        saudi: '72 hours',
        brazil: 'Reasonable time',
        singapore: '3 days',
        thailand: '72 hours',
        uk: '72 hours',
        uae: 'Without delay',
      },
      {
        label: 'Breach Penalty (Maximum)',
        description: 'Maximum administrative penalty for breach notification failure',
        dpdpa: '₹200 Cr',
        gdpr: '€20M / 4% turnover',
        ccpa: '$7,500 per violation',
        saudi: 'SAR 5M',
        brazil: '2% Brazil rev / BRL 50M',
        singapore: 'SGD 1M / 10% SG turnover',
        thailand: 'THB 3M + criminal',
        uk: '£17.5M / 4% turnover',
        uae: 'AED 5M',
      },
    ],
  },
  {
    category: 'Children\'s Data',
    points: [
      {
        label: 'Age Threshold',
        description: 'Age below which parental consent is required',
        dpdpa: '18 years (s.9)',
        gdpr: '16 years (default)',
        ccpa: '16 years',
        saudi: '15 years',
        brazil: '12 years',
        singapore: 'Under 18 (specific rules)',
        thailand: 'Under 20',
        uk: '13 years',
        uae: '18 years',
      },
      {
        label: 'Behavioral Tracking Prohibited',
        description: 'Is targeted advertising/tracking of children prohibited?',
        dpdpa: '✅ Yes (s.9(3))',
        gdpr: '⚠️ Recommended',
        ccpa: '✅ Yes (under 16)',
        saudi: '✅ Yes',
        brazil: '⚠️ Limited',
        singapore: '⚠️ Limited',
        thailand: '⚠️ Limited',
        uk: '✅ Yes (ICO guidance)',
        uae: '✅ Yes',
      },
    ],
  },
  {
    category: 'Cross-Border Transfers',
    points: [
      {
        label: 'Transfer Mechanism',
        description: 'Primary mechanism for international transfers',
        dpdpa: 'Adequacy + Central Gov approval (s.16)',
        gdpr: 'SCCs, BCRs, Adequacy (Arts. 44-49)',
        ccpa: 'No specific restrictions',
        saudi: 'Adequacy + SDAIA approval',
        brazil: 'Adequacy + ANPD authorization',
        singapore: 'Transfer limitations apply',
        thailand: 'Adequacy + PDPC approval',
        uk: 'IDTA, SCCs + UK Addendum',
        uae: 'Adequacy + UAEDO approval',
      },
      {
        label: 'Transfer Impact Assessment',
        description: 'Is a transfer impact assessment required?',
        dpdpa: '⚠️ Emerging practice',
        gdpr: '✅ Yes (post-Schrems II)',
        ccpa: 'N/A',
        saudi: '⚠️ Recommended',
        brazil: '⚠️ Recommended',
        singapore: '⚠️ Recommended',
        thailand: '⚠️ Recommended',
        uk: '✅ Yes',
        uae: '⚠️ Recommended',
      },
    ],
  },
];

const frameworks = [
  { id: 'dpdpa', name: 'DPDPA 2023', flag: '🇮🇳', color: '#0D0D0D' },
  { id: 'gdpr', name: 'GDPR', flag: '🇪🇺', color: '#1D4ED8' },
  { id: 'ccpa', name: 'CCPA/CPRA', flag: '🇺🇸', color: '#D97706' },
  { id: 'saudi', name: 'Saudi PDPL', flag: '🇸🇦', color: '#15803D' },
  { id: 'brazil', name: 'Brazil LGPD', flag: '🇧🇷', color: '#0E7490' },
  { id: 'singapore', name: 'Singapore PDPA', flag: '🇸🇬', color: '#9F1239' },
  { id: 'thailand', name: 'Thailand PDPA', flag: '🇹🇭', color: '#4338CA' },
  { id: 'uk', name: 'UK GDPR', flag: '🇬🇧', color: '#7C3AED' },
  { id: 'uae', name: 'UAE PDPL', flag: '🇦🇪', color: '#B45309' },
];

export default function ComparePage() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>((['Consent & Lawful Basis', 'Data Subject Rights', 'Security & Breach']));
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(['dpdpa', 'gdpr', 'ccpa']);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleFramework = (fwId: string) => {
    setSelectedFrameworks(prev =>
      prev.includes(fwId)
        ? prev.filter(f => f !== fwId)
        : [...prev, fwId]
    );
  };

  const renderValue = (value: string) => {
    if (value.startsWith('✅')) {
      return <span className="text-[var(--green)] font-medium">{value}</span>;
    }
    if (value.startsWith('❌')) {
      return <span className="text-[var(--red)] font-medium">{value}</span>;
    }
    if (value.startsWith('⚠️')) {
      return <span className="text-[var(--amber)] font-medium">{value}</span>;
    }
    return <span className="text-[var(--ink-3)]">{value}</span>;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="section-eyebrow">Framework Analysis</span>
          <h1 className="font-serif text-3xl md:text-4xl text-[var(--ink)] mb-3">
            9-Framework Comparison Matrix
          </h1>
          <p className="text-[var(--ink-3)] max-w-2xl mx-auto">
            Side-by-side comparison of key provisions across major global privacy frameworks. 
            Understand differences in consent, rights, security, and cross-border requirements.
          </p>
        </motion.div>

        {/* Framework Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-[var(--border)] p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5 text-[var(--ink)]" />
            <h2 className="font-serif text-lg">Select Frameworks to Compare</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {frameworks.map(fw => (
              <button
                key={fw.id}
                onClick={() => toggleFramework(fw.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                  selectedFrameworks.includes(fw.id)
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-white'
                    : 'border-[var(--border)] text-[var(--ink-3)] hover:border-[var(--ink-3)]'
                }`}
              >
                <span>{fw.flag}</span>
                <span className="text-sm font-medium">{fw.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Comparison Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {comparisonData.map((category, catIdx) => (
            <div key={catIdx} className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
              <button
                onClick={() => toggleCategory(category.category)}
                className="w-full flex items-center justify-between p-5 hover:bg-[var(--cream)] transition-colors"
              >
                <h3 className="font-serif text-xl text-[var(--ink)]">{category.category}</h3>
                {expandedCategories.includes(category.category) ? (
                  <ChevronUp className="w-5 h-5 text-[var(--ink-3)]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[var(--ink-3)]" />
                )}
              </button>
              
              {expandedCategories.includes(category.category) && (
                <div className="border-t border-[var(--border)]">
                  {category.points.map((point, pointIdx) => (
                    <div key={pointIdx} className="p-5 border-b border-[var(--border)] last:border-0">
                      <div className="mb-3">
                        <h4 className="font-semibold text-[var(--ink)]">{point.label}</h4>
                        <p className="text-sm text-[var(--ink-3)]">{point.description}</p>
                      </div>
                      
                      <div className="grid gap-3">
                        {selectedFrameworks.map(fwId => {
                          const fw = frameworks.find(f => f.id === fwId);
                          const value = point[fwId as keyof typeof point] as string;
                          
                          return (
                            <div key={fwId} className="flex items-center gap-3 p-3 bg-[var(--cream)] rounded-lg">
                              <span className="text-lg">{fw?.flag}</span>
                              <span className="font-medium text-sm w-32">{fw?.name}</span>
                              <span className="flex-1">{renderValue(value)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Key Differences Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 bg-[var(--ink)] rounded-xl p-8 text-white"
        >
          <h2 className="font-serif text-2xl mb-6">Key Differences: DPDPA vs GDPR</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white/80 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[var(--amber)]" />
                DPDPA is Stricter On
              </h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--green)] mt-0.5" />
                  <span>Children's data: 18 years vs 16 years (GDPR default)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-5 text-[var(--green)] mt-0.5" />
                  <span>Consent: No legitimate interests alternative</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--green)] mt-0.5" />
                  <span>No data portability right</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--green)] mt-0.5" />
                  <span>No right to object to processing</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white/80 mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[var(--blue)]" />
                GDPR is Stricter On
              </h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--green)] mt-0.5" />
                  <span>Data portability: Explicit right under Art. 20</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--green)] mt-0.5" />
                  <span>Right to object: Art. 21 protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--green)] mt-0.5" />
                  <span>Transfer Impact Assessments: Post-Schrems II</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--green)] mt-0.5" />
                  <span>DPO requirement: Mandatory for certain controllers</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
