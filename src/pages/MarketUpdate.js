import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./css/Market.css";
import { useMutation, gql } from '@apollo/client';
import { toast } from 'react-toastify'

const UPDATE_USED_PRODUCT = gql`
 mutation UpdateUsedProduct($updateUsedProductInput: UpdateUsedProductInput!) {
    updateUsedProduct(updateUsedProductInput: $updateUsedProductInput) {
       id
       title
       price
       detail
       category
       state
    }
}
`;

const MarketUpdate = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // location.state에서 상품 정보를 확인하고, 상태를 설정합니다.
    if (location.state?.product) {
      setId(location.state.product.id); 
      setTitle(location.state.product.title);
      setPrice(location.state.product.price);
      setDetail(location.state.product.detail);
      setCategory(location.state.product.category);
      setState(location.state.product.state);
    } else {
      navigate("/");
    }
  }, [location, navigate]); // location을 의존성 배열에 추가

  const [updateUsedProduct] = useMutation(UPDATE_USED_PRODUCT);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  // 수정 버튼 클릭 시 실행되는 함수
  const handleUpdateProduct = async (updatedProduct) => {
    try {
        const response = await updateUsedProduct({ 
            variables: { 
                product_id: updatedProduct.id,
                title: updatedProduct.title,
                price: updatedProduct.price,
                state: updatedProduct.state,
                detail: updatedProduct.detail
            } 
        });
        console.log("상품 수정 성공: ", response);
        toast.success('상품이 성공적으로 수정되었습니다.');
        navigate('/Market');
    } catch (error) {
        console.log("상품 수정 에러: ", error);
        toast.error('상품 수정 중 문제가 발생했습니다.');
    }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await updateUsedProduct({
      variables: {
        updateUsedProductInput: {
          id,
          title,
          price: parseInt(price, 10), // `parseInt` 함수에는 두 번째 인자로 기수(10)를 전달
          detail,
          category,
          state
        },
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token') || ''}`
        }
      }
    });
    console.log('Updated used product:', data.updateUsedProduct);
    // 수정된 상품 정보를 `state` 객체에 포함시켜 `MarketDetail` 페이지로 네비게이션
    navigate("/MarketDetail", { state: { product: data.updateUsedProduct } });
  } catch (error) {
    console.error('Error updating used product:', error);
  }
};

  return (
    <div className="market-post-container">
      <h2>상품 수정하기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category" className="market-label">카테고리</label>
          <select 
          id="category" 
          className="form-control" 
          value={category} 
          onChange={handleCategoryChange}
        >
          <option value="clothing">의류</option>
          <option value="shoes">신발</option>
          <option value="electronic">전자기기</option>
          <option value="furniture">가구</option>
          <option value="food">식품</option>
          <option value="book">도서</option>
          </select>
          </div>

          <div className="form-group">
          <label htmlFor="category" className="market-label">판매 상태</label>
          <select 
          id="state" 
          className="form-control" 
          value={state} 
          onChange={handleStateChange}
        >
          <option value="판매중">판매중</option>
          <option value="예약중">예약중</option>
          <option value="판매완료">판매완료</option>
          </select>
          </div>
        <div className="form-group">
          <label htmlFor="title" className="market-post-title">제목</label>
          <input type="text" className='market-post-input' id="title" value={title} onChange={handleTitleChange} required placeholder='제목'/>
        </div>
  
        <div className="form-group">
          <label htmlFor="price" className="market-post-price">판매 가격</label>
          <input id="price" className='market-post-input' value={price} onChange={handlePriceChange} required placeholder="₩ 가격을 입력해주세요." />
        </div>
        <div className="form-group">
            <textarea id="detail" className='market-post-input market-post-textarea' value={detail} onChange={handleDetailChange} required placeholder="상품 설명을 입력해주세요."></textarea>
        </div>
        <button type="submit" className="btn market-post-btn" onClick={handleUpdateProduct}>수정하기</button>
      </form>
    </div>
  );
};

export default MarketUpdate;
