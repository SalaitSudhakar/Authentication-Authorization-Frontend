import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login';
import VerifyEmail from './Pages/VerifyEmail';
import ResetPassword from './Pages/ResetPassword';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <BrowserRouter>  
      <div>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/verify-email" element={<VerifyEmail />}/>
          <Route path="/reset-password" element={<ResetPassword />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App