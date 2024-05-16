import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import OneroomFilterBar from '../../components/OneroomFilterBar';
import Map from '../../components/Map';
import Oneroom_Item from '../../item/Oneroom_Item';
import './css/Oneroom.css';
import { FETCH_ALL_ONE_ROOMS } from '../gql/fetchAllOneRooms';
import { FETCH_TOP_THREE_POPULAR_ROOMS } from '../gql/fetchOneRoomsByViewRank';

const Oneroom = () => {
  const { loading, error, data } = useQuery(FETCH_ALL_ONE_ROOMS);
  const { data: topThreeRoomsData } = useQuery(FETCH_TOP_THREE_POPULAR_ROOMS, { variables: { rank: 3 } });

  return (
    <div className='oneroom-container1'>
      <div className='map-section'>
        <div className='popular-rooms'>
          <h2>인기 원룸 Best 3</h2>
          <div className='popular-room-list'>
            {topThreeRoomsData && topThreeRoomsData.fetchOneRoomsByViewRank.map((room) => (
              <Oneroom_Item
                key={room.id}
                roomId={room.id}
                location={`${room.dong}, ${room.jibun}`}
                price={room.is_monthly_rent ? `월세 ${room.monthly_rent} / ${room.deposit}` : `전세 ${room.deposit}`} // 실제 데이터 구조에 맞게 수정하세요
              />
            ))}
          </div>
        </div>
      </div>
      <h2>내 근처 원룸 시세 현황</h2>
      <div className='oneroom-container2'>
        <div className='map-section2'>
          <Map />
        </div>
        <div className='oneroom-items-container'>
            <div className='oneroom-dishes-grid'>
              {data && data.fetchOneRooms.map((room) => (
                <div key={room.id} className='oneroom-dish-item'>
                  <Oneroom_Item
                    key={room.id}
                    roomId={room.id}
                    location={`${room.dong}, ${room.jibun}`}
                    price={room.is_monthly_rent ? `월세 ${room.monthly_rent} / ${room.deposit}` : `전세 ${room.deposit}`} // 실제 데이터 구조에 맞게 수정하세요
                  />
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Oneroom;
