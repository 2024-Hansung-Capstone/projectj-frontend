import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ isVisible = true }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (isVisible && !mapRef.current) {
      const mapContainer = document.getElementById('map');
      const newMap = L.map(mapContainer).setView([37.5828, 127.0106], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(newMap);

      mapRef.current = newMap;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isVisible]);

  return <div id="map" style={{ height: '85%', width: '100%', display: isVisible ? 'block' : 'none' }} />;
};

export default Map;
