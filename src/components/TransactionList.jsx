import React from 'react';
import { ShoppingBag, Coffee, Laptop, Video, ChevronRight } from 'lucide-react';
import './TransactionList.css';

const TransactionList = () => {
  const transactions = [
    {
      id: 1,
      name: 'Apple Store',
      category: 'Electronics',
      amount: -1299.00,
      icon: <Laptop size={20} color="#3b82f6" />,
      iconBg: 'rgba(59, 130, 246, 0.15)',
      date: 'Today, 10:42 AM'
    },
    {
      id: 2,
      name: 'Starbucks',
      category: 'Food & Drink',
      amount: -12.50,
      icon: <Coffee size={20} color="#10b981" />,
      iconBg: 'rgba(16, 185, 129, 0.15)',
      date: 'Today, 08:15 AM'
    },
    {
      id: 3,
      name: 'Netflix Subscription',
      category: 'Entertainment',
      amount: -15.99,
      icon: <Video size={20} color="#ef4444" />,
      iconBg: 'rgba(239, 68, 68, 0.15)',
      date: 'Yesterday'
    },
    {
      id: 4,
      name: 'Whole Foods Market',
      category: 'Groceries',
      amount: -84.20,
      icon: <ShoppingBag size={20} color="#f59e0b" />,
      iconBg: 'rgba(245, 158, 11, 0.15)',
      date: 'Yesterday'
    }
  ];

  const formatCurrency = (val) => {
    const isNegative = val < 0;
    const absVal = Math.abs(val).toFixed(2);
    return `${isNegative ? '-' : '+'}SAR ${absVal}`;
  };

  return (
    <div className="transaction-section">
      <div className="section-header">
        <h3 className="section-title">Recent Transactions</h3>
        <button className="view-all-btn">
          See All <ChevronRight size={16} />
        </button>
      </div>

      <div className="transaction-list">
        {transactions.map((tx) => (
          <div key={tx.id} className="transaction-item glass-panel">
            <div className="tx-left">
              <div 
                className="tx-icon-container" 
                style={{ backgroundColor: tx.iconBg }}
              >
                {tx.icon}
              </div>
              <div className="tx-details">
                <h4 className="tx-name">{tx.name}</h4>
                <p className="tx-date text-secondary">{tx.date}</p>
              </div>
            </div>
            <div className="tx-right">
              <span className={`tx-amount ${tx.amount > 0 ? 'positive' : ''}`}>
                {formatCurrency(tx.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
