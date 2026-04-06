import { motion } from 'framer-motion';
import { 
  GitCommit, Calendar, Check, AlertTriangle, 
  FileText, ArrowUp, Shield
} from 'lucide-react';

interface ChangelogEntry {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  changes: {
    category: 'feature' | 'fix' | 'legal' | 'framework';
    description: string;
  }[];
}

const changelog: ChangelogEntry[] = [
  {
    version: '2.1.0',
    date: '2025-04-06',
    type: 'minor',
    changes: [
      { category: 'feature', description: 'Added Breach Response Playbook with countdown timers' },
      { category: 'feature', description: 'Enhanced 9-Framework Comparison Matrix with filterable views' },
      { category: 'feature', description: 'New Regulatory Enforcement Calendar with deadline tracking' },
      { category: 'legal', description: 'Updated DPDP Rules 2025 references based on March 2025 draft' },
    ],
  },
  {
    version: '2.0.0',
    date: '2025-03-15',
    type: 'major',
    changes: [
      { category: 'feature', description: 'Complete UI/UX redesign with modern animations' },
      { category: 'framework', description: 'Added UK GDPR / DUAA 2025 coverage' },
      { category: 'framework', description: 'Added UAE PDPL framework analysis' },
      { category: 'legal', description: 'Updated all penalty frameworks to 2025 values' },
    ],
  },
  {
    version: '1.5.0',
    date: '2025-02-28',
    type: 'minor',
    changes: [
      { category: 'feature', description: 'Added sector-specific risk weighting' },
      { category: 'legal', description: 'Updated Singapore PDPA amendments (2024)' },
      { category: 'legal', description: 'Updated Thailand PDPA enforcement guidance' },
    ],
  },
  {
    version: '1.4.0',
    date: '2025-01-20',
    type: 'minor',
    changes: [
      { category: 'framework', description: 'Added Saudi PDPL full coverage' },
      { category: 'framework', description: 'Added Brazil LGPD framework' },
      { category: 'legal', description: 'Updated CCPA/CPRA 2025 regulations' },
    ],
  },
  {
    version: '1.3.0',
    date: '2024-12-10',
    type: 'minor',
    changes: [
      { category: 'feature', description: 'Added PDF export for assessment reports' },
      { category: 'feature', description: 'Enhanced penalty exposure calculation' },
      { category: 'legal', description: 'Updated GDPR post-Schrems II guidance' },
    ],
  },
  {
    version: '1.2.0',
    date: '2024-11-05',
    type: 'minor',
    changes: [
      { category: 'feature', description: 'Added 30/60/90 day remediation roadmap' },
      { category: 'legal', description: 'Updated DPDPA s.9 children\'s data provisions' },
      { category: 'fix', description: 'Fixed cross-border transfer assessment logic' },
    ],
  },
  {
    version: '1.1.0',
    date: '2024-10-01',
    type: 'minor',
    changes: [
      { category: 'feature', description: 'Added risk heat map visualization' },
      { category: 'legal', description: 'Updated Rule 7 breach notification requirements' },
      { category: 'legal', description: 'Updated Rule 6 security safeguard provisions' },
    ],
  },
  {
    version: '1.0.0',
    date: '2024-09-01',
    type: 'major',
    changes: [
      { category: 'feature', description: 'Initial release of Privacipher' },
      { category: 'framework', description: 'DPDPA 2023 coverage' },
      { category: 'framework', description: 'GDPR coverage' },
      { category: 'framework', description: 'CCPA/CPRA coverage' },
      { category: 'feature', description: 'Multi-framework assessment tool' },
    ],
  },
];

const typeLabels = {
  major: { label: 'Major Release', color: 'bg-[var(--purple)]' },
  minor: { label: 'Minor Release', color: 'bg-[var(--blue)]' },
  patch: { label: 'Patch', color: 'bg-[var(--green)]' },
};

