import React, { useEffect } from "react";
import proj4 from "proj4";

const { kakao } = window;

function KakaoMap({ centerId, getId, getAddress, getLatLng }) {
  // Proj4의 좌표계 변환을 위한 변수
  const fromProjection = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"; // Web Mercator (수학 좌표계)
  // const fromProjection = "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"
  const toProjection = 'EPSG:4326'; // WGS 84 (위도, 경도)

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
    const x = allLatLng[curIndex * 2];
    const y = allLatLng[curIndex * 2 + 1];
    console.log("원점 좌표계? ", x, ", ", y)
    if (x) {
      const LngLat = proj4(fromProjection, toProjection, [x, y]);
      console.log("변환된 값? ", LngLat[1], LngLat[0]);
      // centerLatLng = [37.18567591064152, 127.40153163660632];
      centerLatLng = [LngLat[1], LngLat[0]]
      // console.log("내가 따로 넣은 값? ", centerLatLng);
    }
    // centerLatLng = allLatLng[curIndex * 2] ? [allLatLng[curIndex * 2], allLatLng[curIndex * 2 + 1]] : centerLatLng;
    console.log("global centerLatLng: ", centerLatLng);
    return centerLatLng;
  }

  useEffect(() => {
    const container = document.getElementById("map");
    const centerPosition = getCurCenter();
    console.log("centerPosition: ", getCurCenter());

    const options = {
      // center: new kakao.maps.LatLng(33.450701, 126.570667),
      center: new kakao.maps.LatLng(centerPosition[0], centerPosition[1]),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);


    // for (var i = 0; i < allLatLng.length; i += 2) {
    //   var marker = new kakao.maps.Marker({
    //     // map: map,
    //     position: new kakao.maps.LatLng(allLatLng[i], allLatLng[i + 1]),
    //   });
    //   // console.log(" allLatLng :", allLatLng)
    //   console.log("찍힌 마커의 좌표: ", marker.position)
    //   marker.setMap(map);
    // }

    // let markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    // const marker1 = new kakao.maps.Marker({
    //   map: map,
    //   position: markerPosition,
    // });
    // marker1.setMap(map);

    //
    // console.log("지도 다시 그리기");
    // map.setCenter(new kakao.maps.LatLng(getCurCenter[0], getCurCenter[1]));
  }, [centerId, getId, getAddress, getLatLng]);

  return (
    <div id="map"></div>
  )
}

export default KakaoMap;
