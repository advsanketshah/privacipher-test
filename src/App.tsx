import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import BreachPage from './pages/BreachPage';
import ComparePage from './pages/ComparePage';
import CalendarPage from './pages/CalendarPage';
import AboutPage from './pages/AboutPage';
import ChangelogPage from './pages/ChangelogPage';
import TermsPage from './pages/TermsPage';

export type Page = 'home' | 'assessment' | 'breach' | 'compare' | 'calendar' | 'about' | 'changelog' | 'terms';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onStartAssessment={() => setCurrentPage('assessment')} />;
      case 'assessment':
        return <AssessmentPage />;
      case 'breach':
        return <BreachPage />;
      case 'compare':
        return <ComparePage />;
      case 'calendar':
        return <CalendarPage />;
      case 'about':
        return <AboutPage />;
      case 'changelog':
        return <ChangelogPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return <HomePage onStartAssessment={() => setCurrentPage('assessment')} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="font-serif text-4xl text-[var(--ink)] mb-4">Privacipher</div>
          <div className="text-sm text-[var(--ink-3)]">Loading...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] flex flex-col">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
