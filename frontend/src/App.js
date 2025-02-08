// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navigation from './components/Navbar/Navigation';
import HomePage from './pages/home/HomePage';
import ProductPage from './pages/Product/ProductPage';
import HomeServicePage from './pages/HomeService/HomeServicePage';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import { AuthProvider } from './context/AuthContext';
import Cart from './pages/Cart/Cart';
import { CartProvider } from './context/CartContext';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminLogin from './pages/Admin/Auth/AdminLogin';
import Profile from './pages/Profile/Profile';
const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <AdminAuthProvider>
            <Router>
              <div className="App">
                {/* Render Navbar */}
                <Navigation />

                {/* Routes for different pages */}
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product" element={<ProductPage />} />
                  <Route path="/homeservice" element={<HomeServicePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/products" element={<ProductPage />} />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </div>
            </Router>
          </AdminAuthProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
