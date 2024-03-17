import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Mobile, PC } from "./pages/utils/MediaQueries";
import { ApolloProvider } from '@apollo/client';

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
import Login from "./pages/BeforeLogin/Login";
import Signup from "./pages/BeforeLogin/Signup";
import Community from "./pages/BeforeLogin/Community";
import TermsOfService from "./pages/BeforeLogin/TermsOfService";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 상태를 관리

  // 사용자가 로그인하면 호출되는 함수
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // 사용자가 로그아웃하면 호출되는 함수
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="root-wrap">
        <BrowserRouter>
          <div className="header-section">
            {isAuthenticated ? <HeaderA /> : <HeaderB onLogin={handleLogin} />}
          </div>
          <div className="main-section">
            <Category />
            <PC>
              <Routes>
                {/*  */}
                <Route path="/" element={isAuthenticated ? <HomeA /> : <HomeB />} />
                <Route path="/Mate" element={isAuthenticated ? <MateA /> : <Login onLogin={handleLogin} />} />
                <Route path="/Community" element={<Community />} />
                <Route path="/Login" element={<Login onLogin={handleLogin} />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Oneroom" element={<Oneroom />} />
                <Route path="/Cooking" element={<Cooking />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/MyPage" element={<MyPage onLogout={handleLogout} />} />
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
