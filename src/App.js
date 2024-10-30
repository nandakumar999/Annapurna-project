import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Header from './components/Header';
import CarouselImg from './components/CarouselImg';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Cart from './components/Cart';
import Footer from './components/Footer';
import NewlyArrivedBrands from './components/NewlyArrivedBrands';
import ProductDetail from './components/ProductDetail';
import CheckOut from './components/Checkout';
import RegistrationForm from './components/Registration';
import Login from './components/Login'; 
import AdminLogin from './components/AdminLogin'; 
import AdminDashboard from './components/AdminDashboard'

import { AuthProvider } from './context/AuthContext';

import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the app mounts
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header cartCount={cart.length} />
          <Routes>
            <Route path="/" element={
              <>
                <CarouselImg />
                <ProductList />
                <Product />
                <NewlyArrivedBrands />
              </>
            } />
            {/* Products Pages */}
            <Route path="/products" element={<ProductList cart={cart} setCart={setCart} />} />
            <Route path="/product/:name" element={<ProductDetail cart={cart} setCart={setCart} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route path="/checkout" element={<CheckOut />} />  

            {/* Authentication Pages */}
            <Route path="/signup" element={<RegistrationForm />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/admin-login" element={<AdminLogin />} /> 
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
