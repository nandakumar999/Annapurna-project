import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './index.css';

const CheckoutProcess = () => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]); // This would be loaded from your cart context or local storage
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Load cart items from local storage or context (as needed)
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        // Calculate total amount
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalAmount(total);
    }, [cartItems]);

    const handleOrderSubmit = async () => {
        setLoading(true);
       
        const orderData = {
            user: {
                userId: user.userId, // Adjust based on your user object structure
            },
            price: totalAmount,
            orderDate: new Date().toISOString(),
            status: 'Pending',
            quantity: cartItems.reduce((acc, item) => acc + item.quantity, 0), // Total quantity
            // Assuming you want to associate products, map cart items to product references
            product: cartItems.map(item => ({ productId: item.productId })) // Adjust based on your product structure
        };

        try {
            const response = await fetch('/api/orders/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
           
            if (response.ok) {
                const orderConfirmation = await response.json();
                // Handle successful order submission (e.g., show message or redirect)
                console.log('Order confirmed:', orderConfirmation);
                localStorage.removeItem('cart'); // Clear cart after successful order
                navigate('/order-confirmation'); // Redirect to order confirmation page
            } else {
                // Handle error response
                console.error('Order submission failed');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Checkout Process</h2>
            <h3 className="checkout-total">Total Amount: {totalAmount.toFixed(2)} INR</h3>
            <ul className="checkout-items-list">
                {cartItems.map(item => (
                    <li className="checkout-item" key={item.productId}>
                        <span className="checkout-item-name">{item.productName}</span>
                        <span className="checkout-item-quantity">x {item.quantity}</span>
                        <span className="checkout-item-price">{item.price.toFixed(2)} INR</span>
                    </li>
                ))}
            </ul>
            <button className="checkout-btn" onClick={handleOrderSubmit} disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
            </button>
        </div>
    );
};

export default CheckoutProcess;
