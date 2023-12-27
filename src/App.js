import React, { useEffect } from "react";
import Login from "./common/Login";
import SignUp from "./common/SignUp";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AppTabBar from "./components/AppTabBar";
import ProductPage from "./components/ProductPage";
import Cookies from "js-cookie";

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
      navigate("/products");
    }
  }, [navigate]);

  return (
    <div>
      {/* Navigation bar */}
      <AppTabBar />
      {/* Routing */}
      <Routes>
        <Route exact path="/" key="home" element={<Login />} />
        <Route exact path="/signup" key="signup" element={<SignUp />} />
        <Route exact path="/login" key="login" element={<Login />} />
        <Route exact path="/products" key="products" element={<ProductPage />} />
      </Routes>
    </div>
  );
};

export default App;
