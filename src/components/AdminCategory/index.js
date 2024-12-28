import React, { useState, useEffect } from 'react';
import './index.css'; // Changed to match the new CSS file name

const AdminCategory = () => { 
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for adding category



  // Function to fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/category');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to add a new category
  const addCategory = async () => {
    if (!categoryName) return;

    setIsLoading(true); // Show loading state
    try {
      const response = await fetch('http://localhost:8080/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName }),
      });

      if (!response.ok) {
        throw new Error('Error adding category');
      }

      // Fetch updated category list
      await fetchCategories();

      setCategoryName(''); // Clear input field
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  // Function to handle the Edit button
  const editCategory = (id, name) => {
    setCategoryName(name);
    setSelectedCategoryId(id);
    setIsEditing(true); // Enable edit mode
  };

  // Function to handle updating a category
  const updateCategory = async () => {
    if (!categoryName) return;

    try {
      const response = await fetch(`http://localhost:8080/category/${selectedCategoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName }),
      });

      if (!response.ok) {
        throw new Error('Error updating category');
      }

      // Fetch updated category list
      await fetchCategories();

      setCategoryName(''); // Clear input field
      setIsEditing(false);
      setSelectedCategoryId(null);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  // Function to show delete confirmation popup
  const confirmDeleteCategory = (id) => {
    setSelectedCategoryId(id);
    setShowDeletePopup(true);
  };

  // Function to delete a category by ID
  const deleteCategory = async () => {
    if (selectedCategoryId === null) return;
    try {
      await fetch(`http://localhost:8080/category/${selectedCategoryId}`, {
        method: 'DELETE',
      });
      setCategories((prevCategories) =>
        prevCategories.filter(category => category.categoryId !== selectedCategoryId)
      );
      setShowDeletePopup(false);
      setSelectedCategoryId(null);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setCategoryName(value);
    }
  };

  const closePopup = () => {
    setShowDeletePopup(false);
    setSelectedCategoryId(null);
  };

  return (
    <div className="AdminCategory_01_page">
      <h1 className="AdminCategory_01_title">Categories</h1>
      <div className="AdminCategory_01_input">
        <label className='AdminCategory_01_labelname'>
          Category Name:
          <input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={handleInputChange}
            className="AdminCategory_01_input-name"
            disabled={isEditing} // Disable input when in edit mode
          />
        </label>
        <button onClick={addCategory} disabled={!categoryName || isLoading || isEditing} className='AdminCategory_01_add_category_button'>
          {isLoading ? 'Adding...' : 'Add Category'}
        </button>
      </div>

      <table className="AdminCategory_01_table">
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr 
              key={category.categoryId} 
              className={selectedCategoryId === category.categoryId ? 'highlight-row' : ''}
            >
              <td>{category.categoryId}</td>
              <td>
                {selectedCategoryId === category.categoryId ? (
                  <input 
                    type="text" 
                    value={categoryName}
                    onChange={handleInputChange} 
                  />
                ) : (
                  category.categoryName
                )}
              </td>
              <td>
                {selectedCategoryId === category.categoryId && isEditing ? (
                  <button onClick={updateCategory}>Update</button>
                ) : (
                  <>
                    <button onClick={() => editCategory(category.categoryId, category.categoryName)} className='AdminCategory_01_edit'>Edit</button>
                    <button className="AdminCategory_01_delete" onClick={() => confirmDeleteCategory(category.categoryId)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeletePopup && (
        <div className="AdminCategory_01_popup-overlay">
          <div className="AdminCategory_01_popup-content">
            <h3>Are you sure you want to delete this category?</h3>
            <div className="AdminCategory_01_popup-buttons">
              <button onClick={deleteCategory} className="admin_category_popup_delete">Yes, Delete</button>
              <button onClick={closePopup} className="admin_category_popup_cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategory;