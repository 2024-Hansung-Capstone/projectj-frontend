import React, { useState, useEffect } from 'react';
import './css/Community.css';
import { useQuery, useMutation } from '@apollo/client'; 
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Community_Item from '../../item/Community_Item';



const CommunityDetail = () => {

  return (
    <div className='communitydetail-container'>
        <p>커뮤니티 상세 페이지 </p>
    </div>
      
  );
}

export default CommunityDetail;
