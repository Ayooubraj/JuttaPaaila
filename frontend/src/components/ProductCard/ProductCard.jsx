import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './ProductCard.css'; // Make sure you link your CSS here
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext); // Use the CartContext

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-price">₨ {product.price ? product.price.toFixed(2) : 'N/A'}</p>
      <div className="product-rating">Rating: {product.rating} ★</div>
      <button className="buy-now-button">Buy Now</button>
      <button className="add-to-cart-button" onClick={() => addToCart(product)}>
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
