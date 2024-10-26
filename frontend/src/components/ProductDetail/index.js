import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './index.css';
import axios from 'axios';

const ProductDetail = ({ cart, setCart }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); // State to show add-to-cart message
  const { name } = useParams();

  // Fetch product details from the API
  useEffect(() => {
    axios.get(`http://localhost:8080/product/${name}`)
      .then((response) => {
        setProduct(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setError("Product not found. Please check other items in our catalog.");
      });
  }, [name]);

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/">Back to Products</Link>
      </div>
    );
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  // Format price to INR
  const formatPriceToINR = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  // Handle adding product to cart
  const handleAddToCart = () => {
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
    
    // Clear the message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="product-detail-container">
      <div className="left-section">
        <img
          src={product.productImg || '/path/to/fallback-image.jpg'}
          alt={product.productName}
          className="product-detail-image"
        />
      </div>
      <div className="right-section">
        <h1>{product.productName}</h1>
        <p className="product-description">{product.productDescription}</p>
        <p className="product-price">{formatPriceToINR(product.price)}</p>
        
        {/* Display add-to-cart message */}
        {message && <p className="cart-message">{message}</p>}
        
        <div className="product-buttons">
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy-now">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
