import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './index.css';

const annapurna_logo = "/img/annapurna_logo.png";

const Header = ({ cartCount }) => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); 
    navigate('/');
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
          <input type="text" placeholder="Search for food..." />
        </div>
        <div className="header-buttons">
          <Link to="/cart">
            <button className="btn-add-to-cart">
              View Cart ({cartCount})
            </button>
          </Link>

          {user ? (
            <>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
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
        </div>
      </header>
      <nav className="menu-bar">
        <ul>
          <li>Home</li>   {/* <Link to="/"></Link> */}
          <li>Categories</li> {/* <Link to="/categories"></Link> */}
          <li>About</li>{/* <Link to="/about"></Link> */}
          <li>Brand</li>    {/* <Link to="/brand"></Link> */}
          <li>Accessories</li>          {/* <Link to="/accessories"></Link> */}
          <li>Sale</li>  {/* <Link to="/sale"></Link> */}
          <li>Blog</li>     {/* <Link to="/blog"></Link> */}
        </ul>
      </nav>
    </>
  );
};

export default Header;
