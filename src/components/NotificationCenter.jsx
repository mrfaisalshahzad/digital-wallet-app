import React from 'react';
import { ShieldCheck, ArrowDownLeft, X, AlertCircle, Wallet } from 'lucide-react';
import './NotificationCenter.css';

const NotificationCenter = ({ notifications, onClear, onClose }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'transfer': return <ArrowDownLeft size={20} className="text-success" />;
      case 'security': return <ShieldCheck size={20} className="text-accent" />;
      case 'alert': return <AlertCircle size={20} className="text-danger" />;
      case 'welcome': return <Wallet size={20} className="text-accent" />;
      default: return <AlertCircle size={20} className="text-secondary" />;
    }
  };

  return (
    <div className="notification-overlay" onClick={onClose}>
      <div className="notification-panel glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="notification-header">
          <h3>Notifications</h3>
          {notifications.length > 0 && (
            <button className="clear-all-btn text-accent" onClick={onClear}>
              Clear All
            </button>
          )}
        </div>
        
        <div className="notification-list">
          {notifications.length === 0 ? (
            <div className="empty-state text-secondary">
              <p>No new notifications</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div key={notif.id} className="notification-item">
                <div className="notification-icon glass-panel">
                  {getIcon(notif.type)}
                </div>
                <div className="notification-content">
                  <h4 className="notification-title">{notif.title}</h4>
                  <p className="notification-desc text-secondary">{notif.description}</p>
                  <span className="notification-time text-secondary">{notif.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
