import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './Home.css';
import Mate_Item from '../../item/Mate_Item';

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

  const setScrollableStyle = () => {
    const mateRecommend = document.querySelector('.Mate-recommend');
    if (mateRecommend) {
      // 조건 추가: Mate-recommend의 실제 너비가 컨테이너를 벗어날 때만 스크롤 적용
      //mateRecommend.style.overflowX = mateRecommend.scrollWidth > mateRecommend.clientWidth ? 'auto' : 'hidden';
      mateRecommend.style.whiteSpace = 'nowrap';
    }
  };
  
  useEffect(() => {
    setScrollableStyle();
  }, []);
  

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
      <h4>요리 (추천 레시피 / 인기 급상승 레시피)</h4>
      <div className='Home-Cook'>
      </div>
      <h4>원룸 (추천 원룸 / 원룸 검색창)</h4>
      <div className='Home-OneRoom'>
      </div>
      <h4>자취메이트 (추천 메이트)</h4>
      <div className='Home-Mate'>
        <Mate_Item />
        <Mate_Item />
        <Mate_Item />
        <Mate_Item />
        <Mate_Item />
      </div>
      <h4>커뮤니티(핫 게시물)</h4>
      <div className='Home-Community'>
        </div>
        <h4>생활꿀팁 (청소편) -  유튜브 연결</h4>
      <div className='Home-Tip'>
        </div>
    </div>
  );
};

export default Home;
