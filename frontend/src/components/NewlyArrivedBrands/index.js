import React, { useState } from 'react';
import './index.css'; // Ensure you have the CSS imported for styling

const brandImage1 = "/img/newarrive_01.png"; 
const brandImage2 = "/img/newarrive_02.png";
const brandImage3 = "/img/newarrive_03.png";
const brandImage4 = "/img/brand_image4.png"; 
const brandImage5 = "/img/brand_image5.png"; 
const brandImage6 = "/img/brand_image6.png"; 

const NewlyArrivedBrands = () => {
  const brands = [
    {
      id: 1,
      image: brandImage1,
      title: 'Brand 1',
      description: 'This is a brief description of Brand 1.',
    },
    {
      id: 2,
      image: brandImage2,
      title: 'Brand 2',
      description: 'This is a brief description of Brand 2.',
    },
    {
      id: 3,
      image: brandImage3,
      title: 'Brand 3',
      description: 'This is a brief description of Brand 3.',
    },
    {
      id: 4,
      image: brandImage4,
      title: 'Brand 4', // New brand
      description: 'This is a brief description of Brand 4.',
    },
    {
      id: 5,
      image: brandImage5,
      title: 'Brand 5', // New brand
      description: 'This is a brief description of Brand 5.',
    },
    {
      id: 6,
      image: brandImage6,
      title: 'Brand 6', // New brand
      description: 'This is a brief description of Brand 6.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (brands.length - 2));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? brands.length - 3 : prevIndex - 1
    );
  };

  return (
    <div className="new-arrival-section">
      <div className="new-arrival-header">
        <h2 className="new-arrival-title">Newly Arrived Brands</h2>
        <div className="view-all">
          <span className="view-all-text">View All Categories</span>
          <button className="arrow-button" onClick={handlePrevious}>
            &lt; {/* Left arrow */}
          </button>
          <button className="arrow-button" onClick={handleNext}>
            &gt; {/* Right arrow */}
          </button>
        </div>
      </div>
      <div className="new-arrival-cards">
        <div className="new-arrival-card-container">
          {brands.slice(currentIndex, currentIndex + 3).map(brand => (
            <div key={brand.id} className="new-arrival-card">
              <img src={brand.image} alt={brand.title} className="brand-image" />
              <div className="brand-content">
                <h3 className="brand-title">{brand.title}</h3>
                <p className="brand-description">{brand.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewlyArrivedBrands;
