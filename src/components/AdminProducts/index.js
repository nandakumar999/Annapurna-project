import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import './index.css';
 
const AdminProducts = () => {
  const [productData, setProductData] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    // price: '',
    productStock: '',
    // productImg: '',
    categoryId: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, productName: null });
  const [admin, setAdmin] = useState('');
  const [productPopup, setProductPopup] = useState({ isOpen: false, productName: '', productId: '' });
  const [extraProductData, setExtraProductData] = useState({ grams: '', price: '' });
  const [additionalInputs, setAdditionalInputs] = useState([]); // To store additional grams and prices
  const fileInputRef = useRef(null);
 
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

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/product');
      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      // console.log("fetch:", data)
     
      // Add `adminName` to each product
      const updatedData = data.map(product => ({ ...product }));
     
      setProductData(updatedData);
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
  
    if (admin) fetchProducts(); 
  }, [admin]);
 
  // const handleInputChange = (e) => {
  //   const { name, value, type } = e.target;
  //   if (type === 'file') {
  //     setNewProduct({ ...newProduct, productImg: e.target.files[0] });
  //   } else {
  //     setNewProduct({ ...newProduct, [name]: value });
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // const handleInputChange = (e) => {
  //   const { name, value, type, files } = e.target;
  //   if (type === 'file' && files.length > 0) {
  //     setNewProduct({ ...newProduct, [name]: files[0] });  // Storing the file itself
  //   } else {
  //     setNewProduct({ ...newProduct, [name]: value }); // For text inputs
  //   }
  // };
 
  const handleAddProduct = async () => {
    if (Object.values(newProduct).some((value) => !value))
      return; // Ensure all fields are filled
      const adminPhNo = localStorage.getItem('adminPhNo'); // Retrieve admin's phone number  
    const formData = new FormData();
    formData.append("productName", newProduct.productName);
    formData.append("productStock", parseInt(newProduct.productStock, 10));
    formData.append("categoryId", parseInt(newProduct.categoryId, 10));
    formData.append("adminPhNo", adminPhNo);
    formData.append("adminName", admin);
  
    if (newProduct.productImg) formData.append("productImg", newProduct.productImg);
  
    setLoading(true);
    // console.log(formData,"TTTTTT")
    // return
    try {
      const response = await fetch('http://localhost:8080/product/prod', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) throw new Error('Failed to add product');
  
      const data = await response.json();
      console.log("Product added:", data);


      // Update the product data state to include the new product
      setProductData((prevData) => {
        const updatedData = [...prevData, data]; 
        return updatedData;
      });


      setProductPopup({ isOpen: true, productName: data.productName, productId: data.productId }); 
      // Show the popup with product details
      resetForm();
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
 
  // const resetForm = () => {
  //   setNewProduct({
  //     productName: '',
  //     price: '',
  //     productStock: '',
  //     productImg: '',
  //     categoryId: ''
  //   });
  //   setEditIndex(null);
  // };

  const resetForm = () => {
    setNewProduct({
      productName: '',
      productStock: '',
      categoryId: ''
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input field
    }
  };
 
 
 
  const handleEditProduct = (index) => {
    const productToEdit = productData[index];
    setNewProduct({
      productName: productToEdit.productName,
      // price: productToEdit.price,
      productStock: productToEdit.productStock,
      productImg: productToEdit.productImg || '',
      categoryId: productToEdit.categoryId,
      adminName: productToEdit.adminName, 
    });
    setEditIndex(index);
  };
 
  const handleUpdateProduct = async () => {
    if (editIndex === null) return;
  
    const updatedData = new FormData();
    updatedData.append('productName', newProduct.productName);
    updatedData.append('productStock', parseInt(newProduct.productStock, 10));
    updatedData.append('categoryId', parseInt(newProduct.categoryId, 10));
    updatedData.append('adminName', newProduct.adminName);
  
    // Ensure price and grams are sent (with default values if necessary)
    updatedData.append('price', newProduct.price || 0); // Set default value if null
    updatedData.append('productGrams', newProduct.productGrams || 0); // Set default value if null
  
    // Handle image properly based on whether it's base64 or a file
    if (newProduct.productImg && newProduct.productImg instanceof File) {
      updatedData.append('productImg', newProduct.productImg);
    } else if (newProduct.productImg && newProduct.productImg.startsWith('data:image')) {
      updatedData.append('productImg', newProduct.productImg); // Base64 encoded image
    }
  
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/product/${productData[editIndex].productId}`, {
        method: 'PUT',
        body: updatedData
      });
  
      if (!response.ok) throw new Error('Failed to update product');
  
      const data = await response.json();
      // console.log("Updated Product:", data);
  
      // Update product data in the state
      const newProductsData = [...productData];
      newProductsData[editIndex] = data;
      setProductData(newProductsData);
      resetForm();
    } catch (err) {
      console.error('Error updating product:', err);
      toast.error(err.message);
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
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
 
 
 
  // Handle additional input changes for grams and price in the popup
  const handleExtraInputChange = (e) => {
    const { name, value } = e.target;
    setExtraProductData({ ...extraProductData, [name]: value });
  };
 
  // Handle submitting grams and price from the popup
  const handleSubmitExtraData = async () => {
    const { grams, price } = extraProductData;
    if (!grams || !price) return;
 
    console.log("Submitting extra data for product", productPopup);
 
    if (!productPopup.productId) {
      // console.log(productPopup);
      console.error("Product ID is null or undefined.");
      toast.error("Product ID is missing for the price submission.");
      return;
    }
 
    const dataToSubmit = {
      productId: productPopup.productId,
      productGrams: parseInt(grams, 10),
      productCost: parseFloat(price)
    };
 
    try {
      const response = await fetch('http://localhost:8080/price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });
 
      if (!response.ok) throw new Error('Failed to submit grams and price');
 
      const data = await response.json();
      console.log(data);
      // Add the new grams and price to the additional inputs
      setAdditionalInputs([...additionalInputs, { productGrams: parseInt(grams, 10), productCost: parseFloat(price) }]);
      setExtraProductData({ grams: '', price: '' });
      // setAdditionalInputs([...additionalInputs, data]); 
      // setExtraProductData({ grams: '', price: '' }); 
    } catch (err) {
      console.error('Error submitting grams and price:', err);
      toast.error(err.message);
    }
  };
 
  return (
    <div className="AdminProductsPage_02">
      <h1 className="admin-product-heading">Products</h1>
      {loading && <p>Loading...</p>}
 
      <div className="AdminProductsAddFields_02">
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
        {/* <label>
          Price:
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </label> */}
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
          Image:
          <input
            type="file"
            accept="image/*"
            name="productImg"
            ref={fileInputRef} // Use ref to clear this input
            // value={newProduct.productImg}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Category ID:
          <input
            type="text"
            name="categoryId"
            placeholder="Enter category ID"
            value={newProduct.categoryId}
            onChange={handleInputChange}
          />
        </label>
        <label>
        Admin Name:
          <input
            type="text"
            name="admin_name"
         
            value={admin}
            readOnly
            onChange={handleInputChange}
          />
        </label>
        <button className="AdminProductsButton_02" onClick={editIndex === null ? handleAddProduct : handleUpdateProduct}
          disabled={loading}
        >
          {loading ? "Processing..." : editIndex === null ? 'Add Product' : 'Update Product'}
        </button>
      </div>
 
      <table className="AdminProductsTable_02">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            {/* <th>Price</th> */}
            <th>Stock</th>
            <th>Image</th>
            <th>Category ID</th>
            <th>Admin Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product, index) => (
            <tr key={product.productId || index}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              {/* <td>{product.price}</td> */}
              <td>{product.productStock}</td>
              <td>
                {/* {product.productImg ? (
                  <img src={`http://localhost:8080/images/${product.productImg}`} alt="Product" className="AdminProductsImg_02" />
                ) : 'No Image'} */}
                {product.productImg ? (
                    <img src={`data:image/jpeg;base64,${product.productImg}`} alt={product.productName} className="AdminProductsImg_02" />
                  ) : 'No Image'}
              </td>
              <td>{product.categoryId}</td>
              <td>{product.adminName}</td>
              <td>
                <button className="AdminProductsEditButton_02" onClick={() => handleEditProduct(index)}>Edit</button>
                <button className="AdminProductsDeleteButton_02" onClick={() => handleDeleteProduct(product.productName)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
 
      {deleteConfirmation.isOpen && (
        <div className="AdminProductsDeletePopup_02">
          <div className="AdminProductsDeleteContent_02">
            <h3>Are you sure you want to delete this product?</h3>
            <div className="AdminProductsPopupButtons_02">
              <button onClick={confirmDelete}>Yes, Delete</button>
              <button onClick={() => setDeleteConfirmation({ isOpen: false, productName: null })}>Cancel</button>
            </div>
          </div>
        </div>
      )}
 
      {productPopup.isOpen && (
        <div className="AdminProductsPopupOverlay_02">
          <div className="AdminProductsPopupContent_02">
            <div className="AdminProductsInputGroup_02">
            <label className="AdminProductsDropdownContainerGrams_02">
                Grams:
                <select
                  name="grams"
                  value={extraProductData.grams}
                  onChange={handleExtraInputChange}
                  className="AdminProductsDropdownSelect_02"
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
                Price:
                <input
                  type="number"
                  name="price"
                  value={extraProductData.price}
                  onChange={handleExtraInputChange}
                  required
                />
              </label>
              <button
                className="AdminProductsPopupSubmit_02"
                onClick={handleSubmitExtraData}
                disabled={loading}
              >
                Submit
              </button>

              {/* Display additional inputs for grams and prices */}
                <div className="AdminProductsAdditionalInputs_02">
                  <h3>{productPopup.productName}</h3>
                  {additionalInputs.map((input, index) => (
                    <div key={index} className="AdminProductsAdditionalInputSet_02">
                      Grams: {input.productGrams || 0} -  
                      {/* Price: {input.productCost === 'number' ? input.productCost.toFixed(2) : "N/A"} */}
                      Price: {input.productCost ? parseFloat(input.productCost).toFixed(2) : "N/A"}
                    </div>
                  ))}
                </div>
            </div>
         
            <button className="AdminProductsPopupCancel_02"
                  onClick={() => {
                    if (additionalInputs.length === 0) {
                      toast.error("Please add at least one set of grams and price before closing.");
                    } else {
                      setProductPopup({ isOpen: false, productName: '', productId: '' });
                      setAdditionalInputs([]); // Clear additional inputs when closing the popup
                    }
                  }}
                >
                  Cancel
              </button>
          </div>
        </div>
      )}
 
    </div>
  );
};
 
export default AdminProducts;
 