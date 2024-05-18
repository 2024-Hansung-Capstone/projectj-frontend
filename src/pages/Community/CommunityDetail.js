import React, { useState, useEffect } from 'react';
import './css/Community.css';
import { useQuery, useMutation } from '@apollo/client'; 
import { gql } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
import Community_Item from '../../item/Community_Item';
import Comment_Item from '../../item/Comment_Item';

// Community 구성은 크게 Community_Item, Comment_Item, 댓글 작성 총 3가지입니다. 
// 컴포넌트도 다른 페이지로 데이터 넘기듯이 (board) 괄호 안에 데이터 이름 넣어주고, 
// 컴포넌트 괄호에도 (board) 이렇게 넣어주고 필드이름을 board.name 형태로 바꿔주시면 됩니다. 
// 예시로 Message_Item, Market_Item 등이 있습니다. 




const CommunityDetail =  () => {
  const location = useLocation();
  const [board, setBoard] = useState(location.state?.board);
  const [selectedItem, setSelectedItem] = useState(location.state?.selectedItem);
  useEffect(() => {
    setBoard(location.state?.board);
    setSelectedItem(location.state?.selectedItem);
  }, [location.state]);

  return (
    <div className='communitydetail-container'>
      {/* 게시물 정보 */}
      <Community_Item key={board.id} board={board} selectedItem={selectedItem} />
      <div>{board.title}</div>
      {/* 댓글 */}
      <div className='comment-scroll'>
        <div className='comment-container'> 
        {board.reply && board.reply.length > 0 ? (
            board.reply.map((comment) => (
              <Comment_Item key={comment.id} comment={comment} />
            ))
          ) : (
            <p>댓글이 없습니다.</p>
          )}
        </div>
      </div>

      {/* 댓글 작성 */}
      <div className='comment-container0'> 
            <div className='comment-write'>
            <input
              type="comment_text"
              placeholder="댓글쓰기"
            />
            </div>
            <div className='comment-send'>
                <h4>전송</h4>
            </div>
        </div>
    </div>

  );
}

export default CommunityDetail;
