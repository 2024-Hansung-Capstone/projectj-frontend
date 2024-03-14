import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Mobile, PC } from "./pages/utils/MediaQueries";

import Category from "./components/Category";
import Footer from "./components/Footer"
// AfterLogin
import HeaderA from "./pages/AfterLogin/Header";
import HomeA from "./pages/AfterLogin/Home";
import MateA from "./pages/AfterLogin/Mate";
import Oneroom from "./pages/AfterLogin/Oneroom";
import Cooking from "./pages/AfterLogin/Cooking";
import MyPage from "./pages/AfterLogin/MyPage";
import Message from "./pages/AfterLogin/Message";
// BeforeLogin
import HeaderB from "./pages/BeforeLogin/Header";
import HomeB from "./pages/BeforeLogin/Home";
import MateB from "./pages/BeforeLogin/Mate";
import Login from "./pages/BeforeLogin/Login";
import Signup from "./pages/BeforeLogin/Signup";
import Community from "./pages/BeforeLogin/Community";
import TermsOfService from "./pages/BeforeLogin/TermsOfService";

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
          <PC>
          <Routes>
            {/*  */}
            <Route path="/" element={isAuthenticated ? <HomeA /> : <HomeB />} />
            <Route path="/Mate" element={isAuthenticated ? <MateA /> : <MateB />} />
            <Route path="/Community" element={<Community />} />
            <Route path="/Login" element={<Login />}/>
            <Route path="/Signup" element={<Signup />}/>
            <Route path="/Oneroom" element={<Oneroom />} />
            <Route path="/Cooking" element={<Cooking />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/Message" element={<Message />} />
          </Routes>
          </PC>
        </div>
        <div className="footer-section">
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
