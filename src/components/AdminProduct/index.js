import React, { useState, useEffect } from 'react';
import './index.css';

const AdminProducts = () => {
  const [productData, setProductData] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: '',
    productStock: '',
    productImg: '',
    category_id: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, productName: null });
  const [admin, setAdmin] = useState('');

  useEffect(() => {
    const fetchAdmin = async () => {
      const adminPhNo = localStorage.getItem('adminPhNo');
      if (!adminPhNo) return;
      try {
        const response = await fetch(`http://localhost:8080/admin/${adminPhNo}`);
        if (!response.ok) throw new Error('Failed to fetch admin name');    

        const data = await response.json();
        setAdmin(data.adminName || 'N/A');  // Ensure adminName is set
      } catch (err) {
        console.error('Error fetching admin name:', err);
      }
    };

    fetchAdmin();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/product');
        if (!response.ok) throw new Error('Failed to fetch products');

        const data = await response.json();
        
        // Add `adminName` to each product
        const updatedData = data.map(product => ({ ...product, adminName: admin || 'N/A' }));
        
        setProductData(updatedData);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (admin) fetchProducts(); // Fetch products only if admin is available
  }, [admin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    if (Object.values(newProduct).some((value) => !value)) return;

    const adminPhNo = localStorage.getItem('adminPhNo'); // Retrieve admin's phone number
    const productToAdd = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      productStock: parseInt(newProduct.productStock, 10),
      category_id: parseInt(newProduct.category_id, 10),
      adminPhNo, // Add admin's phone number to product
    };

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/product/prod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToAdd),
      });

      if (!response.ok) throw new Error('Failed to add product');

      const data = await response.json();
      setProductData((prevData) => [...prevData, data]);
      resetForm();
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewProduct({
      productName: '',
      price: '',
      productStock: '',
      productImg: '',
      category_id: ''
    });
    setEditIndex(null);
  };

  const handleEditProduct = (index) => {
    const productToEdit = productData[index];
    setNewProduct({
      productName: productToEdit.productName,
      price: productToEdit.price,
      productStock: productToEdit.productStock,
      productImg: productToEdit.productImg || '',
      category_id: productToEdit.category_id,
    });
    setEditIndex(index);
  };

  const handleUpdateProduct = async () => {
    if (editIndex === null) return;

    const updatedData = {
      productName: newProduct.productName,
      price: parseFloat(newProduct.price),
      productStock: parseInt(newProduct.productStock, 10),
      productImg: newProduct.productImg,
      category_id: parseInt(newProduct.category_id, 10)
    };

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/product/${productData[editIndex].productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) throw new Error('Failed to update product');

      const data = await response.json();
      const newProductsData = [...productData];
      newProductsData[editIndex] = data;
      setProductData(newProductsData);
      resetForm();
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setEditIndex(null);
    }
  };

  const handleDeleteProduct = (productName) => {
    setDeleteConfirmation({ isOpen: true, productName });
  };

  const confirmDelete = async () => {
    const { productName } = deleteConfirmation;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/product/${productName}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete product');

      setProductData((prevData) => prevData.filter(product => product.productName !== productName));
      setDeleteConfirmation({ isOpen: false, productName: null });
    } catch (error) {
      console.error('Error deleting product:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-page">
      <h1>Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="add-product-fields">
        <label>
          Product Name:
          <input
            type="text"
            name="productName"
            placeholder="Enter product name"
            value={newProduct.productName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            name="productStock"
            placeholder="Enter stock quantity"
            value={newProduct.productStock}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="productImg"
            placeholder="Enter image URL"
            value={newProduct.productImg}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Category ID:
          <input
            type="text"
            name="category_id"
            placeholder="Enter category ID"
            value={newProduct.category_id}
            onChange={handleInputChange}
          />
        </label>
        <button className="product-button" onClick={editIndex === null ? handleAddProduct : handleUpdateProduct}>
          {editIndex === null ? 'Add Product' : 'Update Product'}
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Category ID</th>
            <th>Admin Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product, index) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.price}</td>
              <td>{product.productStock}</td>
              <td>
                {product.productImg ? (
                  <img src={`http://localhost:8080/images/${product.productImg}`} alt="Product" className="img-preview" />
                ) : 'No Image'}
              </td>
              <td>{product.category_id}</td>
              <td>{product.adminName || 'N/A'}</td>
              <td>
                <button className="edit-button" onClick={() => handleEditProduct(index)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteProduct(product.productName)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteConfirmation.isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Are you sure you want to delete this product?</h3>
            <div className="popup-buttons">
              <button onClick={confirmDelete}>Yes, Delete</button>
              <button onClick={() => setDeleteConfirmation({ isOpen: false, productName: null })}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
