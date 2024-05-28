import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { FaCamera } from "react-icons/fa";
import { Input } from 'antd';
import './css/CookingPost.css';

// 레시피 생성
const CREATE_COOK = gql`
  mutation CreateCook($createCookInput: CreateCookInput!) {
    createCook(createCookInput: $createCookInput) {
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

export default function CookingPost() {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const recipeInstructions = location.state ? location.state.recipeInstructions : '';
  const allIngredientsMap = location.state ? location.state.allIngredientsMap : new Map();
  const recipeName = location.state ? location.state.recipeName : '';
  const { isLoggedIn, loggedInUserName } = location.state || {};
  const [createCook] = useMutation(CREATE_COOK, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    },
  });

  // 제목
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // 내용 (레시피)
  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  // 이미지
  const handleImagesChange = (e) => {
    const selectedImages = e.target.files;
    const validImages = Array.from(selectedImages).filter(image => image.type.startsWith('image/'));
    setImages(validImages);
  };

  // 완료
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createCook({
        variables: {
          createCookInput: {
            name,
            detail,
            post_images: images,
          },
        },
      });

      console.log('게시되었습니다:', data.createCook);
      navigate('/Cooking'); 
    } catch (error) {
      console.error('Error creating cook:', error);
      console.log(JSON.stringify(error, null, 2));
      alert('게시물을 등록하는 중 오류가 발생했습니다. 다시 시도해주세요.' + error);
    }
  };

  useEffect(() => {
    if (recipeName) {
      setName(recipeName);
    }
    if (recipeInstructions && allIngredientsMap) {
      const ingredientsDetail = Array.from(allIngredientsMap.entries())
        .map(([name, volume]) => `${name}: ${volume}`)
        .join('\n');
      setDetail(`${ingredientsDetail}\n\n${recipeInstructions}`);
    }
  }, [recipeInstructions, allIngredientsMap, recipeName]);

  return (
    <div className="cooking-post-container">
      <div className="community-post-header">
        <img src='/assets/cook/cook2.png' alt='cook2' style={{width:'40px', height: '40px', marginBottom:'5px', marginRight:'10px'}}/>
        <h2>레시피 등록</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {/* 요리명 */}
        <div className="cp-name">
          <label htmlFor="name" className="cooking-post-title">요리명</label>
          <Input id="name" value={name} onChange={handleNameChange} required placeholder='제목'/>
        </div>

        {/* 이미지 */}
        <div className="cp-image">
          <label htmlFor="images" className="community-post-photo"><FaCamera /> 사진 첨부 </label>
          <input type="file" id="images" accept="image/*" onChange={handleImagesChange} required />
          {images.length > 0 && <img src={URL.createObjectURL(images[0])} className="cooking-main-image-preview" alt="미리보기" />}
        </div>

        {/* 레시피 */}
        <div className="cp-detail">
          <label htmlFor="detail" className="cooking-post-detail">레시피</label>
          <Input.TextArea id="detail" value={detail} onChange={handleDetailChange} required placeholder="내용을 작성하세요." style={{minHeight:'300px'}}/>
        </div>
        <button type="cp-submit" onClick={handleSubmit} className="cu-post-button">작성 완료</button>
      </form>
    </div>
  );
}
