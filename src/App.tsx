import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MinimalNav } from './components/minimal/MinimalNav';
import { MinimalFooter } from './components/minimal/MinimalFooter';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/DashboardLayout';
import { DevModeIndicator } from './components/DevModeIndicator';
import { MinimalHome } from './pages/minimal/MinimalHome';
import { MinimalWork } from './pages/minimal/MinimalWork';
import { MinimalCaseStudy } from './pages/minimal/MinimalCaseStudy';
import { MinimalAbout } from './pages/minimal/MinimalAbout';
import { MinimalMentorship } from './pages/minimal/MinimalMentorship';
import { MinimalContact } from './pages/minimal/MinimalContact';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/dashboard/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Projects } from './pages/dashboard/Projects';
import { ProjectForm } from './pages/dashboard/ProjectForm';
import { Testimonials } from './pages/dashboard/Testimonials';
import { TestimonialForm } from './pages/dashboard/TestimonialForm';
import { MentorshipSessions } from './pages/dashboard/MentorshipSessions';
import { MentorshipForm } from './pages/dashboard/MentorshipForm';
import { Toaster } from './components/ui/sonner';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="bottom-right" />
      <DevModeIndicator />
        
      <Routes>
        {/* Dashboard Routes */}
        <Route path="/dashboard/login" element={<Login />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/projects" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Projects />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/projects/new" element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProjectForm />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/projects/edit/:id" element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProjectForm />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/testimonials" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Testimonials />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/testimonials/new" element={
          <ProtectedRoute>
            <DashboardLayout>
              <TestimonialForm />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/testimonials/edit/:id" element={
          <ProtectedRoute>
            <DashboardLayout>
              <TestimonialForm />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/mentorship" element={
          <ProtectedRoute>
            <DashboardLayout>
              <MentorshipSessions />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/mentorship/new" element={
          <ProtectedRoute>
            <DashboardLayout>
              <MentorshipForm />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/mentorship/edit/:id" element={
          <ProtectedRoute>
            <DashboardLayout>
              <MentorshipForm />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Public Routes with Minimal Design */}
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <MinimalNav />
            <AnimatePresence mode="wait">
              <MinimalHome />
            </AnimatePresence>
            <MinimalFooter />
          </div>
        } />
        
        <Route path="/work" element={
          <div className="min-h-screen bg-white">
            <MinimalNav />
            <AnimatePresence mode="wait">
              <MinimalWork />
            </AnimatePresence>
            <MinimalFooter />
          </div>
        } />
        
        <Route path="/work/:slug" element={
          <div className="min-h-screen bg-white">
            <MinimalNav />
            <AnimatePresence mode="wait">
              <MinimalCaseStudy />
            </AnimatePresence>
            <MinimalFooter />
          </div>
        } />
        
        <Route path="/about" element={
          <div className="min-h-screen bg-white">
            <MinimalNav />
            <AnimatePresence mode="wait">
              <MinimalAbout />
            </AnimatePresence>
            <MinimalFooter />
          </div>
        } />
        
        <Route path="/mentorship" element={
          <div className="min-h-screen bg-white">
            <MinimalNav />
            <AnimatePresence mode="wait">
              <MinimalMentorship />
            </AnimatePresence>
            <MinimalFooter />
          </div>
        } />
        
        <Route path="/contact" element={
          <div className="min-h-screen bg-white">
            <MinimalNav />
            <AnimatePresence mode="wait">
              <MinimalContact />
            </AnimatePresence>
            <MinimalFooter />
          </div>
        } />
        
        <Route path="*" element={
          <div className="min-h-screen bg-white">
            <MinimalNav />
            <NotFound />
            <MinimalFooter />
          </div>
        } />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}
