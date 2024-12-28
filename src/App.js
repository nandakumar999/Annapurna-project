import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import CarouselImg from './components/CarouselImg';
import HomePageCategory from './components/HomePageCategory';
import Product from './components/Product';
import Cart from './components/Cart';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import CheckOut from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn'; 
import ForgotPassword from './components/ForgotPassword'
import AdminLogin from './components/AdminLogin'; 
import AdminDashboard from './components/AdminDashboard'
import CategoryProducts from './components/CategoryProducts';
import HomePageAbout from './components/HomePageAbout';
import HomePageCounter from './components/HomePageCounter';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import FAQs from './components/FAQs'
import Blog from './components/Blog';
import UserProfile from './components/UserProfile';
import UserOrders from './components/UserOrders';
import TrackOrders from './components/TrackOrders';
import UserTracker from './components/UserTracker';
import NotFound from './components/NotFound';

import { AuthProvider } from './context/AuthContext';
import './App.css';



const Layout = ({ children , cart}) => {
  const location = useLocation();

  const adminRoutes = ['/admin-dashboard'];

  const isAdminSection = adminRoutes.includes(location.pathname);

  // Define paths where header and footer should be hidden
  const hideHeaderFooter = [
    '/signin',
    '/signup',
    '/forgot-password',
    '/admin-login',
  ].includes(location.pathname);

  return (
    <div className="App">
      {/* Conditionally render Header and Footer */}
      {!hideHeaderFooter && <Header cartCount={cart.length}/>}
      {children}
      {!isAdminSection && !hideHeaderFooter &&  <Footer />}
    </div>
  );
};


function App() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the app mounts
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    // console.log("app.js stored_Cart:", storedCart);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
 <div>
   <Router>
    <AuthProvider>
      <Layout cart={cart}>
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<div>Loading...</div>}>
              <>
                <CarouselImg />
                <HomePageAbout />
                <HomePageCounter/>
                <HomePageCategory />
                <Product cart={cart} setCart={setCart}/>
              </>
              </Suspense>
            } />
            {/* Products Pages */}
            <Route path="/products" element={<Product cart={cart} setCart={setCart} />} />
            <Route path="/product/:name" element={<ProductDetail cart={cart} setCart={setCart} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route path="/checkout" element={<CheckOut />} />  
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/category/:categoryId" element={<CategoryProducts cart={cart} setCart={setCart} />} />
            <Route path ="/about" element={<AboutUs />}/>
            <Route path ="/contact" element={<Contact/>}/>
            <Route path="/faqs" element={<FAQs/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/user-profile" element={<UserProfile/>}/>
            <Route path="/user-orders" element={<UserOrders/>}/>
            <Route path="/track-orders/:orderId" element={<TrackOrders/>}/>
            <Route path="/user-tracker" element= {<UserTracker />} />


            {/* Authentication Pages */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} /> 
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/admin-login" element={<AdminLogin />} /> 
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

             {/* Not Found Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
    </AuthProvider>
  </Router>
  <ToastContainer/>
</div>
  );
}

export default App;
