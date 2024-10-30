import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import Header from '../Header';

const Product = () => {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/product")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setError("Failed to load products. Please try again later.");
      });

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]);

  const formatPriceToINR = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <>
      <Header cartCount={cart.length} />
      <div className="product-list-section">
        <h2 className="product-list-title">Our Products</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="product-list-cards1">
          {product.map((product) => (
            <div className="product-list-card1" key={product.productId}>
              <Link to={`/product/${product.productName}`}>
                <img className="product-list-image" src={product.productImg} alt={product.productName} />
                <h3>{product.productName}</h3>
                <p className="product-price">{formatPriceToINR(product.price)}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
