import React from 'react';
import { Send, Download, Plus, MoreHorizontal } from 'lucide-react';
import './ActionButtons.css';

const ActionButtons = () => {
  const actions = [
    { id: 'send', label: 'Send', icon: <Send size={20} />, active: true },
    { id: 'request', label: 'Request', icon: <Download size={20} />, active: false },
    { id: 'topup', label: 'Top Up', icon: <Plus size={20} />, active: false },
    { id: 'more', label: 'More', icon: <MoreHorizontal size={20} />, active: false },
  ];

  return (
    <div className="actions-container">
      {actions.map((action) => (
        <div key={action.id} className="action-item">
          <button 
            className={`action-btn ${action.active ? 'active' : 'glass-panel'}`}
            aria-label={action.label}
          >
            {action.icon}
          </button>
          <span className="action-label">{action.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ActionButtons;
