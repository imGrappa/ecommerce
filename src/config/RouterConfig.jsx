import React from "react";
import { Routes, Route } from "react-router";
import Home from "../components/Home";
import NotFoundPage from "../components/NotFoundPage";
import ProductDetail from "../components/ProductDetail";
import Basket from "../components/Basket";

function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="product-details/:id" element={<ProductDetail />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default RouterConfig;
