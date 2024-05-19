import React from 'react';
import './css/Community_Item.css';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
const DELETE_BOARD = gql`
  mutation DeleteBoard($board_id: String!) {
    deleteBoard(board_id: $board_id)
  }
`;

// 커뮤니티 게시물 컴포넌트
export default function Community_Item({ board,selectedItem }) { 
  // props로 board를 받도록 수정
  const navigate = useNavigate();
  const [deleteBoard] = useMutation(DELETE_BOARD, {
    variables: { board_id: board.id },
    onCompleted: () => {
      console.log(selectedItem)
      navigate('/Community',{ state: { selectedItem } });
    },
    onError: (error) => {
      console.error('게시글 삭제 중 오류 발생:', error);
    },
  });

  const handleDelete = () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      deleteBoard();
    }
  };

 
  return (
    <div className='communitydetail-container' >
      {/* 게시물 상세 보기 */}
      <div className='ci-container'>
        <div className='ci-title'>
          <div className='ci-userPhoto'>
            {/* 유저 사진 */}
          </div>

          <div className='ci-userName'>
            <h4>유저</h4>{board.user.name}
          </div>
          <div className='ci-date'>
            <h4>시간</h4> 
          </div>
          <button onClick={handleDelete} className='delete-button'>
            삭제
          </button>
        </div>
        <div className='ci-container2'>
          <div className='ci-post'>
            <h4>사진</h4>
          </div>
          <div className='ci-text'>
            <h4>글</h4> {board.detail}
          </div>
        </div>
    </div>
  </div>
  );
}
