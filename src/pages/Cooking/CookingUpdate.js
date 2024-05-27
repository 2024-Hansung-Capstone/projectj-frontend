import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Input } from 'antd';

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
          alert('게시글이 성공적으로 수정되었습니다.');
          navigate('/Cooking')
      },
      onError: (error) => {
          console.error('게시글 수정 중 오류 발생:', error);
          console.log(JSON.stringify(error, null, 2));
          alert('게시글 수정 중 오류가 발생했습니다.');
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
          console.error('게시글 수정 중 오류 발생:', error);
          alert('게시글 수정 중 오류가 발생했습니다.');
      }
  };

  return (
      <div className="container"> {/* container 클래스 추가 */}
          <h2>레시피 수정</h2>
          <form onSubmit={handleSubmit}>
              <div>
                  <label>제목:</label>
                  <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                  />
              </div>
              <div>
                  <label>내용:</label>
                  <textarea
                      name="detail"
                      value={formState.detail}
                      onChange={handleInputChange}
                  />
              </div>
              <div>
                  <label>이미지 업로드:</label>
                  <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                  />
              </div>
              <button type="cu-submit">수정</button>
          </form>
      </div>
  );
};

export default CookingUpdate;
