import React, { useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext'; 
import { toast } from 'react-toastify';

import './index.css'; 


const user_profile_Icon = "/img/profile_img.jpeg";

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('userInfo');
    const [currentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);


    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordChangeError, setPasswordChangeError] = useState('');
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');

    const [userDetails, setUserDetails] = useState(null);
    const [userAddress, setUserAddress] = useState(''); 
    const [userCity, setUserCity] = useState('');
    const [userState, setUserState] = useState('');
    const [userPincode, setUserPincode] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        document.title = "ViewProfile - Annapurna Farms";
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/signup');
        } else {

            if (user && user.userId) {
                fetch(`http://localhost:8080/user/userDetails/${user.userId}`)
                    .then(response => response.json())
                    .then(data => {
                        setUserDetails(data);
                    })
                    .catch(error => {
                        toast.error('Error fetching user details');
                    });
            }
        }
    }, [user, navigate]);


    if (!userDetails) {
        return <div>Loading user data...</div>; 
    }


    const handleUserInfoSubmit = (e) => {
        e.preventDefault();

    
        const requestBody = {
            userId: userDetails.userId,
            firstUserName: userDetails.firstUserName,
            lastUserName: userDetails.lastUserName,
            userPhNo: userDetails.userPhNo,
            userEmail: userDetails.userEmail,
            userAddress, 
            userPincode, 
            userCity, 
            userState 
        };

     
        fetch('http://localhost:8080/user/address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
        .then(response => response.json())
        .then(data => {
            toast.success('Information saved successfully!');
            setUserAddress('');
            setUserCity('');
            setUserState('');
            setUserPincode('');
        })
        .catch(error => {
            toast.error('Error saving user information');
        });
    };
    

    const handleResetUserFields = () => {
        setUserAddress('');
        setUserCity('');
        setUserState('');
        setUserPincode('');
    }


    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        // Basic password validation
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match');
            return;
        }

        // Reset any previous messages
        setPasswordChangeError('');
        setPasswordChangeSuccess('');


        if (!user || !user.userId) {
            toast.error('User not found.');
            return;
        }

        // API request body
        const payload = {
            userId: user.userId, 
            currentPassword: currentPassword,
            newPassword: newPassword,
        };

        try {
            const response = await fetch('http://localhost:8080/user/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.result === "Password updated successfully") {
                toast.success(data.result);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                toast.error(data.result);
            }
        } catch (error) {
            toast.error('An error occurred while updating the password.');
        }
    };

    const handlePasswordResetFields = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    return (
        <div className="profile-container">
            <img src="/img/blog_image.jpg" alt="" className="profile-banner" />
            <div className="profile-inside-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <img src={user_profile_Icon} alt="Profile Avatar" className="avatar-img" />
                    </div>
                    <div className="profile-info">
                        {/* Only render the user's information if user is not null */}
                        {user ? (
                            <>
                                <h5 className="profile-name">{userDetails.firstUserName} {userDetails.lastUserName}</h5>
                                <p className="profile-email">{userDetails.userEmail}</p>
                            </>
                        ) : (
                            <p>Loading user data...</p>
                        )}
                    </div>
                </div>

                <div className="profile-tabs">
                    <ul className="tab-list">
                        <li className="tab-item">
                            <button
                                className={`tab-link ${activeTab === 'userInfo' ? 'active-tab' : ''}`}
                                onClick={() => setActiveTab('userInfo')}
                            >
                                User Info
                            </button>
                        </li>
                        <li className="tab-item">
                            <button
                                className={`tab-link ${activeTab === 'changePassword' ? 'active-tab' : ''}`}
                                onClick={() => setActiveTab('changePassword')}
                            >
                                Change Password
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="user-profile-content">
                    {activeTab === 'userInfo' && (
                        <form className="profile-form" onSubmit={handleUserInfoSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="firstName"  
                                        value={userDetails.firstUserName || ''}
                                        readOnly 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="lastName"
                                        value={userDetails.lastUserName || ''}
                                        readOnly  
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="email"  
                                        value={userDetails.userEmail || ''}
                                        readOnly
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="mobile"  
                                        value={userDetails.userPhNo || ''}
                                        readOnly
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="Street" className="form-label">House No/Street</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="Street"
                                        value={userAddress}
                                        onChange = {(e) => setUserAddress(e.target.value)}
                                        required 
                                        />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="City" className="form-label">City</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="City" 
                                        value = {userCity}
                                        onChange = {(e) => setUserCity(e.target.value)} 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="State" className="form-label">State</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="State" 
                                        value={userState} 
                                        onChange = {(e) => setUserState(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Pin Code" className="form-label">Pin Code</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="Pin Code"
                                        value={userPincode}  
                                        onChange = {(e) => setUserPincode(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn-submit">Save</button>
                                <button type="button" className="btn-cancel" onClick={handleResetUserFields}>Cancel</button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'changePassword' && (
                        <form onSubmit={handlePasswordSubmit} className="change-profile-form">
                            <div className="change-password-form">
                                <label htmlFor="currentPassword" className="change-form-label">Current Password</label>
                                <div className="password-input-container">
                                    <input 
                                    type={currentPasswordVisible ? 'text' : 'password'}
                                    className="change-form-control" 
                                    id="currentPassword" 
                                    placeholder="Current Password" 
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                     />
                                    <button
                                        type="button"
                                        className="eye-icon"
                                        onClick={() => setIsCurrentPasswordVisible((prevState) => !prevState)}
                                        >
                                        {currentPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            <div className="change-password-form">
                                <label htmlFor="newPassword" className="change-form-label">New Password</label>
                                <div className="password-input-container">
                                    <input 
                                    type={newPasswordVisible ? 'text' : 'password'}
                                    className="change-form-control" 
                                    id="newPassword" 
                                    placeholder="New Password" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required 
                                    />
                                    <button
                                        type="button"
                                        className="eye-icon"
                                        onClick={() => setIsNewPasswordVisible((prevState) => !prevState)}
                                    >
                                        {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            <div className="change-password-form">
                                <label htmlFor="confirmPassword" className="change-form-label">Confirm Password</label>
                                <div className="password-input-container">
                                    <input 
                                     type={isConfirmPasswordVisible ? 'text' : 'password'}
                                    className="change-form-control" 
                                    id="confirmPassword" 
                                    placeholder="Confirm Password" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required 
                                    />
                                    <button
                                        type="button"
                                        className="eye-icon"
                                        onClick={() => setIsConfirmPasswordVisible((prevState) => !prevState)}
                                    >
                                        {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                               </div>
                            </div>
                            {passwordChangeError && (
                                <div className="error-message">
                                    {passwordChangeError}
                                </div>
                            )}

                            {passwordChangeSuccess && (
                                <div className="success-message">
                                    {passwordChangeSuccess}
                                </div>
                            )}
                            <div className="change-password-form-buttons">
                                <button type="submit" className="change-btn-submit">Save</button>
                                <button type="button" className="change-btn-cancel" onClick={handlePasswordResetFields}>Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;