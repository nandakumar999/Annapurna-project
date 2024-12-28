import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; 
import { toast } from 'react-toastify';

import './index.css';

const ProductDetail = ({ cart, setCart }) => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); 
  const { name } = useParams();
  const [selectedWeight, setSelectedWeight] = useState(100); 
  const [price, setPrice] = useState(null); 
  const [weightError, setWeightError] = useState(null); 
  const [activeTab, setActiveTab] = useState('Description'); 


  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      // console.log(`Fetching product details from: http://82.112.226.9/product/${name}`);
      try {
        const response = await fetch(`http://localhost:8080/product/${name}`);
        // console.log("Product response status:", response.status);
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

  
  useEffect(() => {
    if (product) {
      document.title = `${product.productName} - Annapurna Farms`;
    }
  }, [product]);
  
  // Fetch price whenever the selected weight changes
  useEffect(() => {
    const fetchPrice = async () => {
      if (product && selectedWeight) {
        // console.log("Fetching price for:", product.productId, "Weight:", selectedWeight);
        try {
          const response = await fetch(`http://localhost:8080/price/${product.productId}/${selectedWeight}`);
          // console.log("Price response status:", response.status);
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();

          if (data.productCost) {
            setPrice(data.productCost); // Set price based on the response
            setWeightError(null);
          }else {
            setPrice(null);
            setWeightError(`Currently ${selectedWeight}g is not available for this product.`); // Set weight-specific error message
          }
        } catch (error) {
          setPrice(null); // Reset price to null
          setWeightError(`Currently ${selectedWeight}g is not available for this product.`); // Set weight-specific error message
        }
      }
    };

    fetchPrice();
  }, [product, selectedWeight]);

  if (error) {
    return (
      <div className="err">
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
  const handleAddToCart = async () => {
    if (!price) {
      setMessage("Please select a valid weight.");
      return;
    }
  
    const productWithVariant = { ...product, selectedWeight, price };
  
    // Check if the user is logged in
    if (user && user.userId) {
      // If user is logged in, send the cart data to the API
      const cartItem = {
        userId: user.userId,
        productName: product.productName,
        productPrice: price,
        productGram: selectedWeight,
        productImg: product.productImg, // Assuming the product image is available
        productQuantity: 1,
      };
  
      try {
        const response = await fetch(`http://localhost:8080/cart/${user.userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }
  
        const data = await response.json();

  

        toast.success(`${product.productName} (${selectedWeight}g) added to cart!`);
        // setMessage("Item added to the cart successfully!");
  
        // Update cart state from API response
        setCart((prevCart) => [...prevCart, data]);
        // setCart((prevCart) => {
        //   const updatedCart = [...prevCart, data];
        //   console.log("updatedCart:",updatedCart);  // Logs the updated cart
        //   return updatedCart;
        // });

    
      } catch (error) {
        console.error('Error adding item to cart:', error);
        toast.error('Error adding item to cart');
      }
    } else {
      // If user is not logged in, update localStorage as fallback
      const existingProduct = cart.find(
        (item) =>
          item.productId === productWithVariant.productId &&
          item.selectedWeight === productWithVariant.selectedWeight
      );
  
      let updatedCart;
      if (existingProduct) {
        updatedCart = cart.map((item) =>
          item.productId === productWithVariant.productId &&
          item.selectedWeight === productWithVariant.selectedWeight
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...cart, { ...productWithVariant, quantity: 1 }];
      }
  
      setCart(updatedCart); 
      localStorage.setItem('cart', JSON.stringify(updatedCart)); 

      // Save the cart to localStorage
      // setMessage(`${product.productName} (${selectedWeight}g) has been added to your cart!`);
      toast.success(`${product.productName} (${selectedWeight}g) has been added to your cart!`);
      // Clear the message after 2 seconds
      setTimeout(() => setMessage(""), 2000);
    }
  };
  
  // const handleAddToCart = () => {

  //   if (!price) {
  //     setMessage("Please select a valid weight.");
  //     return;
  //   }

  //   const productWithVariant = { ...product, selectedWeight, price };

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

  //   setCart(updatedCart); // Update the cart state
  //   localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save the cart to localStorage
  //   // setMessage(`${product.productName} (${selectedWeight}g) has been added to your cart!`);
  //   toast.success(`${product.productName} (${selectedWeight}g) has been added to your cart!`);
  //   setTimeout(() => setMessage(""), 2000);
  // };



  return (
    <div className="product-detail-container">
      <div className="left-section">
        <img
          src={`data:image/jpeg;base64,${product.productImg}`} // Convert base64 image string to usable image
          alt={product.productName}
          className="product-detail-image"
        />
      </div>
      <div className="right-section">
        <h4 className="product-detailed-heading ">Annapoorna Farms</h4>
        <h1>{product.productName}</h1>
        <p className="product-price"> {weightError ? weightError : price !== null ? formatPriceToINR(price) : 'Loading...'}</p>
        
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
          <option value={1000}>1000g</option>
        </select>
        
        {/* Display add-to-cart message */}
        {message && <p className="cart-message">{message}</p>}
        
        <div className="product-buttons">
         <button 
            className="product-add-to-cart" 
            onClick={handleAddToCart}
            disabled={price === null || weightError !== null}
           >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="product-details-tabs-section">
        <div className="product-details-tabs">
          <ul className="tab-details">
            <li className="product-tab-item">
              <button
                className={`product-tab-link ${activeTab === 'Description' ? 'active-tab' : ''}`}
                onClick={() => setActiveTab('Description')}
              >
                Description
              </button>
            </li>
            <li className="product-tab-item">
              <button
                className={`product-tab-link ${activeTab === 'ingredients' ? 'active-tab' : ''}`}
                onClick={() => setActiveTab('ingredients')}
              >
                Ingredients
              </button>
            </li>
            <li className="product-tab-item">
              <button
                className={`product-tab-link ${activeTab === 'reviews' ? 'active-tab' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </li>
          </ul>
        </div>
        {/* Tab Content */}
        <div className="product-tab-content">
          {activeTab === 'Description' && <p className="product-details-description">{product.productDescription || "No description available."}</p>} 
          {activeTab === 'ingredients' && <p className="product-details-ingredients">{product.ingredients || "No ingredients listed."}</p>}
          {activeTab === 'reviews' && <p className="product-details-reviews">{product.reviews || "No reviews yet."}</p>}
        </div>
      </div>
   </div>
  );
};

export default ProductDetail;