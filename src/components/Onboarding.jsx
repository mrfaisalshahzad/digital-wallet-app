import React, { useState } from 'react';
import { ShieldCheck, Zap, PieChart, Wallet, ChevronRight } from 'lucide-react';
import './Onboarding.css';

const Onboarding = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Welcome to Digital Wallet",
      description: "Manage your money seamlessly from one unified platform with premium analytics.",
      icon: <Wallet size={80} color="var(--color-accent-primary)" />
    },
    {
      id: 2,
      title: "Lightning Fast Transfers",
      description: "Send and receive funds anywhere in the world instantly with zero hidden fees.",
      icon: <Zap size={80} color="var(--color-accent-secondary)" />
    },
    {
      id: 3,
      title: "Bank Grade Security",
      description: "Your data is protected by industry-leading encryption and biometric locks.",
      icon: <ShieldCheck size={80} color="var(--color-success)" />
    },
    {
      id: 4,
      title: "Track Your Spending",
      description: "Get detailed insights into your expenses to help you grow your savings easily.",
      icon: <PieChart size={80} color="var(--color-danger)" />
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="onboarding-container">
      <div className="slides-wrapper">
        <div 
          className="slides-track" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div className="slide-content" key={slide.id}>
              <div className="slide-icon-wrapper glass-panel">
                {slide.icon}
              </div>
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-description text-secondary">{slide.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="onboarding-footer">
        <div className="pagination-dots">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`dot ${idx === currentSlide ? 'active' : ''}`} 
            />
          ))}
        </div>

        <div className="onboarding-actions">
          {!isLastSlide ? (
            <button className="primary-btn glass-panel" onClick={handleNext}>
              Next <ChevronRight size={20} />
            </button>
          ) : (
            <div className="auth-action-buttons">
              <button 
                className="primary-btn solid-bg" 
                onClick={() => onComplete('register')}
              >
                Create Account
              </button>
              <button 
                className="secondary-btn text-secondary"
                onClick={() => onComplete('login')}
              >
                Already have an account? <b>Log In</b>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
