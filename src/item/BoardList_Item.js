import React, { useState } from 'react';
import { FcHome, FcIdea, FcShop, FcConferenceCall, FcFaq } from "react-icons/fc";
import { FaUtensils } from "react-icons/fa";

// 리스트는 임시로 작성된거고 gql을 바탕으로 카테고리 항목을 변경합니다. 
export const BoardList_Item = [
    { title: '룸메이트', data: '룸메이트', icon: <FcHome /> },
    { title: '인테리어 정보', data: '인테리어 정보', icon: <FcIdea /> },
    { title: '맛집추천', data: '맛집추천', icon: <FcShop /> },
    { title: '요리자랑', data: '요리자랑', icon: <FaUtensils /> },
    { title: '메이트후기', data: '메이트후기', icon: <FcConferenceCall /> },
    { title: '고민상담', data: '고민상담', icon: <FcFaq /> },
  ];
  