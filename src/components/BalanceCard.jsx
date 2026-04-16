import React, { useState } from 'react';
import { Eye, EyeOff, TrendingUp } from 'lucide-react';
import './BalanceCard.css';

const BalanceCard = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="balance-card-wrapper">
      <div className="balance-card glass-panel">
        <div className="balance-header">
          <p className="balance-title">Total Balance</p>
          <button 
            className="visibility-btn" 
            aria-label="Toggle visibility"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <Eye size={18} color="var(--color-text-secondary)" />
            ) : (
              <EyeOff size={18} color="var(--color-text-secondary)" />
            )}
          </button>
        </div>
        
        <div className="balance-amount-container">
          <h1 className="balance-amount">
            <span key={isVisible ? 'visible' : 'hidden'} className="balance-text-animate">
              {isVisible ? "SAR 24,562.00" : "****"}
            </span>
          </h1>
          <div className="balance-trend">
            <TrendingUp size={16} color="var(--color-success)" />
            <span className="trend-value">+2.4%</span>
          </div>
        </div>

        <div className="card-details">
          <div className="card-number">
            <span>••••</span>
            <span>••••</span>
            <span>••••</span>
            <span>8294</span>
          </div>
          <div className="card-brand">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#EB001B"/>
              <circle cx="28" cy="12" r="12" fill="#F79E1B" fillOpacity="0.8"/>
            </svg>
          </div>
        </div>
        
        {/* Decorative background glows */}
        <div className="glow-circle glow-right"></div>
        <div className="glow-circle glow-left"></div>
      </div>
    </div>
  );
};

export default BalanceCard;
