import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import Header from '../Header'; 
 
const Product = () => {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState(""); // State to show add-to-cart message
  const [error, setError] = useState(null);  // State to show error message
 
  // Fetch products from API
  useEffect(() => {
    axios.get("http://localhost:8080/product")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setError("Failed to load products. Please try again later.");
      });
 
    // Load the cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart)); // Initialize cart from localStorage data
    }
  }, [setCart]);
 
  // Format price to INR
  const formatPriceToINR = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };
 
  // Handle adding product to cart
  const handleAddToCart = (product) => {
    const productExists = cart.find(item => item.productId === product.productId);
 
    let updatedCart;
    if (productExists) {
      updatedCart = cart.map(item =>
        item.productId === product.productId
          ? { ...productExists, quantity: productExists.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
 
    setCart(updatedCart); // Update the cart state
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save the cart to localStorage
    setMessage(`${product.productName} has been added to your cart!`);
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };
 
  return (
    <>
      <Header cartCount={cart.length} /> 
      <div className="product-list-section">
        <h2 className="product-list-title">Our Products</h2>
 
        {error && <p className="error-message">{error}</p>} {/* Display error message if API fails */}
        {message && <p className="cart-message">{message}</p>} {/* Display add-to-cart message */}
 
        <div className="product-list-cards1">
          {product.map((product) => (
            <div className="product-list-card1" key={product.productId}>
              <Link to={`/product/${product.productName}`}>
                <img className="product-list-image" src={product.productImg} alt={product.productName} />
                <h3>{product.productName}</h3>
                <p className="product-price">{formatPriceToINR(product.price)}</p>
              </Link>
              <button onClick={() => handleAddToCart(product)}>Add to cart</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
 
export default Product;
 