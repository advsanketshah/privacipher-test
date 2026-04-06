import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, Clock, Check, ChevronDown, ChevronUp,
  Phone, FileText, Shield, Users, Lock, Globe, Building2
} from 'lucide-react';

interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
  isRunning: boolean;
}

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  actions: string[];
}

const breachSteps: Step[] = [
  {
    id: 'contain',
    title: '1. Contain the Breach',
    description: 'Immediate technical response to stop ongoing unauthorized access',
    icon: Lock,
    actions: [
      'Isolate affected systems from network',
      'Disable compromised user accounts',
      'Revoke API keys and access tokens',
      'Block suspicious IP addresses',
      'Preserve forensic evidence (logs, backups)',
    ],
  },
  {
    id: 'assess',
    title: '2. Assess Scope & Impact',
    description: 'Determine what data was accessed and who is affected',
    icon: FileText,
    actions: [
      'Identify categories of personal data involved',
      'Determine number of affected data principals',
      'Assess whether sensitive/children\'s data affected',
      'Document timeline of the breach',
      'Identify root cause and attack vector',
    ],
  },
  {
    id: 'notify-dpab',
    title: '3. Notify DPAB (72 Hours)',
    description: 'Mandatory notification to Data Protection Board of India',
    icon: Building2,
    actions: [
      'Prepare detailed breach report',
      'Include: nature, categories, approximate number affected',
      'Describe likely consequences',
      'List measures taken/proposed',
      'Submit via DPAB portal',
    ],
  },
  {
    id: 'notify-principals',
    title: '4. Notify Data Principals',
    description: 'Inform affected individuals without delay',
    icon: Users,
    actions: [
      'Send breach notification to all affected principals',
      'Include: nature of breach, data categories',
      'Provide contact for queries',
      'Describe measures taken',
      'Recommend protective steps they can take',
    ],
  },
  {
    id: 'remediate',
    title: '5. Remediate & Prevent',
    description: 'Fix vulnerabilities and prevent recurrence',
    icon: Shield,
    actions: [
      'Patch identified vulnerabilities',
      'Update security controls',
      'Review and strengthen access controls',
      'Conduct security awareness training',
      'Update incident response procedures',
    ],
  },
];

const frameworkDeadlines = [
  { fw: 'DPDPA 2023', flag: '🇮🇳', deadline: '72 hours', penalty: '₹200 Cr max', to: 'DPAB + Data Principals' },
  { fw: 'GDPR', flag: '🇪🇺', deadline: '72 hours', penalty: '€20M / 4% global turnover', to: 'Supervisory Authority' },
  { fw: 'CCPA/CPRA', flag: '🇺🇸', deadline: 'Without delay', penalty: '$7,500 per violation', to: 'California AG / CPPA' },
  { fw: 'Saudi PDPL', flag: '🇸🇦', deadline: '72 hours', penalty: 'SAR 5M', to: 'SDAIA' },
  { fw: 'Brazil LGPD', flag: '🇧🇷', deadline: 'Reasonable time', penalty: '2% Brazil revenues / BRL 50M', to: 'ANPD' },
  { fw: 'Singapore PDPA', flag: '🇸🇬', deadline: '3 days', penalty: 'SGD 1M / 10% SG turnover', to: 'PDPC' },
  { fw: 'Thailand PDPA', flag: '🇹🇭', deadline: '72 hours', penalty: 'THB 3M + criminal', to: 'PDPC' },
  { fw: 'UK GDPR', flag: '🇬🇧', deadline: '72 hours', penalty: '£17.5M / 4% global turnover', to: 'ICO' },
  { fw: 'UAE PDPL', flag: '🇦🇪', deadline: 'Without delay', penalty: 'AED 5M', to: 'UAE Data Office' },
];

