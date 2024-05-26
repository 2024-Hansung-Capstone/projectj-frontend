import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Map from '../../components/Map';
import Oneroom_Item from '../../item/Oneroom_Item';
import './css/Oneroom.css';
import { FETCH_TOP_THREE_POPULAR_ROOMS } from '../gql/fetchOneRoomsByViewRank';
import { FETCH_ONE_ROOM_BY_XY } from '../gql/fetchOneRoomByXY';
import { GrMapLocation } from "react-icons/gr";
import { BounceLoader, BarLoader, BeatLoader, CircleLoader, ClipLoader, ClockLoader, DotLoader, FadeLoader, GridLoader, HashLoader, MoonLoader, PacmanLoader, PropagateLoader, PuffLoader, PulseLoader, RingLoader, RiseLoader, RotateLoader, ScaleLoader, SkewLoader, SquareLoader, SyncLoader } from 'react-spinners';

const MyComponent = () => {
  const loading = true;

  return (
    <div>
      <BounceLoader color="#36d7b7" loading={loading} />
      <BarLoader color="#36d7b7" loading={loading} />
      <BeatLoader color="#36d7b7" loading={loading} />
      {/* Add more spinners as needed */}
    </div>
  );
};



const Oneroom = () => {
  const { data: topThreeRoomsData } = useQuery(FETCH_TOP_THREE_POPULAR_ROOMS, { variables: { rank: 3 } });
  const [mapBounds, setMapBounds] = useState(null);
  const { loading: roomLoading, error: roomError, data: roomData, refetch: roomRefetch } = useQuery(FETCH_ONE_ROOM_BY_XY, {
    variables: {
      StartX: parseFloat(mapBounds?.start?.lng),
      StartY: parseFloat(mapBounds?.start?.lat),
      EndX: parseFloat(mapBounds?.end?.lng),
      EndY: parseFloat(mapBounds?.end?.lat)
    },
    skip: !mapBounds,
  });

  // 맵에서 변경된 bounds를 처리하는 콜백 함수
  const handleBoundsChange = (newBounds) => {
    // 여기서 변경된 bounds를 사용하여 쿼리 실행
    setMapBounds(newBounds);
    roomRefetch(); // 쿼리를 다시 실행합니다.
  };

  return (
    <div className='oneroom-container1'>
      <div className='map-section'>
        <div className='popular-rooms'>
          <div className='popular-rooms-title'>
            <img src="/top.png" alt="Top Rooms" />
            <h2>인기 원룸 Best 3</h2>
          </div>
          <div className='popular-room-list'>
            {topThreeRoomsData && topThreeRoomsData.fetchOneRoomsByViewRank.map((room) => (
              <Oneroom_Item
                key={room.id}
                roomId={room.id}
                location={`${room.dong}, ${room.jibun}`}
                price={room.is_monthly_rent ? `월세 ${room.monthly_rent} / ${room.deposit}` : `전세 ${room.deposit}`}
                className='roomitem-container-popular'
                area={room.area_exclusiveUse || '정보 없음'}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className='oneroom-location'>
        <img src="/home.png" alt="Home" />
        <h2>내 근처 원룸 매물 현황</h2>
      </div>
      <div className='oneroom-container2'>
        <div className='map-section2'>
          {/* Map 컴포넌트에 콜백 함수 전달 */}
          <Map onBoundsChange={handleBoundsChange} roomsData={roomData?.fetchOneRoomByXY || []}/>
        </div>
        <div className='oneroom-items-container'>
        {roomLoading ? (
          <div className='loading-spinner'>
            <BeatLoader size={30} color={"yellowgreen"} loading={roomLoading} />
          </div>
          ) : (
            <div className='oneroom-dishes-grid'>
              {!roomData && (
                <p>
                  <span><GrMapLocation /></span>
                  <br />
                  지도를 움직여 매물을 확인하세요.
                </p>
              )}
              {roomData && roomData.fetchOneRoomByXY.length === 0 && (
                <p>
                  <span><GrMapLocation /></span>
                  <br />
                  검색조건에 맞는 방이 없습니다. 지도를 근처로 움직여보세요.
                </p>
              )}
              {roomData &&
                roomData.fetchOneRoomByXY.map((room) => (
                  <div key={room.id} className='oneroom-dish-item'>
                    <Oneroom_Item
                      key={room.id}
                      roomId={room.id}
                      location={`${room.dong}, ${room.jibun}`}
                      price={room.is_monthly_rent ? `월세 ${room.monthly_rent} / ${room.deposit}` : `전세 ${room.deposit}`}
                      className='roomitem-container-items'
                      area={room.area_exclusiveUse || '정보 없음'}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Oneroom;
