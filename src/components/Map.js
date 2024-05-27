import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // 기본 마커 이미지 URL 또는 사용자 정의 이미지 URL
  iconSize: [50, 82], // 아이콘의 크기 (너비, 높이)
  iconAnchor: [25, 82], // 아이콘의 앵커 지점 (아이콘의 '발' 부분이 좌표에 위치)
  popupAnchor: [1, -82], // 팝업의 앵커 지점
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', // 그림자 이미지 URL
  shadowSize: [82, 82], // 그림자의 크기
});
const geocodeAddress = async (address) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
  const data = await response.json();
  if (data && data.length > 0) {
    return [data[0].lat, data[0].lon];
  }
  return null;
};
const Map = ({ isVisible = true, onBoundsChange , roomsData}) => {
  const mapRef = useRef(null);
  const [bounds, setBounds] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  // 맵 초기 좌표 상태
  const [initialCoords] = useState([37.5828, 127.0106]);
  const [initialZoom] = useState(16);

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const newMap = L.map(mapContainer);

    // 초기 좌표와 줌 레벨 설정
    newMap.setView(initialCoords, initialZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(newMap);

    newMap.on('moveend', () => {
      const currentBounds = newMap.getBounds();
      const newBounds = {
        start: {
          lat: currentBounds.getSouthWest().lat,
          lng: currentBounds.getSouthWest().lng,
        },
        end: {
          lat: currentBounds.getNorthEast().lat,
          lng: currentBounds.getNorthEast().lng,
        },
      };
      setBounds(newBounds);
      if (onBoundsChange) {
        onBoundsChange(newBounds);
      }
    });
   
    mapRef.current = newMap;
   
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);


  useEffect(() => {
    if (mapRef.current && roomsData) {
      // 기존 마커 제거
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });

      roomsData.forEach((room) => {
        const address = `${room.dong}, ${room.jibun}`;
        geocodeAddress(address).then((coords) => {
          if (coords) {
            const marker = L.marker(coords, { icon: customIcon });
            marker.addTo(mapRef.current)
              .bindPopup(`<b>${address}</b><br>${room.is_monthly_rent ? `월세 ${room.monthly_rent} / ${room.deposit}` : `전세 ${room.deposit}`}`);
          }
        });
      });
    }
  }, [roomsData]);
  return (
    <div>
      <div className='oneroom-map' id="map"  />
    {/*{bounds && (
        <div>
          <p>Start: {`Lat: ${bounds.start.lat}, Lng: ${bounds.start.lng}`}</p>
          <p>End: {`Lat: ${bounds.end.lat}, Lng: ${bounds.end.lng}`}</p>
        </div>
      )} */}
      </div>
  );

};

export default Map;