import { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  GraduationCap,
  LogOut,
  Menu,
  X,
  Terminal,
  Eye,
} from 'lucide-react';
import { Button } from './ui/button';
import { dashboardApi, authStorage } from '../utils/dashboardApi';
import { toast } from 'sonner@2.0.3';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dashboardApi.logout();
    toast.success('Logged out successfully', {
      style: {
        background: 'rgba(0, 255, 242, 0.1)',
        border: '1px solid #00fff2',
        color: '#00fff2',
      },
    });
    navigate('/dashboard/login');
  };

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard', exact: true },
    { label: 'Projects', icon: Briefcase, path: '/dashboard/projects' },
    { label: 'Testimonials', icon: MessageSquare, path: '/dashboard/testimonials' },
    { label: 'Mentorship', icon: GraduationCap, path: '/dashboard/mentorship' },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 242, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 242, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Sidebar */}
      <motion.aside
        className="fixed left-0 top-0 bottom-0 z-50 bg-card/95 backdrop-blur-lg border-r-2 border-primary/20"
        initial={{ x: 0 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        style={{
          width: '280px',
          boxShadow: '0 0 30px rgba(0, 255, 242, 0.1)',
        }}
      >
        {/* Header */}
        <div className="p-6 border-b-2 border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 border-2 border-primary bg-primary/10 flex items-center justify-center"
              style={{
                boxShadow: '0 0 20px rgba(0, 255, 242, 0.5)',
              }}
            >
              <Terminal size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="font-mono text-primary">ADMIN_PANEL</h1>
              <p className="text-muted-foreground font-mono text-xs">v2.0.1</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);
            
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  className={`flex items-center gap-3 px-4 py-3 font-mono transition-all relative overflow-hidden ${
                    active
                      ? 'bg-primary/10 border-l-2 border-primary text-primary'
                      : 'hover:bg-primary/5 border-l-2 border-transparent text-muted-foreground hover:text-primary'
                  }`}
                  whileHover={{ x: 4 }}
                  style={active ? {
                    boxShadow: '0 0 20px rgba(0, 255, 242, 0.2)',
                  } : {}}
                >
                  <Icon size={18} />
                  <span>{item.label.toUpperCase()}</span>
                  
                  {active && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-primary/20 space-y-2">
          <Button
            asChild
            variant="outline"
            className="w-full border-secondary/50 hover:bg-secondary/10 text-secondary font-mono justify-start"
          >
            <Link to="/" className="flex items-center gap-2">
              <Eye size={16} />
              <span>VIEW_SITE</span>
            </Link>
          </Button>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-accent/50 hover:bg-accent/10 text-accent font-mono justify-start"
          >
            <LogOut size={16} />
            <span>LOGOUT</span>
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div
        className="min-h-screen transition-all duration-300"
        style={{
          marginLeft: sidebarOpen ? '280px' : '0',
        }}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b-2 border-primary/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-primary/10 border-2 border-primary/30"
            >
              {sidebarOpen ? (
                <X size={20} className="text-primary" />
              ) : (
                <Menu size={20} className="text-primary" />
              )}
            </Button>

            <div className="flex items-center gap-2 px-4 py-2 border-2 border-primary/30 bg-primary/5 font-mono">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{
                  boxShadow: '0 0 10px rgba(0, 255, 242, 0.8)',
                }}
              />
              <span className="text-primary text-sm">SYSTEM_ACTIVE</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8 lg:p-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
