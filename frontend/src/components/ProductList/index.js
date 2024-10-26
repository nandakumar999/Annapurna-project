import React from 'react';
import './index.css'; 
 


const ProductList = () => {
  const products = [
    {
      id: 1,
      image: '/img/categories_3.png',
      name: 'Fruits',
      
    },
    {
      id: 2,
      image: '/img/categories_2.png',
      name: 'Vegetables',
 
    },
    {
      id: 3,
      image: '/img/categories_1.png',
      name: 'Honey',

    },
    {
      id: 4,
      image: '/img/categories_4.png',
      name: 'Beauty products',
    
    },
  ];
 
  return (
    <div className="product-list-section">
      <h2 className="product-list-title">Categories</h2>
      <div className="product-list-cards">
        {products.map((product) => (
          <div key={product.id} className="product-list-card">
            <img src={product.image} alt={product.name} className="product-list-image" />
            <h3>{product.name}</h3>
     
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default ProductList;
 