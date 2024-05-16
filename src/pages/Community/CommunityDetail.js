import React, { useState, useEffect } from 'react';
import './css/Community.css';
import { useQuery, useMutation } from '@apollo/client'; 
import { gql } from '@apollo/client';
import { useNavigate,useLocation } from 'react-router-dom';
import Community_Item from '../../item/Community_Item';


const DELETE_BOARD = gql`
  mutation DeleteBoard($board_id: String!) {
    deleteBoard(board_id: $board_id)
  }
`;

const UPDATE_BOARD = gql`
  mutation UpdateBoard($id: String!, $category: String, $title: String, $detail: String) {
    updateBoard(updateBoradInput: { id: $id, category: $category, title: $title, detail: $detail }) {
      id
      category
      title
      detail
      view
      user {
        id
        name
      }
    }
  }
`;
const GET_BOARDS_BY_CATEGORY = gql`
  query GetBoardsByCategory($category: String!) {
    fetchBoards(category: $category) {
      id
      title
      detail
      category
      view
      user {
        id
        name
      }
    }
  }
`;

const CommunityDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { board, loggedInUserName,selectedItem } = location.state || {};
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const [boardName, setBoardName] = useState('');
  // 로그인 상태를 확인하는 상태 추가
  
 
  const handleEditBoard = () => {
    navigate('/CommunityUpdate', { state: { board, loggedInUserName } });
  };

useEffect(() => {
  if (board && board.user) {
    const boardName = board.user.name;
    setBoardName(boardName);
  }
}, [board]);
const handleDeleteBoard = async () => {
  console.log(`로그인한 사용자: ${loggedInUserName}, 작성자: ${sellerName}`);

  // 로그인한 사용자와 판매자가 동일한지 확인
  if (loggedInUserName === boardName) {
    if (board.id) {
      try {
        const response = await deleteBoard({
          variables: { board_id: board.id },
          context: {
            headers: {
              authorization: `Bearer ${getToken()}`
            }
          },
         
        });
        console.log("게시글 삭제 성공: ", response);
        toast.success('게시글이 성공적으로 삭제되었습니다.');
        //지운 게시글의 카테고리로 이동
        navigate('/Community',{state:selectedItem});
      } catch (error) {
        console.log("게시글 삭제 에러: ", error);
        toast.error('게시글 삭제 중 문제가 발생했습니다.');
      }
    }
  } else {
    // 로그인한 사용자와 판매자가 다른 경우
    toast.error('게시글을 삭제할 권한이 없습니다.');
    console.log('게시글을 삭제할 권한이 없습니다.');
  }
}





  return (
    <div className='communitydetail-container'>
        <p>커뮤니티 상세 페이지 </p>  
        <button onClick={handleEditBoard}>수정</button>
       <button onClick={handleDeleteBoard}>삭제</button>
    </div>
     
  );
}

export default CommunityDetail;
