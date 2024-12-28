import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
// import { toast } from 'react-toastify';


import './index.css';

const CategoryProducts = ({ cart , setCart }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  // const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
      document.title = "CategoryProducts - Annapurna Farms";
  }, []);

 useEffect(() => {
  if (!categoryId) {
    console.error('Category ID is missing.');
    return; // Don't proceed with fetch if no categoryId is available
  }

  const fetchCategoryProducts = async () => {
    try {
      const response = await fetch(`http://localhost:8080/product/category/${categoryId}`);
      if (response.ok) {
        const data = await response.json();
        const filteredProducts = data.filter(product => product.productName && product.productName.trim());
        setProducts(filteredProducts); // Store valid products in state
      } else {
        console.error('Error fetching category products:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchCategoryProducts();
}, [categoryId]);


// const handleAddToCart = (product, selectedWeight = product.productGrams) => {
//   const productWithVariant = { ...product, selectedWeight:product.productGrams, price: product.productCost };

//   const existingProduct = cart.find(
//     (item) =>
//       item.productId === productWithVariant.productId &&
//       item.selectedWeight === productWithVariant.selectedWeight
//   );

//   let updatedCart;
//   if (existingProduct) {
//     updatedCart = cart.map((item) =>
//       item.productId === productWithVariant.productId &&
//       item.selectedWeight === productWithVariant.selectedWeight
//         ? { ...item, quantity: item.quantity + 1 }
//         : item
//     );
//   } else {
//     updatedCart = [...cart, { ...productWithVariant, quantity: 1 }];
//     }

//     setCart(updatedCart); // Update cart state
//     localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage
//     // setSuccessMessage(`${product.productName} (${selectedWeight}g) added to your cart!`);
//     toast.success(`${product.productName} (${selectedWeight}g) added to your cart!`);
//     setTimeout(() => setSuccessMessage(''), 2000);
// };


  return (
    <div className="category-product-page">
      <div className="category-page-banner">
          <img src="/img/blog_image.jpg" alt="Products Banner" className="category-page-banner-img" />
        <div className="category-page-banner-content">
          <h1>PURELY NATURAL, TRULY <br />
            INDIAN – FARM-FRESH GOODNESS <br />
            FOR EVERY MEAL</h1>
        </div>
      </div>
      <div className="category-product-display-page">
        <h2 className="category-page-title">Product Categories</h2>
        {/* {successMessage && <div className="add-cart-success-message">{successMessage}</div>} */}
        <div className="category-page-cards">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.productId} className="category-page-card">
                <Link to={`/product/${product.productName}`} className="category-page-card-link">
                <div className="category-page-card-img">
                  <img
                      src={`data:image/jpeg;base64,${product.productImg}`} // Convert base64 image string to usable image
                      alt={product.productName}
                    />
                </div>
                <div className="category-page-card-info">
                  <h3>
                    {product.productName} {' '}
                    <span className="product-grams">({product.productGrams}g)</span></h3>
                  <p className ="product-description">
                      {product.productDescription}
                  </p>
                  <p className="category-page-price">₹{product.productCost}</p>
                </div>

                {/* <button className="category-page-add-to-cart"
                    onClick={() => handleAddToCart(product)}>
                  +
                </button> */}
                <button className="category-page-add-to-cart">
                  +
                </button>
                </Link>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  </div>
  );
};

export default CategoryProducts;
