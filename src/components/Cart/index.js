import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import {Link} from  'react-router-dom';
import './index.css';
 
const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get the user from context
 
  const formatPriceToINR = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };
 
  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
 
  const handleQuantityChange = (productId, change) => {
    const updatedCart = cart.map(item => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: Math.max(newQuantity, 1) };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
 
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
 
  const handleClearCart = () => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };
 
  const handleProceedToCheckout = () => {
    if (user) {
      // If the user is registered, navigate to the checkout process
      navigate('/checkout');
    } else {
      // If not registered, navigate to the registration form
      navigate('/signup');
    }
  };
 
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go back to shop</Link></p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.productId} className="cart-item">
              <img src={item.productImg} alt={item.productName} className="cart-item-image" />
              <div>
                <h3>{item.productName}</h3>
                <p>{formatPriceToINR(item.price)} x {item.quantity}</p>
                <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
                <button onClick={() => handleQuantityChange(item.productId, -1)}>-</button>
                <button onClick={() => handleQuantityChange(item.productId, 1)}>+</button>
              </div>
            </div>
          ))}
          <h3>Total: {formatPriceToINR(calculateTotalPrice())}</h3>
          <button onClick={handleClearCart}>Clear Cart</button>
          <button onClick={handleProceedToCheckout}>Proceed to Checkout</button> {/* Updated button */}
        </div>
      )}
    </div>
  );
};
 
export default Cart;