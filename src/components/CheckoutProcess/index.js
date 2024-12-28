import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../context/AuthContext';
import "./index.css";

const CheckoutProcess = () => {
  // const [useShippingAddress, setUseShippingAddress] = useState(true);
    const { user } = useContext(AuthContext);
  // Form field states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phone, setPhone] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(50);
  const [totalAmount, setTotalAmount] = useState(0);
  
  const [shippingMethod, setShippingMethod] = useState("standard");
  // const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Fetch cart data based on user login status
    const fetchCartData = async () => {
      // setLoading(true);
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
            // productImg: item.productImg,
            quantity: item.productQuantity,
          }));
          setCartItems(mappedCart);
          // localStorage.setItem('cart', JSON.stringify(mappedCart)); 

        } //else {
        //   const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        //   setCartItems(storedCart);
        // }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } //finally {
      //   setLoading(false);
      // }
    };

    fetchCartData();

  }, [user, setCartItems]);

    useEffect(() => {
      // Calculate total amount
      const calculatedSubtotal  = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setSubtotal(calculatedSubtotal );

      // if (calculatedSubtotal > 500) {
      //   setShipping(0);  // Free shipping for orders above ₹500
      // } else {
        setShipping(50); // Flat ₹50 shipping fee for orders below ₹500
      // }

      const total = calculatedSubtotal + shipping;
      setTotalAmount(total);

    }, [cartItems, shipping]);

  // Check if all required fields are filled
  const isFormComplete = () => {
    return (
      firstName && 
      lastName && 
      address && 
      city && 
      state && 
      pinCode && 
      phone
    );
  };

  // const handleAddressToggle = () => {
  //   setUseShippingAddress(!useShippingAddress);
  // };



  // Enable/Disable "Pay Now" button
  const isPayNowDisabled = !isFormComplete();

  

  return (
    <div className="payment_gateway-container">
      <div className="payment_gateway-left">
        <form>
          {/* Delivery Section */}
          <div className="payment_gateway-section">
            <h2>Delivery</h2>
            <label className="payment_gateway_cr">Country/Region</label>
            <div className="payment_gateway-row">
              <select>
                <option value="India">India</option>
                {/* <option value="USA">USA</option>
                <option value="UK">UK</option> */}
              </select>
            </div>

            <div className="payment_gateway-row">
              <input 
                type="text" 
                placeholder="First name" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Last name" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
              />
            </div>

            <div className="payment_gateway-row">
              <input 
                type="text" 
                placeholder="Address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Apartment, suite, etc. (optional)" 
                value={apartment} 
                onChange={(e) => setApartment(e.target.value)} 
              />
            </div>

            <div className="payment_gateway-row">
              <input 
                type="text" 
                placeholder="City" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
              />
              <select 
                value={state} 
                onChange={(e) => setState(e.target.value)}
              >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
              </select>
              <input 
                type="text" 
                placeholder="PIN code" 
                value={pinCode} 
                onChange={(e) => setPinCode(e.target.value)} 
              />
            </div>

            <div className="payment_gateway-row">
              <input 
                type="text" 
                placeholder="Phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>

            <div className="payment_gateway-checkbox_0">
              <label >
                <input type="checkbox" /> Save this information for next time
              </label>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="payment_gateway-section">
            <h2>Shipping method</h2>
            <div className="payment_gateway-shipping-method">
              <label>
                <input 
                  type="radio" 
                  name="shipping" 
                  checked={shippingMethod === "standard"} 
                  onChange={() => setShippingMethod("standard")}
                /> 
                Standard Shipping
              </label>
              <span>₹50</span>
            </div>
          </div>

          {/* Payment Section */}
          <div className="payment_gateway-section">
            <h2>Payment</h2>
            <p className="payment_gateway_paragraph">All transactions are secure and encrypted.</p>

            <div className="payment_gateway-payment-method">
              <div className="payment_gateway-payment-image">
                <img src="/img/upi_image.png" alt="payment-upi" />
              </div>
            </div>
          </div>

          {/* Billing Address */}
          {/* <div className="payment_gateway-section">
            <h2>Billing address</h2>
            <label>
              <input
                type="radio"
                name="billing"
                checked={useShippingAddress}
                onChange={handleAddressToggle}
              />
              Same as shipping address
            </label>
            <label>
              <input
                type="radio"
                name="billing"
                checked={!useShippingAddress}
                onChange={handleAddressToggle}
              />
              Use a different billing address
            </label>
          </div> */}

          {/* Pay Now Button */}
          <button 
            type="submit" 
            className="payment_gateway_pay_button" 
            disabled={isPayNowDisabled} // Disable if form is incomplete
          >
            Pay now
          </button>
        </form>
      </div>

      <div className="payment_gateway-right">
      <div className="order_summary">
        <h2 className="order_heading">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={`${item.productId}-${item.selectedWeight}`} className="order_item">
              <p className="order_content">{item.productName} - {item.selectedWeight}g ({item.quantity})</p>
              <p className="order_item_p">₹{isNaN(Number(item.price)) ? '0.00' : Number(item.price).toFixed(2)}</p>
            </div>
          ))}
        < div className="order_total">
            <p>Subtotal</p>
            <p className="order_total_p">₹{subtotal.toFixed(2)}</p>
          </div>
          <div className="order_shipping">
            <p>Delivery Charges:</p>
            <p className="order_shipping_p">₹{shipping.toFixed(2)}</p>
          </div>
         <div className="order_grand_total">
            <p>Total Amount:</p>
            <p className="order_grand_total_p">₹{totalAmount.toFixed(2)}</p>
          </div>
      </div>
    </div>
  </div>
  );
};

export default CheckoutProcess;