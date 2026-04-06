import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, AlertTriangle, Download, Bell
} from 'lucide-react';

interface Deadline {
  id: string;
  date: string;
  title: string;
  framework: string;
  flag: string;
  type: 'enforcement' | 'compliance' | 'consultation' | 'guidance';
  description: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
}

const deadlines: Deadline[] = [
  // DPDPA
  {
    id: 'dpdpa-1',
    date: '2025-08-15',
    title: 'DPDP Rules 2025 Effective Date',
    framework: 'DPDPA 2023',
    flag: '🇮🇳',
    type: 'enforcement',
    description: 'Draft DPDP Rules 2025 published. Public consultation period ending. Final rules expected to be notified.',
    urgency: 'critical',
  },
  {
    id: 'dpdpa-2',
    date: '2027-05-01',
    title: 'DPDPA Full Enforcement',
    framework: 'DPDPA 2023',
    flag: '🇮🇳',
    type: 'enforcement',
    description: 'Expected date for full enforcement of DPDPA 2023 after DPAB establishment and rules notification.',
    urgency: 'high',
  },
  {
    id: 'dpdpa-3',
    date: '2025-12-31',
    title: 'Significant Data Fiduciary Registration',
    framework: 'DPDPA 2023',
    flag: '🇮🇳',
    type: 'compliance',
    description: 'Organizations designated as SDFs must complete registration with DPAB.',
    urgency: 'high',
  },
  // GDPR
  {
    id: 'gdpr-1',
    date: '2025-06-30',
    title: 'GDPR 7th Anniversary Review',
    framework: 'GDPR',
    flag: '🇪🇺',
    type: 'consultation',
    description: 'European Commission review of GDPR implementation and effectiveness.',
    urgency: 'medium',
  },
  {
    id: 'gdpr-2',
    date: '2025-09-15',
    title: 'New SCCs for AI Training Data',
    framework: 'GDPR',
    flag: '🇪🇺',
    type: 'guidance',
    description: 'Expected EDPB guidance on Standard Contractual Clauses for AI model training data transfers.',
    urgency: 'medium',
  },
  // CCPA/CPRA
  {
    id: 'ccpa-1',
    date: '2025-07-01',
    title: 'CPPA Risk Assessment Requirements',
    framework: 'CCPA/CPRA',
    flag: '🇺🇸',
    type: 'enforcement',
    description: 'Mandatory risk assessments for automated decision-making technology and sensitive personal information.',
    urgency: 'critical',
  },
  {
    id: 'ccpa-2',
    date: '2025-10-01',
    title: 'CPPA Cybersecurity Audit Deadline',
    framework: 'CCPA/CPRA',
    flag: '🇺🇸',
    description: 'Businesses meeting thresholds must complete first annual cybersecurity audit.',
    type: 'compliance',
    urgency: 'high',
  },
  // Saudi PDPL
  {
    id: 'saudi-1',
    date: '2025-05-15',
    title: 'Saudi PDPL Full Enforcement',
    framework: 'Saudi PDPL',
    flag: '🇸🇦',
    type: 'enforcement',
    description: 'Full enforcement of Saudi PDPL including all penalties and sanctions.',
    urgency: 'critical',
  },
  {
    id: 'saudi-2',
    date: '2025-08-30',
    title: 'SDAIA Registration Deadline',
    framework: 'Saudi PDPL',
    flag: '🇸🇦',
    type: 'compliance',
    description: 'Data controllers must complete registration with Saudi Data and Artificial Intelligence Authority.',
    urgency: 'high',
  },
  // Brazil LGPD
  {
    id: 'brazil-1',
    date: '2025-06-01',
    title: 'LGPD Small Business Exemption Ends',
    framework: 'Brazil LGPD',
    flag: '🇧🇷',
    type: 'enforcement',
    description: 'Small businesses and startups lose transitional exemption from certain LGPD provisions.',
    urgency: 'high',
  },
  // Singapore PDPA
  {
    id: 'singapore-1',
    date: '2025-11-01',
    title: 'PDPA Data Portability Expansion',
    framework: 'Singapore PDPA',
    flag: '🇸🇬',
    type: 'enforcement',
    description: 'Expanded data portability requirements for additional sectors.',
    urgency: 'medium',
  },
  // Thailand PDPA
  {
    id: 'thailand-1',
    date: '2025-12-31',
    title: 'Thailand PDPA 3-Year Review',
    framework: 'Thailand PDPA',
    flag: '🇹🇭',
    type: 'consultation',
    description: 'Mandatory review of PDPA implementation and proposed amendments.',
    urgency: 'low',
  },
  // UK GDPR
  {
    id: 'uk-1',
    date: '2025-09-01',
    title: 'UK Data (Use and Access) Act 2025',
    framework: 'UK GDPR',
    flag: '🇬🇧',
    type: 'enforcement',
    description: 'DUAA 2025 provisions on smart data schemes and digital verification come into force.',
    urgency: 'high',
  },
  {
    id: 'uk-2',
    date: '2025-10-15',
    title: 'ICO Age-Appropriate Design Code 2.0',
    framework: 'UK GDPR',
    flag: '🇬🇧',
    type: 'guidance',
    description: 'Updated Children\'s Code with new standards for immersive technologies.',
    urgency: 'medium',
  },
  // UAE PDPL
  {
    id: 'uae-1',
    date: '2025-07-15',
    title: 'UAE PDPL Executive Regulations',
    framework: 'UAE PDPL',
    flag: '🇦🇪',
    type: 'enforcement',
    description: 'Detailed executive regulations for UAE PDPL implementation expected.',
    urgency: 'high',
  },
  {
    id: 'uae-2',
    date: '2025-12-01',
    title: 'UAE Data Office Registration Opens',
    framework: 'UAE PDPL',
    flag: '🇦🇪',
    type: 'compliance',
    description: 'Data controllers can begin registration with UAE Data Office.',
    urgency: 'medium',
  },
];

const urgencyColors = {
  critical: 'bg-[var(--red)] text-white',
  high: 'bg-[var(--amber)] text-white',
  medium: 'bg-[var(--blue)] text-white',
  low: 'bg-[var(--ink-3)] text-white',
};

const typeLabels = {
  enforcement: 'Enforcement',
  compliance: 'Compliance Deadline',
  consultation: 'Consultation',
  guidance: 'Guidance',
};

export default function CalendarPage() {
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');
  const [selectedFramework, setSelectedFramework] = useState<string>('all');

  const filteredDeadlines = deadlines.filter(d => {
    if (filter !== 'all' && d.urgency !== filter) return false;
    if (selectedFramework !== 'all' && d.framework !== selectedFramework) return false;
    return true;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getDaysUntil = (dateStr: string) => {
    const target = new Date(dateStr);
    const today = new Date();
    const diff = target.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const frameworks = ['all', ...Array.from(new Set(deadlines.map(d => d.framework)))];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="section-eyebrow">Regulatory Timeline</span>
          <h1 className="font-serif text-3xl md:text-4xl text-[var(--ink)] mb-3">
            Enforcement Calendar 2025–2026
          </h1>
          <p className="text-[var(--ink-3)] max-w-2xl mx-auto">
            Track upcoming enforcement dates, compliance deadlines, and regulatory consultations 
            across 9 major privacy frameworks.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-[var(--border)] p-6 mb-8"
        >
          <div className="flex flex-wrap gap-6">
            <div>
              <label className="text-sm font-medium text-[var(--ink-4)] mb-2 block">Urgency</label>
              <div className="flex gap-2">
                {(['all', 'critical', 'high', 'medium'] as const).map(u => (
                  <button
                    key={u}
                    onClick={() => setFilter(u)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      filter === u
                        ? 'bg-[var(--ink)] text-white'
                        : 'bg-[var(--cream-dark)] text-[var(--ink-3)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {u.charAt(0).toUpperCase() + u.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-[var(--ink-4)] mb-2 block">Framework</label>
              <select
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="px-3 py-1.5 rounded-md border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ink)]"
              >
                <option value="all">All Frameworks</option>
                {frameworks.filter(f => f !== 'all').map(fw => (
                  <option key={fw} value={fw}>{fw}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Deadlines List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {filteredDeadlines.map((deadline, idx) => {
            const daysUntil = getDaysUntil(deadline.date);
            const isPast = daysUntil < 0;
            
            return (
              <motion.div
                key={deadline.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`bg-white rounded-xl border border-[var(--border)] p-5 ${
                  isPast ? 'opacity-60' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Date */}
                  <div className="flex items-center gap-3 md:w-48">
                    <div className="w-12 h-12 rounded-lg bg-[var(--cream-dark)] flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[var(--ink)]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--ink)]">{formatDate(deadline.date)}</div>
                      <div className={`text-xs ${
                        isPast ? 'text-[var(--ink-4)]' :
                        daysUntil <= 30 ? 'text-[var(--red)] font-medium' :
                        daysUntil <= 90 ? 'text-[var(--amber)]' :
                        'text-[var(--ink-3)]'
                      }`}>
                        {isPast ? 'Past' : `${daysUntil} days remaining`}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{deadline.flag}</span>
                      <span className="font-medium text-[var(--ink)]">{deadline.framework}</span>
                      <span className={`tag text-[10px] ${urgencyColors[deadline.urgency]}`}>
                        {deadline.urgency.toUpperCase()}
                      </span>
                      <span className="tag tag-blue text-[10px]">{typeLabels[deadline.type]}</span>
                    </div>
                    <h3 className="font-semibold text-[var(--ink)] mb-1">{deadline.title}</h3>
                    <p className="text-sm text-[var(--ink-3)]">{deadline.description}</p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-md hover:bg-[var(--cream-dark)] text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors">
                      <Bell className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-md hover:bg-[var(--cream-dark)] text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Critical Deadlines', value: deadlines.filter(d => d.urgency === 'critical').length, color: 'var(--red)' },
            { label: 'High Priority', value: deadlines.filter(d => d.urgency === 'high').length, color: 'var(--amber)' },
            { label: 'This Quarter', value: deadlines.filter(d => getDaysUntil(d.date) <= 90 && getDaysUntil(d.date) >= 0).length, color: 'var(--blue)' },
            { label: 'Total Tracked', value: deadlines.length, color: 'var(--ink)' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-[var(--border)] p-5 text-center">
              <div className="font-serif text-3xl mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-sm text-[var(--ink-3)]">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 bg-[var(--amber-bg)] border border-[var(--amber-border)] rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[var(--amber)] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[var(--amber)] mb-1">Important Notice</div>
              <p className="text-sm text-[var(--ink-3)]">
                Dates are based on current regulatory information and may change. Always verify with official 
                regulatory sources. This calendar is updated weekly to reflect the latest developments.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
