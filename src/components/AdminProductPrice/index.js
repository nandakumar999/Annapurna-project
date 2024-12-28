import React, { useState, useEffect } from "react";
import './index.css'

const AdminProductPrice = () => {
  const [prices, setPrices] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentPrice, setCurrentPrice] = useState({
    productGramsPriceId: "",
    productId: "",
    productGrams: "",
    productCost: "",
  });

  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    productId: null,
    productGramsPriceId: null,
  });

  // Fetch all prices when the component is mounted
  useEffect(() => {
    fetch("http://localhost:8080/price")
      .then((response) => response.json())
      .then((data) => setPrices(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);


  // Delete a product price by ID
  const handleDelete = (id) => {
    setDeleteConfirmation({
      isOpen: true,
      productGramsPriceId: id,
      productId: id, // Adjust this based on your actual data if needed
    });
  };

  // Confirm the delete action
  const confirmDelete = () => {
    fetch(`http://localhost:8080/price/${deleteConfirmation.productGramsPriceId}`, {
      method: "DELETE",
    })
      .then(() => {
        setPrices(prices.filter((price) => price.productGramsPriceId !== deleteConfirmation.productGramsPriceId));
        setDeleteConfirmation({ isOpen: false, productId: null, productGramsPriceId: null });
      })
      .catch((error) => console.error("Error deleting price: ", error));
  };

  // Cancel the delete action
  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, productId: null, productGramsPriceId: null });
  };

  // Handle form submission to add a new product price
  const handleAdd = () => {
    const { productId, productGrams, productCost } = currentPrice;
    if (!productId || !productGrams || !productCost) {
      alert("Please fill in all fields before adding the price.");
      return;
    }

    // Check for duplicate entries in the current list
    const isDuplicate = prices.some(
      (price) =>
        price.productId === productId &&
        price.productGrams === productGrams &&
        price.productCost === productCost
    );

    if (isDuplicate) {
      alert("This price entry already exists. Please enter a unique price.");
      setCurrentPrice({
        productGramsPriceId: "",
        productId: "",
        productGrams: "",
        productCost: "",
      });
      return;
    }

    fetch("http://localhost:8080/price", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentPrice),
    })
      .then((response) => response.json())
      .then((data) => {
        setPrices([...prices, data]);
        setCurrentPrice({
          productGramsPriceId: "",
          productId: "",
          productGrams: "",
          productCost: "",
        });
      })
      .catch((error) => console.error("Error adding price: ", error));
  };

  // Handle form submission to update a product price
  const handleUpdate = () => {
    fetch(`http://localhost:8080/price/${currentPrice.productGramsPriceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentPrice),
    })
      .then(() => {
        setPrices(
          prices.map((price) =>
            price.productGramsPriceId === currentPrice.productGramsPriceId
              ? currentPrice
              : price
          )
        );
        setEditMode(false);
        setCurrentPrice({
          productGramsPriceId: "",
          productId: "",
          productGrams: "",
          productCost: "",
        });
      })
      .catch((error) => console.error("Error updating price: ", error));
  };

  // Set up the form for editing a price
  const handleEdit = (price) => {
    setCurrentPrice(price);
    setEditMode(true);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setCurrentPrice((prevPrice) => ({ ...prevPrice, [field]: value }));
    }
  };

  // Render the form and the list of product prices
  return (
    <div className="AdminProductPrice_03_Form">
      <h2 className="AdminProductPrice_03_Title">Product Prices</h2>

      {editMode ? (
        <div>
          <h3 className="AdminProductPrice_03_hidden_title">Edit Product Price</h3>
          <div className="AdminProductPrice_03_FormContainer">
            <label>
              Product ID:
              <input
                type="number"
                placeholder="Product ID"
                className="AdminProductPrice_03_ProductIdInput"
                value={currentPrice.productId}
                onChange={(e) => handleInputChange(e, "productId")}
              />
            </label>
            <label className="AdminProductPrice_03_GramsDropdown">
              Grams:
              <select
                className="AdminProductPrice_03_GramsSelect"
                value={currentPrice.productGrams}
                onChange={(e) => handleInputChange(e, "productGrams")}
              >
                <option value="50">50g</option>
                <option value="100">100g</option>
                <option value="250">250g</option>
                <option value="500">500g</option>
                <option value="1000">1000g</option>
              </select>
            </label>
            <label>
              Cost:
              <input
                type="text"
                placeholder="Cost"
                className="AdminProductPrice_03_CostInput"
                value={currentPrice.productCost}
                onChange={(e) => handleInputChange(e, "productCost")}
              />
            </label>
            <button className="AdminProductPrice_03_UpdateButton" onClick={handleUpdate}>
              Update Price
            </button>
            <button className="AdminProductPrice_03_CancelButton" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="AdminProductPrice_03_FormContainer">
          <label>
            Product ID:
            <input
              type="number"
              placeholder="Product ID"
              className="AdminProductPrice_03_ProductInput"
              value={currentPrice.productId}
              onChange={(e) => handleInputChange(e, "productId")}
            />
          </label>
          <label className="AdminProductPrice_03_GramsDropdown">
            Grams:
            <select
              name="grams"
              value={currentPrice.productGrams}
              onChange={(e) => handleInputChange(e, "productGrams")}
              className="AdminProductPrice_03_GramsSelect"
              required
            >
              <option value="">Select grams</option>
              <option value="50">50g</option>
              <option value="100">100g</option>
              <option value="250">250g</option>
              <option value="500">500g</option>
              <option value="1000">1000g</option>
            </select>
          </label>
          <label>
            Cost:
            <input
              type="text"
              placeholder="Cost"
              className="AdminProductPrice_03_CostInput"
              value={currentPrice.productCost}
              onChange={(e) => handleInputChange(e, "productCost")}
            />
          </label>
          <button className="AdminProductPrice_03_AddButton" onClick={handleAdd}>
            Add Price
          </button>
        </div>
      )}

      <table className="AdminProductPrice_03_PriceTable">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Grams</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr key={price.productGramsPriceId}>
              <td>{price.productId}</td>
              <td>{price.productGrams}</td>
              <td>{price.productCost}</td>
              <td>
                <button className="AdminProductPrice_03_EditButton" onClick={() => handleEdit(price)}>
                  Edit
                </button>
                <button
                  className="AdminProductPrice_03_DeleteButton"
                  onClick={() => handleDelete(price.productGramsPriceId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Popup */}
      {deleteConfirmation.isOpen && (
        <div className="AdminProductPrice_03_DeletePopupOverlay">
          <div className="AdminProductPrice_03_DeletePopupContent">
            <h3>Are you sure you want to delete this product?</h3>
            <div className="AdminProductPrice_03_DeletePopupButtons">
              <button onClick={confirmDelete} className="admin-price_popup_delete">Yes, Delete</button>
              <button onClick={cancelDelete} className="admin-price_popup_cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductPrice;