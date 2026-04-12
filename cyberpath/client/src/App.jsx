import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { useStore } from './store/useStore';
// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Roadmap from './pages/Roadmap';
import News from './pages/News';

// Components
import Sidebar from './components/Sidebar';
import Announcement from './components/Announcement';
import Footer from './components/Footer';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useStore();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user && !user.onboardingDone && window.location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" />;
  }
  return children;
};

const MainLayout = ({ children }) => {
  const { calculateProgressData, user } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const progressData = calculateProgressData();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background relative">
      <Sidebar isMobileOpen={isMobileMenuOpen} closeMobileMenu={() => setIsMobileMenuOpen(false)} />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Top bar placeholder for progress/info */}
        <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-md focus:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="hidden sm:inline-block text-text-primary font-mono text-sm uppercase bg-surface-2 px-3 py-1 rounded-full border border-border">
              {user?.selectedMode ? user.selectedMode.replace('_', ' ') : 'CyberPath'}
            </span>
            <div className="flex flex-col">
              <div className="w-48 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-progress-bar transition-all duration-500"
                  style={{ width: `${progressData.percent}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-text-secondary tracking-wide font-mono">{progressData.completed} / {progressData.total} Tasks</span>
                <span className="text-xs text-text-primary tracking-wide font-mono font-bold">{progressData.percent}%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-right">
               <div className="text-sm font-medium text-text-primary">{user?.displayName || user?.username}</div>
             </div>
             <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-mono font-bold text-sm">
               {(user?.displayName || user?.username || 'U')[0].toUpperCase()}
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Announcement />
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  const { fetchUserContext, isAuthenticated, theme } = useStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserContext();
    }
  }, [isAuthenticated, fetchUserContext]);

  return (
    <div className={theme}>
      <div className="w-full h-full bg-background min-h-screen text-text-primary">
        <BrowserRouter>
          <Toaster position="top-right" 
                   toastOptions={{ style: { background: 'var(--color-surface)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' } }} />
          <Analytics />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes wrapped in MainLayout */}
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
            <Route path="/roadmap" element={<ProtectedRoute><MainLayout><Roadmap /></MainLayout></ProtectedRoute>} />
            <Route path="/news" element={<ProtectedRoute><MainLayout><News /></MainLayout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
