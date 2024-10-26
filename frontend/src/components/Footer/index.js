import React from 'react';
import './/index.css'; // Custom CSS for styling the footer
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Social media icons
const annapurna_logo = "/img/annapurna_logo.png"

;
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/img/annapurna_logo.png" alt="annapurna Logo" className="footer-logo-image" /> {/* Replace with your logo path */}
          <div className="footer-social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>

        <div className="footer-links">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Ultras</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-subscribe">
          <h4>Subscribe Us</h4>
          <input type="email" placeholder="Enter your email" className="subscribe-input" />
          <button className="subscribe-button">Subscribe</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 AnnapurnaFarms. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
