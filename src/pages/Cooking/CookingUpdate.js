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
  const { cook } = location.state || {};
  const [formState, setFormState] = useState({
    name: cook?.name || '',
    detail: cook?.detail || '',
    post_images: cook?.post_images || []
  });
  const navigate = useNavigate();

  const [updateCook] = useMutation(UPDATE_COOK, {
    onCompleted: () => {
      alert('게시글이 성공적으로 수정되었습니다.');
      navigate('/Cooking');
    },
    onError: (error) => {
      console.error('게시글 수정 중 오류 발생:', error);
      alert(`게시글 수정 중 오류가 발생했습니다: ${error.message}`);
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImagesChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setFormState(prevState => ({
      ...prevState,
      post_images: selectedImages
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState); // 제출 시 formState 상태 확인
    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('detail', formState.detail);
      formState.post_images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });
      
      await updateCook({
        variables: {
          cook_id: cook.id,
          updateCookInput: formData // 파일 경로를 서버에서 받아 처리할 것으로 가정
        },
      });
    } catch (error) {
      console.error('Error updating cook:', error);
      alert('게시물을 수정하는 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="cooking-update-container">
      <h2>레시피 수정하기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="cooking-update-title">이름</label>
          <Input
            id="name"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            required
            placeholder="제목"
          />
        </div>

        <div>
          <label>이미지 업로드:</label>
          <input
            type="file"
            multiple
            onChange={handleImagesChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="detail" className="cooking-update-detail">내용</label>
          <Input.TextArea
            id="detail"
            name="detail"
            value={formState.detail}
            onChange={handleInputChange}
            required
            placeholder="내용을 작성하세요."
          />
        </div>

        <button type="submit" className="cooking-update-button">수정 완료</button>
      </form>
    </div>
  );
};

export default CookingUpdate;
