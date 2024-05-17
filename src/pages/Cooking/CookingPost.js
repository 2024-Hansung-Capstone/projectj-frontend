import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import './css/CookingPost.css';

// GraphQL mutation 쿼리 정의
const CREATE_COOK = gql`
  mutation CreateCook($input: CreateCookInput!) {
    createCook(createCookInput: $input) {
      id
      name
      detail
      view
      create_at
    }
  }
`;

const CookingPost = () => {
  const [title, setTitle] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [createCook] = useMutation(CREATE_COOK);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleMainImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setMainImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('input[name]', title); // 요리 이름 추가
      formData.append('input[detail]', content); // 요리 설명 추가
      formData.append('input[post_images]', mainImage); // 대표 이미지 추가
  
      // GraphQL mutation 호출
      const { data } = await createCook({
        variables: { input: formData }
      });
  
      // 작성된 요리 글의 ID를 가져와서 이동
      navigate(`/Cooking/${data.createCook.id}`);
    } catch (error) {
      console.error('게시 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className="cooking-post-container">
      <h2>요리 글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="cooking-post-title">제목</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="mainImage" className="cooking-post-title">대표 사진 첨부</label>
          <input type="file" id="mainImage" accept="image/*" onChange={handleMainImageChange} required />
          {mainImage && <img src={URL.createObjectURL(mainImage)} alt="Main Preview" className="cooking-main-image-preview" />}
        </div>
        <div className="form-group">
          <label htmlFor="content" className="cooking-post-title">소개글</label>
          <textarea id="content" value={content} onChange={handleContentChange} required />
        </div>
        <button type="submit" className="cooking-post-button">게시</button>
      </form>
    </div>
  );
};

export default CookingPost;
