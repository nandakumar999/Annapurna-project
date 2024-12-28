import React, { useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './index.css';


import pickle from '../../Asset/pickle_A.jpeg';
import pickleA from '../../Asset/pickle_B.jpg';

const TrackOrder = () => {
  const [Order_Details_Data, Set_Order_Details_Data] = useState([]);
  const [Item_Order_Data, Set_Item_Order_Data] = useState([]);
  const [Status_Data, Set_Status_Data] = useState([]);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();


  useEffect(() => {
      document.title = "TrackOrder - Annapurna Farms";
  }, []);

  useEffect(() => {
    if (!user) {
        navigate('/signup');
    }
  }, [user, navigate]);

  useEffect(() => {
    const Track_Data = [{
      OrderDetails: {
        "orderId": "21512465",
        "orderDate": "20-NOV-2024",
        "productCost": 500,
        "shippingFee": "Free",
        "totalCost": 500,
        "Couriername": 'ShipRocket',
        "track_number": 'AWE656426164',
        "track_url": 'https://www.shiprocket.in/'
      },
    Status: [
      { id: 1, status: "Order Confirmed", date: "Wed, 23rd Nov", completed: true },
      { id: 2, status: "Shipped", date: "Wed, 25th Nov", completed: true },
      { id: 3, status: "Delivered", date: "Wed, 29th Nov", completed: false }
    ],
    ItemsOrdered: [
      {
        id: 1,
        name: "Tomato Curry",
        img: pickle,
        weight: "400gm",
        qty: 4,
        price: 350,
      },
      {
        id: 2,
        name: "Mango Pickle",
        img: pickleA,
        weight: "500gm",
        qty: 2,
        price: 500,
      },
    ]
  }];


    Set_Order_Details_Data(Track_Data[0].OrderDetails);
    Set_Item_Order_Data(Track_Data[0].ItemsOrdered);
    Set_Status_Data(Track_Data[0].Status);
  }, []);

  const completedIndex = Status_Data.findIndex((stage) => !stage.completed);
  const progressPercentage = completedIndex === -1 ? 100 : Status_Data[completedIndex].id === 1 ? 0 : Status_Data[completedIndex].id === 2 ? 2.4 : 51;

  return (
    <div className="track-container">

      {/* Order Details */}
      <div className="track-header">
        <h2 className="order-title">Order Details <span className = ""> #{Order_Details_Data.orderId}</span></h2>
        <p className="order-date">Order Date: {Order_Details_Data.orderDate}</p>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-names">
          {Status_Data.map((stage, index) => (
            <div key={index} className="status-name">
              <p className ="order-status">{stage.status}</p>
            </div>
          ))}
        </div>

        <div className="progress-bar">
          <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
        </div>

        <div className="status-bubbles">
          {Status_Data.map((stage, index) => (
            <div key={index} className="status-bubble">
              <div className={`bubble ${stage.completed ? 'completed' : ''}`}></div>
                <div className="status-date-container">
                  <p className="status-day">{stage.date.split(',')[0]}</p>
                  <p className="status-date">{stage.date.split(',')[1]}</p>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Courier Details */}
      <div className="courier-details">
        <div className="courier-tacking-details-row">
          <div className="courier-inside-details">
            <p className="courier-name">Courier Name:</p>
            <p className="courier-info">{Order_Details_Data.Couriername}</p>
          </div>
          <div className="track-inside-details">
            <p className="tacking-number">Tracking Number:</p>
            <p className="tacking-info">{Order_Details_Data.track_number}</p>
          </div>
        </div>
        <div className="shipment-tracking-details-row">
          <p className="shipment-tracking">Shipment Tracking URL:</p>
          <span className="shipment-info">
            <a href={Order_Details_Data.track_url}  className="tracking-link">{Order_Details_Data.track_url}</a>
          </span>
        </div>
      </div>

      {/* Item Ordered */}
      <h1 className="items-header">Item Ordered</h1>
      <div className="order-items">
        <section className="item-list">
          {Item_Order_Data.map((item, index) => (
            <div className="item" key={item.id || index}>
              <img src={item.img} alt={item.name} className="item-img" />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>Weight: <b>{item.weight}</b></p>
              </div>
              <div className="item-qty">
                <p>Qty: <b>{item.qty}x</b></p>
              </div>
              <div className="item-price">
                <p>₹{item.price}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="pricing-summary">
          <p><span>Product Cost:</span> ₹{Order_Details_Data.productCost}</p>
          <p><span>Shipping Fee:</span> <span className="green">{Order_Details_Data.shippingFee}</span></p>
          <h3 className="total-cost">Total Cost: ₹{Order_Details_Data.totalCost}</h3>
        </div>
      </div>

    </div>
  );
}



export default TrackOrder;