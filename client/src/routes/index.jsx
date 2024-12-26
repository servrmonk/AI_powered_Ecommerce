import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import LoginPage from "../pages/LoginRegister";
import ContactUs from "../pages/Contact";
import AboutUs from "../pages/About";
import Home from "../pages/Home";


function Routing() {
  return (
    <div>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default Routing;
