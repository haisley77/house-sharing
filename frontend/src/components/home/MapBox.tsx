import React, { useEffect, useState } from 'react';
import '../../styles/home/MapBox.css';
import { theme } from '../../styles/Theme'; // 테마에서 기본 색상을 사용하기 위해 가져옵니다.

declare global {
  interface Window {
    kakao: any;
  }
}

interface Location {
  lat: number;
  lng: number;
}

const dummyData = {
  oneroom: [
    { lat: 37.566022, lng: 126.977969 },
    { lat: 37.568122, lng: 126.971969 },
    { lat: 37.563222, lng: 126.980969 },
    { lat: 37.560322, lng: 126.974469 },
    { lat: 37.570422, lng: 126.978369 },
    { lat: 37.566522, lng: 126.980269 },
    { lat: 37.559622, lng: 126.979169 },
    { lat: 37.563722, lng: 126.972069 },
    // 나머지 위치 데이터...
  ],
};

export default function MapBox() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.566535, 126.977969),
        level: 7,
        minLevel: 3,
      };

      const newMap = new window.kakao.maps.Map(container, options);
      setMap(newMap);

      const markers = dummyData.oneroom.map((location) => {
        return new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(location.lat, location.lng),
        });
      });

      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: newMap,
        averageCenter: true,
        minLevel: 3,
        minClusterSize: 1, // 클러스터링 적용 최소 마커 수를 1로 설정합니다.
        calculator: [3, 5, 10], // 이 숫자들을 기준으로 클러스터의 크기가 변경됩니다.
        styles: [
          {
            // 1 - 3 마커
            width: '35px',
            height: '35px',
            background: theme.palette.primary.main, // 테마의 기본 색상을 사용합니다.
            borderRadius: '50%',
            color: '#fff', // 텍스트 색상은 흰색입니다.
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: 'bold',
            lineHeight: '35px',
            opacity: '85%',
          },
          {
            // 4 - 5 마커
            width: '50px',
            height: '50px',
            background: theme.palette.primary.main,
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            fontSize: '25px',
            fontWeight: 'bold',
            lineHeight: '50px',
            opacity: '85%',
          },
          {
            // 6 - 10 마커
            width: '70px',
            height: '70px',
            background: theme.palette.primary.main,
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            fontSize: '30px',
            fontWeight: 'bold',
            lineHeight: '70px',
            opacity: '85%',
          },
          {
            // 11개 이상 마커
            width: '80px',
            height: '80px',
            background: theme.palette.primary.main,
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
            lineHeight: '60px',
            opacity: '85%',
          },
        ],
      });

      clusterer.addMarkers(markers);

      // 클러스터를 클릭했을 때 아무 동작도 하지 않도록 빈 함수를 할당합니다.
      window.kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster: any) {
        // 클러스터 클릭 시 아무런 동작도 하지 않습니다.
      });
    });
  }, []);

  return <div className="mapbox-container" id="map" style={{ width: '100%', height: '400px' }}></div>;
}
