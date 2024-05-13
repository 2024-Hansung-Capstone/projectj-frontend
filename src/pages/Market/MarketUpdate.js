import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./css/MarketUpdate.css";
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
       user {
         id
         name
       }
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
  const [sellerName, setSellerName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // location.state에서 상품 정보를 확인하고, 상태를 설정합니다.
    if (location.state?.product) {
      const product = location.state.product;
      setId(product.id); 
      setTitle(product.title);
      setPrice(product.price);
      setDetail(product.detail);
      setCategory(product.category);
      setState(product.state);
      setSellerName(product.user.name); // 판매자 이름 설정
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
                detail: updatedProduct.detail,
                category: updatedProduct.category
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
          price: parseFloat(price), // 문자열을 부동 소수점으로 변환
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
    toast.error('상품 수정 중 문제가 발생했습니다.');
  }
};


  return (
    <div className="market-post-container">
      <h2>상품 수정</h2>
      <p>판매자: {sellerName}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category" className="market-label">카테고리</label>
          <select 
          id="category" 
          className="form-control" 
          value={category} 
          onChange={handleCategoryChange}
        >
          <option value="의류">의류</option>
          <option value="신발">신발</option>
          <option value="전자기기">전자기기</option>
          <option value="가구">가구/인테리어</option>
          <option value="도서">도서</option>
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
          <label htmlFor="detail" className="market-post-detail">상품 설명</label>
            <textarea id="detail" className='market-post-input market-post-textarea' value={detail} onChange={handleDetailChange} required placeholder="상품 설명을 입력해주세요."></textarea>
        </div>
        <button type="submit" className="btn market-post-btn">수정완료</button>
      </form>
    </div>
  );
};

export default MarketUpdate;
