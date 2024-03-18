import { useEffect, useState } from 'react';
import React from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Mapbox() {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      setMap(new window.kakao.maps.Map(container, options));
      setMarker(new window.kakao.maps.Marker());
    });
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}
