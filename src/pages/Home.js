import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { TbSquareRoundedLetterP } from "react-icons/tb";
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
        <img className="card-photo" src={images[currentImageIndex]} alt="로고"/>
      </div>

      {/* 설명 */}
      <div className='Home-detail'> 
      {/* 요리 */}
      <div className='Home-cook'> 
        <div className="Home-title">
          <img src='/assets/cook/cook2.png' alt='cook2' style={{width:'30px', height: '30px', marginRight:'10px'}}/>
          <h2>요리</h2>
        </div>

        <div className='Home-cook1'> 
          <div className='Home-cook1-1'> 
            <p>냉장고 속 재료로 어떤 요리를 해야할지 고민되세요?</p>
            <p>AI 레시피에게 물어보세요.</p>
          </div>
          <img src="/assets/cook/cook3.png"/>
        </div>

        <div className='Home-cook2'> 
          <img src="/assets/cook/cook4.png" />
          <p>AI가 검색한 레시피로 쉽고 간편하게</p>
        </div>
      </div>

       {/* 원룸 */}
      <div className='Home-oneroom'> 
      <div className="Home-title">
        <img src='/assets/oneroom/home.png' style={{width:'40px', height: '40px', marginRight:'10px'}}/>
        <h2>원룸</h2>
      </div>
      <div className="Home-oneroom1">
        <p>지도를 이동하여 원하는 지역의 원룸 정보를 받아보세요.</p>
        <img src="/assets/oneroom/oneroom2.png" alt="oneroom"/>
      </div>
      </div>

       {/* 자취메이트 */}
      <div className='Home-mate'> 
        <div className="Home-title">
          <img src='/assets/mate/mate2.png' style={{width:'40px', height: '40px', marginRight:'10px'}}/>
          <h2>자취메이트</h2>
        </div>
        <div className='Home-mate1'> 
          <img src="/assets/mate/mate1.png"/>
          <p>나와 맞는 동네친구 찾자!</p>
        </div>
        <div className='Home-mate2'> 
          <p>유형별로 다양하게 검색할 수 있어요.</p>
          <img src="/assets/mate/mateFilter.png"/>
        </div>
      </div>

       {/* 중고마켓 */}
      <div className='Home-market'> 
        <div className="Home-title">
          <img src='/assets/market/marketPost.png' style={{width:'40px', height: '40px', marginRight:'10px'}}/>
          <h2>중고마켓</h2>
        </div>
        <div className='Home-market1'> 
          <p>안쓰는 물건을 사고팔아요.</p>
          <img src="/assets/market/market2.png" alt="market"/>
        </div>
      </div>

       {/* 커뮤니티 */}
      <div className='Home-community'>
      <div className="Home-title">
        <img src='/assets/community/write.png' style={{width:'40px', height: '40px', marginRight:'10px'}}/>
        <h2>커뮤니티</h2>
      </div>
        <div className='Home-community1'>
          <p>다른 유저들의 생생한 자취 정보를 얻을 수 있어요.</p>
          <img src="/assets/community/board3.png"/>
          </div>
          <div className='Home-community2'>
            <img src="/assets/community/board2.png"/>
            <p>댓글로 함께 일상을 공유해보세요.</p>
          </div>
        </div>

      {/* 메시지 */}
      <div className='Home-message'> 
      <div className="Home-title">
        <img src='/assets/home/message.png' style={{width:'40px', height: '40px', marginRight:'10px'}}/>
        <h2>메시지</h2>
      </div>
        <div className='Home-notification1'> 
          <p>메시지를 통해 다른 사용자와 대화를 나눌 수 있어요.</p>
          <img src="/assets/message/messagebox.png"/>
        </div>
      </div>

       {/* 알림 */}
      <div className='Home-notification'> 
      <div className="Home-title">
        <img src='/assets/notification/notification.png' style={{width:'40px', height: '40px', marginRight:'10px'}}/>
          <h2>알림</h2>
        </div>
        <div className='Home-notification1'> 
        <p>알림을 통해 좋아요, 메시지 등의 알림을 받아요.</p>
        <img src="/assets/notification/notification1.png" />
        </div>
      </div>
{/* 등급 */}
<div className='Home-level'> 
        <div className='Home-title'>
          <TbSquareRoundedLetterP style={{ width: '40px', height: '40px', marginRight: '10px' }} />
          <h2>등급 및 포인트</h2>
        </div>
        <div className='Home-level1'> 
          <p>게시글 작성을 통해 포인트를 얻어, 레벨업 할 수 있어요!</p>
          <table className="level-table">
            <thead>
              <tr>
                <th>level</th>
                <th>point</th>
                <th>name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>lv1</td>
                <td>0~1000</td>
                <td>자취어린이</td>
              </tr>
              <tr>
                <td>lv2</td>
                <td>1001~2000</td>
                <td>자취어린이</td>
              </tr>
              <tr>
                <td>lv3</td>
                <td>2001~3000</td>
                <td>자취어린이</td>
              </tr>
              <tr>
                <td>lv4</td>
                <td>3001~4000</td>
                <td>자취어린이</td>
              </tr>
              <tr>
                <td>lv5</td>
                <td>4001~</td>
                <td>자취어린이</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      </div>
    </div>
  );
};

export default Home;
