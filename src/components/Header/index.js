import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './index.css';

const annapurna_logo = "/img/annapurna_logo.png";

const Header = ({ cartCount }) => {
  const { user, admin, logoutUser, logoutAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserLogout = () => {
    logoutUser();
    navigate('/');
  };

  const handleAdminLogout = () => {
    logoutAdmin();
    navigate('/admin-login', { replace: true });
  };

  return (
    <>
      <header className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={annapurna_logo} alt="Logo" />
          </Link>
        </div>
        <div className="search-bar">
          {!admin && <input type="text" placeholder="Search for food..." />}
        </div>
        <div className="header-buttons">
          {!admin ? (
            <>
              <Link to="/cart">
                <button className="btn-add-to-cart">
                  View Cart ({cartCount})
                </button>
              </Link>
              {user ? (
                <button onClick={handleUserLogout} className="btn-logout">Logout</button>
              ) : (
                <>
                  <Link to="/login">
                    <button className="btn-login">Login</button>
                  </Link>
                  <Link to="/signup">
                    <button className="btn-signup">Sign Up</button>
                  </Link>
                </>
              )}
            </>
          ) : (
            <button onClick={handleAdminLogout} className="btn-logout">Admin Logout</button>
          )}
        </div>
      </header>

      {!admin && (
        <nav className="menu-bar">
          <ul>
            <li>Home</li>
            <li>Categories</li>
            <li>About</li>
            <li>Brand</li>
            <li>Accessories</li>
            <li>Sale</li>
            <li>Blog</li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Header;
