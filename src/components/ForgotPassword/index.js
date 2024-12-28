import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './index.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(60); // 60 seconds timer
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const [emailLoading, setEmailLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
        document.title = "ForgotPassword - Annapurna Farms";
  }, []);

  // Timer for verification code
  useEffect(() => {
    let intervalId;
    if (step === 2 && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId); // Stop the timer when it reaches 0
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); 
    }
    return () => clearInterval(intervalId); 
  }, [step, timer]);

 const handleSubmitEmail = async (e) => {
  e.preventDefault();
  setEmailLoading(true);

  try {
    const response = await fetch('http://localhost:8080/user/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail: email }), // Include the entered email
    });

    const data = await response.json();

    if (data.code === 200) {
      toast.success(data.result);
      localStorage.setItem('userId', data.userId);
      setStep(2);
      setTimer(60); // Reset the timer for the OTP step
    } else if (data.code === 404) {
      toast.error(data.result);
    }
  } catch (error) {
    // Network or other errors
    toast.error('Unable to process your request. Please try again later.');
    console.error('Error:', error);
  } finally {
    setEmailLoading(false); 
  }
};


const handleSubmitVerification = async (e) => {
  e.preventDefault();
  setVerificationLoading(true);

  try {
    // Retrieve the userId from localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User ID not found. Please try again.");
      return;
    }

    // Make POST request to the API
    const response = await fetch(`http://localhost:8080/user/otp/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }), // Pass OTP in request body
    });

    const data = await response.json();

    // console.log("OTP Verification Response:", data);

    // Handle success or error codes
    if (data.code === 200) {
      toast.success(data.result); // Success toast
      setStep(3); // Move to the next step
    } else if (data.code === 404) {
      toast.error(data.result || "Invalid OTP. Please try again."); // Error toast
    }
  } catch (error) {
    toast.error("Unable to process your request. Please try again later.");
    console.error("Error:", error);
  } finally {
    setVerificationLoading(false); // Stop loading
  }
};

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);

    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        setPasswordLoading(false);
        return;
    }
   
    try {

      const userId = localStorage.getItem('userId');

      if (!userId) {
        toast.error('User ID not found. Please try again');
        setPasswordLoading(false);
        return;
      }

      const payload = new URLSearchParams();
      payload.append('password', password);

      console.log('Payload being sent:', { password });


      const response = await fetch(`http://localhost:8080/user/newPassword/${userId}`, {
        method: 'POST',
        headers : {
           'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload.toString(),
      });

      const data = await response.json();

      console.log("new password:", data);

      if (data.code === 200) {
        toast.success(data.result);
        // setStep(1);
        // setEmail(''); 
        // setCode('');
        // setPassword('');
        // setConfirmPassword('');
        localStorage.removeItem('userId');
        navigate('/');
      } else if (data.code === 400) {
        toast.error(data.result);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Unable to process your request. Please try again later');
      console.error('Error:', error);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleResendCode = () => {
    setTimer(60); 
    setStep(2); 
  };



  return (
    <div className="Forgot-container">
      <div className="Forgot-grid">
        <div className="Forgot-top-wrapper-left-side">
          <div className="Forgot-form-wrapper">
            <div className="Forgot-logo-container">
              <Link to = "/">
                <img src="/img/annapurna_logo.png" alt="Logo" className="Forgot-form-logo" />
              </Link>
            </div>

            {step === 1 && (
              <div>
                <h2 className="Forgot-title">Forgot Password?</h2>
                <p className="Forgot-password-para">
                  No problem. Just let us know your email address, and we'll email you a password reset link.
                </p>
                <form onSubmit={handleSubmitEmail}>
                  <div className="Forgot-group">
                    <input
                      className="Forgot-name-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <span className="Forgot-highlight"></span>
                    <span className="Forgot-bar"></span>
                    <label className="Forgot-label">Email address</label>
                  </div>
                  <button className="Forgot-account" type="submit" disabled={emailLoading}>
                    {emailLoading ? 'Sending...' : 'Send'}
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="Forgot-title">Enter Verification Code</h2>
                <p className="Forgot-password-para">
                  We’ve sent a code to your email. Please enter the code below to continue.
                </p>
                <form onSubmit={handleSubmitVerification}>
                  <div className="Forgot-group">
                    <input
                      className="Forgot-name-input"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <span className="Forgot-highlight"></span>
                    <span className="Forgot-bar"></span>
                    <label className="Forgot-label">Verification Code</label>
                  </div>
                  <div className='forget_timer_resend'>
                    {timer === 0 && (
                    <button onClick={handleResendCode} className="Forgot_resend_button">
                    Resend Code
                    </button>
                    )}
                  <p>Remaining time : {timer}s</p>
                  </div>
                  <button className="Forgot-account" type="submit" disabled={verificationLoading}>
                      {verificationLoading ? 'Verifying...' : 'Verify Code'}
                  </button>
                </form>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="Forgot-title">Set New Password</h2>
                <form onSubmit={handleSubmitPassword}>
                  <div className="Forgot-group">
                    <input
                      className="Forgot-name-input"
                      type={isPasswordVisible ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span className="Forgot-highlight"></span>
                    <span className="Forgot-bar"></span>
                    <label className="Forgot-label">New Password</label>
                    <button
                      type="button"
                      className="eye-icon"
                      onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                    >
                      {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="Forgot-group">
                    <input
                      className="Forgot-name-input"
                      type={isConfirmPasswordVisible ? 'text' : 'password'} // Toggle between text and password
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <span className="Forgot-highlight"></span>
                    <span className="Forgot-bar"></span>
                    <label className="Forgot-label">Confirm Password</label>
                    <button
                      type="button"
                      className="eye-icon"
                      onClick={() => setIsConfirmPasswordVisible((prevState) => !prevState)}
                    >
                      {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <button className="Forgot-account" type="submit" disabled={passwordLoading}>
                    {passwordLoading ? 'Changing Password...' :'Change Password'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="Forgot-text-content-right-side">
          <h1>Real Food, Real Stories Welcome to Annapoorna Farms</h1>
          <p>Join us at Annapoorna as we connect to nature’s finest and nourish your soul with real food.</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;