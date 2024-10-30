import React, { useState, useContext, useEffect} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './index.css';

const RegistrationForm = () => {
    const { registerUser,  user } = useContext(AuthContext); // Use loginUser instead of setUser
    const [formData, setFormData] = useState({
        userName: '',
        userPhNo: '',
        userPassword: '',
        userAddress: '',
        userPincode: '',
        userCity: '',
        userState: '',
    });

    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState('');         
    const [success, setSuccess] = useState('');     
    const navigate = useNavigate();  // Add useNavigate for redirection

     // Prevent navigation back to registration after successful registration
     useEffect(() => {
        if (user) {
            navigate('/checkout'); // Redirect to checkout if user is registered
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
    
        try {
            const response = await fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const responseData = await response.json();
            console.log('Response Status:', response.status);
            console.log('Response Data:', responseData);
    
            if (response.ok || response.status === 201) {
                registerUser(responseData);  // Use loginUser to set the user context
                setSuccess('Registration successful!');
                setFormData({
                    userName: '',
                    userPhNo: '',
                    userPassword: '',
                    userAddress: '',
                    userPincode: '',
                    userCity: '',
                    userState: '',
                });

               // Wait for 2 seconds before navigating to checkout
               setTimeout(() => {
                navigate('/checkout'); // Redirect to checkout after 2 seconds
            }, 2000);
            } else {
                console.error('Registration Error:', responseData);
                setError(`Registration failed: ${responseData.message || 'An error occurred'}`);
            }
        } catch (error) {
            console.error('Catch Error:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            <form className="RegistrationForm" onSubmit={handleSubmit}>
                <h4>Register</h4>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <input 
                    name="userName" 
                    value={formData.userName} 
                    onChange={handleChange} 
                    placeholder="Name" 
                    required 
                /><br/>

                <input 
                    name="userPhNo" 
                    value={formData.userPhNo} 
                    onChange={handleChange} 
                    placeholder="Phone Number" 
                    type="tel" 
                    required 
                /><br/>

                <input 
                    name="userPassword" 
                    type="password" 
                    value={formData.userPassword} 
                    onChange={handleChange} 
                    placeholder="Password" 
                    required 
                /><br/>

                <input 
                    name="userAddress" 
                    value={formData.userAddress} 
                    onChange={handleChange} 
                    placeholder="Address" 
                    required 
                /><br/>

                <input 
                    name="userPincode" 
                    value={formData.userPincode} 
                    onChange={handleChange} 
                    placeholder="Pincode" 
                    required 
                /><br/>

                <input 
                    name="userCity" 
                    value={formData.userCity} 
                    onChange={handleChange} 
                    placeholder="City" 
                    required 
                /><br/>

                <input 
                    name="userState" 
                    value={formData.userState} 
                    onChange={handleChange} 
                    placeholder="State" 
                    required 
                /><br/>

                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
