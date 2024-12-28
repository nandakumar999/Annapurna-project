import React, { useState, useContext, useEffect} from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { toast } from 'react-toastify';

import './index.css';


const SignIn = () => {
  const { loginUser, user} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


useEffect(() => {
    document.title = "SignIn - Annapurna Farms";
}, []);

useEffect(() => {
    if (user && !isLoggingIn) {
      navigate('/'); 
    }
}, [user, isLoggingIn, navigate]);


const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setIsLoggingIn(true);

    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail: email, userPassword: password }),
      });

      const data = await response.json();
      // console.log('Response:', data);

      if (data.result === "Sign In Successful!") {
        // const data = await response.json()
        loginUser(data);

  
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        console.log("localCart:", localCart);

        if (localCart.length > 0) {
          // for (const item of localCart) {
          //   const payload = {
          //     userId: data.userId,
          //     productName: item.productName || 'Unknown', // Default to 'Unknown' if missing
          //     productPrice: parseFloat(item.price) || 0, // Ensure price is a number
          //     productGram: parseInt(item.selectedWeight) || 0, // Ensure weight is a number
          //     productImg: item.productImg,
          //     productQuantity: item.quantity || 0, // Default to 0 if missing
          //   };
            const payload = localCart.map(item => ({
              userId: data.userId,
              productName: item.productName || 'Unknown',
              productPrice: parseFloat(item.price) || 0, 
              productGram: parseInt(item.selectedWeight) || 0, 
              productImg: item.productImg,
              productQuantity: item.quantity || 0, 
            }));

            try {
              const response = await fetch(`http://localhost:8080/cart/cartlist/${data.userId}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              });

              if (!response.ok) {
                console.error('Error:', response.status, await response.text());
              } //else {
              //   console.log('Payload sent successfully:', payload);
              // }
            } catch (error) {
              console.error('Fetch error:', error);
            }
        }


         localStorage.removeItem('cart');
        // console.log("remove:",remove);
                 
        // toast.success('Sign In successful!');
        toast.success(data.result);
        setTimeout(() => {
          setIsLoggingIn(false)
          // navigate('/');
            const redirectTo = location.state?.from || '/';
            navigate(redirectTo);
        }, 5000);
      } else {
        const errorMessage = data.result;
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Login Error:', err);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };



  return (
  <div className="login-container">
    <div className="login-grid">
      <div className="login-top-wrapper-left-side">
        <div className="login_form_wrapper">
          <div className="login-logo-container">
          <Link to="/">
              <img src="/img/annapurna_logo.png" alt="Logo" className="login_form_logo"/>
          </Link>
          </div>
          <h2 className="login_tite">Sign In</h2>
          <form onSubmit={handleLogin}>

            <div className="login-group">
              <input 
              className="login_name_input" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              />
              <span className="login-highlight"></span>
              <span className="login-bar"></span>
              <label className="login-label">Email address</label>
            </div>

            <div className="login-group">
              <input 
              className="login_name_input" 
              type={isPasswordVisible ? 'text' : 'password'} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              />
              <span className="login-highlight"></span>
              <span className="login-bar"></span>
              <label className="login-label">Password</label>
              <button
                  type="button"
                  className="eye-icon"
                  onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>


            <div>
            <button className="login-create-account" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

          <div className="login_forgotCreating_wrapper">
            <Link className="login_forgotCreating_link" to="/forgot-password">
              Forgot password ?
            </Link>
          </div> 

          
          <div className="login-create-account_1">
            New User?  
            <Link className="login-create_2" to="/signup">
               Create Account
            </Link>
          </div>
        </div>
      </div>

      <div className="login-text-content-right-side">
        <h1>Real Food, Real Stories Welcome to Annapoorna Farms</h1>
        <p>Join us at Annapoorna as we connect to nature’s finest and nourish your soul with real food.</p>
      </div>
    </div>
  </div>

  );
};

export default SignIn;
