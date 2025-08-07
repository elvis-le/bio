import React, {useEffect, useState} from 'react';
import ProductCard from '../components/product/ProductCard';
import {FaTiktok, FaInstagram, FaFacebookF, FaExpand, FaUpload, FaArrowLeft} from 'react-icons/fa';
import ProductCatalog from "../components/product/ProductCatalog";
import Subcategory from "../components/product/Subcategory";
import axios from "axios";

const pageData = {
  profile: {
    avatar: 'https://qmmlaslpfdcezryrgges.supabase.co/storage/v1/object/public/user//ChatGPT%20Image%2013_29_04%2024%20thg%207,%202025.png',
    username: 'Elvis Le',
  }
};

const ProductPage = () => {
  const [selectedCatalog, setSelectedCatalog] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [catalogs, setCatalogs] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [products, setProducts] = useState([]);
        const [error, setError] = useState('');
        const [showProduct, setShowProduct] = useState(catalogs);

    
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        
        const response = await axios.get('https://bio-aobe.onrender.com/api/catalogs', {
          headers: {

          },
        });
        setCatalogs(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Đã có lỗi xảy ra');
      }
    };
    fetchCatalogs();
  }, []);
    useEffect(() => {
    const fetchProducts = async () => {
      try {

        const response = await axios.get('https://bio-aobe.onrender.com/api/products', {
          headers: {

          },
        });
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Đã có lỗi xảy ra');
      }
    };
    fetchProducts();
  }, []);


    const handleCatalogSelect = async (catalogId) => {
      try {
        const response = await axios.get('https://bio-aobe.onrender.com/api/subcategories', {
          headers: {
            
          },
          params: {catalog_id: catalogId},
        });
        setSubcategories(response.data);
        setSelectedCatalog(catalogId);
      const newFilteredProducts = products.filter(
            product => product.catalog_id === catalogId
        );
        setFilteredProducts(newFilteredProducts);
      setSelectedSubcategory(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Đã có lỗi xảy ra');
      }
    };
    const handleSubcategorySelect = (subcategory) => {
        setSelectedSubcategory(subcategory);
        const newFilteredProducts = products.filter(
            product => product.subcategory_id === subcategory.id
        );
        setFilteredProducts(newFilteredProducts);
    };
    const handleGoBack = () => {
      if (selectedCatalog !== null && selectedSubcategory !== null){
        setSelectedSubcategory(null);
      }
      else {
        setSelectedCatalog(null);
      }
    };

  return (
    <div className="product-page-background">
        {error && <p>{error}</p>}
      <div className="page-container">
        <div className="top-actions">
          <button className="top-icon-btn"><FaExpand/></button>
          <button className="top-icon-btn"><FaUpload/></button>
        </div>
        <header className="profile-header">
          <img src={pageData.profile.avatar} alt="Avatar" className="profile-avatar"/>
          <h1 className="profile-username">@{pageData.profile.username}</h1>
          <div className="social-links">
            <FaTiktok/>
            <FaInstagram/>
            <FaFacebookF/>
          </div>
        </header>

        {
          !selectedCatalog ? (
              <ProductCatalog
                  catalogs={catalogs}
                  onCatalogSelect={handleCatalogSelect}
              />
          ): (
              <button onClick={handleGoBack} className="back-button">
                <FaArrowLeft/> Back to Catalogs
              </button>
          )}

        {selectedCatalog && !selectedSubcategory && (
            <>


              <Subcategory
                  subcategories={subcategories}
                    onSubcategorySelect={handleSubcategorySelect}
                    activeSubcategoryId={selectedSubcategory ? selectedSubcategory.id : null}
                />
              </>
          )
        }
        <main className="collections-container">
          <div className="product-grid">
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;