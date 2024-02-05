import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  useEffect(() => {
    const mapContainer = document.getElementById('map');

    const map = L.map(mapContainer).setView([37.5665, 126.9780], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // useEffect에서 반환하는 함수는 컴포넌트가 언마운트될 때 호출됩니다.
    return () => {
      map.remove(); // 맵을 제거합니다.
    };
  }, []); // 두 번째 매개변수로 빈 배열을 전달하여 최초 렌더링 시에만 실행되도록 합니다.

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default Map;