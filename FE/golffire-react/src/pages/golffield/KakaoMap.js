import React, { useEffect } from "react";

const { kakao } = window;

function KakaoMap({ centerId, getId, getAddress, getLatLng }) {
  const allId = getId;
  const allAddress = getAddress;
  const allLatLng = getLatLng;
  // console.log("allAddress: ", allAddress);
  // console.log("allLatLng: ", allLatLng);

  // allLatLng 값 중 없는 값이 있다면 allAddress 찾기
  // let geocoder = new kakao.maps.services.Geocoder();
  // console.log(geocoder);

  // 현재 중심이 되는 위치의 id 찾기
  let curIndex = allId.indexOf(centerId);
  curIndex = curIndex === -1 ? 0 : curIndex;
  // console.log("curIndex: ", curIndex);



  // 현재 중심 좌표를 반환하는 함수
  const getCurCenter = () => {
    let centerLatLng = [33.450701, 126.570667] // 기본 중심 좌표(카카오 본사)
    centerLatLng = allLatLng[curIndex * 2] ? [allLatLng[curIndex * 2], allLatLng[curIndex * 2 + 1]] : centerLatLng;
    console.log("global centerLatLng: ", centerLatLng);
    return centerLatLng;
  }

  useEffect(() => {
    const container = document.getElementById("map");
    const centerPosition = getCurCenter();
    console.log("centerPosition: ", getCurCenter());

    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      // center: new kakao.maps.LatLng(centerPosition[0], centerPosition[1]),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);


    for (var i = 0; i < allLatLng.length; i += 2) {
      var marker = new kakao.maps.Marker({
        // map: map,
        position: new kakao.maps.LatLng(allLatLng[i], allLatLng[i + 1]),
      });
      console.log(" allLatLng :", allLatLng)
      console.log("찍힌 마커의 좌표: ", marker.position)
      marker.setMap(map);
    }

    let markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    const marker1 = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker1.setMap(map);

    //
    console.log("지도 다시 그리기");
    map.setCenter(new kakao.maps.LatLng(getCurCenter[0], getCurCenter[1]));
  }, []);

  return <div id="map"></div>;
}

export default KakaoMap;
