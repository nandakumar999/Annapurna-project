import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; // Import Link for navigation
import './index.css'; // Import the CSS file

// Predefined images for categories
const categories_image = [
  { image: '/img/powders.jpg' },
  { image: '/img/masala.jpg' },
  { image: '/img/pickles.jpg' },
  { image: '/img/vegetables.jpg' },
  { image: '/img/natural_oil.jpg' },
  { image: '/img/honey.jpg' },
];

const HomePageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/category');
         // Fetching data from the API
        if (response.ok) {
          const data = await response.json(); // Parse JSON data
          // Combine fetched categories with predefined images
          const categoriesWithImages = data.map((category, index) => ({
            ...category,
            image: categories_image[index % categories_image.length]?.image, // Assign image cyclically
          }));
          setCategories(categoriesWithImages); // Set categories data in state
        } else {
          console.error('Error fetching categories:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCategories(); // Call fetch function on mount
  }, []);

  // Slider navigation handlers
  const slideLeft = () => setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  const slideRight = () =>
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, categories.length - 4));

  return (
    <div className="category-section">
      <h1 className="category-title_111">Our Products</h1>
      <div className="home-slider-container">
        {startIndex > 0 && (
          <button className="home-slider-arrow home-left-arrow" onClick={slideLeft}>
            <FaArrowLeft />
          </button>
        )}

        <div className="category-cards-container">
          {categories.slice(startIndex, startIndex + 4).map((category) => (
            <div className="category-card" key={category.categoryId}>
              <img
                src={category.image || '/img/placeholder.jpg'}
                alt={category.categoryName}
                className="card-image"
              />
              <div className="card-overlay">
                <Link to={`/category/${category.categoryId}`} className="card-link">
                  <h2 className="card-title">{category.categoryName}</h2>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {startIndex < categories.length - 4 && (
          <button className="home-slider-arrow home-right-arrow" onClick={slideRight}>
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePageCategory;
