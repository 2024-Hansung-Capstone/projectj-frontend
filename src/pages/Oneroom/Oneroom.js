import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import Map from '../../components/Map';
import Oneroom_Item from '../../item/Oneroom_Item';
import './css/Oneroom.css';
import { FETCH_TOP_THREE_POPULAR_ROOMS } from '../gql/fetchOneRoomsByViewRank';
import { FETCH_ALL_ONE_ROOMS } from '../gql/fetchAllOneRooms';
import { FETCH_ONE_ROOM_BY_XY } from '../gql/fetchOneRoomByXY';
import {FETCH_ONE_ROOM_FROM_OPEN_API} from '../gql/FetchOneRoomFromOpenAPI'
const Oneroom = () =>{
  const { data: topThreeRoomsData } = useQuery(FETCH_TOP_THREE_POPULAR_ROOMS, { variables: { rank: 3 } });
  const [mapBounds, setMapBounds] = useState(null);
    // 맵에서 변경된 bounds를 처리하는 콜백 함수
    const handleBoundsChange = (newBounds) => {
      // 여기서 변경된 bounds를 사용하여 쿼리 실행
      setMapBounds(newBounds);
      refetch(); // 쿼리를 다시 실행합니다.
    };
    const { loading, error, data } = useQuery(FETCH_ALL_ONE_ROOMS);
    // mapBounds가 변경되면 해당 쿼리 실행
    const { loading: roomsLoading, error: roomsError, data: roomsData ,refetch} = useQuery(FETCH_ONE_ROOM_BY_XY, {
      variables: {
        StartX:parseFloat(mapBounds?.start?.lat),
        StartY: parseFloat(mapBounds?.start?.lng),
        EndX: parseFloat(mapBounds?.end?.lat),
        EndY: parseFloat(mapBounds?.end?.lng),
      },
      skip: !mapBounds, // mapBounds가 없는 경우 쿼리 스킵
    });
   
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
                price={room.is_monthly_rent ? `월세 ${room.monthly_rent} / ${room.deposit}` : `전세 ${room.deposit}`}
              />
            ))}
          </div>
          <div>
  <p>Rooms Query Loading: {roomsLoading.toString()}</p>
  <p>Rooms Query Error: {roomsError ? JSON.stringify(roomsError, null, 2) : 'No Error'}</p>
</div>
        </div>
      </div>
      <h2>내 근처 원룸 시세 현황</h2>
      <div className='oneroom-container2'>
        <div className='map-section2'>
          {/* Map 컴포넌트에 콜백 함수 전달 */}
          <Map onBoundsChange={handleBoundsChange} />
        </div>
        <div className='oneroom-items-container'>
            <div className='oneroom-dishes-grid'>                                             
            {roomsData && roomsData.fetchOneRoomByXY.length === 0 && <p>No rooms found in the specified area.</p>} 
            {roomsData &&
              roomsData.fetchOneRoomByXY.map((room) => (
               <div key={room.id} className='oneroom-dish-item'>
        <Oneroom_Item
           key={room.id}
           roomId={room.id}
          location={`${room.dong}, ${room.jibun}`}
          price={
            room.is_monthly_rent
              ? `월세 ${room.monthly_rent} / ${room.deposit}`
              : `전세 ${room.deposit}`
          }
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
