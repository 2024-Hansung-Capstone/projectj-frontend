import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotificationProvider } from "./pages/NotificationProvider"; // 명명된 내보내기 가져오기
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import Category from "./components/Category";
import Footer from "./components/Footer"

// main
import HeaderA from "./pages/Header";
import Home from "./pages/Home";
import Mate from "./pages/Mate/Mate";
import Oneroom from "./pages/Oneroom/Oneroom";
import OneroomDetails from "./pages/Oneroom/OneroomDetails"
import Cooking from "./pages/Cooking/Cooking";
import CookingAI from "./pages/Cooking/CookingAI";
import MyPage from "./pages/MyPage";
import MessageSendBox from "./pages/Message/MessageSendBox";
import MessageReceiveBox from "./pages/Message/MessageReceiveBox";
import MessageCompose from "./pages/Message/MessageCompose"; 
import MessageSuccess from "./pages/Message/MessageSuccess"; 
import MessageDetail from "./pages/Message/MessageDetail"; 
import MessageReply from "./pages/Message/MessageReply"; 

import CookingPost from './pages/Cooking/CookingPost';
import CookingDetails from "./pages/Cooking/CookingDetails";
import CommunityPost from './pages/Community/CommunityPost';
import CommunityDetail from './pages/Community/CommunityDetail';
import MarketPost from './pages/Market/MarketPost';
import MarketDetail from './pages/Market/MarketDetail';
import MarketUpdate from './pages/Market/MarketUpdate';
import Community from "./pages/Community/Community";
import CommunityUpdate from "./pages/Community/CommunityUpdate";
import Notification from "./pages/Notification"; 
import Notification_All from "./pages/Notification_All"; 

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
  const [notificationData, setNotificationData] = useState(null);

  // 사용자가 로그인하면 호출되는 함수
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // 사용자가 로그아웃하면 호출되는 함수
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
const uploadLink = createUploadLink({
  uri: 'http://54.180.182.40:5000/graphql', 
});

  // 알림 데이터를 설정하는 함수
  const handleSetNotificationData = (data) => {
    setNotificationData(data);
  };

  // 알림 데이터를 초기화하는 함수
  const handleClearNotificationData = () => {
    setNotificationData(null);
  };

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});

  return (
    <ApolloProvider client={client}>
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
                <Route path="/CommunityDetail" element={isAuthenticated ? <CommunityDetail /> : <Login onLogin={handleLogin} />} />
                <Route path="/CommunityUpdate" element={isAuthenticated ? <CommunityUpdate /> : <Login onLogin={handleLogin} />} />
                <Route path="/Login" element={<Login onLogin={handleLogin} />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Oneroom" element={<Oneroom />} />
                <Route path="/OneroomDetails" element={<OneroomDetails />} />
                <Route path="/Oneroom/:roomId" element={<OneroomDetails />} />
                <Route path="/Cooking" element={<Cooking />} />
                <Route path="/CookingAI" element={<CookingAI />} />
                <Route path="/CookingPost" element={isAuthenticated ? <CookingPost /> : <Login onLogin={handleLogin} />} />
                <Route path="/CookingDetails" element={<CookingDetails />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/MyPage" element={isAuthenticated ? <MyPage onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />

                
                <Route path="/MessageSendBox"  element={isAuthenticated ? <MessageSendBox /> : <Login onLogin={handleLogin} />} />
                <Route path="/MessageReceiveBox"  element={isAuthenticated ? <MessageReceiveBox /> : <Login onLogin={handleLogin} />} />
                <Route path="/MessageCompose"  element={isAuthenticated ? <MessageCompose /> : <Login onLogin={handleLogin} />} />
                <Route path="/MessageSuccess"  element={isAuthenticated ? <MessageSuccess /> : <Login onLogin={handleLogin} />} />
                <Route path="/MessageDetail"  element={isAuthenticated ? <MessageDetail /> : <Login onLogin={handleLogin} />} />
                <Route path="/MessageReply"  element={isAuthenticated ? <MessageReply /> : <Login onLogin={handleLogin} />} />
                <Route path="/EditUserInfo" element={isAuthenticated ? <EditUserInfo /> : <Login onLogin={handleLogin} />} />
                <Route path="/Notification_All"  element={isAuthenticated ? <Notification_All /> : <Login onLogin={handleLogin} />} />
                
                <Route path="/notification" element={<Notification notificationData={notificationData} clearNotificationData={handleClearNotificationData} />} />
                <Route path="/" element={<MessageReceiveBox setNotificationData={handleSetNotificationData} />} />
      

              </Routes>
          </div>
          <div className="footer-section">
            <Footer />
          </div>
        </BrowserRouter>
    </div>
    </ApolloProvider>
  );
}

export default App;