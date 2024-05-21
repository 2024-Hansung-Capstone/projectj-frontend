import React, { useState } from 'react';
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

export default function Community_Item({ board, selectedItem }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(board.like);
  const [deleteBoard] = useMutation(DELETE_BOARD, {
    variables: { board_id: board.id },
    onCompleted: () => {
      console.log(selectedItem)
      navigate('/Community', { state: { selectedItem } });
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

    return `${month}/${day} ${hours}:${minutes}`;
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

  const handleUpdateClick = () => {
    console.log(board);
    navigate('/CommunityUpdate', { state: { board } });
  };

  return (
    <div className='communitydetail-container'>
      <div className='ci-container'>
        <div className='ci-title'>
          <div className='ci-userPhoto'>
            <p>photo</p>
            {/* 유저 사진 */}
          </div>
          <div className='ci-userName'>
            <h4>{board.user.name}</h4>
          </div>
          <div className='ci-date'>
            <h4>{formatDate(board.create_at)} </h4>
          </div>
          <div className='ci-buttons'>
            <button onClick={handleDelete} className='delete-button'>삭제</button>
            <button onClick={handleUpdateClick} className='update-button'>수정</button>
          </div>
        </div>

        <div className='ci-container2'>
          <div className='ci-post'>
            <h4>사진</h4>
          </div>
          <div className='ci-text'>
            <h4>{board.detail}</h4>
          </div>
        </div>

        <div className='ci-like'>
          <button onClick={handleLikeClick} className='like-button'>
            <img src={liked ? '/heartFill.png' : '/heartEmpty.png'} alt='like' />
          </button>
          <h5>{likeCount}</h5>
        </div>
      </div>
    </div>
  );
}
