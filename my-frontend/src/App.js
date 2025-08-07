import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AdminLinksPage from './pages/admin/AdminLinksPage';

import './styles/main.scss';
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route cho trang quản trị */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="links" element={<AdminLinksPage />} />
        </Route>

        {/* Route mới cho trang sản phẩm công khai */}
        <Route path="/elvisle" element={<ProductPage />} />

        {/* Chuyển hướng mặc định đến trang product */}
        <Route path="/" element={<Navigate to="/elvisle" />} />
      </Routes>
    </Router>
  );
}

export default App;