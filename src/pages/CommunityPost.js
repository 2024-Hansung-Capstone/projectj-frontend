import React, { useState } from 'react';
import './css/CommunityPost.css';
import { FaCamera } from "react-icons/fa";

const CommunitytPost = () => {
  const [title, setTitle] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const [images, setImages] = useState([{ text: '', preview: null }]);
  const [nextId, setNextId] = useState(1);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMainImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setMainImage(URL.createObjectURL(selectedImage));
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };


  const handleAddField = () => {
    setImages([...images, { text: '', preview: null }]);
    setNextId(nextId + 1);
  };

  const handleRemoveField = () => {
    if (images.length > 1) {
      const newImages = [...images];
      newImages.pop();
      setImages(newImages);
      setNextId(nextId - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 게시 버튼이 클릭되었을 때의 동작을 추가하세요
    console.log('게시되었습니다:', { title, mainImage, price, detail, images });
    // 게시 후 필요한 작업을 수행하세요 (예: 데이터베이스에 저장, 페이지 이동 등)
  };

  return (
    <div className="community-post-container">
      <h2>게시물 등록하기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="community-post-title">제목</label>
          <input type="text" className='community-post-input' id="title" value={title} onChange={handleTitleChange} required placeholder='제목'/>
        </div>
        <div className="form-group">
          <label htmlFor="mainImage" className="community-post-photo"><FaCamera /> 사진 첨부 </label>
          <input type="file" id="mainImage" accept="image/*" onChange={handleMainImageChange} required />
          {mainImage && <img src={mainImage} alt="Main Preview" className="community-main-image-preview" />}
        </div>
        <div className="form-group">
          <label htmlFor="detail" className="community-post-detail">내용</label>
          <textarea id="detail" value={detail} onChange={handleDetailChange} required placeholder="내용을 작성하세요." />
        </div>
        <button type="submit" className="community-post-button">작성 완료</button>
      </form>
    </div>
  );
};

export default CommunitytPost;
