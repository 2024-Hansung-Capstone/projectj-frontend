import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Category from "./components/Category";
import Mate from "./pages/Mate";
import './App.css';

function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter>
        <div className="header-section">
          <Header />
        </div>
        <div className="main-section">
          <Category />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Mate" element={<Mate />} />
          </Routes>
        </div>
        <div className="footer-section">
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
