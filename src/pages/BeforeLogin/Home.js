import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './Home.css';

export const images = [
  "/card3.jpg",
  "/card3.jpg",
  "/card3.jpg",
  // Add more image paths as needed
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='Home-container'>
      <div className='Home-photoList'>
        <img
          className="card-photo"
          src={images[currentImageIndex]}
          alt="로고"
        />
        <div className="slider-buttons">
          <button onClick={prevSlide}>
            <IoIosArrowBack />
          </button>
          <button onClick={nextSlide}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div className='Home-slider1'><h4>요리</h4></div>
      <div className='Home-slider2'><h4>원룸</h4></div>
      <div className='Home-slider3'><h4>자취메이트</h4></div>
      <div className='Home-slider3'><h4>커뮤니티</h4></div>
    </div>
  );
};

export default Home;
