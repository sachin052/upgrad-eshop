import React from "react";
import Login from "./common/Login"; 
import SignUp from "./common/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppTabBar from "./Components/AppTabBar";
import ProductPage from "./Components/ProductPage";
const App = () => {
  return (
    <BrowserRouter>
      <div>
        {/* Navigation bar */}
        <AppTabBar/>
        {/* <ProductPage/> */}
        {/* Routing */}
        <Routes>
          <Route exact path="/" key='home' element={<Login/>}/>
          <Route exact path="/signup" key='home' element={<SignUp/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
};

export default App;
