import React, { useState, useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './index.css';

const Header = ({ cartCount, cart }) => {
  const [isMenuOpen, setMenuOpen] = useState(false); // Menu toggle state
  const [carouselPosition, setCarouselPosition] = useState(0); // Carousel position
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false); // Profile dropdown state
  const { user, admin, logoutUser, logoutAdmin } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Carousel items for "Products"
  const categoryImages = {
    "Powder": "/img/powders.jpg",
    "Masala": "/img/masala.jpg",
    "Veg Pickles": "/img/pickles.jpg",
    "Non Veg Pickles": "/img/natural_oil.jpg",
    "Dried Vegetables": "/img/vegetables.jpg",
    // "Honey": "/img/honey.jpg",
    // "Natural Oil": "/img/natural_oil.jpg"
  };

  // Toggle menu visibility
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  useEffect(() => {
    // Fetch categories from API
    fetch("http://localhost:8080/category")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const slideCarousel = (direction) => {
    setCarouselPosition((prev) => {
      const visibleItems = 3; // Number of visible items in the carousel
      const totalItems = categories.length; // Total number of categories
      let newPosition = prev + direction;
  
      // When we reach the last image, move the carousel to the first one
      if (newPosition < -(totalItems  - visibleItems)) {
        newPosition = 0;
      }

      
      // When we go past the first image, reset to the last image
      if (newPosition > 0) {
        newPosition = -(totalItems - visibleItems);
      }
      
      return newPosition;
    });
  };

  // Toggle profile dropdown visibility
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
  };

  // Handle user logout
  const handleUserLogout = () => {
    logoutUser();
    localStorage.removeItem('cart');

  
    navigate('/'); 
  };

  // Handle admin logout
  const handleAdminLogout = () => {
    logoutAdmin();

    navigate('/admin-login', { replace: true }); 
  };

  const handleCategoryClick = (categoryId) => {
    // console.log('Navigating to category:', categoryId); // Debugging navigation
    navigate(`/category/${categoryId}`);
  };

  return (
    <header className="header">
 
      <div className="logo">
        {admin ? (
            // Prevent navigation for admin by removing the Link wrapper
            <img src="/img/annapurna_logo.png" alt="Logo" />
          ) : (
          <Link to="/">
            <img src="/img/annapurna_logo.png" alt="Logo" />
          </Link>
          )}
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      {/* Main Navigation Menu */}
      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          {!admin && (
            <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>

            {/* Dropdown for Products */}
            <li className="dropdown">
             <Link>Products</Link>
              <div className="dropdown-content">
                {/* Carousel: Fixed first 3 images, remaining images are sliding */}
                <div className="carousel-wrapper">
                  <div className="carousel-containers_10" style={{ transform: `translateX(${carouselPosition * 100}%)` ,
                      transition: 'transform 0.5s ease-in-out'
                    }}>
                      {categories.map((category, index) => (
                          <div 
                              className="carousel-item" 
                              key={category.categoryId  + index}
                              onClick={() => handleCategoryClick(category.categoryId)} 
                            >
                            <img src={categoryImages[category.categoryName] || "/img/default.jpg"} alt={category.categoryName} />
                            <p>{category.categoryName}</p>
                          </div>
                    ))}
                  </div>
                </div>
              {/* Carousel Navigation */}
              <button className="carousel-prev" onClick={() => slideCarousel(1)}>❮</button>
              <button className="carousel-next" onClick={() => slideCarousel(-1)}>❯</button>
            </div>
          </li>

          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/faqs">FAQs</Link></li>

          </>
          )}

          {/* Profile Dropdown */}
          {user && !admin && (
            <li className="profile-icon" onClick={toggleProfileDropdown}>
              <img src="/img/profile_img.jpeg" alt="Profile" /> {/* Profile Icon */}
              {isProfileDropdownOpen && (
                <div className="dropdown-content profile-dropdown">
                  <div className="profile-dropdown-item" ><Link to="/user-profile">View Profile</Link></div>
                  <div className="profile-dropdown-item"><Link to="/user-orders">My Orders</Link></div>
                  <div className="profile-dropdown-item"><Link to="/user-tracker">User Track</Link></div>
                  <div className="profile-dropdown-item"><button className= "signout-button" onClick={handleUserLogout}>Logout Account</button></div>
                </div>
              )}
            </li>
          )}

          {/* Cart and Login Section */}
          {!admin ? (
            <>
              {user ? (
                <>
                  {/* <li><button onClick={handleUserLogout} className="user-logout-button">Logout Account</button></li> */}
                  <li>
                    <Link to="/cart" className="cart-icon">
                      <span className="cart-symbol">🛒</span>
                      {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signin">
                      <button className="button-login">LogIn Account</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" className="cart-icon">
                      <span className="cart-symbol">🛒</span>
                      {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>
                  </li>
                </>
              )}
            </>
          ) : (
            <li><button onClick={handleAdminLogout} className="admin-btn-logout">Admin Logout</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
