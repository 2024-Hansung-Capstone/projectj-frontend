import React from 'react';
import { useLocation } from 'react-router-dom';
import './css/CookingDetails.css';

const CookingDetails = () => {
  const location = useLocation();
  const { cook } = location.state || {};

  const renderDetails = () => {
    if (Array.isArray(cook?.detail)) {
      return cook.detail.map((item, index) => (
        <p key={index} className="detail-item">{item}</p>
      ));
    }
    if (typeof cook?.detail === 'string') {
      return <p className="detail-item">{cook.detail}</p>;
    }
    return <p className="no-detail">레시피가 없습니다.</p>;
  };

  return (
    <div className="cooking-details-container">
      <div className="ck-main-image-container">
        {cook && cook.post_images.length > 0 ? (
          <img src={cook.post_images[0].imagePath} alt="메인" className="cooking-main-image" />
        ) : (
          <div className="ck-main-no-image">이미지 없음</div>
        )}
      </div>
      <p className="author">작성자: {cook?.user?.name}</p>
      <h1 className="name">{cook?.name || '요리 글 제목'}</h1>
      <div className="detail">내용: {cook.detail}</div>
      <div>조회수: {cook.view}</div>
      <button>수정</button>
      <button>삭제</button>
    </div>
  );
};

export default CookingDetails;
