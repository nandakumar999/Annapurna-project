import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import { toast } from 'react-toastify';

import './index.css';

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    document.title = "Cart - Annapurna Farms";
 }, []);

  useEffect(() => {
    // Fetch cart data based on user login status
    const fetchCartData = async () => {
      setLoading(true);
      try {
        if (user && user.userId) {
          // User is logged in, fetch cart from API
          const response = await fetch(`http://localhost:8080/cart/${user.userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch cart data');
          }
          const data = await response.json();
          const mappedCart = data.map(item => ({
            productId: item.cartId,
            productName: item.productName,
            price: item.productPrice,
            selectedWeight: item.productGram,
            productImg: item.productImg,
            quantity: item.productQuantity,
          }));
          setCart(mappedCart);
          localStorage.setItem('cart', JSON.stringify(mappedCart)); 

        } else {
          // No user is logged in, get cart from localStorage
          const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
          setCart(storedCart);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();

  }, [user, setCart]);



  const formatPriceToINR = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const handleRemoveFromCart = async (productId, selectedWeight) => {
    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.selectedWeight === selectedWeight)
    );
    if (user && user.userId) {
      try {
        const response = await fetch(`http://localhost:8080/cart/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text(); // Extract error message from server
          throw new Error(`Server Error: ${errorMessage}`);
        }
      } catch (error) {
        console.error('Failed to remove item from cart:', error.message);
        toast.error('There was an issue removing the item. Please try again.'); // User notification
        return; // Exit early to avoid updating the cart locally
      }
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = async (productId, selectedWeight, change) => {
    const updatedCart = cart.map((item) => {
      // console.log("1change:",change);
      if (item.productId === productId && item.selectedWeight === selectedWeight) {
       
        if(!((change=== 1 && item.quantity  ===100)||(change=== -1 && item.quantity  ===1))) {
          const newQuantity = item.quantity + change;
        

        if (newQuantity >= 100) {
          toast.error('Quantity cannot exceed 100');
          return { ...item, quantity: newQuantity };
        }
        return { ...item, quantity: Math.max(newQuantity, 1) };
      }
    }
    return item;
  });
    // console.log("2change:",change);

    // If user is not logged in, store in local storage
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

  
    // console.log("3change:",change);
  
    // If user is logged in, update quantity on the server
    if (user && user.userId) {
      const cartItem = updatedCart.find(
        (item) => item.productId === productId && item.selectedWeight === selectedWeight
      );
  
      try {
        const formData = new FormData(); 
        formData.append('quantity', cartItem.quantity);
        // console.log("4change:",change);

        const response = await fetch(
          `http://localhost:8080/cart/${productId}/${change}`,
          {
            method: 'PUT',
            body: formData,
          }
        );
       
        if (!response.ok) {
          // console.log("5change:",response);
          const errorMessage = await response.text();
          throw new Error(`Error updating quantity: ${errorMessage}`);
        }
      } catch (error) {
        console.error('Failed to update quantity on the server:', error.message);
        toast.error('There was an issue updating the quantity. Please try again.');
      }
    } 
  };
  

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleClearCart = async () => {
    if (user && user.userId) {
      // If the user is logged in, clear cart from the database using DELETE API
      try {
        const response = await fetch(`http://localhost:8080/cart/user/${user.userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Error clearing cart: ${errorMessage}`);
        }
  
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([])); // Also clear from localStorage
      } catch (error) {
        console.error('Failed to clear cart from the server:', error.message);
        toast.error('There was an issue clearing the cart. Please try again.'); // Show an error message
      }
    } else {
      // If the user is not logged in, just clear the cart from localStorage
      setCart([]);
      localStorage.setItem('cart', JSON.stringify([])); // Clear from localStorage
    }
  };
  

  // const handleProceedToCheckout = () => {
  //   if (user) {
  //     navigate('/checkout');
  //   } else {
  //     navigate('/signin', { state: { from: '/checkout' } });
  //   }
  // };

  const handleProceedToCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      // Prompt user to choose between Sign In or Sign Up
      const userChoice = window.confirm(
        "Are you an existing user? Click OK to Sign In or Cancel to Sign Up."
      );
      if (userChoice) {
        navigate('/signin', { state: { from: '/checkout' } }); // Redirect to Sign In
      } else {
        navigate('/signup', { state: { from: '/checkout' } }); // Redirect to Sign Up
      }
    }
  };

  return (
    <div className="cart-container">
      {loading ? (
        <p>Loading cart...</p>
      ) : cart.length === 0 ? (
        <p className="empty-cart-message">
          Your cart is empty. <Link to="/">Go back to shop</Link>
        </p>
      ) : (
        <div className="cart-content">
          <div className="cart-left">
            <div className="cart-info">
              <h3 className="cart-item-count">Cart : {cart.length}</h3>
              <button className="back-to-products-btn">
                <Link to="/" className="go-back-products">Go Back to Products</Link>
              </button>
            </div>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={`${item.productId}-${item.selectedWeight}`} className="cart-item">
                  <img
                    src={`data:image/jpeg;base64,${item.productImg}`} // Convert base64 image string to usable image
                    alt={item.productName}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">
                      {item.productName}
                      <span className="cart-item-variant">({item.selectedWeight}g)</span>
                    </h4>
                    <div className="cart-item-actions">
                      <div className="cart-item-quantity">
                        <button
                          className="quantity-btn decrease-btn"
                          onClick={() => handleQuantityChange(item.productId, item.selectedWeight, -1)}
                        >
                          -
                        </button>
                        <span className="cart-item-price-quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn increase-btn"
                          onClick={() => handleQuantityChange(item.productId, item.selectedWeight, 1)}
                        >
                          +
                        </button>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveFromCart(item.productId, item.selectedWeight)}
                        >
                          Remove
                        </button>
                      </div>
                      <span className="cart-item-price">
                        {formatPriceToINR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-right">
            <div className="price-details">
              <h3 className="price-details-header">Price Details</h3>
              <div className="price-items">
                {cart.map((item) => (
                  <div key={`${item.productId}-${item.selectedWeight}`} className="price-item">
                    <span className="price-detailed-product-name-grams">
                      {item.productName} - {item.selectedWeight}g ({item.quantity})
                    </span>
                    <span className="price-item-span">{formatPriceToINR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="price-row">
                <span>Delivery Charges:</span>
                <span className="price-row-span">₹50.00</span>
              </div>
              <div className="price-total">
                <span>Total Amount:</span>
                <span className="price-total-span">{formatPriceToINR(calculateTotalPrice() + 50)}</span>
              </div>
              <button className="proceed-btn" onClick={handleProceedToCheckout}>
                Proceed to Checkout
              </button>
              <button className="clear-cart-btn" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