const categoryIcons = {
  feature: { icon: ArrowUp, color: 'text-[var(--green)]', bg: 'bg-[var(--green-bg)]' },
  fix: { icon: Check, color: 'text-[var(--blue)]', bg: 'bg-[var(--blue-bg)]' },
  legal: { icon: FileText, color: 'text-[var(--amber)]', bg: 'bg-[var(--amber-bg)]' },
  framework: { icon: Shield, color: 'text-[var(--purple)]', bg: 'bg-[var(--purple-bg)]' },
};

const categoryLabels = {
  feature: 'Feature',
  fix: 'Fix',
  legal: 'Legal Update',
  framework: 'Framework',
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="section-eyebrow">Version History</span>
          <h1 className="font-serif text-3xl md:text-4xl text-[var(--ink)] mb-3">
            Changelog & Legal Accuracy Updates
          </h1>
          <p className="text-[var(--ink-3)] max-w-2xl mx-auto">
            Track updates to Privacipher, including new features, framework additions, 
            and legal accuracy updates based on regulatory changes.
          </p>
        </motion.div>

        {/* Legal Accuracy Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--blue-bg)] border border-[var(--blue-border)] rounded-xl p-6 mb-10"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--blue)] flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-[var(--blue)] mb-2">
                Legal Accuracy Commitment
              </h2>
              <p className="text-[var(--ink-3)] mb-3">
                Privacipher is updated weekly to reflect the latest regulatory developments. 
                All penalty frameworks, compliance requirements, and legal references are 
                verified against official regulatory sources.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="tag tag-blue text-[10px]">Weekly Updates</span>
                <span className="tag tag-blue text-[10px]">Official Sources</span>
                <span className="tag tag-blue text-[10px]">Verified References</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Changelog Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {changelog.map((entry, idx) => (
            <motion.div
              key={entry.version}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * idx }}
              className="relative"
            >
              {/* Timeline Line */}
              {idx < changelog.length - 1 && (
                <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-[var(--border)]" />
              )}
              
              <div className="flex gap-6">
                {/* Version Badge */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full ${typeLabels[entry.type].color} flex items-center justify-center`}>
                    <GitCommit className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 bg-white rounded-xl border border-[var(--border)] p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-serif text-xl text-[var(--ink)]">v{entry.version}</span>
                    <span className={`tag ${typeLabels[entry.type].color} text-white text-[10px]`}>
                      {typeLabels[entry.type].label}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-[var(--ink-3)]">
                      <Calendar className="w-4 h-4" />
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {entry.changes.map((change, changeIdx) => {
                      const cat = categoryIcons[change.category];
                      return (
                        <div key={changeIdx} className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded ${cat.bg} flex items-center justify-center flex-shrink-0`}>
                            <cat.icon className={`w-3.5 h-3.5 ${cat.color}`} />
                          </div>
                          <div>
                            <span className={`text-xs font-medium ${cat.color} uppercase tracking-wide`}>
                              {categoryLabels[change.category]}
                            </span>
                            <p className="text-sm text-[var(--ink-3)]">{change.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Update Frequency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-[var(--cream-dark)] rounded-xl p-6"
        >
          <h2 className="font-serif text-xl mb-4">Update Schedule</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[var(--green)]" />
                <span className="font-semibold text-sm">Weekly</span>
              </div>
              <p className="text-xs text-[var(--ink-3)]">
                Framework updates, penalty adjustments, and regulatory guidance changes
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[var(--blue)]" />
                <span className="font-semibold text-sm">Monthly</span>
              </div>
              <p className="text-xs text-[var(--ink-3)]">
                Feature enhancements, UI improvements, and new assessment questions
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[var(--purple)]" />
                <span className="font-semibold text-sm">Quarterly</span>
              </div>
              <p className="text-xs text-[var(--ink-3)]">
                Major framework additions, new jurisdictions, and comprehensive updates
              </p>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-[var(--amber-bg)] border border-[var(--amber-border)] rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[var(--amber)] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[var(--amber)] mb-1">Important Notice</div>
              <p className="text-sm text-[var(--ink-3)]">
                While we strive for accuracy, regulations change frequently. Always verify 
                critical compliance decisions with official regulatory sources and qualified 
                legal counsel. This changelog reflects updates made to the Privacipher platform 
                and does not constitute legal advice.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
