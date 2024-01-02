import React, { useEffect } from "react";
import Login from "./common/Login";
import SignUp from "./common/SignUp";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AppTabBar from "./components/AppTabBar";
import ProductPage from "./components/ProductPage";
import ProductDetailPage from "./components/ProductDetailPage";
import OrderPage from "./components/OrderPage";
import Cookies from "js-cookie";
import AddProduct from "./components/AddProduct";

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken != null) {
      navigate("/productPage");
    }
  }, []);

  return (
    <div>
      {/* Navigation bar */}
      <AppTabBar />
      {/* Routing */}
      <Routes>
        <Route exact path="/" key="home" element={<Login />} />
        <Route exact path="/signup" key="signup" element={<SignUp />} />
        <Route
          exact
          path="/productPage"
          key="productPage"
          element={<ProductPage />}
        />
        <Route
          path="/buy/:productId"
          key="buy"
          element={<ProductDetailPage />}
        />
        <Route
          path="/orderPage/:productId/:qty"
          key="orderPage"
          element={<OrderPage />}
        />
        <Route path="/addProduct" key="addProduct" element={<AddProduct />} />
      </Routes>
    </div>
  );
};

export default App;
