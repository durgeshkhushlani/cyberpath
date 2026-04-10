import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, Newspaper, User, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';

const Sidebar = () => {
  const { logout } = useStore();
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
    <div className="w-64 bg-surface border-r border-border h-full flex flex-col hidden md:flex shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-mono font-bold tracking-tight text-text-primary">
          <span className="text-accent">Cyber</span>Path
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
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

      <div className="p-4 border-t border-border">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 text-text-secondary hover:bg-surface-2 hover:text-danger hover:border-danger hover:border rounded-md transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
