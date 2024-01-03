import React, { useEffect } from "react";
import Login from "./common/Login";
import SignUp from "./common/SignUp";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AppTabBar from "./components/AppTabBar";
import ProductPage from "./common/ProductPage";
import ProductDetailPage from "./common/ProductDetailPage";
import OrderPage from "./common/OrderPage";
import Cookies from "js-cookie";
import AddProduct from "./common/AddProduct";
import { SearchProvider } from "./common/SearchContext";

const App = () => {
  return (
    
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    
  );
};

const AppContent = () => {
  const navigate = useNavigate();
  const authToken = Cookies.get("authToken");
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      authToken !== undefined &&
      pathname !== "/productPage" &&
      !pathname.includes('/buy')&&
      !pathname.includes('orderPage')&&
      !pathname.includes("/addProduct")
    ) {
      navigate("/productPage");
    }
  }, [navigate, authToken, pathname]);

  return (
    <SearchProvider>
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
          element={<OrderPage/>}
        />
        <Route path="/addProduct/:id?" key="addProduct" element={<AddProduct/>} />
      </Routes>
    </div>
    </SearchProvider>
  );
};

export default App;
