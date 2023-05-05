import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import DicePage from "./pages/dice";
import HistoryPage from "./pages/history";
import ProfilePage from './pages/profile'
import MainLayout from "./components/layouts/MainLayout";
import {useAuth} from "./AuthProvider";
import SignUpPage from "./pages/signup";



const App = () => {
  const {currentUser} = useAuth();

  return (
    <MainLayout>
      <Routes>
        <Route
          path="/"
          element={currentUser ? <HomePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dice"
          element={currentUser ? <DicePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/history"
          element={currentUser ? <HistoryPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={currentUser ? <ProfilePage /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
