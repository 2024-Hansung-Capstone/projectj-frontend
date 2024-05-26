import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/CookingDetails.css';
import { useMutation, useQuery, gql } from '@apollo/client';

const DELETE_COOK = gql`
  mutation DeleteCook($cook_id: String!) {
    deleteCook(cook_id: $cook_id)
  }
`;

export const WHO_AM_I_QUERY = gql`
  query WhoAmI {
    whoAmI {
      id
      name
    }
  }
`;

const CookingDetails = () => {
  const location = useLocation();
  const { cook } = location.state || {};
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(WHO_AM_I_QUERY); 
  const currentUser = data?.whoAmI?.name;

  const [deleteCook] = useMutation(DELETE_COOK, {
    onCompleted: () => {
      navigate('/Cooking'); 
    },
    onError: (error) => {
      console.error('Error deleting cook:', error);
    },
  });

  const handleEdit = () => {
    navigate(`/CookingUpdate`, { state: { cook } });
  };

  const handleDelete = (cookId) => {
    deleteCook({ variables: { cook_id: cookId } });
  };

  const renderDetails = () => {
    if (typeof cook?.detail === 'string') {
      return cook.detail.split(',').map((item, index) => (
        <p key={index} className="detail-item">{item.trim()}</p>
      ));
    }
    return <p className="no-detail">레시피가 없습니다.</p>;
  };

  return (
    <div className="cooking-details-container">
      <div className="ck-main-image-container">
        {cook && cook.post_images.length > 0 ? (
          <img src={cook.post_images[0].imagePath} alt="메인" className="cooking-main-image"/>
        ) : (
          <div className="ck-main-no-image">이미지 없음</div>
        )}
      </div>
      <div className="ck-detail-context">
        <h1 className="name" style={{backgroundColor: 'rgb(93, 155, 0)', color: 'white'}}>{cook?.name || '요리 글 제목'}</h1>
        <div className="author-view-container">
          <p className="author">작성자: {cook?.user?.name}</p>
          <div className="view-count">
            <img src="/view.png" alt="view" style={{width:'30px', marginRight:'5px'}}/>
            {cook.view}
          </div>
        </div>
        <div className="detail" style={{marginTop: '20px'}}>{renderDetails()}</div>
        {currentUser === cook?.user?.name && (
          <>
            <button onClick={handleEdit}>수정</button> 
            <button onClick={() => handleDelete(cook.id)}>삭제</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CookingDetails;
