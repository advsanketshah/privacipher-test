import { motion } from 'framer-motion';
import { Linkedin, ExternalLink, ArrowUp } from 'lucide-react';
import type { Page } from '../App';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--ink)] text-white/70 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-serif text-2xl text-white mb-2">Privacipher</div>
            <p className="text-sm text-white/50 mb-4">
              Global Privacy Compliance Intelligence
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.linkedin.com/in/advsanketshah/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://linktr.ee/sanketindore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              Quick Links
            </div>
            <div className="space-y-2">
              {[
                { label: 'Compliance Assessment', page: 'assessment' as Page },
                { label: 'Breach Playbook', page: 'breach' as Page },
                { label: 'Compare Frameworks', page: 'compare' as Page },
                { label: 'Regulatory Calendar', page: 'calendar' as Page },
                { label: 'About', page: 'about' as Page },
              ].map((link) => (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className="block text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              Contact
            </div>
            <div className="font-serif text-lg text-white mb-1">Adv. Sanket Shah</div>
            <p className="text-sm text-white/50 mb-3">
              LL.M. in Data Privacy · AI & Tech Law
            </p>
            <p className="text-sm text-white/40">
              Contract Lifecycle Management · Legal Automation · Data Protection · AI Governance
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 text-center md:text-left">
            © 2025–2026 <span className="text-white/60">Adv. Sanket Shah</span>. All rights reserved.
            <br />
            All content, scoring logic, penalty frameworks, and remediation guidance are proprietary.
          </p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm text-white/70 hover:bg-white/20 hover:text-white transition-all"
          >
            <ArrowUp className="w-4 h-4" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
