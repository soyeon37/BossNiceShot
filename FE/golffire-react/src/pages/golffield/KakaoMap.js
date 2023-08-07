import React, { useEffect, useState } from "react";
import proj4 from "proj4";

const { kakao } = window;

function KakaoMap({ centerId, getId, getAddress, getLatLng }) {
  // 이전 골프장 정보를 저장하기 위한 변수
  const [ centerLatLng, setCenterLatLng ] = useState(["", ""]);

  // Proj4의 좌표계 변환을 위한 변수
  const fromProjection = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"; // Web Mercator (수학 좌표계)
  const toProjection = 'EPSG:4326'; // WGS 84 (위도, 경도)

  const allId = getId;
  const allAddress = getAddress;
  const allLatLng = getLatLng;

  // 현재 중심이 되는 위치의 id 찾기
  let curIndex = allId.indexOf(centerId);
  curIndex = curIndex === -1 ? 0 : curIndex;
  // console.log("curIndex: ", curIndex);
  // console.log("주소1: ", allAddress[curIndex * 2]);
  // console.log("주소2: ", allAddress[curIndex * 2 + 1]);
  // console.log("좌표 정보: ", allLatLng[curIndex * 2], ", ", allLatLng[curIndex * 2 + 1]);
  
  // allLatLng 값 중 없는 값이 있다면 allAddress 찾기
  const parseLatLng = (address) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) { 
      if (status === kakao.maps.services.Status.OK) { // 정상적으로 검색 완료
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        var resultLatLng = [coords.Ma, coords.La]
        return resultLatLng;
      } else { // 변환 값 에러
        return [null, null]
      }
    });
    return [null, null]
  }

  // 현재 중심 좌표를 반환하는 함수
  const getCurCenter = () => {
    let parsedLatLng = ["", ""]
    const x = allLatLng[curIndex * 2];
    const y = allLatLng[curIndex * 2 + 1];
    
    if (x) { // [x, y] => [위도, 경도]
      const LngLat = proj4(fromProjection, toProjection, [x, y]);
      parsedLatLng = [LngLat[1], LngLat[0]]
    } else { // 주소 => [위도, 경도]
      const curAdd1 = allAddress[curIndex * 2];
      const curAdd2 = allAddress[curIndex * 2 + 1];
      
      if(!parsedLatLng[0] && curAdd1) {
        parsedLatLng = parseLatLng(curAdd1);
        // console.log("첫 주소(", curAdd1, ")로 변환된 좌표: ", parsedLatLng);
      }
      if(parsedLatLng[0] == null && curAdd2){
        parsedLatLng = parseLatLng(curAdd2);
        // console.log("안돼서 두번째 주소(", curAdd2, ")로 변환된 좌표: ", parsedLatLng);
      }
      if (parsedLatLng[0] == null) {
        // console.log("어떻게 해도 변환이 되지 않음 => ", parsedLatLng);
      }
    }
    return parsedLatLng;
  }

  useEffect(() => {
    const container = document.getElementById("map");
    let centerPosition = getCurCenter();
    
    // 좌표 정보가 없을 경우, 기존 골프장 정보로 설정
    if (centerPosition[1]) {
      setCenterLatLng(centerPosition);
    } else {
      centerPosition = centerLatLng;
    }

    // 지도의 중심을 골프장 위치로 변경
    const options = {
      center: new kakao.maps.LatLng(centerPosition[0], centerPosition[1]),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    // 골프장 위치에 marker 표시
    let markerPosition = new kakao.maps.LatLng(centerPosition[0], centerPosition[1]);
    const marker1 = new kakao.maps.Marker({
      map: map,
      position: markerPosition,
    });
    marker1.setMap(map);

  }, [centerId, getId, getAddress, getLatLng]);

  return (
    <div id="map"></div>
  )
}

export default KakaoMap;
