import { motion } from 'framer-motion';
import { 
  Linkedin, ExternalLink, Award, BookOpen, 
  Briefcase, GraduationCap, Shield, Globe, Scale
} from 'lucide-react';

const expertise = [
  { icon: Shield, title: 'Data Protection & Privacy', description: 'DPDPA 2023, GDPR, CCPA/CPRA, and global privacy frameworks' },
  { icon: Globe, title: 'AI & Tech Law', description: 'AI governance, algorithmic accountability, and emerging tech regulation' },
  { icon: Scale, title: 'Contract Lifecycle Management', description: 'Legal automation, CLM implementation, and process optimization' },
  { icon: Briefcase, title: 'Legal Operations', description: 'Legal tech, workflow automation, and operational efficiency' },
];

const frameworks = [
  { flag: '🇮🇳', name: 'DPDPA 2023', sub: 'India' },
  { flag: '🇪🇺', name: 'GDPR', sub: 'EU/EEA' },
  { flag: '🇺🇸', name: 'CCPA/CPRA', sub: 'California' },
  { flag: '🇸🇦', name: 'Saudi PDPL', sub: 'Saudi Arabia' },
  { flag: '🇧🇷', name: 'Brazil LGPD', sub: 'Brazil' },
  { flag: '🇸🇬', name: 'Singapore PDPA', sub: 'Singapore' },
  { flag: '🇹🇭', name: 'Thailand PDPA', sub: 'Thailand' },
  { flag: '🇬🇧', name: 'UK GDPR', sub: 'United Kingdom' },
  { flag: '🇦🇪', name: 'UAE PDPL', sub: 'UAE' },
];

const certifications = [
  { name: 'LL.M. in Data Privacy & AI Law', org: 'Specialized Postgraduate Degree', year: '' },
  { name: 'Data Protection Officer (DPO)', org: 'Privacy Certification', year: '' },
  { name: 'Contract Lifecycle Management', org: 'Legal Operations', year: '' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="section-eyebrow">About</span>
          <h1 className="font-serif text-4xl md:text-5xl text-[var(--ink)] mb-4">
            Adv. Sanket Shah
          </h1>
          <p className="text-lg text-[var(--ink-3)] max-w-2xl mx-auto mb-6">
            Data Privacy & AI Law Advocate | Contract Lifecycle Management | Legal Automation
          </p>
          
          <div className="flex justify-center gap-3">
            <a 
              href="https://www.linkedin.com/in/advsanketshah/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--ink)] text-white hover:bg-[var(--ink-2)] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a 
              href="https://linktr.ee/sanketindore" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border-2 border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Portfolio
            </a>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-[var(--border)] p-8 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-[var(--ink)]" />
            <h2 className="font-serif text-2xl">About Privacipher</h2>
          </div>
          
          <div className="prose prose-sm max-w-none text-[var(--ink-3)]">
            <p className="mb-4">
              Privacipher is a comprehensive privacy compliance intelligence platform designed to help organizations 
              navigate the complex landscape of global data protection regulations. Built with a focus on practical 
              implementation, it provides sector-specific assessments, penalty exposure analysis, and actionable 
              remediation roadmaps.
            </p>
            <p className="mb-4">
              The platform covers 9 major privacy frameworks including India's DPDPA 2023, EU GDPR, California CCPA/CPRA, 
              Saudi PDPL, Brazil LGPD, Singapore PDPA, Thailand PDPA, UK GDPR, and UAE PDPL. Each framework is analyzed 
              with reference to current legislation, implementing rules, and regulatory guidance.
            </p>
            <p>
              All assessments are performed locally in your browser — no personal data is collected, stored, or transmitted. 
              This ensures complete privacy while providing accurate compliance insights based on the latest regulatory developments.
            </p>
          </div>
        </motion.div>

        {/* Expertise Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="font-serif text-2xl mb-6">Areas of Expertise</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {expertise.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="card-modern p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--cream-dark)] flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[var(--ink)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--ink)] mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--ink-3)]">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Frameworks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-[var(--border)] p-8 mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-[var(--ink)]" />
            <h2 className="font-serif text-2xl">Framework Coverage</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {frameworks.map((fw, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-3 p-3 bg-[var(--cream)] rounded-lg"
              >
                <span className="text-2xl">{fw.flag}</span>
                <div>
                  <div className="font-medium text-[var(--ink)]">{fw.name}</div>
                  <div className="text-xs text-[var(--ink-3)]">{fw.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-[var(--border)] p-8 mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-[var(--ink)]" />
            <h2 className="font-serif text-2xl">Qualifications</h2>
          </div>
          
          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-[var(--cream)] rounded-lg">
                <div className="w-10 h-10 rounded-full bg-[var(--ink)] text-white flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[var(--ink)]">{cert.name}</div>
                  <div className="text-sm text-[var(--ink-3)]">{cert.org}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[var(--ink)] rounded-xl p-8 text-center"
        >
          <h2 className="font-serif text-2xl text-white mb-4">Get in Touch</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            For inquiries about privacy compliance, legal automation, or to discuss 
            how Privacipher can help your organization, connect on LinkedIn.
          </p>
          <a 
            href="https://www.linkedin.com/in/advsanketshah/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-[var(--ink)] font-semibold hover:bg-white/90 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            Connect on LinkedIn
          </a>
        </motion.div>
      </div>
    </div>
  );
}
