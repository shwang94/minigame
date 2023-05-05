import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate  } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DicePage from './pages/DicePage';
import HistoryPage from './pages/HistoryPage';
import MainLayout from './components/layouts/MainLayout';
import UserContext from './UserContext';
import Cookies from 'js-cookie';

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const savedUser = Cookies.get('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSetUser = (userData) => {
    setUser(userData);
    Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // Set the cookie to expire in 7 days
  };

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser: handleSetUser }}>
        <MainLayout>
          <Routes>
            <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" replace />}/>
            <Route path="/dice" element={user ? <DicePage /> : <Navigate to="/login" replace />}/>
            <Route path="/history" element={user ? <HistoryPage /> : <Navigate to="/login" replace />}/>            
            <Route  path="/login" element={<LoginPage/>} />
          </Routes>
        </MainLayout>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
