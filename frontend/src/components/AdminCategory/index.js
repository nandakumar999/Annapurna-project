import React, { useState, useEffect } from 'react';
import './index.css';

const AdminCategory = () => { 
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  

  // Function to fetch categories from the backend
  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/category');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

    fetchCategories();
  }, []);

  // Function to add a new category
  const addCategory = async () => {
    if (!categoryName) return;

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



      const newCategory = await response.json();
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
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

      const updatedCategory = await response.json();
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.categoryId === selectedCategoryId ? updatedCategory : category
        )
      );

      setCategoryName('');
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
    setCategoryName(e.target.value);
  };

  const closePopup = () => {
    setShowDeletePopup(false);
    setSelectedCategoryId(null);
  };

  return (
    <div className="category-page">
      <h1 className="Categories_name">Categories</h1>
      <div className="category-input">
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={handleInputChange}
          className="category-input-name"
          disabled={isEditing} // Disable input when in edit mode
        />
        <button onClick={addCategory} disabled={!categoryName || isEditing}>Add</button>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
            {/* <th>Actions</th> */}
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
                    <button onClick={() => editCategory(category.categoryId, category.categoryName)}>Edit</button>
                    <button className = "category-delete" onClick={() => confirmDeleteCategory(category.categoryId)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Are you sure you want to delete this category?</h3>
            <div className="popup-buttons">
              <button onClick={deleteCategory}>Yes, Delete</button>
              <button onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategory;
