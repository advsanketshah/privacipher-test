import { motion } from 'framer-motion';
import { ArrowRight, Shield, FileCheck, AlertTriangle, Calendar, BarChart3, Globe, Lock } from 'lucide-react';

interface HomePageProps {
  onStartAssessment: () => void;
}

const features = [
  {
    icon: Globe,
    title: '9 Global Frameworks',
    description: 'DPDPA, GDPR, CCPA/CPRA, Saudi PDPL, LGPD, Singapore PDPA, Thailand PDPA, UK GDPR, UAE PDPL',
  },
  {
    icon: BarChart3,
    title: 'Sector-Specific Scoring',
    description: 'Tailored assessments for HealthTech, FinTech, EdTech, SaaS, E-commerce, and more',
  },
  {
    icon: AlertTriangle,
    title: 'Penalty Exposure Mapping',
    description: 'Real-time calculation of maximum statutory penalties across jurisdictions',
  },
  {
    icon: Shield,
    title: 'Risk Heat Map',
    description: 'Visualize compliance gaps by likelihood and regulatory impact',
  },
  {
    icon: Calendar,
    title: '30/60/90-Day Roadmap',
    description: 'Prioritized remediation timeline based on risk severity',
  },
  {
    icon: FileCheck,
    title: 'PDF Export',
    description: 'Generate comprehensive compliance reports for stakeholders',
  },
];

const stats = [
  { value: '9', label: 'Privacy Frameworks' },
  { value: '10', label: 'Industry Sectors' },
  { value: '50+', label: 'Assessment Questions' },
  { value: '0', label: 'Data Collected' },
];

export default function HomePage({ onStartAssessment }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--ink)] via-[var(--ink-2)] to-[var(--ink)]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-6"
            >
              <Lock className="w-4 h-4" />
              <span>Zero data collection — All processing in your browser</span>
            </motion.div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Global Privacy Compliance Intelligence
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
              Assess your organization's compliance posture across 9 major privacy frameworks. 
              Get sector-specific scoring, penalty exposure analysis, and actionable remediation roadmaps.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStartAssessment}
                className="btn-primary text-base px-8 py-4"
              >
                Start Free Assessment
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://www.linkedin.com/in/advsanketshah/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-base px-8 py-4 border-white/30 text-white hover:bg-white hover:text-[var(--ink)]"
              >
                Connect on LinkedIn
              </motion.a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="font-serif text-4xl md:text-5xl text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="section-eyebrow">Features</span>
            <h2 className="section-title">Everything You Need for Privacy Compliance</h2>
            <p className="section-desc mx-auto">
              Comprehensive tools to assess, track, and improve your organization's privacy compliance posture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-modern p-6 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--cream-dark)] flex items-center justify-center mb-4 group-hover:bg-[var(--ink)] group-hover:text-white transition-all">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--ink-3)]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="section-eyebrow">Coverage</span>
            <h2 className="section-title">9 Major Privacy Frameworks</h2>
            <p className="section-desc mx-auto">
              Comprehensive coverage of the world's most important data protection regulations.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { flag: '🇮🇳', name: 'DPDPA 2023', sub: 'India · DPDP Rules 2025', status: 'Enforceable May 2027' },
              { flag: '🇪🇺', name: 'GDPR', sub: 'EU / EEA · 2016/679', status: 'In Force' },
              { flag: '🇺🇸', name: 'CCPA / CPRA', sub: 'California · CPPA Regs 2025', status: 'In Force' },
              { flag: '🇸🇦', name: 'Saudi PDPL', sub: 'Saudi Arabia · SDAIA', status: 'In Force (Sep 2024)' },
              { flag: '🇧🇷', name: 'Brazil LGPD', sub: 'Brazil · ANPD', status: 'In Force' },
              { flag: '🇸🇬', name: 'Singapore PDPA', sub: 'Singapore · PDPC', status: 'In Force' },
              { flag: '🇹🇭', name: 'Thailand PDPA', sub: 'Thailand · B.E. 2562', status: 'In Force (Jun 2022)' },
              { flag: '🇬🇧', name: 'UK GDPR / DUAA 2025', sub: 'United Kingdom · ICO', status: 'In Force' },
              { flag: '🇦🇪', name: 'UAE PDPL', sub: 'UAE · UAEDO', status: 'In Force' },
            ].map((fw, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--cream)] hover:border-[var(--ink-3)] transition-colors"
              >
                <span className="text-3xl">{fw.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[var(--ink)]">{fw.name}</div>
                  <div className="text-xs text-[var(--ink-3)]">{fw.sub}</div>
                </div>
                <span className="tag tag-green text-[10px]">{fw.status}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--ink)] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
            </div>
            
            <div className="relative">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Ready to Assess Your Compliance?
              </h2>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">
                Start your free multi-framework assessment now. No signup required. 
                All data stays in your browser.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStartAssessment}
                className="btn-primary text-base px-8 py-4 bg-white text-[var(--ink)] hover:bg-white/90"
              >
                Start Assessment Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--amber-bg)] border border-[var(--amber-border)] rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[var(--amber)] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[var(--amber)] mb-1">Legal Disclaimer</div>
                <p className="text-sm text-[var(--ink-3)]">
                  Privacipher is for informational and educational purposes only. It does not constitute legal advice 
                  and does not create an advocate-client relationship. Always consult qualified legal counsel for 
                  advice tailored to your specific circumstances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
