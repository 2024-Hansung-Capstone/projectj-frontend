import React, { useState } from 'react';
import { MdMoreVert } from "react-icons/md";
import './css/Comment_Item.css';
import { gql, useMutation } from '@apollo/client';

const INCREASE_REPLY_LIKE = gql`
  mutation IncreaseReplyLike($reply_id: String!) {
    increaseReplyLike(reply_id: $reply_id) {
      id
    }
  }
`;

const DECREASE_REPLY_LIKE = gql`
  mutation DecreaseReplyLike($reply_id: String!) {
    decreaseReplyLike(reply_id: $reply_id) 
  }
`;


export default function CommentToComment_Item({CommentToComent}) {

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(CommentToComent.like);
  //댓글 좋아요,좋아요취소 기능
  const [increaseReplyLike] = useMutation(INCREASE_REPLY_LIKE, {
    onCompleted: (data) => {
      console.log(data.increaseReplyLike)
      setLikeCount();
      setLiked(!liked);
    },
    onError: (error) => {
      console.error('댓글 삭제 중 오류 발생:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.'+error);
      console.error(JSON.stringify(error, null, 2))
    }
  });

  const [decreaseReplyLike] = useMutation(DECREASE_REPLY_LIKE, {
    onCompleted: () => {
      setLikeCount();
      setLiked(!liked);
    },
  });

  
  
  const handleLikeClick = () => {
        if (liked) {
          decreaseReplyLike({ variables: { reply_id: CommentToComent.id } });
        } else {
          increaseReplyLike({ variables: { reply_id: CommentToComent.id } });
        }}
    return (
        <div className='commentTocomment-container'>
          <div className='comment-photo'>
            <p>사진</p>
          </div>
          <div className='commentTocomment-title'>
            <div className='commentTocomment-container1'>
              <div className='commentTocomment-name'>
                <p>{CommentToComent.user.name}</p>
              </div>
            </div>
            <div>
              {CommentToComent.detail}
            </div>
            <div className='commentTocomment-container2'>
              <div className='commentTocomment-like'>
              <button onClick={handleLikeClick} className='like-button'>
              {liked ? '좋아요 취소' : '좋아요'}
              </button>
              <h6>{likeCount}</h6>
              </div>
            </div>
          </div>
        </div>
      );
}