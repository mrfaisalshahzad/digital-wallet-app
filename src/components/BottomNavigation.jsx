import React from 'react';
import { Home, PieChart, CreditCard, User, Settings } from 'lucide-react';
import './BottomNavigation.css';

const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', icon: <Home size={24} /> },
    { id: 'stats', icon: <PieChart size={24} /> },
    { id: 'cards', icon: <CreditCard size={24} /> },
    { id: 'profile', icon: <User size={24} /> },
    { id: 'settings', icon: <Settings size={24} /> },
  ];

  return (
    <div className="bottom-nav-container">
      <nav className="bottom-nav glass-panel">
        {navItems.map((item) => (
          <button 
            key={item.id} 
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            aria-label={item.id}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            {activeTab === item.id && <span className="nav-indicator"></span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default BottomNavigation;
