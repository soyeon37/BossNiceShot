import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VideoRoomComponent from "../../openvidu/VideoRoomComponent";

import axios from 'axios';

// Redux
import { useSelector } from "react-redux";

function CoachingRoom() {
  // 사용자 정보(userId)로 axios 수행
  const userId = useSelector((state) => state.userInfoFeature.userId);
  const accessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  const location = useLocation();
  const navigate = useNavigate();

  let type = '';
  let study = null;
  let studyUser = null;

  const leaveRoom = () => {
    console.log(studyUser.memberId + "님이" + study.id + "방을 떠났습니다.");
    console.log(study);
    console.log(studyUser);

    // 방장이 나가는 경우
    if (study.memberId == studyUser.memberId) {
      console.log("방장이 나감");

      axios.delete(process.env.REACT_APP_SERVER_URL + '/api/study/user/' + study.id + '/all')
        .then((response) => {

          console.log("모두 지우기:" , response);

          axios.delete(process.env.REACT_APP_SERVER_URL + '/api/study/' + study.id)
            .then((response) => {

              console.log("스터디 지우기:", response);

              navigate('/studylist');
            });
        }).catch((error) => {
          console.log(error);
        });
    } else {
      axios.delete(process.env.REACT_APP_SERVER_URL + '/api/study/user/' + study.id)
        .then((response) => {
          navigate('/studylist');
        });
    }
  };

  if (location.state) {
    type = location.state.type;
    study = location.state.study;
    studyUser = location.state.studyUser;

    console.log("코칭룸");
    console.log("Type:", type);
    console.log("Study:", study);
    console.log("StudyUser:", studyUser);
  } else {
    console.log("코칭룸 정보가 존재하지 않습니다.");
  }

  return (
    <div>
      <VideoRoomComponent type={type} study={study} studyUser={studyUser} leaveRoom={leaveRoom}/>
    </div>
  );
}

export default CoachingRoom;