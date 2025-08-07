import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

const ProductCard = ({ product }) => {

  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="product-card"
    >
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <span className="product-name">{product.name}</span>
        <button
          className="more-options-btn"
          onClick={(e) => {
            
            e.preventDefault();
            
          }}
        >
          <FiMoreHorizontal />
        </button>
      </div>
    </a>
  );
};

export default ProductCard;