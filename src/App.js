import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ApolloProvider } from '@apollo/client';

import Category from "./components/Category";
import Footer from "./components/Footer"

// main
import HeaderA from "./pages/Header";
import Home from "./pages/Home";
import Mate from "./pages/Mate/Mate";
import Oneroom from "./pages/Oneroom/Oneroom";
import OneroomDetails from "./pages/Oneroom/OneroomDetails"
import Cooking from "./pages/Cooking/Cooking";
import MyPage from "./pages/MyPage";
import MessageSendBox from "./pages/Message/MessageSendBox";
import MessageReciveBox from "./pages/Message/MessageReciveBox";
import MessageCompose from "./pages/Message/MessageCompose"; 

import Logout from './pages/Logout';
import CookingPost from './pages/Cooking/CookingPost';
import CookingDetails from "./pages/Cooking/CookingDetails";
import CommunityPost from './pages/Community/CommunityPost';
import MarketPost from './pages/Market/MarketPost';
import MarketDetail from './pages/Market/MarketDetail';
import MarketUpdate from './pages/Market/MarketUpdate';
import Community from "./pages/Community/Community";

// mypage
import EditUserInfo from './pages/EditUserInfo';

// BeforeLogin
import HeaderB from "./pages/BeforeLogin/Header";
import Login from "./pages/BeforeLogin/Login";
import Signup from "./pages/BeforeLogin/Signup";
import Market from "./pages/Market/Market";
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
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Mate" element={isAuthenticated ? <Mate /> : <Login onLogin={handleLogin} />} />
                <Route path="/Community" element={isAuthenticated ? <Community /> : <Login onLogin={handleLogin} />} />
                <Route path="/Market" element={isAuthenticated ? <Market /> : <Login onLogin={handleLogin} />} />
                <Route path="/MarketPost" element={isAuthenticated ? <MarketPost /> : <Login onLogin={handleLogin} />} />
                <Route path="/MarketDetail" element={isAuthenticated ? <MarketDetail /> : <Login onLogin={handleLogin} />} />
                <Route path="/MarketUpdate" element={isAuthenticated ? <MarketUpdate /> : <Login onLogin={handleLogin} />} />
                <Route path="/CommunityPost" element={isAuthenticated ? <CommunityPost /> : <Login onLogin={handleLogin} />} />
                <Route path="/Login" element={<Login onLogin={handleLogin} />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Oneroom" element={<Oneroom />} />
                <Route path="/OneroomDetails" element={<OneroomDetails />} />
                <Route path="/Cooking" element={<Cooking />} />
                <Route path="/CookingPost" element={<CookingPost />} />
                <Route path="/CookingDetails" element={<CookingDetails />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/MyPage" element={<MyPage onLogout={handleLogout} />} />
                
                <Route path="/MessageSendBox"  element={isAuthenticated ? <MessageSendBox /> : <Login onLogin={handleLogin} />} />
                <Route path="/MessageReciveBox"  element={isAuthenticated ? <MessageReciveBox /> : <Login onLogin={handleLogin} />} />
                <Route path="/MessageCompose"  element={isAuthenticated ? <MessageCompose /> : <Login onLogin={handleLogin} />} />

                <Route path="/editUserInfo" element={<EditUserInfo />} />
              </Routes>
          </div>
          <div className="footer-section">
            <Footer />
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;