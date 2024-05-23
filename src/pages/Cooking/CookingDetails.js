import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/CookingDetails.css';
import { useMutation, gql } from '@apollo/client';

const DELETE_COOK = gql`
  mutation DeleteCook($cook_id: String!) {
    deleteCook(cook_id: $cook_id)
  }
`;
const CookingDetails = () => {
  const location = useLocation();
  const { cook } = location.state || {};
  const navigate = useNavigate();
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



  const [deleteCook] = useMutation(DELETE_COOK, {
    onCompleted: (data) => {
      navigate('/Cooking'); 
    },
    onError: (error) => {
      console.error('Error deleting cook:', error);
      console.log(JSON.stringify(error, null, 2))
    },
  });
  const handleDelete = (cookId) => {
    deleteCook({ variables: { cook_id: cookId } });
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
      <button onClick={() => handleDelete(cook.id)}>삭제</button>
    </div>
  );
};

export default CookingDetails;
