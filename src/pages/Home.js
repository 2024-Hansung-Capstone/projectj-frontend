import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import './css/Home.css';
import { gql } from '@apollo/client';

// Mate_Item
const FETCH_ALL_USERS = gql`
  query {
    fetchUsers {
      id
      name
      gender
      birth_at
      mbti
      is_find_mate
      create_at
    }
  }
`;

// Market_Item
const GET_USED_PRODUCTS = gql`
  query GetUsedProducts {
    fetchUsedProducts {
      id
      title
      price
      detail
    }
  }
`;

export const images = [
  "/mainPhoto_1.webp",
  "/mainPhoto_2.webp",
  "/mainPhoto_3.webp",
  "/mainPhoto_4.webp",
  "/mainPhoto_5.webp",
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 쿼리를 사용하여 데이터 가져오기
  const { loading: loadingMates, data: matesData } = useQuery(FETCH_ALL_USERS);
  const { loading: loadingProducts, data: productsData } = useQuery(GET_USED_PRODUCTS);

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

  if (loadingMates || loadingProducts) {
    return <div>Loading...</div>;
  }

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
