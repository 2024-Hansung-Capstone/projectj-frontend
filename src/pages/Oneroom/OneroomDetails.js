import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import { FETCH_ONE_ROOM_BY_ID } from '../gql/fetchOneRoomByIdGql';
import './css/OneroomDetails.css';

const INCREASE_VIEW_MUTATION = gql`
  mutation IncreaseOneRoomView($oneRoomId: String!) {
    increaseOneRoomView(oneRoom_id: $oneRoomId) {
      id
      view
    }
  }
`;

const OneroomDetails = () => {
  const { roomId } = useParams();
  const { loading, error, data } = useQuery(FETCH_ONE_ROOM_BY_ID, {
    variables: { id: roomId }, // roomId를 변수로 전달
  });

  const [increaseView] = useMutation(INCREASE_VIEW_MUTATION);
  
  useEffect(() => {
    console.log("roomId:", roomId);
  }, [roomId, increaseView]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { location, monthly_rent, jeonsePrice, managementFee, availableDate, building, floor, area, roomCount, bathroomCount, parking, description, dong, jibun, name, area_exclusiveUse, is_monthly_rent, deposit, view } = data.fetchOneRoomById;

  return (
    <div className="oneroom-details-container">
      <h2 className="location">{`${dong}, ${jibun}, ${name}`}</h2>
      <div className="price">
        {is_monthly_rent !== undefined ? (
          <h2>{is_monthly_rent ? '월세' : '전세'} {deposit} / {is_monthly_rent ? monthly_rent : jeonsePrice}</h2>
        ) : (
          <h2>가격 정보 없음</h2>
        )}
      </div>
      <div className="details-table">
        <table>
          <tbody>
            <tr>
              <td>전용 면적</td>
              <td>{area_exclusiveUse || '정보 없음'}</td>
            </tr>
          </tbody>
        </table>
        <p>조회수: {view || 0}</p>
      </div>
    </div>
  );
};

export default OneroomDetails;