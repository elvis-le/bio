import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

const Subcategory = ({ subcategories, onSubcategorySelect, activeSubcategoryId }) => {
  return (
  <section className="product-subcategory-section">
    {subcategories.map(subcategory => (
        <button key={subcategory.id}
                className={`subcategory-button ${activeSubcategoryId === subcategory.id ? 'active' : ''}`}
                onClick={() => onSubcategorySelect(subcategory)}>
          <span className="subcategory-name">{subcategory.name}</span>
          <FiMoreHorizontal className="subcategory-options-icon"/>
        </button>
    ))}
  </section>
)
  ;
};

export default Subcategory;