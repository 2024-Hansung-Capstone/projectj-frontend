import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import './css/MessageCompose.css';

const WRITE_LETTER = gql`
  mutation WriteLetter($writing_id: String!, $createLetterInput: CreateLetterInput!) {
    writeLetter(writing_id: $writing_id, createLetterInput: $createLetterInput) {
      id
      sender {
        name
      }
      receiver {
        name
      }
      product {
        title
      }
      board {
        title
      }
      category
      title
      detail
    }
  }
`;

const FETCH_MY_SEND_LETTERS = gql`
  query FetchMySendLetters {
    fetchMySendLetters {
      id
      sender {
        name
      }
      receiver {
        name
      }
      category
      title
      detail
    }
  }
`;

const FETCH_USER_BY_ID = gql`
  query FetchUserById($user_id: String!) {
    fetchUserById(user_id: $user_id) {
      name
    }
  }
`;

const FETCH_USED_PRODUCT_BY_ID = gql`
  query FetchUsedProductById($id: String!) {
    fetchUsedProductById(id: $id) {
      title
    }
  }
`;

const MessageCompose = () => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [category, setCategory] = useState('자취생메이트');
  const [writingId, setWritingId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { loading, error, data, refetch } = useQuery(FETCH_MY_SEND_LETTERS); // refetch 추가
  const { data: userData } = useQuery(FETCH_USER_BY_ID, {
    variables: { user_id: writingId } 
  });
  const { data: productData } = useQuery(FETCH_USED_PRODUCT_BY_ID, {
    variables: { id: writingId } 
  });
  const [writeLetter] = useMutation(WRITE_LETTER);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.writingId) {
      setWritingId(location.state.writingId);
      setCategory(location.state.category || '자취생메이트');
      console.log('writingId set from location state:', location.state.writingId); // writingId 출력
    }
  }, [location]);
  

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  const renderLabelAndValue = () => {
    if (category === '자취생메이트') {
      return {
        label: '받는 이:',
        value: userData?.fetchUserById?.name || '',
      };
    } else if (category === '커뮤니티') {
      return {
        label: '글 제목:',
        value: data?.writeLetter?.board?.title || '',
      };
    } else if (category === '중고마켓') {
      return {
        label: '글 제목:',
        value: productData?.fetchUsedProductById?.title || '',
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await writeLetter({
        variables: {
          writing_id: writingId,
          createLetterInput: {
            title,
            detail,
            category,
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token') || ''}`
          }
        },
        refetchQueries: [{ query: FETCH_MY_SEND_LETTERS }] // refetchQueries 추가
      });
      console.log('작성된 쪽지:', data.writeLetter);
      navigate("/MessageSuccess");
    } catch (error) {
      console.error('쪽지 작성 중 오류:', error);
      let errorMessage = "쪽지 작성 중 오류가 발생했습니다.";
      
      if (error.message.includes("쪽지를 허용하지 않는 카테고리입니다.")) {
        errorMessage = "선택하신 카테고리는 쪽지를 작성할 수 없습니다. 다른 카테고리를 선택해 주세요.";
      } else if (error.networkError) {
        errorMessage = "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.";
      } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        errorMessage = `서버 오류: ${error.graphQLErrors[0].message}`;
      }
  
      setErrorMessage(errorMessage);
    }
  };
  

  return (
    <div className="message-post-container">
      <h2>쪽지 작성하기</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="writingId">{renderLabelAndValue().label}</label>
          <input id="writingId" type="text" value={renderLabelAndValue().value} readOnly />
        </div>
        <div className='form-group'>
          <label htmlFor='title' className='title-label'>제목:</label>
          <textarea id='title' value={title} onChange={handleTitleChange} required />
        </div>
        <div className='form-group'>
          <label htmlFor='category' className='message-category'>카테고리:</label>
          <select id='category' value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="자취생메이트">자취생메이트</option>
            <option value="커뮤니티">커뮤니티</option>
            <option value="중고마켓">중고마켓</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='detail' className='detail-label'>내용:</label>
          <textarea id='detail' value={detail} onChange={handleDetailChange} required />
        </div>
        <button type="submit" className="message-post-button ">작성 완료</button>
      </form>
    </div>
  );
};

export default MessageCompose;
