import React, { useState, useRef, useEffect } from 'react';
import { Phone, CheckCircle2, Circle, Smartphone, Calendar, User, Lock, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import CustomDatePicker from './CustomDatePicker';
import './RegisterWizard.css';

const RegisterWizard = ({ onRegisterSuccess, onBack }) => {
  const [step, setStep] = useState(1);
  
  // Form State
  const [personalInfo, setPersonalInfo] = useState({ fullName: '', mobile: '', idNumber: '', dob: '' });
  const [passwords, setPasswords] = useState({ pass: '', confirmPass: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // OTP State
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (step === 3) {
      setTimeLeft(180);
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Password criteria logic
  const p = passwords.pass;
  const lengthMet = p.length >= 8;
  const upperLowerMet = /[a-z]/.test(p) && /[A-Z]/.test(p);
  const symbolNumberMet = /[\d]/.test(p) || /[!@#$%^&*(),.?":{}|<>]/.test(p);
  const passwordsMatch = p === passwords.confirmPass && p.length > 0;

  const handleWizardBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      if (onBack) onBack();
    }
  };
  
  const handleNextStep1 = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleNextStep2 = (e) => {
    e.preventDefault();
    if (lengthMet && upperLowerMet && symbolNumberMet && passwordsMatch) {
      setStep(3);
    }
  };

  // Auto-focus first OTP input when step 3 loads
  useEffect(() => {
    if (step === 3 && otpRefs[0].current) {
      otpRefs[0].current.focus();
    }
  }, [step]);

  const handleOtpChange = (index, value) => {
    // allow only numbers
    if (value && !/^[0-9]+$/.test(value)) return;
    
    // reset error when typing
    if (otpError) setOtpError(false);

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto move to next input
    if (value && index < 3) {
      otpRefs[index + 1].current.focus();
    }

    // auto submit on final input
    if (value && index === 3) {
      const code = newOtp.join('');
      if (code === '1234') {
        setStep(4);
      } else {
        setOtpError(true);
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="wizard-container">
      {step < 4 && (
        <div className="auth-header">
           <button className="back-btn glass-panel" onClick={handleWizardBack}>
              <ArrowLeft size={20} />
           </button>
           <div className="auth-titles">
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle text-secondary">
                 Sign up to get started with Digital Wallet
              </p>
           </div>
        </div>
      )}

      {step < 4 && (
        <div className="wizard-steps-indicator">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step-dot ${step >= 3 ? 'active' : ''}`}></div>
        </div>
      )}

      {/* STEP 1: Personal Info */}
      {step === 1 && (
        <form className="wizard-form" onSubmit={handleNextStep1}>
          <div className="input-group">
            <div className="input-icon"><User size={20} className="text-secondary" /></div>
            <input 
              type="text" placeholder="Full Name" required
              value={personalInfo.fullName} onChange={e => setPersonalInfo({...personalInfo, fullName: e.target.value})}
            />
          </div>
          <div className="input-group">
            <div className="input-icon"><Phone size={20} className="text-secondary" /></div>
            <input 
              type="tel" placeholder="Mobile Number" required
              value={personalInfo.mobile} onChange={e => setPersonalInfo({...personalInfo, mobile: e.target.value})}
            />
          </div>
          <div className="input-group">
            <div className="input-icon"><ShieldCheck size={20} className="text-secondary" /></div>
            <input 
              type="text" placeholder="ID Number" required
              value={personalInfo.idNumber} onChange={e => setPersonalInfo({...personalInfo, idNumber: e.target.value})}
            />
          </div>
          <div className="input-group">
            <div className="input-icon"><Calendar size={20} className="text-secondary" /></div>
            <input 
              type="text" placeholder="Date of Birth (YYYY-MM-DD)" required readOnly
              value={personalInfo.dob} onClick={() => setShowDatePicker(true)}
            />
          </div>
          <button className="primary-btn solid-bg submit-btn" type="submit">
            Continue <ArrowRight size={20} />
          </button>
        </form>
      )}

      {/* STEP 2: Password */}
      {step === 2 && (
        <form className="wizard-form" onSubmit={handleNextStep2}>
          <div className="input-group">
            <div className="input-icon"><Lock size={20} className="text-secondary" /></div>
            <input 
              type="password" placeholder="Create Password" required
              value={passwords.pass} onChange={e => setPasswords({...passwords, pass: e.target.value})}
            />
          </div>
          <div className="input-group">
            <div className="input-icon"><Lock size={20} className="text-secondary" /></div>
            <input 
              type="password" placeholder="Re-enter Password" required
              value={passwords.confirmPass} onChange={e => setPasswords({...passwords, confirmPass: e.target.value})}
            />
          </div>

          <div className="password-criteria">
            <div className={`criteria-item ${lengthMet ? 'met' : ''}`}>
              {lengthMet ? <CheckCircle2 size={16} /> : <Circle size={16} />}
              <span>At least 8 characters long</span>
            </div>
            <div className={`criteria-item ${upperLowerMet ? 'met' : ''}`}>
              {upperLowerMet ? <CheckCircle2 size={16} /> : <Circle size={16} />}
              <span>Upper & Lowercase letters</span>
            </div>
            <div className={`criteria-item ${symbolNumberMet ? 'met' : ''}`}>
              {symbolNumberMet ? <CheckCircle2 size={16} /> : <Circle size={16} />}
              <span>Contains a number or symbol</span>
            </div>
            <div className={`criteria-item ${passwordsMatch ? 'met' : ''}`}>
               {passwordsMatch ? <CheckCircle2 size={16} /> : <Circle size={16} />}
               <span>Passwords match</span>
             </div>
          </div>

          <button 
            className="primary-btn solid-bg submit-btn" 
            type="submit"
            disabled={!(lengthMet && upperLowerMet && symbolNumberMet && passwordsMatch)}
          >
            Continue <ArrowRight size={20} />
          </button>
        </form>
      )}

      {/* STEP 3: OTP */}
      {step === 3 && (
        <div className="wizard-form">
          <p className="text-secondary" style={{ textAlign: 'center', marginBottom: '8px' }}>
            We've sent a 4-digit code to your mobile.<br/>(Hint: use 1234)
          </p>
          <div className={`otp-container ${otpError ? 'shake' : ''}`}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={otpRefs[index]}
                type="text"
                maxLength={1}
                className={`otp-box ${otpError ? 'error' : ''}`}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
              />
            ))}
          </div>
          {otpError && (
            <p className="text-danger" style={{ textAlign: 'center', marginTop: '-12px', fontSize: '0.9rem' }}>
              Incorrect OTP. Please try again.
            </p>
          )}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <span className="text-secondary">OTP expires in: </span>
            <span className="text-accent" style={{ fontWeight: 'bold' }}>{formatTime(timeLeft)}</span>
          </div>
        </div>
      )}

      {/* STEP 4: Success */}
      {step === 4 && (
        <div className="welcome-step">
          <div className="success-icon-wrapper">
            <ShieldCheck size={48} color="var(--color-success)" />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Welcome!</h1>
            <p className="text-secondary">Your account has been created successfully.</p>
          </div>
          <button 
            className="primary-btn solid-bg" 
            style={{ marginTop: '24px' }}
            onClick={() => onRegisterSuccess({ name: personalInfo.fullName, password: passwords.pass, mobile: personalInfo.mobile })}
          >
            Go to Dashboard <ArrowRight size={20} />
          </button>
        </div>
      )}

      {/* Custom Date Picker Modal */}
      {showDatePicker && (
        <CustomDatePicker 
          value={personalInfo.dob}
          onChange={val => setPersonalInfo({...personalInfo, dob: val})}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
};

export default RegisterWizard;
