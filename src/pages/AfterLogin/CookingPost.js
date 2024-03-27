import React, { useState } from 'react';
import './css/CookingPost.css';

const CookingPost = () => {
  const [title, setTitle] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [content, setContent] = useState('');
  const [images, setImages] = useState([{ text: '', preview: null }]);
  const [nextId, setNextId] = useState(1);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleMainImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setMainImage(URL.createObjectURL(selectedImage));
  };

  const handleTextChange = (index, e) => {
    const newImages = [...images];
    newImages[index].text = e.target.value;
    setImages(newImages);
  };

  const handleImageChange = (index, e) => {
    const selectedImage = e.target.files[0];
    const newImages = [...images];
    newImages[index].preview = URL.createObjectURL(selectedImage);
    setImages(newImages);
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
    console.log('게시되었습니다:', { title, mainImage, content, images });
    // 게시 후 필요한 작업을 수행하세요 (예: 데이터베이스에 저장, 페이지 이동 등)
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
          {mainImage && <img src={mainImage} alt="Main Preview" className="cooking-main-image-preview" />}
        </div>
        <div className="form-group">
          <label htmlFor="content" className="cooking-post-title">소개글</label>
          <textarea id="content" value={content} onChange={handleContentChange} required />
        </div>
        <label className="cooking-post-title">레시피</label>
        {images.map((image, index) => (
          <div key={index} className="form-group">
            <label> {`${index + 1}번`} </label>
            <div>
              <input type="text" value={image.text} onChange={(e) => handleTextChange(index, e)} placeholder="레시피를 작성하세요" />
              <input type="file" accept="image/*" onChange={(e) => handleImageChange(index, e)} />
              {image.preview && <img src={image.preview} alt="Preview" className="reciepe-image-preview" />}
            </div>
          </div>
        ))}
        <div className="form-group">
          <button type="button" onClick={handleAddField}>+</button>
          <button type="button" onClick={handleRemoveField}>-</button>
        </div>
        <button type="submit" className="cooking-post-button">게시</button>
      </form>
    </div>
  );
};

export default CookingPost;
