import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of navigate
import './css/Home.css';

export const images = [
  "/mainPhoto_1.webp",
  "/mainPhoto_2.webp",
  "/mainPhoto_3.webp",
  "/mainPhoto_4.webp",
  "/mainPhoto_5.webp",
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate(); // Get the navigate function using useNavigate

  const handleClick = () => {
    navigate('/CommunityDetail');
  };

  useEffect(() => {
    const setScrollableStyle = () => {
      const mateRecommend = document.querySelector('.Mate-recommend');
      if (mateRecommend) {
        mateRecommend.style.whiteSpace = 'nowrap';
      }
    };

    setScrollableStyle();

    // 이미지 슬라이드 3초마다 변경
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex]);


  return (
    <div className='Home-container'>
      <div className='Home-photoList'>
        <img
          className="card-photo"
          src={images[currentImageIndex]}
          alt="로고"
        />
      </div>
    </div>
  );
};

export default Home;
