import file from "../../assets/golffield.json";

const dataArray = file;
const dataGolffield = dataArray.map((item) => ({
  번호: item["번호"],
  사업장명: item["사업장명"],
}));

function parseGolfId(golfId) {
  for (const item of dataGolffield) {
    if (item.번호 === golfId) {
      return item.사업장명;
    }
  }
  return "";
}

export default parseGolfId;
