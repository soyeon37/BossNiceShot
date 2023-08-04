import React, { useEffect } from "react";

const { kakao } = window;

function KakaoMap({ centerId, getLocations, getCenterId }) {
  const defaultLatLng = [37.50127843363402, 127.03960748710476]
  console.log("카카오가 받은 거?vgetLocations: ", getLocations);

  const checktmp = () => {
    // console.log("지도를 클릭함", centerId);
  }

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      // 37.50127843363402, 127.03960748710476

      center: new kakao.maps.LatLng(defaultLatLng[0], defaultLatLng[1]),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);

    // 중심 마커 표시
    console.log("kakaomap: ",getCenterId);
    let markerPosition = new kakao.maps.LatLng(37.50127843363402, 127.03960748710476);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

  return <div id="map" onClick={checktmp}></div>;
}

export default KakaoMap;
