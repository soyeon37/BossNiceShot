import React, { useEffect, useState } from "react";
import proj4 from "proj4";

const { kakao } = window;

function KakaoMap({ centerId, getId, getAddress, getLatLng }) {
  // const [centerLatLng, setCenterLatLng] = useState([33.450701, 126.570667]);

  // Proj4의 좌표계 변환을 위한 변수
  const fromProjection = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"; // Web Mercator (수학 좌표계)
  // const fromProjection = "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"
  const toProjection = 'EPSG:4326'; // WGS 84 (위도, 경도)

  const allId = getId;
  const allAddress = getAddress;
  const allLatLng = getLatLng;
  // console.log("allAddress: ", allAddress);
  // console.log("allLatLng: ", allLatLng);

  // 현재 중심이 되는 위치의 id 찾기
  let curIndex = allId.indexOf(centerId);
  curIndex = curIndex === -1 ? 0 : curIndex;
  // console.log("curIndex: ", curIndex);

  // allLatLng 값 중 없는 값이 있다면 allAddress 찾기
  const parseLatLng = (address) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) {
      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        console.log("변환 테스트 결과, coords: ", coords);
        var resultLatLng = [coords.Ma, coords.La]
        console.log("resultLatLng: ", resultLatLng)
        return resultLatLng;
        // return ["", ""]
      } else {
        console.log("변환 에러남")
        return ["", ""]
      }
    });

    return ["", ""]
  }

  // 현재 중심 좌표를 반환하는 함수
  const getCurCenter = () => {
    let centerLatLng = [33.450701, 126.570667] // 기본 중심 좌표(카카오 본사)
    const x = allLatLng[curIndex * 2];
    const y = allLatLng[curIndex * 2 + 1];
    // console.log("원점 좌표계? ", x, ", ", y)
    if (x) {
      const LngLat = proj4(fromProjection, toProjection, [x, y]);
      // console.log("변환된 값? ", LngLat[1], LngLat[0]);
      // centerLatLng = [37.18567591064152, 127.40153163660632];
      centerLatLng = [LngLat[1], LngLat[0]]
      // console.log("내가 따로 넣은 값? ", centerLatLng);
    } else {
      const curAdd1 = allAddress[curIndex * 2];
      const curAdd2 = allAddress[curIndex * 2 + 1];
      let curAdd = curAdd1 ? curAdd1 : curAdd2;
      if (curAdd) {
        console.log("파싱할 주소: ", curAdd);
        const parsedLatLng = parseLatLng(curAdd);
        console.log("위경도가 없어서 주소 파싱한 결과: ", parsedLatLng);
        centerLatLng = parsedLatLng;
        return [37.1324673675995, 127.522027682876]
      } else {
        console.log("주소까지 없는 곳,,, 뭐냐 여긴");
      }
    }

    // centerLatLng = allLatLng[curIndex * 2] ? [allLatLng[curIndex * 2], allLatLng[curIndex * 2 + 1]] : centerLatLng;
    // console.log("global centerLatLng: ", centerLatLng);
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

    let markerPosition = new kakao.maps.LatLng(centerPosition[0], centerPosition[1]);
    const marker1 = new kakao.maps.Marker({
      map: map,
      position: markerPosition,
    });
    marker1.setMap(map);

    //
    // console.log("지도 다시 그리기");
    // map.setCenter(new kakao.maps.LatLng(getCurCenter[0], getCurCenter[1]));
  }, [centerId, getId, getAddress, getLatLng]);

  return (
    <div id="map"></div>
  )
}

export default KakaoMap;
