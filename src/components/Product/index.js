import React, { useState, useEffect } from 'react';
import {Link, useNavigate } from 'react-router-dom';


import './index.css';

const Product = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    document.title = "Annapurna Farms";
 }, []);

  // Fetch categories on component mount
  useEffect(() => {
    fetch("http://localhost:8080/category")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setActiveTab(data[0]?.categoryId); // Set the first category as the default active tab
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Fetch products based on the selected category
  useEffect(() => {
    if (activeTab !== null) {
      const fetchCategoryProducts = async () => {
        try {
          // console.log('Fetching products for category:', activeTab);
          const response = await fetch(`http://localhost:8080/product/category/${activeTab}`);
          if (response.ok) {
            const data = await response.json();
            setProducts(data.filter((product) => product.productName?.trim())); // Filter valid products
          } else {
            console.error('Error fetching products:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      fetchCategoryProducts();
    }
  }, [activeTab]);

  // Handle adding a product to the cart
  // const handleAddToCart = (product) => {
  //   const selectedWeight = product.productGrams;  
  //   const productWithVariant = { ...product, selectedWeight, price: product.productCost };

  //   const existingProduct = cart.find(
  //     (item) =>
  //       item.productId === productWithVariant.productId &&
  //       item.selectedWeight === productWithVariant.selectedWeight
  //   );

  //   let updatedCart;
  //   if (existingProduct) {
  //     updatedCart = cart.map((item) =>
  //       item.productId === productWithVariant.productId &&
  //       item.selectedWeight === productWithVariant.selectedWeight
  //         ? { ...item, quantity: item.quantity + 1 }
  //         : item
  //     );
  //   } else {
  //     updatedCart = [...cart, { ...productWithVariant, quantity: 1 }];
  //   }

  //   setCart(updatedCart);
  //   localStorage.setItem('cart', JSON.stringify(updatedCart));
  //   // setSuccessMessage(`${product.productName} (${selectedWeight}g) added to your cart!`);
  //   toast.success(`${product.productName} (${selectedWeight}g) added to your cart!`);
  //   setTimeout(() => setSuccessMessage(''), 2000);
  // };

  // Render Cards Function
  const renderCards = (limit = 4) => {
    const productsToShow = products.slice(0, limit); // Limit cards to the specified number
    return productsToShow.map((item, index) => (
      <div key={item.productId || index} className="card">
        <Link to={`/product/${item.productName}`} className="card-link">
          <div className="card-img">
            <img 
              src={`data:image/jpeg;base64,${item.productImg}`}
              alt={item.productName}
            />
          </div>
          <div className="card-info">
            <h3>{item.productName} <span className="card-product-grams">({item.productGrams} g)</span></h3>
            <p className="card-info-description">
            {item.productDescription}
            </p>
            <p className="price">₹{item.productCost}</p>
          </div>
          <button className="add-to-cart">+</button>
        </Link>
        {/* <button className="add-to-cart" onClick={() => handleAddToCart(item)}>+</button> */}
      </div>
    ));
  };

  const handleViewMore = () => {
    navigate(`/category/${activeTab}`);
  };

  return (
    <div className="tabset-container">
      <h2 className="tabset-title">Product Categories</h2>
      {/* {successMessage && <div className="success-message">{successMessage}</div>} */}
      <div className="tabset">
        {/* Render category tabs */}
        {categories.map((category) => (
          <React.Fragment key={category.categoryId}>
            <input
              type="radio"
              name="tabset"
              id={category.categoryId}
              checked={activeTab === category.categoryId}
              onChange={() => setActiveTab(category.categoryId)}
            />
            <label htmlFor={category.categoryId}>{category.categoryName}</label>
          </React.Fragment>
        ))}

        {/* Render product cards */}
        <div className="tab-panels">
          <section
            id={activeTab}
            className={`tab-panel active`}
          >
            {renderCards(4)} {/* Show only 4 cards */}
            <button className="view-more" onClick={handleViewMore}>
              View More
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Product;