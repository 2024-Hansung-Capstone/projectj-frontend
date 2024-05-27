import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

const UPDATE_COOK = gql`
  mutation UpdateCook($cook_id: String!, $updateCookInput: UpdateCookInput!) {
    updateCook(cook_id: $cook_id, updateCookInput: $updateCookInput) {
      id
      name
      detail
      post_images {
        id
        imagePath
      }
    }
  }
`;

const CookingUpdate = () => {
  const location = useLocation();
  const [cook, setCook] = useState(location.state?.cook);
  const [formState, setFormState] = useState({
      id: cook.id,
      name: cook.name,
      detail: cook.detail,
      post_images: []
  });
  const navigate = useNavigate();
  const [updateCook] = useMutation(UPDATE_COOK, {
      onCompleted: (data) => {
          alert('레시피가 성공적으로 수정되었습니다.');
          navigate('/Cooking')
      },
      onError: (error) => {
          console.error('레시피 수정 중 오류 발생:', error);
          console.log(JSON.stringify(error, null, 2));
          alert('레시피 수정 중 오류가 발생했습니다.');
      }
  });

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormState({
          ...formState,
          [name]: value
      });
  };

  const handleFileChange = (e) => {
      setFormState({
          ...formState,
          post_images: e.target.files
      });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await updateCook({
              variables: {
                cook_id: formState.id,
                updateCookInput: {
                    name: formState.name,
                    detail: formState.detail,
                    post_images: Array.from(formState.post_images)
                  }
              }
          });
      } catch (error) {
          console.error('레시피 수정 중 오류 발생:', error);
          alert('레시피 수정 중 오류가 발생했습니다.');
      }
  };

  return (
      <div className="cooking-post-container">
          <div className="community-post-header">
            <img src='/assets/cook/cook2.png' alt='cook2' style={{width:'40px', height: '40px', marginBottom:'5px', marginRight:'10px'}}/>
            <h2>레시피 수정</h2>
        </div>
          <form onSubmit={handleSubmit}>
              <div>
                  <label className="cooking-post-label">제목:</label> {/* 클래스명 변경 */}
                  <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                  />
              </div>
              <div>
                  <label className="cooking-post-label">내용:</label> {/* 클래스명 변경 */}
                  <textarea
                      name="detail"
                      value={formState.detail}
                      onChange={handleInputChange}
                      style={{height: '300px'}}
                  />
              </div>
              <div>
                  <label className="cooking-post-label">이미지 업로드:</label> {/* 클래스명 변경 */}
                  <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                  />
              </div>
              <button type="submit" className="cu-post-button">수정</button> {/* 클래스명 변경 */}
          </form>
      </div>
  );
};

export default CookingUpdate;
