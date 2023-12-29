import React, { useEffect } from "react";
import Login from "./common/Login";
import SignUp from "./common/SignUp";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AppTabBar from "./components/AppTabBar";
import ProductPage from "./Components/ProductPage";
import ProductDetailPage from "./Components/ProductDetailPage";
import OrderPage from "./Components/OrderPage";
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
        <Route exact path="/productPage" key='productPage' element={<ProductPage/>}/>
        <Route exact path="/buy" key='buy' element={<ProductDetailPage/>}/>
        <Route exact path="/orderPage" key='orderPage' element={<OrderPage/>}/>
      </Routes>
    </div>
  );
};

export default App;
