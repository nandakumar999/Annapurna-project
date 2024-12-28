import React, { useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { AuthContext } from "../../context/AuthContext";

function UserTracker() {
  const { user } = useContext(AuthContext);
  const [trackerNumber, setTrackerNumber] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Hook for navigation


  useEffect(() => {
      document.title = "User tracker - Annapurna Farms";
  }, []);

  useEffect(() => {
      if (!user) {
          navigate('/signup');
      }
  }, [user, navigate]);
  

  const mockProducts = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      name: "Tomato Pickle",
      price: "₹250",
      status: "On the way",
      statusColor: "yellow", 
      weight: "200gm", 
      quantity: 3,
      remark: 'On The Way Processing',
      trackerNumber: "123456",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      name: "Lemon Pickle",
      price: "₹80",
      status: "Shipped",
      statusColor: "green",
      weight: "500gm",
      quantity: 5,
      remark: "Your Delivery Is Shipped",
      trackerNumber: "654321",
    },
  ];

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setTrackerNumber(searchTerm);

    if (searchTerm === "") {
      setProducts([]); 
    } else {
      const filteredProducts = mockProducts.filter(
        (product) => product.trackerNumber.includes(searchTerm)
      );
      setProducts(filteredProducts); 
    }
  };

  // Function to handle card click and navigate to the product detail page
  const handleCardClick = (productId) => {
    navigate(`/track-orders/${productId}`); // Navigate to the dynamic route
  };

  
  return (
    <div className="tracker_user">
      <div className="search-bar_90">
        <input
          type="text"
          value={trackerNumber}
          onChange={handleSearch}
          placeholder="Enter tracker number..."
          className="search-input_90"
          aria-label="Tracker number input"
        />
        <button 
        className="search-button_90" 
        aria-label="Search"
        onClick={() => handleSearch({ target: { value: trackerNumber } })}
        >
          🔍
        </button>
      </div>

      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => handleCardClick(product.id)} // Navigate on card click
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-weight">
                    <span className="usertracker_span">Weight: </span>{product.weight} 
                    <span className="usertracker_span">Quantity: </span>{product.quantity}
                  </p>
                </div>
                <p className="user-product-price">{product.price}</p>
                <p className="product-status" style={{ color: product.statusColor }}>
                  <p className="product-remark">{product.remark}</p>
                  {product.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="usertracker_paragraph">
          {trackerNumber
            ? "No products found with that tracker number."
            : "Please enter a tracker number to search for your order."}
        </p>
      )}
    </div>
  );
}

export default UserTracker;