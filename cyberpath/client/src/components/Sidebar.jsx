import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, Newspaper, User, LogOut, Sun, Moon, X } from 'lucide-react';
import { useStore } from '../store/useStore';

const Sidebar = ({ isMobileOpen, closeMobileMenu }) => {
  const { logout, theme, toggleTheme } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Roadmap', path: '/roadmap', icon: Map },
    { name: 'News', path: '/news', icon: Newspaper },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}
      
      <div className={`w-64 bg-surface border-r border-border h-full flex flex-col shrink-0 transition-transform ${
         isMobileOpen ? 'fixed inset-y-0 left-0 z-50 translate-x-0' : 'hidden md:flex md:relative md:translate-x-0'
      }`}>
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-xl font-mono font-bold tracking-tight text-text-primary">
            <span className="text-accent">Cyber</span>Path
          </h1>
          {isMobileOpen && (
            <button onClick={closeMobileMenu} className="md:hidden p-1 text-text-secondary hover:text-text-primary">
              <X className="w-5 h-5"/>
            </button>
          )}
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 relative overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => {
                 if(isMobileOpen && closeMobileMenu) closeMobileMenu();
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-surface-2 text-accent border border-border' 
                    : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-2 bg-surface">
          <button 
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 px-4 py-3 text-text-secondary hover:bg-surface-2 hover:text-text-primary rounded-md transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="font-medium text-sm">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-text-secondary hover:bg-surface-2 hover:text-danger hover:border-danger hover:border rounded-md transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
