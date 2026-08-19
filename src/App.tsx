import { useEffect, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { PortfolioPage } from './pages/Portfolio';
import { ServicesPage } from './pages/Services';
import { ServiceDetailPage } from './pages/ServiceDetail';
import { Contact } from './pages/Contact';
import { Quote } from './pages/Quote';
import { Admin } from './pages/Admin';

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
};

function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="flex flex-col flex-1"
    >
      {children}
    </motion.div>
  );
}

import { Admin } from './pages/Admin';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/portfolio" element={<PageWrapper><PortfolioPage /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
        <Route path="/services/:slug" element={<PageWrapper><ServiceDetailPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/quote" element={<PageWrapper><Quote /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

import { ToastProvider } from './context/ToastContext';
import { AdminProvider } from './context/AdminContext';


import { SEO } from './components/SEO';
import { Breadcrumbs } from './components/Breadcrumbs';
import { FeedbackBar } from './components/FeedbackBar';

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-gold selection:text-brand-dark overflow-x-hidden pb-16 sm:pb-12">
      <SEO />
      {!isAdmin && <Header />}
      <AnimatedRoutes />
      {!isAdmin && <Footer />}
      {!isAdmin && <BackToTop />}
      <FeedbackBar />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AdminProvider>
        <Router>
          <ToastProvider>
            <ScrollToTop />
            <Layout />
          </ToastProvider>
        </Router>
      </AdminProvider>
    </HelmetProvider>
  );
}

