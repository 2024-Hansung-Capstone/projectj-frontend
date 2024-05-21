import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { FaCamera } from "react-icons/fa";
import { UploadOutlined } from '@ant-design/icons';
import { Form, Button, Input, Upload } from 'antd';
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
  const [images, setImages] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const location =useLocation();
  const { isLoggedIn,  loggedInUserName } = location.state || {};
  const [createCook] = useMutation(CREATE_COOK, { // 토큰
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
    const selectedImage = e.target.files[0];
    setImages(selectedImage);
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
            post_images: images 
          },
        },
      });

      console.log('게시되었습니다:', data.createCook);
      navigate('/Cooking'); 
    } catch (error) {
        console.error('Error creating cook:', error);
        console.log(JSON.stringify(error, null, 2));
        alert('게시물을 등록하는 중 오류가 발생했습니다. 다시 시도해주세요.'+error);
    }
  };

  return (
    <div className="cooking-post-container">
      <h2>레시피 등록하기</h2>
      <form onSubmit={handleSubmit}>

        {/* 제목 */}
        <div className="form-group">
          <label htmlFor="name" className="cooking-post-title">이름</label>
          <Input id="name" value={name} onChange={handleNameChange} required placeholder='제목'/>
        </div>

         {/* 이미지 */}
        <div className="form-group">
          <label htmlFor="images" className="community-post-photo"><FaCamera /> 사진 첨부 </label>
          <input type="file" id="images" accept="image/*" onChange={handleImagesChange} required />
          {images && <img src={URL.createObjectURL(images)} className="cooking-main-image-preview" />}
        </div>

         {/* 내용(레시피) */}
        <div className="form-group">
          <label htmlFor="detail" className="cooking-post-detail">내용</label>
          <Input.TextArea id="detail" value={detail} onChange={handleDetailChange} required placeholder="내용을 작성하세요." />
        </div>
        <button type="submit" onClick={handleSubmit} className="community-post-button">작성 완료</button>
      </form>
    </div>
  );
}
