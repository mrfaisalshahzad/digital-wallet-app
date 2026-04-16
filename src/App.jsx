import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import ActionButtons from './components/ActionButtons';
import TransactionList from './components/TransactionList';
import BottomNavigation from './components/BottomNavigation';
import SettingsView from './components/SettingsView';
import Onboarding from './components/Onboarding';
import Auth from './components/Auth';
import Toast from './components/Toast';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [appScreen, setAppScreen] = useState('loading'); // 'loading', 'onboarding', 'auth', 'dashboard'
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  
  const [toast, setToast] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'transfer',
      title: 'Payment Received',
      description: 'You have received 500 SAR from John Doe.',
      time: '10 mins ago'
    },
    {
      id: 2,
      type: 'security',
      title: 'New Device Login',
      description: 'We detected a login from a new device (iPhone 14).',
      time: '2 hours ago'
    },
    {
      id: 3,
      type: 'alert',
      title: 'System Maintenance',
      description: 'Scheduled maintenance this Friday at 2:00 AM.',
      time: '1 day ago'
    }
  ]);

  useEffect(() => {
    // Inject mock user array natively if uninitialized
    const storedUsers = localStorage.getItem('walletUsers');
    if (!storedUsers) {
       localStorage.setItem('walletUsers', JSON.stringify([
          { name: 'Alex Morgan', mobile: '1234567890', password: 'Admin@123' }
       ]));
    }

    // Determine initial routing based on localStorage
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    const isRegistered = localStorage.getItem('isRegistered');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    setTimeout(() => {
      if (isLoggedIn) {
        const mobile = localStorage.getItem('currentUserMobile');
        const users = JSON.parse(localStorage.getItem('walletUsers') || '[]');
        const resolvedUser = users.find(u => u.mobile === mobile) || users[0];
        setActiveUser(resolvedUser);
        setAppScreen('dashboard');
      } else if (isRegistered) {
        setAuthMode('login');
        setAppScreen('auth');
      } else if (hasCompletedOnboarding) {
        setAuthMode('register');
        setAppScreen('auth');
      } else {
        setAppScreen('onboarding');
      }
    }, 100);
  }, []);

  const handleOnboardingComplete = (mode) => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setAuthMode(mode);
    setAppScreen('auth');
  };

  const handleAuthSuccess = (mode, data = {}) => {
    if (mode === 'register') {
      const users = JSON.parse(localStorage.getItem('walletUsers') || '[]');
      const newUser = {
         name: data.name || 'User',
         mobile: data.mobile || '',
         password: data.password || ''
      };
      
      const updatedUsers = users.filter(u => u.mobile !== newUser.mobile);
      updatedUsers.push(newUser);
      
      localStorage.setItem('walletUsers', JSON.stringify(updatedUsers));
      localStorage.setItem('isRegistered', 'true');
      localStorage.setItem('currentUserMobile', newUser.mobile);
      setActiveUser(newUser);

      const welcomeNotif = {
        id: Date.now(),
        type: 'welcome',
        title: `Welcome, ${newUser.name}!`,
        description: 'Your digital wallet account is successfully set up.',
        time: 'Just now'
      };
      setNotifications(prev => [welcomeNotif, ...prev]);
      setToast(welcomeNotif);
    } else if (mode === 'login') {
      if (data.mobile) localStorage.setItem('currentUserMobile', data.mobile);
      if (data.name) setActiveUser(data);
    }
    
    localStorage.setItem('isLoggedIn', 'true');
    setAppScreen('dashboard');
  };

  const handleAuthBack = () => {
    setAppScreen('onboarding');
  };

  if (appScreen === 'loading') return null;

  return (
    <>
      <main className="app-container">
        {toast && <Toast notification={toast} onClose={() => setToast(null)} />}
        
        {appScreen === 'onboarding' && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
        
        {appScreen === 'auth' && (
          <Auth 
            initialMode={authMode} 
            onAuthSuccess={handleAuthSuccess} 
            onBack={handleAuthBack} 
          />
        )}
        
        {appScreen === 'dashboard' && (
          <>
            {activeTab === 'home' && (
              <>
                <Header 
                   notifications={notifications} 
                   clearNotifications={() => setNotifications([])} 
                   userName={activeUser?.name || 'User'}
                />
                <BalanceCard />
                <ActionButtons />
                <TransactionList />
              </>
            )}
            {activeTab === 'settings' && <SettingsView />}
          </>
        )}
      </main>
      
      {appScreen === 'dashboard' && (
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </>
  );
}

export default App;
