import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <h1 className="order-success-message">Thank You!</h1>
        <p className="order-info">Your Order Has Been Placed Successfully</p>
        <p className="order-info-1">We will send you a confirmation shortly.</p>
        <button className="order-success-back-button" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;