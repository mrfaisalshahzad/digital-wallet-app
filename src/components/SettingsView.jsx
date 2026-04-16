import React, { useState, useEffect } from 'react';
import { Bell, Moon, Fingerprint, LogOut, ChevronRight } from 'lucide-react';
import './SettingsView.css';

const SettingsView = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });
  const [biometrics, setBiometrics] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      
      <div className="settings-section glass-panel">
        <div className="settings-row">
          <div className="settings-icon-title">
            <Bell size={20} className="text-secondary" />
            <span>Push Notifications</span>
          </div>
          <button 
            className={`toggle-btn ${notifications ? 'active' : ''}`}
            onClick={() => setNotifications(!notifications)}
            aria-label="Toggle Push Notifications"
          >
            <div className="toggle-circle"></div>
          </button>
        </div>
        
        <div className="settings-row">
          <div className="settings-icon-title">
            <Moon size={20} className="text-secondary" />
            <span>Dark Mode</span>
          </div>
          <button 
            className={`toggle-btn ${darkMode ? 'active' : ''}`}
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
          >
            <div className="toggle-circle"></div>
          </button>
        </div>

        <div className="settings-row">
          <div className="settings-icon-title">
            <Fingerprint size={20} className="text-secondary" />
            <span>Biometric Login</span>
          </div>
          <button 
            className={`toggle-btn ${biometrics ? 'active' : ''}`}
            onClick={() => setBiometrics(!biometrics)}
            aria-label="Toggle Biometric Login"
          >
            <div className="toggle-circle"></div>
          </button>
        </div>
      </div>

      <div className="settings-section glass-panel mt-4">
        <button 
          className="settings-row clickable"
          onClick={() => {
            localStorage.removeItem('isLoggedIn');
            window.location.reload();
          }}
        >
          <div className="settings-icon-title text-danger">
            <LogOut size={20} />
            <span>Log Out</span>
          </div>
          <ChevronRight size={20} className="text-secondary" />
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