export default function BreachPage() {
  const [timer, setTimer] = useState<TimerState>({ hours: 72, minutes: 0, seconds: 0, isRunning: false });
  const [expandedStep, setExpandedStep] = useState<string | null>('contain');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (timer.isRunning && (timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0)) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
            return { ...prev, isRunning: false };
          }
          
          let newSeconds = prev.seconds - 1;
          let newMinutes = prev.minutes;
          let newHours = prev.hours;
          
          if (newSeconds < 0) {
            newSeconds = 59;
            newMinutes -= 1;
          }
          if (newMinutes < 0) {
            newMinutes = 59;
            newHours -= 1;
          }
          
          return { ...prev, hours: newHours, minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timer.isRunning]);

  const startTimer = () => setTimer(prev => ({ ...prev, isRunning: true }));
  const pauseTimer = () => setTimer(prev => ({ ...prev, isRunning: false }));
  const resetTimer = () => setTimer({ hours: 72, minutes: 0, seconds: 0, isRunning: false });

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="section-eyebrow">Emergency Response</span>
          <h1 className="font-serif text-3xl md:text-4xl text-[var(--ink)] mb-3">
            Breach Response Playbook
          </h1>
          <p className="text-[var(--ink-3)] max-w-2xl mx-auto">
            Step-by-step guidance for responding to personal data breaches across 9 privacy frameworks. 
            Includes countdown timers for notification deadlines.
          </p>
        </motion.div>

        {/* Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--red-bg)] border border-[var(--red-border)] rounded-xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--red)] flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-[var(--red)] mb-2">
                Personal Data Breach Detected
              </h2>
              <p className="text-[var(--ink-3)] mb-4">
                Under DPDPA s.8(6), you must notify the Data Protection Board within 72 hours. 
                Data principals must be notified "without delay." Failure to notify carries a maximum penalty of ₹200 crore.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="tag tag-red">DPDPA s.8(6)</span>
                <span className="tag tag-red">Rule 7</span>
                <span className="tag tag-red">₹200 Cr max penalty</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[var(--ink)] rounded-xl p-8 mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-white/70" />
            <span className="text-white/70 uppercase tracking-wider text-sm">DPAB Notification Deadline</span>
          </div>
          
          <div className="font-serif text-6xl md:text-7xl text-white mb-6 tabular-nums">
            {formatTime(timer.hours)}:{formatTime(timer.minutes)}:{formatTime(timer.seconds)}
          </div>
          
          <div className="flex justify-center gap-3">
            {!timer.isRunning ? (
              <button
                onClick={startTimer}
                className="px-6 py-2 rounded-md bg-white text-[var(--ink)] font-semibold hover:bg-white/90 transition-colors"
              >
                Start Timer
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="px-6 py-2 rounded-md bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors"
              >
                Pause
              </button>
            )}
            <button
              onClick={resetTimer}
              className="px-6 py-2 rounded-md border border-white/30 text-white/70 hover:text-white hover:border-white/50 transition-colors"
            >
              Reset
            </button>
          </div>
          
          <p className="text-white/50 text-sm mt-4">
            72 hours from breach detection to notify DPAB (DPDPA s.8(6) | Rule 7)
          </p>
        </motion.div>

        {/* Response Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <h2 className="font-serif text-2xl mb-6">Response Steps</h2>
          <div className="space-y-4">
            {breachSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="bg-white rounded-xl border border-[var(--border)] overflow-hidden"
              >
                <button
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                  className="w-full flex items-center gap-4 p-5 hover:bg-[var(--cream)] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--cream-dark)] flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-[var(--ink)]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-[var(--ink)]">{step.title}</h3>
                    <p className="text-sm text-[var(--ink-3)]">{step.description}</p>
                  </div>
                  {expandedStep === step.id ? (
                    <ChevronUp className="w-5 h-5 text-[var(--ink-3)]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--ink-3)]" />
                  )}
                </button>
                
                {expandedStep === step.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-5"
                  >
                    <div className="pl-14">
                      <ul className="space-y-2">
                        {step.actions.map((action, actionIdx) => (
                          <li key={actionIdx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[var(--green)] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-[var(--ink-3)]">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Framework Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-[var(--border)] p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-[var(--ink)]" />
            <h2 className="font-serif text-2xl">Notification Deadlines by Framework</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--ink-4)]">Framework</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--ink-4)]">Deadline</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--ink-4)]">Notify To</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--ink-4)]">Max Penalty</th>
                </tr>
              </thead>
              <tbody>
                {frameworkDeadlines.map((fw, idx) => (
                  <tr key={idx} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--cream)]">
                    <td className="py-3 px-4">
                      <span className="mr-2">{fw.flag}</span>
                      <span className="font-medium">{fw.fw}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="tag tag-red text-[10px]">{fw.deadline}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--ink-3)]">{fw.to}</td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-[var(--red)]">{fw.penalty}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[var(--amber-bg)] border border-[var(--amber-border)] rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Phone className="w-5 h-5 text-[var(--amber)]" />
            <h2 className="font-serif text-xl text-[var(--amber)]">Emergency Contacts</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="font-semibold text-[var(--ink)] mb-1">Data Protection Board of India (DPAB)</div>
              <div className="text-sm text-[var(--ink-3)]">dpab@gov.in | Portal: dpab.gov.in</div>
            </div>
            <div>
              <div className="font-semibold text-[var(--ink)] mb-1">CERT-In</div>
              <div className="text-sm text-[var(--ink-3)]">incident@cert-in.org.in | 1800-11-4949</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
