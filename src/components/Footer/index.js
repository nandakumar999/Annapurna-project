import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
 
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Search Bar and Clickable Help Link */}
        <input type="text" placeholder="Search..." className="footer-search-bar" />
        <Link to="/contact" 
          className="footer-help-link">
          Have any problem ?<h5 className='here_click'>Click here</h5> 
        </Link>
      </div>
     
      <div className="footer-container">
        {/* Grid Section 1: Logo and Contact Info */}
        <div className="footer-section">
          <Link to="/">
            <img src="/img/annapurna_logo.png" alt="Annapurna Logo" className="footer-logo-image" />
          </Link>
          <p className="footer-company-info">Freshness You Can Trust Straight from Our Fields</p>
          <p><FaPhoneAlt /> +123 456 7890</p>
          <p className="footer-mail"><FaEnvelope /> Info@annapurnafarms.com</p>
        </div>
 
        {/* Grid Section 2: Support Links */}
        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/">Size Guide</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
          </ul>
        </div>
 
        {/* Grid Section 3: Menu Links */}
        <div className="footer-links">
          <h4>Menu</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Membership</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
 
        {/* Grid Section 4: Company Links */}
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><Link to="/signin">Login</Link></li>
            <li><Link to="/signup">Register</Link></li>
            <li><Link to="/">Affiliate</Link></li>
            <li><Link to="/">Discounts</Link></li>
          </ul>
        </div>
 
        {/* Grid Section 5: Social Media Links */}
        <div className="footer-links">
          <h4>Follow Us</h4>
          <div className="footer-social-icons">
            <a href="https://www.instagram.com/annapoorna_natural_farms/" target='blank'><FaInstagram /></a>
            <a href="https://www.facebook.com/profile.php?id=61566328387182" target='blank'><FaFacebook /></a>
            <a href="https://www.youtube.com/@Annapurna_Farms" target='blank'><FaYoutube /></a>
            <a href="/"><FaTwitter /></a>
            <a href="/"><FaLinkedin /></a>
          </div>
        </div>
      </div>
 
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2024 <span  className="footer-all-rights">Annapurna Farms.</span> All rights reserved.</p>
      </div>
    </footer>
  );
};
 
export default Footer;