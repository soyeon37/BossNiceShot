import file from "../../assets/golffield";

const dataArray = file;
const dataGolffield = dataArray.map((item) => ({
  번호: item["번호"],
  사업장명: item["사업장명"],
  소재지전체주소: item["소재지전체주소"],
  도로명전체주소: item["도로명전체주소"],
  소재지전화: item["소재지전화"],
}));

function getNameById(golfId) {
  for (const item of dataGolffield) {
    if (item.번호 === golfId) {
      return item.사업장명;
    }
  }
  return "정보 없음";
}

function getAddressById(golfId) {
  for (const item of dataGolffield) {
    if (item.번호 === golfId) {
      let address = (item.소재지전체주소 ? item.소재지전체주소 : item.도로명전체주소);
      return (address ? address : "주소 정보 없음");
    }
  }
  return "정보 없음";
}

function getCallById(golfId) {
  for (const item of dataGolffield) {
    if (item.번호 === golfId) {
      return (item.소재지전화 ? item.소재지전화 : "전화 정보 없음");
    }
  }
  return "정보 없음";
}

export { getNameById, getAddressById, getCallById };
