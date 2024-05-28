import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import Category from "./components/Category";
import Footer from "./components/Footer";
import NotificationBanner from "./pages/Notification/NotificationBanner";
// main
import HeaderA from "./pages/Header";
import Home from "./pages/Home";
import Mate from "./pages/Mate/Mate";
import Oneroom from "./pages/Oneroom/Oneroom";
import OneroomDetails from "./pages/Oneroom/OneroomDetails";
import Cooking from "./pages/Cooking/Cooking";
import CookingAI from "./pages/Cooking/CookingAI";
import MyPage from "./pages/MyPage";
import MessageSendBox from "./pages/Message/MessageSendBox";
import MessageReceiveBox from "./pages/Message/MessageReceiveBox";
import MessageCompose from "./pages/Message/MessageCompose";
import MessageSuccess from "./pages/Message/MessageSuccess";
import MessageDetail from "./pages/Message/MessageDetail";
import MessageReply from "./pages/Message/MessageReply";
import CookingUpdate from './pages/Cooking/CookingUpdate';
import CookingPost from './pages/Cooking/CookingPost';
import CookingDetails from "./pages/Cooking/CookingDetails";
import CommunityPost from './pages/Community/CommunityPost';
import CommunityDetail from './pages/Community/CommunityDetail';
import MarketPost from './pages/Market/MarketPost';
import MarketDetail from './pages/Market/MarketDetail';
import MarketUpdate from './pages/Market/MarketUpdate';
import Community from "./pages/Community/Community";
import CommunityUpdate from "./pages/Community/CommunityUpdate";
import Notification from "./pages/Notification/Notification";

// mypage
import EditUserInfo from './pages/EditUserInfo';

// BeforeLogin
import HeaderB from "./pages/BeforeLogin/Header";
import Login from "./pages/BeforeLogin/Login";
import Signup from "./pages/BeforeLogin/Signup";
import Market from "./pages/Market/Market";
import TermsOfService from "./pages/BeforeLogin/TermsOfService";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 상태를 관리

  // 사용자가 로그인하면 호출되는 함수
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // 사용자가 로그아웃하면 호출되는 함수
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // 인증 토큰 가져오기 (예: 로컬 스토리지에서)
  const token = localStorage.getItem('token');

  // 인증 헤더 설정
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: 'http://54.180.182.40:5000/graphql', 
  });

  const client = new ApolloClient({
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="root-wrap">
        <BrowserRouter>
          <div className="header-section">
            {isAuthenticated ? <HeaderA /> : <HeaderB onLogin={handleLogin} />}
          </div>
          <NotificationBanner /> {/* Render NotificationBanner component */}
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
              <Route path="/CookingAI" element={isAuthenticated ? <CookingAI onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
              <Route path="/CookingPost" element={isAuthenticated ? <CookingPost /> : <Login onLogin={handleLogin} />} />
              <Route path="/CookingDetails" element={isAuthenticated ? <CookingDetails /> : <Login onLogin={handleLogin} />} />
              <Route path="/CookingUpdate" element={isAuthenticated ? <CookingUpdate onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
              
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/MyPage" element={isAuthenticated ? <MyPage onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
              <Route path="/MessageSendBox"  element={isAuthenticated ? <MessageSendBox /> : <Login onLogin={handleLogin} />} />
              <Route path="/MessageReceiveBox"  element={isAuthenticated ? <MessageReceiveBox /> : <Login onLogin={handleLogin} />} />
              <Route path="/MessageCompose"  element={isAuthenticated ? <MessageCompose /> : <Login onLogin={handleLogin} />} />
              <Route path="/MessageSuccess"  element={isAuthenticated ? <MessageSuccess /> : <Login onLogin={handleLogin} />} />
              <Route path="/MessageDetail"  element={isAuthenticated ? <MessageDetail /> : <Login onLogin={handleLogin} />} />                <Route path="/MessageReply"  element={isAuthenticated ? <MessageReply /> : <Login onLogin={handleLogin} />} />
              <Route path="/EditUserInfo" element={isAuthenticated ? <EditUserInfo /> : <Login onLogin={handleLogin} />} />
              <Route path="/Notification" element={isAuthenticated ? <Notification /> : <Login onLogin={handleLogin} />} />
              <Route path="/" element={<MessageReceiveBox />} />
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