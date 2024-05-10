import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/MarketDetail.css';

const DELETE_USED_PRODUCT = gql`
  mutation DeleteUsedProduct($product_id: ID!) {
    deleteUsedProduct(product_id: $product_id) {
      id
    }
  }
`;

const UPDATE_USED_PRODUCT = gql`
  mutation UpdateUsedProduct($product_id: ID!, $title: String!, $price: Float!, $state: String!, $detail: String!) {
    updateUsedProduct(product_id: $product_id, title: $title, price: $price, state: $state, detail: $detail) {
      id
      title
      price
      state
      detail
      category
      user {
        id
        name
      }
    }
  }
`;

export default function MarketDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product);
  const [deleteUsedProduct] = useMutation(DELETE_USED_PRODUCT);
  const [updateUsedProduct] = useMutation(UPDATE_USED_PRODUCT);
  const [sellerName, setSellerName] = useState('');


  // 로그인 상태를 확인하는 상태 추가
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState('');  // 현재 로그인된 사용자의 이름


  const getToken = () => {
    return localStorage.getItem('token') || '';
  };

  
  const handleSendMessage = () => {
    if (isLoggedIn) { // 수정된 부분
      navigate('/Message', { state: { recipientId: product.user.name } });
    } else {
      navigate('/pages/Before/Login');
    }
  };

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 토큰을 확인하여 로그인 상태 설정
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUserName');
    if (loggedInUser) {
      setLoggedInUserName(loggedInUser);
    }
  }, []);
  

  useEffect(() => {  // 판매자 정보 
    if (product && product.user) {
      const sellerName = product.user.name;
      setSellerName(sellerName);
    }
  }, [product]);

  const handleEditProduct = () => {
    navigate('/MarketUpdate', { state: { product, loggedInUserName } });
  };

  const handleDeleteProduct = async () => {
    console.log(`로그인한 사용자: ${loggedInUserName}, 판매자: ${sellerName}`); // 디버깅을 위한 로그 추가

    if (loggedInUserName.trim().toLowerCase() !== sellerName.trim().toLowerCase()) {
      toast.error('상품을 삭제할 수 있는 권한이 없습니다.');
      return;
    }

    if (product?.id) {
      try {
        const token = getToken();
        if (!token) {
          toast.error('인증 토큰이 없습니다. 다시 로그인해 주세요.');
          navigate('/login');
          return;
        }

        const response = await deleteUsedProduct({
          variables: { product_id: product.id },
          context: {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        });

        console.log("상품 삭제 성공: ", response);
        toast.success('상품이 성공적으로 삭제되었습니다.');
        navigate('/Market');
      } catch (error) {
        console.log("상품 삭제 에러: ", error);
        toast.error('상품 삭제 중 문제가 발생했습니다.');
      }
    }
  }

  console.log('판매자:', sellerName);
  console.log('로그인 사용자:', loggedInUserName);


  return (
    <div className="container">
      <ToastContainer />
      <h2 className="header">상품 상세 정보</h2>
      {product ? (
        <div>
          <h3 className="productTitle">제목: {product.title}</h3>
          <p className="productUser">판매자: {product.user?.name}</p>
          <p className="productCategory">카테고리: {product.category}</p>
          <p className="productPrice">가격: {product.price} 원</p>
          <p className="productState">상태: {product.state}</p>
          <p className="productDetail">상세 설명: {product.detail}</p>
          <div className='productDetailBtn'>
            <button onClick={handleSendMessage}>쪽지보내기</button>
            <div>
              <button onClick={handleEditProduct}>수정</button>
              <button onClick={handleDeleteProduct}>삭제</button>
            </div>
          </div>
        </div>
      ) : (
        <p>상품 정보를 불러오는 중...</p>
      )}
    </div>
  );
}
