import React from 'react';
import { Container } from 'react-bootstrap';
import LogIn from './Components/LogIn/LogIn';
import SignUp from './Components/SignUp/SignUp';
import { AuthProvider } from './Context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home';
import RequireAuth from './Components/RequireAuth/RequireAuth';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import VerifyEmail from './Components/VerifyEmail/VerifyEmail';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>

            {/* Routes which require Login */}

            <Route exact path='/' element={<RequireAuth><Home /></RequireAuth>} />

            {/* Routes which require Login */}


            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
