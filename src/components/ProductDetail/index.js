import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './index.css';

const ProductDetail = ({ cart, setCart }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); // State to show add-to-cart message
  const { name } = useParams();
  const [selectedWeight, setSelectedWeight] = useState(100); // Default weight set to 100 grams
  const [price, setPrice] = useState(null); // State to manage price based on selected weight

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/product/${name}`);
        if (!response.ok) {
          throw new Error("Product not found.");
        }
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Product not found. Please check other items in our catalog.");
      }
    };

    fetchProductDetails();
  }, [name]);

  // Fetch price whenever the selected weight changes
  useEffect(() => {
    const fetchPrice = async () => {
      if (product && selectedWeight) {
        try {
          const response = await fetch(`http://localhost:8080/price/${product.productId}/${selectedWeight}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setPrice(data); // Set price based on the response
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchPrice();
  }, [product, selectedWeight]);

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
    const productWithWeight = { ...product, selectedWeight, price };

    const productExists = cart.find(
      (item) =>
        item.productId === productWithWeight.productId &&
        item.selectedWeight === productWithWeight.selectedWeight
    );

    let updatedCart;
    if (productExists) {
      updatedCart = cart.map((item) =>
        item.productId === productWithWeight.productId &&
        item.selectedWeight === productWithWeight.selectedWeight
          ? { ...productExists, quantity: productExists.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...productWithWeight, quantity: 1 }];
    }

    setCart(updatedCart); // Update the cart state
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save the cart to localStorage
    setMessage(`${product.productName} (${selectedWeight}g) has been added to your cart!`);

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
        <p className="product-price">{formatPriceToINR(price)}</p>
        
        {/* Weight selection dropdown */}
        <select
          className="product-weight-dropdown"
          id="weight-select"
          value={selectedWeight}
          onChange={(e) => {
            const weight = Number(e.target.value);
            setSelectedWeight(weight);
          }}
        >
          <option value={50}>50g</option>
          <option value={100}>100g</option>
          <option value={250}>250g</option>
          <option value={500}>500g</option>
          <option value={1000}>1kg</option>
        </select>
        
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
