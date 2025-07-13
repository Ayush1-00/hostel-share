import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Auth from './components/Auth';
import MealQR from './components/MealQR';
import TravelShare from './components/TravelShare';
import AdminPanel from './components/AdminPanel';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('mealqr');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        user={user} 
        onLogout={handleLogout} 
      />
      
      <main className="py-8">
        {activeTab === 'mealqr' && <MealQR user={user} />}
        {activeTab === 'travel' && <TravelShare user={user} />}
        {activeTab === 'admin' && user.role === 'admin' && <AdminPanel user={user} />}
      </main>
    </div>
  );
}

export default App;