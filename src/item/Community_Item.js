import React,{useState} from 'react';
import './css/Community_Item.css';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
const DELETE_BOARD = gql`
  mutation DeleteBoard($board_id: String!) {
    deleteBoard(board_id: $board_id)
  }
`;

const INCREASE_BOARD_LIKE = gql`
  mutation IncreaseBoardLike($board_id: String!) {
    increaseBoardLike(board_id: $board_id) {
      id
      like
    }
  }
`;

const DECREASE_BOARD_LIKE = gql`
  mutation DecreaseBoardLike($board_id: String!) {
    decreaseBoardLike(board_id: $board_id) {
      id
      like
    }
  }
`;

// 커뮤니티 게시물 컴포넌트
export default function Community_Item({ board,selectedItem }) { 
  // props로 board를 받도록 수정
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(board.like);
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
  const [increaseBoardLike] = useMutation(INCREASE_BOARD_LIKE, {
    onCompleted: (data) => {
      setLikeCount(data.increaseBoardLike.like);
    },
  });

  const [decreaseBoardLike] = useMutation(DECREASE_BOARD_LIKE, {
    onCompleted: (data) => {
      setLikeCount(data.decreaseBoardLike.like);
    },
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  const handleLikeClick = () => {
    if (liked) {
      decreaseBoardLike({ variables: { board_id: board.id } });
    } else {
      increaseBoardLike({ variables: { board_id: board.id } });
    }
    setLiked(!liked);
  };
  const handleDelete = () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      deleteBoard();
    }
  };
  const handleUpdateClick =() => {
    console.log(board);
 
    navigate('/CommunityUpdate',{ state: { board} });
  }
 
 
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
            <h4>시간 {formatDate(board.create_at)} </h4>
           
          </div>
          <button onClick={handleDelete} className='delete-button'>
            삭제
          </button>
          <button onClick={handleUpdateClick} className='update-button'>
          수정
          </button>
        
        </div>
        <div className='ci-container2'>
          <div className='ci-post'>
            <h4>사진</h4>
          </div>
          <div className='ci-text'>
            <h4>글</h4> {board.detail}
          </div>
          <button onClick={handleLikeClick} className='like-button'>
          {liked ? '좋아요 취소' : '좋아요'}
          </button>
          <h6>좋아요수: {likeCount} </h6>
        </div>
        
    </div>
  </div>
  );
}
