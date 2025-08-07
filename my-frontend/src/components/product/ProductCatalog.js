import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

const ProductCatalog = ({ catalogs, onCatalogSelect }) => {
  return (
    <section className="product-catalog-section">
      {catalogs.map(catalog => (
        <button
          key={catalog.id}
          className="catalog-button"
          onClick={() => onCatalogSelect(catalog.id)} 
        >
          <span className="catalog-name">{catalog.name}</span>
          <FiMoreHorizontal className="catalog-options-icon" />
        </button>
      ))}
    </section>
  );
};

export default ProductCatalog;