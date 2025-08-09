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
    const [searchContent, setSearchContent] = useState('');

    const [catalogSearch, setCatalogSearch] = useState([]);
    const [subcategorySearch, setSubcategorySearch] = useState([]);
    const [productSearch, setProductSearch] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchCatalogs = async () => {
            try {

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/catalogs`, {
                    headers: {},
                });
                setCatalogs(response.data);
                setCatalogSearch(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Đã có lỗi xảy ra');
            }
        };
        fetchCatalogs();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`, {
                    headers: {},
                });
                setProducts(response.data);
                setFilteredProducts(response.data);
                setProductSearch(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Đã có lỗi xảy ra');
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedCatalog == null) {
            const newFilteredProducts = products.filter(
                product => !product.product_catalog_id && !product.subcategory_id
            );
            setFilteredProducts(newFilteredProducts);
            setProductSearch(newFilteredProducts);
        }
    }, [products]);

    useEffect(() => {
        const handleSearch = () => {
            const newFilteredProducts = productSearch.filter(product =>
                removeDiacritics(product.name.toLowerCase())
                    .includes(removeDiacritics(searchContent.toLowerCase()))
            );
            const newCatalogs = catalogs.filter((
                catalog => catalog.name.toLowerCase().includes(searchContent)
            ))
            const newSubcategories = subcategories.filter((
                subcategory => subcategory.name.toLowerCase().includes(searchContent)
            ))
            setFilteredProducts(newFilteredProducts);
            setCatalogSearch(newCatalogs);
            setSubcategorySearch(newSubcategories);
        }
        handleSearch()
    }, [searchContent]);

    const removeDiacritics = (str) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const handleCatalogSelect = async (catalogId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/subcategories`, {
                headers: {},
                params: {catalog_id: catalogId},
            });
            setSubcategories(response.data);
            setSubcategorySearch(response.data);
            setSelectedCatalog(catalogId);
            const newFilteredProducts = products.filter(
                product => product.catalog_id === catalogId
            );
            setFilteredProducts(newFilteredProducts);
            setProductSearch(newFilteredProducts);
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
        setProductSearch(newFilteredProducts);
    };

    const handleGoBack = () => {
        if (selectedCatalog !== null && selectedSubcategory !== null) {
            handleCatalogSelect(selectedCatalog);
            setSelectedSubcategory(null);
        } else {
            setSelectedCatalog(null);
        }
        setSearchContent('');
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
<ul className="social-links">
    <li className="icon facebook">
        <span className="tooltip">Facebook</span>
        <a href="https://www.facebook.com/profile.php?id=61578834114911" className="facebook">
            <FaFacebookF/>
        </a>
    </li>
    <li className="icon tiktok">
        <span className="tooltip">Tiktok</span>
        <a href="https://www.tiktok.com/@dancedeiva?is_from_webapp=1&sender_device=pc" className="tiktok">
            <FaTiktok/>
        </a>
    </li>
    <li className="icon instagram">
        <span className="tooltip">Instagram</span>
        <a href="https://www.instagram.com/chang_mac_gi_hom_nay/" className="instagram">
            <FaInstagram/>
        </a>
    </li>
</ul>

                </header>


                <div className="function-bar">{selectedCatalog &&
                    (
                        <button onClick={handleGoBack} className="back-button">
                            Back to {!selectedSubcategory ? ("Catalog") : ("Subcategory")}
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                                </svg>
                            </div>
                        </button>
                    )}
                    <div id="poda">
                        <div className="glow"></div>
                        <div className="darkBorderBg"></div>
                        <div className="darkBorderBg"></div>
                        <div className="darkBorderBg"></div>

                        <div className="white"></div>

                        <div className="border"></div>

                        <div id="main">
                            <input placeholder="Search..." type="text" name="text" className="input"
                                   value={searchContent}
                                   onChange={(e) => setSearchContent(e.target.value)}/>
                            <div id="input-mask"></div>
                            <div id="pink-mask"></div>
                            <div className="filterBorder"></div>
                            <div id="filter-icon">
                                <svg
                                    preserveAspectRatio="none"
                                    height="27"
                                    width="27"
                                    viewBox="4.8 4.56 14.832 15.408"
                                    fill="none"
                                >
                                    <path
                                        d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                                        stroke="white"
                                        strokeWidth="1"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                            <div id="search-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    height="24"
                                    fill="none"
                                    className="feather feather-search"
                                >
                                    <circle stroke="white" r="8" cy="11" cx="11"></circle>
                                    <line
                                        stroke="white"
                                        y2="16.65"
                                        y1="22"
                                        x2="16.65"
                                        x1="22"
                                    ></line>
                                    <defs>
                                        <linearGradient gradientTransform="rotate(50)" id="search">
                                            <stop stopColor="#f8e7f8" offset="0%"></stop>
                                            <stop stopColor="#b6a9b7" offset="50%"></stop>
                                        </linearGradient>
                                        <linearGradient id="searchl">
                                            <stop stopColor="#b6a9b7" offset="0%"></stop>
                                            <stop stopColor="#837484" offset="50%"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !selectedCatalog && (
                        <ProductCatalog
                            catalogs={catalogSearch}
                            onCatalogSelect={handleCatalogSelect}
                        />
                    )}

                {selectedCatalog && !selectedSubcategory && (
                    <>
                        <Subcategory
                            subcategories={subcategorySearch}
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
    )
        ;
};

export default ProductPage;