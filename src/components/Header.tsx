import { motion } from 'framer-motion';
import { Menu, X, Shield, Linkedin, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import type { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { label: string; page: Page; icon?: string }[] = [
  { label: 'Assessment', page: 'assessment' },
  { label: 'Breach Playbook', page: 'breach', icon: '🚨' },
  { label: 'Compare', page: 'compare', icon: '📋' },
  { label: 'Calendar', page: 'calendar', icon: '📅' },
  { label: 'About', page: 'about' },
  { label: 'Changelog', page: 'changelog' },
  { label: 'Terms', page: 'terms' },
];

const frameworks = [
  { flag: '🇮🇳', name: 'DPDPA 2023', sub: 'Rules 2025' },
  { flag: '🇪🇺', name: 'GDPR', sub: '2016/679' },
  { flag: '🇺🇸', name: 'CCPA/CPRA', sub: 'California' },
  { flag: '🇸🇦', name: 'Saudi PDPL', sub: 'Royal Decree M/19' },
  { flag: '🇧🇷', name: 'Brazil LGPD', sub: 'Law 13,709/2018' },
  { flag: '🇸🇬', name: 'Singapore PDPA', sub: 'Amended 2021' },
  { flag: '🇹🇭', name: 'Thailand PDPA', sub: 'B.E. 2562' },
  { flag: '🇬🇧', name: 'UK GDPR', sub: 'DUAA 2025' },
  { flag: '🇦🇪', name: 'UAE PDPL', sub: 'Fed. Decree-Law 45' },
];

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-[var(--ink)] text-white">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Left: Logo & Title */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <button 
                onClick={() => handleNavigate('home')}
                className="group flex items-center gap-3 mb-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] uppercase tracking-widest text-white/70 mb-1">
                    Data Protection Intelligence
                  </span>
                </div>
              </button>
              <h1 
                onClick={() => handleNavigate('home')}
                className="font-serif text-3xl md:text-4xl cursor-pointer hover:opacity-90 transition-opacity"
              >
                Privacipher
              </h1>
              <p className="text-sm text-white/50 mt-1 tracking-wide uppercase">
                Multi-Framework · Sector-Specific · Penalty-Mapped
              </p>
            </motion.div>

            {/* Right: Author Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-left md:text-right"
            >
              <div className="font-serif text-xl">Adv. Sanket Shah</div>
              <div className="text-sm text-white/50 mt-1">
                LL.M. in Data Privacy · AI & Tech Law
              </div>
              <div className="flex gap-2 mt-3 md:justify-end">
                <a 
                  href="https://www.linkedin.com/in/advsanketshah/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-xs text-white/70 hover:bg-white/20 hover:text-white transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
                <a 
                  href="https://linktr.ee/sanketindore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-xs text-white/70 hover:bg-white/20 hover:text-white transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Portfolio
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Framework Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="pb-4 flex flex-wrap gap-2"
        >
          {frameworks.map((fw, idx) => (
            <span 
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider text-white/50 border border-white/10 bg-white/5"
            >
              <span>{fw.flag}</span>
              <span>{fw.name}</span>
            </span>
          ))}
          <span className="ml-auto inline-flex items-center px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider text-white/30 border border-white/10">
            9 Frameworks
          </span>
        </motion.div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white border-b border-[var(--border)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavigate(item.page)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    currentPage === item.page
                      ? 'bg-[var(--ink)] text-white'
                      : 'text-[var(--ink-3)] hover:text-[var(--ink)] hover:bg-[var(--cream-dark)]'
                  }`}
                >
                  {item.icon && <span className="mr-1.5">{item.icon}</span>}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[var(--ink)] hover:bg-[var(--cream-dark)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[var(--border)]"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavigate(item.page)}
                  className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-all ${
                    currentPage === item.page
                      ? 'bg-[var(--ink)] text-white'
                      : 'text-[var(--ink-3)] hover:text-[var(--ink)] hover:bg-[var(--cream-dark)]'
                  }`}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
