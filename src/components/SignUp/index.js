import React, {useState, useContext, useEffect}from 'react';
import { Link , useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { toast } from 'react-toastify';

import './index.css';


const SignUp = () => {
  const { registerUser, user} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstUserName: '',
    lastUserName: '',
    userPhNo: '',
    userEmail: '',
    userPassword: '',
    confirmPassword: '',
  });

  // const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
useEffect(() => {
    document.title = "Signup - Annapurna Farms";
}, []);

// useEffect(() => {
//   if (user) {
//     const redirectTo = location.state?.from || '/';
//     navigate(redirectTo);
//   }
// }, [user, location.state, navigate]);
  
useEffect(() => {
  if (user && !isLoggingIn) {
    // console.log('Navigating to checkout...');
    navigate('/');
  }
}, [user, isLoggingIn, navigate]);


const handleChange = (e) => {
  const {name, value} = e.target;
  setFormData({...formData, [name]: value})
}
 

const validateForm = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const namePattern = /^[a-zA-Z\s]+$/; 


  if (!namePattern.test(formData.firstUserName)) {
    toast.error('First Name should contain only alphabets.');
    return false;
  }
  if (!namePattern.test(formData.lastUserName)) {
    toast.error('Last Name should contain only alphabets.');
    return false;
  }
  if (!emailPattern.test(formData.userEmail)) {
    toast.error('Invalid email address!');
    return false;
  }
  if (!/^\d{10}$/.test(formData.userPhNo)) {
    toast.error('Phone number must be 10 digits!');
    return false;
  }
  return true;
};

const handleSignUp = async (e) => {
  e.preventDefault();
  setIsLoggingIn(true);

  if (!validateForm()) return;
  if (formData.userPassword !== formData.confirmPassword) {
    toast.error('Passwords do not match!');
    return;
  }


  setLoading(true);
  try {
    const response = await fetch('http://localhost:8080/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstUserName: formData.firstUserName,
        lastUserName: formData.lastUserName,
        userPhNo: formData.userPhNo,
        userEmail: formData.userEmail,
        userPassword: formData.userPassword,
      }),
    });

    // console.log("hi:", response);

    const data = await response.json();

    // console.log("data:", data);

    if (data.result === "Sign Up Successfull") {
      registerUser(data); // Save user data in AuthContext
      // setSuccessMessage('Signup successful! Redirecting...');
      // console.log(data);
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        // console.log("localCart:", localCart);

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
      
      toast.success(data.result);
      setFormData({
        firstUserName: '',
        lastUserName: '',
        userPhNo: '',
        userEmail: '',
        userPassword: '',
        confirmPassword: '',
      });
         setTimeout(() => {
          setIsLoggingIn(false)
              // navigate('/');
            const redirectTo = location.state?.from || '/';
            navigate(redirectTo);
        }, 5000);
    } else {
      // console.log('Signup failed! Please try again:', response);
      toast.error(data.result);
    }
  } catch (error) {
    console.error('Error during signup:', error);
    toast.error('An error occurred. Please try again.');
  }finally {
    setLoading(false);
  }
};



return (
<div className="signup-container">
  <div className="signup-grid">
    <div className="singnup_top_wrapper-left-side">
      <div className="signup_form_wrapper">
        <div className="logo-container">
          <Link to = "/">
              <img src="/img/annapurna_logo.png" alt="Logo" className="form_logo"/>
          </Link>
        </div>
        <h2 className="sign_tite">Sign Up</h2>
        <form onSubmit={handleSignUp}>

          <div className="signup_names">
            <div className="group">
              <input 
                className="name_input" 
                type="text" 
                name = "firstUserName"
                value = {formData.firstUserName}
                onChange={handleChange}
                required 
                />
              <span className="highlight"></span>
              <span className="signup-bar"></span>
              <label className="signup-label">First Name</label>
            </div>

            <div className="group">
              <input 
               className="name_input" 
               type="text" 
               name="lastUserName"
               value={formData.lastUserName}
               onChange={handleChange}  
               required />
              <span className="highlight"></span>
              <span className="signup-bar"></span>
              <label className="signup-label">Last Name</label>
            </div>
          </div>

            <div className="group">
              <input 
              className="name_input" 
              type="email" 
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              required />
              <span className="highlight"></span>
              <span className="signup-bar"></span>
              <label className="signup-label">Email address</label>
            </div>

            <div className="group">
              <input 
              className="name_input"
              type="text" 
              name="userPhNo"
              value={formData.userPhNo}
              onChange={handleChange}
              required />
              <span className="highlight"></span>
              <span className="signup-bar"></span>
              <label className="signup-label">Phone Number</label>
            </div>

            <div className="group">
              <input 
              className="name_input"
              type={isPasswordVisible ? 'text' : 'password'}
              name="userPassword"
              value={formData.userPassword}
              onChange={handleChange}
              required />
              <span className="highlight"></span>
              <span className="signup-bar"></span>
              <label className="signup-label">Password</label>
              <button
                  type="button"
                  className="eye-icon"
                  onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>

            <div className="group">
              <input 
               className="name_input"
               type={isConfirmPasswordVisible ? 'text' : 'password'}
               name="confirmPassword"
               value={formData.confirmPassword}
               onChange={handleChange}
               required 
              />
              <span className="highlight"></span>
              <span className="signup-bar"></span>
              <label className="signup-label">Confirm Password</label>
              <button
                  type="button"
                  className="eye-icon"
                  onClick={() => setIsConfirmPasswordVisible((prevState) => !prevState)}
                >
                  {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>

            <button type="submit" className="create-account" disabled={loading}>
                {loading ? 'Signing Up...' : 'Create My Account'}
            </button>
        </form>
        {/* <div>
       
        </div> */}
        {/* {successMessage && <p className="success-message">{successMessage}</p>} */}
        <div className="create-account_1">
          Already a member ? <Link className="create_2" to="/signin">Sign in</Link>
        </div>
      </div>
    </div>

    <div className="text-content-right-side">
      <h1>Real Food, Real Stories  Welcome to Annapoorna Farms</h1>
      <p>Join us at Annapoorna as we connect to nature’s finest and nourish your soul with real food.</p>
    </div>
  </div>
</div>

  );
};

export default SignUp;
