import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Category from "./components/Category";

// AfterLogin
import HeaderA from "./pages/AfterLogin/Header";
import HomeA from "./pages/AfterLogin/Home";
import MateA from "./pages/BeforeLogin/Mate";
import Oneroom from "./pages/AfterLogin/Oneroom";
// BeforeLogin
import HeaderB from "./pages/BeforeLogin/Header";
import HomeB from "./pages/BeforeLogin/Home";
import MateB from "./pages/BeforeLogin/Mate";
import Login from "./pages/BeforeLogin/Login";
import Signup from "./pages/BeforeLogin/Signup";
import Community from "./pages/BeforeLogin/Community";

function App() {
  const isAuthenticated = true; // 실제 인증 상태로 대체

  return (
    <div className="root-wrap">
      <BrowserRouter>
        <div className="header-section">
          {isAuthenticated ? <HeaderA /> : <HeaderB />}
        </div>
        <div className="main-section">
          <Category />
          <Routes>
            {/*  */}
            <Route path="/" element={isAuthenticated ? <HomeB /> : <HomeA />} />
            <Route path="/Mate" element={isAuthenticated ? <MateB /> : <MateA />} />
            <Route path="/Community" element={<Community />} />
            <Route path="/Login" element={<Login />}/>
            <Route path="/Signup" element={<Signup />}/>
            <Route path="/Oneroom" element={<Oneroom />} />
          </Routes>
        </div>
        <div className="footer-section"></div>
      </BrowserRouter>
    </div>
  );
}

export default App;
