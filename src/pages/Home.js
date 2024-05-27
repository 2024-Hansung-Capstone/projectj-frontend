import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of navigate
import './css/Home.css';

export const images = [
  "/assets/home/mainPhoto_1.webp",
  "/assets/home/mainPhoto_2.webp",
  "/assets/home/mainPhoto_3.webp",
  "/assets/home/mainPhoto_4.webp",
  "/assets/home/mainPhoto_5.webp",
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

      {/* 설명 */}
      <div className='Home-detail'> 
      {/* 요리 */}
      <div className='Home-cook'> 
        <div className='Home-cook1'> 
          <p>요리</p>
          <p>냉장고 속 재료로 어떤 요리를 해야할지 고민되세요?</p>
          <p>AI 레시피에게 물어보세요.</p>
          <img src="/assets/cook/cookai2.png" alt="cook1" style={{width:'500px'}} />
          <p>AI가 검색한 레시피로 쉽고 간편하게</p>
          <img src="/assets/cook/cookai1.png" alt="cook1" style={{width:'400px'}} />
          
          
        </div>
      </div>

       {/* 원룸 */}
      <div className='Home-oneroom'> 
      <p>원룸</p>
      
    
      <p>지도를 이동하여 원하는 지역의 원룸 정보를 받아보세요.</p>
      </div>

       {/* 자취메이트 */}
      <div className='Home-mate'> 
      <p>자취메이트</p>
      <img src="/assets/mate/mate1.png" style={{width:'400px'}} />
          
          
      </div>

       {/* 중고마켓 */}
      <div className='Home-market'> 
      <p>중고마켓</p>
      </div>

       {/* 커뮤니티 */}
      <div className='Home-community'>
      <p>커뮤니티</p>
      </div>

      {/* 메시지 */}
      <div className='Home-message'> 
      <p>메시지</p>
      <p>메시지를 통해 다른 사용자와 대화할 수 있어요.</p>
      <img src="/assets/message/message1.png" style={{width:'400px'}} />
        
      </div>

       {/* 알림 */}
      <div className='Home-notification'> 
        <div className='Home-notification1'> 
        <p>알림</p>
        <img src="/assets/notification/notification1.png" style={{width:'400px'}} />
        </div>
        <div className='Home-notification2'>  
        <p>알림을 통해 좋아요, 메시지 등의 알림을 받습니다.</p>
      </div>
      </div>
  
      </div>
    </div>
  );
};

export default Home;
