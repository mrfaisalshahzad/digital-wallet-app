import React, { useState } from 'react';
import { Bell, User } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import './Header.css';

const Header = ({ notifications = [], clearNotifications, userName = 'Alex Morgan' }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="header-container">
      <div className="header-profile">
        <div className="profile-image">
          <User size={24} color="var(--color-bg-primary)" />
        </div>
        <div className="profile-text">
          <p className="text-secondary greeting">Good morning,</p>
          <h2 className="user-name">{userName}</h2>
        </div>
      </div>
      <button 
        className="notification-btn glass-panel" 
        aria-label="Notifications"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell size={20} color="var(--color-text-primary)" />
        {notifications.length > 0 && <span className="notification-dot"></span>}
      </button>
    </header>

    {showNotifications && (
      <NotificationCenter 
        notifications={notifications}
        onClear={clearNotifications}
        onClose={() => setShowNotifications(false)}
      />
    )}
    </>
  );
};

export default Header;
