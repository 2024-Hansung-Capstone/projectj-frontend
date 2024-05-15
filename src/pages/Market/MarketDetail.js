import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/MarketDetail.css';
import { LiaEyeSolid } from "react-icons/lia";
import { GoHeartFill } from "react-icons/go";

const DELETE_USED_PRODUCT = gql`
  mutation DeleteUsedProduct($product_id: ID!) {
    deleteUsedProduct(product_id: $product_id) {
      id
    }
  }
`;

const UPDATE_USED_PRODUCT = gql`
  mutation UpdateUsedProduct($product_id: ID!, $title: String!, $price: Float!, $state: String!, $detail: String!, $like: Int!) {
    updateUsedProduct(product_id: $product_id, title: $title, price: $price, state: $state, detail: $detail, like: $like) {
      id
      title
      price
      state
      detail
      category
      view
      like
      user {
        id
        name
      }
    }
  }
`;

const GET_USED_PRODUCTS = gql`
  query GetUsedProducts {
    fetchUsedProducts {
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

export default function MarketDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product);
  const [deleteUsedProduct] = useMutation(DELETE_USED_PRODUCT);
  const [updateUsedProduct] = useMutation(UPDATE_USED_PRODUCT);
  const { loading, error, data } = useQuery(GET_USED_PRODUCTS);
  const [sellerName, setSellerName] = useState('');


  // 로그인 상태를 확인하는 상태 추가
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState('');  // 현재 로그인된 사용자의 이름


  const getToken = () => {
    return localStorage.getItem('token') || '';
  };

  
  const handleSendMessage = async () => {
    console.log('쪽지 보내기 버튼 클릭됨'); // 버튼 클릭 확인
    if (isLoggedIn) {
      console.log('메시지 작성 페이지로 이동'); // 로그인 상태 확인 로그
      navigate('/MessageCompose', { state: { writingId: product.id, reciverId: product.user.name, category: "market" }});
    } else {
      console.log('로그인 페이지로 이동'); // 로그인 상태가 아닌 경우 로그
      navigate('/pages/Before/Login');
    }
  };
  


  // 컴포넌트가 마운트될 때 로컬 스토리지에서 토큰을 확인하여 로그인 상태 설정
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    
    // 로그인한 사용자의 이름을 로컬 스토리지에서 불러오기
    const loggedInUser = localStorage.getItem('loggedInUserName');
    if (loggedInUser) {
      setLoggedInUserName(loggedInUser);
    } else {
      // 로그인한 사용자 이름이 없는 경우, 로그인 상태를 false로 설정
      setIsLoggedIn(false);
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
  
    // 로그인한 사용자와 판매자가 동일한지 확인
    if (loggedInUserName === sellerName) {
      if (product.id) {
        try {
          const response = await deleteUsedProduct({
            variables: { product_id: product.id },
            context: {
              headers: {
                authorization: `Bearer ${getToken()}`
              }
            },
            refetchQueries: [{ query: GET_USED_PRODUCTS }] // 상품 삭제 후 목록 새로고침
          });
  
          console.log("상품 삭제 성공: ", response);
          toast.success('상품이 성공적으로 삭제되었습니다.');
          navigate('/Market');
        } catch (error) {
          console.log("상품 삭제 에러: ", error);
          toast.error('상품 삭제 중 문제가 발생했습니다.');
        }
      }
    } else {
      // 로그인한 사용자와 판매자가 다른 경우
      toast.error('상품을 삭제할 권한이 없습니다.');
      console.log('상품을 삭제할 권한이 없습니다.');
    }
  }
  
  console.log('판매자:', sellerName);
  console.log('로그인 유무:', isLoggedIn);
  console.log('로그인 사용자:', loggedInUserName);


  return (
    <div className="marketdetail-container">
      <ToastContainer />
      {product ? (
        <div className='marketdetail-container'>
          <div className='marketdetail-container2'>
            <div className='marketdetail-container3'>
              <h3 className="productImage">이미지</h3>
            </div>
            <div className='marketdetail-container4'>
              <h2 className="productTitle">{product.title}</h2>
              <p className="productPrice">{product.price}  원</p>
              <hr></hr>
            <div className='marketdetail-container5'>
              <p className="productUser"><GoHeartFill /></p>
                <p className="productUser">{product.like}</p>
                <p className="productUser"><LiaEyeSolid /></p>
                <p className="productUser">{product.view}</p>
            </div>
              <div className='marketdetail-container6'>
              <div className='productDetail-userbutton'>
              <button onClick={handleEditProduct}>수정</button>
              <button onClick={handleDeleteProduct}>삭제</button>
            </div>
                <p className="productUser">판매자</p>
                <p className="productUser">{product.user?.name}</p>
                <p className="productCategory">카테고리</p>
                <p className="productCategory">{product.category}</p>
                <p className="productState">판매상태</p>
                <p className="productState">{product.state}</p>
              </div>
          <div className='productDetailBtn'>
            <button onClick={handleSendMessage}>쪽지보내기</button>

            <button>찜하기</button>
            </div>
        </div>
        </div>
        <div className="productDetail">
          <h4>상품정보</h4>
          <hr></hr>
          {product.detail}
          </div>
        </div>
      ) : (
        <p>상품 정보를 불러오는 중...</p>
      )}
    </div>
  );
}