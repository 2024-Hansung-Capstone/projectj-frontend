import React from 'react';
import './css/OneroomDetails.css';

const OneroomDetails = ({ mainImage, location, monthlyRent, jeonsePrice, managementFee, availableDate, building, floor, area, roomCount, bathroomCount, parking, description }) => {
  return (
    <div className="oneroom-details-container">
      <div className="or-main-image-container">
        {mainImage ? (
          <img src={mainImage} alt="Main" className="oneroom-main-image" />
        ) : (
          <div className="oneroom-no-image">No Image</div>
        )}
      </div>
      <p className="author">글쓴이</p>
      <h2 className="location">{location || '위치 미입력'}</h2>
      <div className="price">
        {monthlyRent || jeonsePrice ? (
          <h2>{monthlyRent ? '월세' : '전세'}</h2>
        ) : (
          <h2>월세/전세 가격</h2>
        )}
      </div>
      <div className="description">
        <h3>상세 설명</h3>
        <p>{description || '상세 설명'}</p>
      </div>
      <h3>원룸 정보</h3>
      <div className="details-table">
        <table>
          <tbody>
            <tr>
              <td>거래 방식</td>
              <td>{monthlyRent ? '월세' : '전세'}</td>
            </tr>
            <tr>
              <td>관리비</td>
              <td>{managementFee || '미입력'}</td>
            </tr>
            <tr>
              <td>입주가능일</td>
              <td>{availableDate || '미입력'}</td>
            </tr>
            <tr>
              <td>건물</td>
              <td>{building || '미입력'}</td>
            </tr>
            <tr>
              <td>해당층/전체층</td>
              <td>{floor || '미입력'}</td>
            </tr>
            <tr>
              <td>전용/공급면적</td>
              <td>{area || '미입력'}</td>
            </tr>
            <tr>
              <td>방/욕실개수</td>
              <td>{roomCount || '미입력'}/{bathroomCount || '미입력'}</td>
            </tr>
            <tr>
              <td>주차</td>
              <td>{parking || '미입력'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className='oneroom-chat-button'> 채팅하기</button>
    </div>
  );
}

export default OneroomDetails;