import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './Home.css';

export const images = [
  "/list1.png",
  "/list2.png",
  "/list3.png",
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
      <div className='Home-Cook'><h4>요리 (추천 레시피 / 인기 급상승 레시피)</h4></div>
      <div className='Home-OneRoom'><h4>원룸 (추천 원룸 / 원룸 검색창)</h4></div>
      <div className='Home-Mate'><h4>자취메이트 (추천 메이트)</h4></div>
      <div className='Home-Community'><h4>커뮤니티(핫 게시물)</h4></div>
    </div>
  );
};

export default Home;
