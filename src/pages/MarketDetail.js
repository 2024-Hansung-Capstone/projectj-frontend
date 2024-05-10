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

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser {
    deleteUser
  }
`;


// UpdateUsedProduct 뮤테이션 정의
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
    //const [loggedInUserName, setLoggedInUserName] = useState('');
    const [loggedInUserId, setLoggedInUserId] = useState('');
    const [deleteUsedProduct] = useMutation(DELETE_USED_PRODUCT);

    // 로그인된 사용자의 정보를 받아옴
    const isLoggedIn = location.state?.isLoggedIn;
    const loggedInUserName = location.state?.loggedInUserName;
    const { product } = location.state;

    const getToken = () => {
        return localStorage.getItem('token') || ''; // 토큰이 없을 경우 빈 문자열 반환
      };

    const [canEditDelete, setCanEditDelete] = useState(false);

    useEffect(() => {
        // 로그인 상태이며, 로그인한 사용자의 ID가 상품 소유자의 ID와 일치하는 경우
        if (isLoggedIn && loggedInUserId === product.user.id) {
            setCanEditDelete(true);
        } else {
            setCanEditDelete(false);
        }
    }, [isLoggedIn, loggedInUserId, product.user.id]);
    
    const handleSendMessage = () => {
        const isLoggedIn = true;
        if (isLoggedIn) {
            navigate('/Message', { state: { recipientId: product.id } });
        } else {
            navigate('/pages/Before/Login');
        }
    };

    // 수정
    const handleEditProduct = () => {
        navigate('/MarketUpdate', { state: { product } });
    };

    // 삭제
    const handleDeleteProduct = async () => {
        if (product?.id) {
            try {
            // 현재 로그인된 사용자의 토큰을 가져옴
                const token = getToken();

                const response = await deleteUsedProduct({
                    variables: { product_id: product.id },
                    context: {
                        headers: {
                          authorization: `Bearer ${getToken()}` // 로컬 스토리지에서 JWT 토큰을 가져옴
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
};

  
    return (
        <div className="container">
            <ToastContainer />
            <h2 className="header">상품 상세 정보</h2>
            {product ? (
                <div>
                    <h3 className="productTitle">제목: {product.title}</h3>
                    <p className="productUser">판매자: {product.user.name}</p>
                    <p className="productCategory">카테고리: {product.category}</p>
                    <p className="productPrice">가격: {product.price} 원</p>
                    <p className="productState">상태: {product.state}</p>
                    <p className="productDetail">상세 설명: {product.detail}</p>
                    <button onClick={handleSendMessage}>쪽지보내기</button>
            <div>
                <button onClick={handleEditProduct}>수정</button>
                <button onClick={handleDeleteProduct}>삭제</button>
            </div>
                </div>
            ) : (
                <p>상품 정보를 불러오는 중...</p>
            )}
        </div>
    );
}
