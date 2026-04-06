import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Check, AlertTriangle, Shield,
  FileDown, RotateCcw, ChevronDown, ChevronUp, Info
} from 'lucide-react';
import { 
  QS, SECTOR_CFG, PENALTY, sectors
} from '../data/assessmentData';

interface RiskItem {
  id: string;
  cat: string;
  score: number;
  w: number;
  crit: boolean;
  penalty?: typeof PENALTY[keyof typeof PENALTY];
}

export default function AssessmentPage() {
  const [step, setStep] = useState<'intro' | 'sector' | 'questions' | 'results'>('intro');
  const [sector, setSector] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [expandedHelp, setExpandedHelp] = useState<string | null>(null);

  const sectorConfig = sector ? SECTOR_CFG[sector] : null;
  const questions = useMemo(() => {
    return QS.filter(q => q.fw === 'dpdpa');
  }, []);

  const handleSectorSelect = (sectorName: string) => {
    setSector(sectorName);
    setStep('questions');
  };

  const handleAnswer = (qid: string, score: number) => {
    setAnswers(prev => ({ ...prev, [qid]: score }));
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setStep('results');
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(prev => prev - 1);
    }
  };

  const calculateResults = useCallback(() => {
    const answered = Object.keys(answers);
    if (answered.length === 0) return null;

    let totalWeight = 0;
    let weightedScore = 0;
    const risks: RiskItem[] = [];
    let penaltyCrore = 0;

    questions.forEach(q => {
      const ans = answers[q.id];
      if (ans === undefined || ans === -1) return;

      let weight = q.w;
      if (sectorConfig?.weight_boost[q.id]) {
        weight *= sectorConfig.weight_boost[q.id];
      }

      totalWeight += weight;
      weightedScore += ans * weight;

      if (ans < 2 && q.crit) {
        const pen = PENALTY[q.id];
        if (pen && (!pen.skipIfNA || ans !== -1)) {
          const penAmt = pen.max || 0;
          penaltyCrore += penAmt;
          risks.push({
            id: q.id,
            cat: q.cl,
            score: ans,
            w: weight,
            crit: q.crit,
            penalty: pen,
          });
        }
      }
    });

    const complianceScore = totalWeight > 0 ? Math.round((weightedScore / (totalWeight * 2)) * 100) : 0;
    const riskLevel = complianceScore >= 90 ? 'Low' : complianceScore >= 70 ? 'Medium' : complianceScore >= 50 ? 'High' : 'Critical';
    const riskColor = complianceScore >= 90 ? 'green' : complianceScore >= 70 ? 'amber' : complianceScore >= 50 ? 'orange' : 'red';

    return {
      complianceScore,
      riskLevel,
      riskColor,
      penaltyCrore,
      risks,
      answeredCount: answered.length,
      totalQuestions: questions.length,
    };
  }, [answers, questions, sectorConfig]);

  const results = calculateResults();

  const exportPDF = () => {
    if (!results) return;
    
    const report = {
      timestamp: new Date().toISOString(),
      sector,
      complianceScore: results.complianceScore,
      riskLevel: results.riskLevel,
      penaltyExposure: results.penaltyCrore,
      answers,
      risks: results.risks,
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `privacipher-assessment-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetAssessment = () => {
    setStep('intro');
    setSector('');
    setAnswers({});
    setCurrentQ(0);
  };

  // Intro Step
  if (step === 'intro') {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="section-eyebrow">Compliance Assessment</span>
            <h1 className="font-serif text-4xl md:text-5xl text-[var(--ink)] mb-4">
              Multi-Framework Privacy Assessment
            </h1>
            <p className="text-lg text-[var(--ink-3)] max-w-2xl mx-auto">
              Evaluate your organization's compliance posture across 9 major privacy frameworks. 
              Get sector-specific scoring, penalty exposure analysis, and actionable recommendations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-[var(--border)] p-8 mb-8"
          >
            <h2 className="font-serif text-2xl mb-6">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Select Your Sector', desc: 'Choose your industry for sector-specific scoring and risk weighting' },
                { step: '2', title: 'Answer Questions', desc: 'Complete the assessment across key compliance domains' },
                { step: '3', title: 'Get Your Report', desc: 'Receive compliance score, risk heat map, and remediation roadmap' },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--ink)] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--ink-3)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep('sector')}
              className="btn-primary text-lg px-10 py-4"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Sector Selection Step
  if (step === 'sector') {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="section-eyebrow">Step 1 of 2</span>
            <h1 className="font-serif text-3xl md:text-4xl text-[var(--ink)] mb-3">
              Select Your Industry Sector
            </h1>
            <p className="text-[var(--ink-3)]">
              This helps us apply sector-specific risk weighting and highlight elevated obligations.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectors.map((s, idx) => {
              const config = SECTOR_CFG[s.name];
              
              return (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleSectorSelect(s.name)}
                  className="card-modern p-5 text-left hover:border-[var(--ink)] transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--cream-dark)] flex items-center justify-center group-hover:bg-[var(--ink)] group-hover:text-white transition-all">
                      <span className="text-2xl">{config?.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--ink)] mb-1">{s.name}</h3>
                      <span className="tag tag-amber text-[10px]">{s.risk}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[var(--ink-4)] group-hover:text-[var(--ink)] transition-colors" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Questions Step
  if (step === 'questions') {
    const question = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;
    const currentAnswer = answers[question.id];

    return (
      <div className="min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--ink-3)]">
                Question {currentQ + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-[var(--ink)]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-[var(--cream-dark)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--ink)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl border border-[var(--border)] p-6 md:p-8"
          >
            {/* Category Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="tag tag-blue text-[10px]">{question.cl}</span>
              {question.crit && (
                <span className="tag tag-red text-[10px]">Critical</span>
              )}
            </div>

            {/* Question */}
            <h2 className="font-serif text-xl md:text-2xl text-[var(--ink)] mb-6">
              {question.q}
            </h2>

            {/* Help Toggle */}
            <button
              onClick={() => setExpandedHelp(expandedHelp === question.id ? null : question.id)}
              className="flex items-center gap-2 text-sm text-[var(--ink-3)] hover:text-[var(--ink)] mb-6"
            >
              <Info className="w-4 h-4" />
              {expandedHelp === question.id ? 'Hide guidance' : 'Show guidance'}
              {expandedHelp === question.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {expandedHelp === question.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[var(--cream-dark)] rounded-lg p-4 mb-6"
                >
                  <p className="text-sm text-[var(--ink-3)] mb-2">{question.help}</p>
                  <p className="text-xs text-[var(--ink-4)]">Reference: {question.ref}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Options */}
            <div className="space-y-3">
              {question.opts.map((opt, idx) => {
                const isSelected = currentAnswer === opt.v;
                const isNA = opt.v === -1;
                
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(question.id, opt.v)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-[var(--ink)] bg-[var(--ink)] text-white'
                        : isNA
                        ? 'border-dashed border-[var(--ink-4)] text-[var(--ink-3)] hover:border-[var(--ink-3)]'
                        : 'border-[var(--border)] hover:border-[var(--ink-3)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-white' : 'border-[var(--ink-4)]'
                      }`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                      <span className={isSelected ? 'text-white' : 'text-[var(--ink)]'}>
                        {opt.l}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)]">
              <button
                onClick={handlePrev}
                disabled={currentQ === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-[var(--ink-3)] hover:text-[var(--ink)] hover:bg-[var(--cream-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              
              <button
                onClick={handleNext}
                disabled={currentAnswer === undefined}
                className="flex items-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQ === questions.length - 1 ? 'View Results' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Results Step
  if (step === 'results' && results) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="section-eyebrow">Assessment Complete</span>
            <h1 className="font-serif text-3xl md:text-4xl text-[var(--ink)] mb-3">
              Your Compliance Report
            </h1>
            <p className="text-[var(--ink-3)]">
              {sector} • {results.answeredCount} of {results.totalQuestions} questions answered
            </p>
          </motion.div>

          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-[var(--border)] p-8 mb-8"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* Compliance Score */}
              <div className="text-center">
                <div className="text-sm text-[var(--ink-4)] uppercase tracking-wider mb-2">Compliance Score</div>
                <div className={`font-serif text-6xl ${
                  results.riskColor === 'green' ? 'text-[var(--green)]' :
                  results.riskColor === 'amber' ? 'text-[var(--amber)]' :
                  results.riskColor === 'orange' ? 'text-orange-500' :
                  'text-[var(--red)]'
                }`}>
                  {results.complianceScore}%
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mt-3 ${
                  results.riskColor === 'green' ? 'bg-[var(--green-bg)] text-[var(--green)]' :
                  results.riskColor === 'amber' ? 'bg-[var(--amber-bg)] text-[var(--amber)]' :
                  results.riskColor === 'orange' ? 'bg-orange-50 text-orange-600' :
                  'bg-[var(--red-bg)] text-[var(--red)]'
                }`}>
                  {results.riskLevel} Risk
                </div>
              </div>

              {/* Penalty Exposure */}
              <div className="text-center border-l border-r border-[var(--border)]">
                <div className="text-sm text-[var(--ink-4)] uppercase tracking-wider mb-2">Maximum Penalty Exposure</div>
                <div className="font-serif text-5xl text-[var(--red)]">
                  ₹{results.penaltyCrore.toLocaleString()} Cr
                </div>
                <div className="text-sm text-[var(--ink-3)] mt-3">
                  Under DPDPA 2023
                </div>
              </div>

              {/* Risk Count */}
              <div className="text-center">
                <div className="text-sm text-[var(--ink-4)] uppercase tracking-wider mb-2">Critical Gaps</div>
                <div className="font-serif text-6xl text-[var(--ink)]">
                  {results.risks.length}
                </div>
                <div className="text-sm text-[var(--ink-3)] mt-3">
                  Items requiring immediate attention
                </div>
              </div>
            </div>
          </motion.div>

          {/* Risk Heat Map */}
          {results.risks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-[var(--border)] p-6 mb-8"
            >
              <h2 className="font-serif text-2xl mb-6">Risk Heat Map</h2>
              <div className="space-y-4">
                {results.risks.map((risk, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-[var(--cream)] rounded-lg">
                    <div className="w-2 h-12 bg-[var(--red)] rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[var(--ink)]">{risk.cat}</span>
                        {risk.penalty && (
                          <span className="tag tag-red text-[10px]">
                            ₹{risk.penalty.max} Cr
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-[var(--ink-3)]">
                        {risk.penalty?.label}
                      </div>
                      <div className="text-xs text-[var(--ink-4)] mt-1">
                        {risk.penalty?.provision}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 30/60/90 Day Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-[var(--border)] p-6 mb-8"
          >
            <h2 className="font-serif text-2xl mb-6">Remediation Roadmap</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-[var(--red-bg)] rounded-lg border border-[var(--red-border)]">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-[var(--red)]" />
                  <span className="font-semibold text-[var(--red)]">30 Days</span>
                </div>
                <ul className="text-sm text-[var(--ink-3)] space-y-2">
                  <li>• Implement breach notification process</li>
                  <li>• Update privacy notices (s.5)</li>
                  <li>• Fix consent mechanisms (s.6)</li>
                  <li>• Document security measures (Rule 6)</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[var(--amber-bg)] rounded-lg border border-[var(--amber-border)]">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-[var(--amber)]" />
                  <span className="font-semibold text-[var(--amber)]">60 Days</span>
                </div>
                <ul className="text-sm text-[var(--ink-3)] space-y-2">
                  <li>• Execute data processor agreements</li>
                  <li>• Implement DSR handling workflows</li>
                  <li>• Set up grievance mechanism (s.13)</li>
                  <li>• Create retention schedules (s.8(7))</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[var(--green-bg)] rounded-lg border border-[var(--green-border)]">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-5 h-5 text-[var(--green)]" />
                  <span className="font-semibold text-[var(--green)]">90 Days</span>
                </div>
                <ul className="text-sm text-[var(--ink-3)] space-y-2">
                  <li>• Conduct security audit</li>
                  <li>• Implement privacy-by-design</li>
                  <li>• Train staff on DPDPA obligations</li>
                  <li>• Review cross-border transfers</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={exportPDF}
              className="btn-primary"
            >
              <FileDown className="w-5 h-5" />
              Export Report
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetAssessment}
              className="btn-outline"
            >
              <RotateCcw className="w-5 h-5" />
              Start New Assessment
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
