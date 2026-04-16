import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import './Toast.css';

const Toast = ({ notification, onClose }) => {
  const [offsetY, setOffsetY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification) return null;

  const handleTouchStart = (e) => {
    setIsSwiping(true);
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;
    
    // Only allow swipe UP to dismiss (negative values)
    if (diff < 0) {
      setOffsetY(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    // If user flicked upward by more than 30px, instantly dismiss it
    if (offsetY < -30) {
      onClose();
    } else {
      setOffsetY(0); // Snap back to natural position elegantly
    }
  };

  return (
    <div 
      className={`toast-container glass-panel ${isSwiping ? 'swiping' : ''}`}
      style={{ transform: `translateY(${Math.min(offsetY, 0)}px)` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
       <div className="toast-icon">
         <Bell size={20} color="var(--color-accent-primary)" />
       </div>
       <div className="toast-content">
          <h4>{notification.title}</h4>
          <p>{notification.description}</p>
       </div>
       <div className="toast-drag-handle"></div>
    </div>
  )
}

export default Toast;
