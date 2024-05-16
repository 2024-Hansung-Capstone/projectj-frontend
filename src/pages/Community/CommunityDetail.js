import React, { useState, useEffect } from 'react';
import './css/Community.css';
import { useQuery, useMutation } from '@apollo/client'; 
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Community_Item from '../../item/Community_Item';


// 커뮤니티 데이터 클릭 시 보여지는 상세페이지 + 댓글도 함께 볼 수 있도록 제작. 
// 데이터 연결 후 페이지 확인해보면서 제작할 생각입니다. 
const CommunityDetail = () => {

  return (
    <div className='communitydetail-container'>
        <p>커뮤니티 상세 페이지 </p>
    </div>
      
  );
}

export default CommunityDetail;
