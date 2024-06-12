import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from "./HomePage";
import RegistrationPage from "./RegistrationPage";
import LoginPage from './LoginPage';
import UserHomePage from "./UserHomePage";
import UpdateUserPage from "./UpdateUserPage";
import UpdateNotePage from "./UpdateNotePage";

function App() {
  return (
    <Router>
      <div>
      <h1>Private Note</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/home" element={<UserHomePage />} />
        <Route path="/user/updateUser" element={<UpdateUserPage />} />
        <Route path="/user/updateNote" element={<UpdateNotePage />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
