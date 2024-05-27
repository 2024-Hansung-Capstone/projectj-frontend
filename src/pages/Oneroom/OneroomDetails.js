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

  // Fetch room details
  const { loading, error, data } = useQuery(FETCH_ONE_ROOM_BY_ID, {
    variables: { id: roomId },
    onError: (error) => {
      console.error("Error fetching room details:", error);
    },
  });

  // Increase view mutation
  const [increaseView] = useMutation(INCREASE_VIEW_MUTATION, {
    onError: (error) => {
      console.error("Error increasing view count:", error);
    },
  });

  useEffect(() => {
    if (roomId) {
      console.log("roomId:", roomId);
      increaseView({ variables: { oneRoomId: roomId } });
    }
  }, [roomId, increaseView]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    location,
    monthly_rent,
    jeonsePrice,
    managementFee,
    availableDate,
    building,
    floor,
    area,
    roomCount,
    bathroomCount,
    parking,
    description,
    dong,
    jibun,
    name,
    area_exclusiveUse,
    is_monthly_rent,
    deposit,
    view,
  } = data.fetchOneRoomById;

  const convertPrice = (priceString) => {
    if (priceString.includes('월세')) {
      const [monthlyRent, deposit] = priceString.replace('월세 ', '').split(' / ');
      const convertedMonthlyRent = parseInt(monthlyRent, 10) * 10;
      const convertedDeposit = parseInt(deposit, 10) * 10;
      return `월세 ${convertedMonthlyRent} / ${convertedDeposit}`;
    } else if (priceString.includes('전세')) {
      const deposit = priceString.replace('전세 ', '');
      const depositNumber = parseInt(deposit, 10);

      if (depositNumber >= 10) {
        const billions = Math.floor(depositNumber / 10);
        const thousands = depositNumber % 10;
        return thousands > 0
          ? `전세 ${billions}억 ${thousands}000`
          : `전세 ${billions}억`;
      } else {
        const convertedDeposit = depositNumber * 1000;
        return `전세 ${convertedDeposit}`;
      }
    }
    return priceString;
  };

  const priceString = is_monthly_rent
    ? `월세 ${monthly_rent} / ${deposit}`
    : `전세 ${deposit}`;
  const convertedPrice = convertPrice(priceString);

  return (
    <div className="oneroom-details-container">
      <div className="oneroom-details-container2">
        <img src="/assets/oneroom/house2.png" alt="house2" />
        <div className="oneroom-details-container3">
          <div className="price">
            <h2>{convertedPrice}</h2>
          </div>
          <h2 className="location">{`${dong}, ${jibun}, ${name}`}</h2>
          <div className="details-table">
            <table>
              <tbody>
                <tr>
                  <td>전용 면적</td>
                  <td>{area_exclusiveUse || '정보 없음'}m²</td>
                </tr>
                <tr>
                  <td>조회수</td>
                  <td>{view || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneroomDetails;
