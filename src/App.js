import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pages/BeforeLogin/Header";
import HomeBeforeLogin from "./pages/BeforeLogin/Home";
import HomeAfterLogin from "./pages/AfterLogin/Home";
import Category from "./components/Category";
import Mate from "./pages/BeforeLogin/Mate";

function App() {
  const isAuthenticated = true; // 실제 인증 상태로 대체

  return (
    <div className="root-wrap">
      <BrowserRouter>
        <div className="header-section">
          <Header />
        </div>
        <div className="main-section">
          <Category />
          <Routes>
            {/*  */}
            <Route path="/" element={isAuthenticated ? <HomeBeforeLogin /> : <HomeAfterLogin />} />
            <Route path="/Mate" element={<Mate />} />
          </Routes>
        </div>
        <div className="footer-section"></div>
      </BrowserRouter>
    </div>
  );
}

export default App;
