import React from "react";
import { useLocation } from "react-router-dom";
import VideoRoomComponent from "../../openvidu/VideoRoomComponent";

function CoachingRoom() {
  const location = useLocation();

  let type = '';
  let title = '';

  if (location.state) {
    type = location.state.type;
    title = location.state.title;
    console.log("Type:", type);
    console.log("Title:", title);
  } else {
    console.log("No state found in location object");
  }

  return (
    <div>
      <VideoRoomComponent type={type} title={title}/>
    </div>
  );
}

export default CoachingRoom;