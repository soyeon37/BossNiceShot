import React from "react";

import { ChatIcon } from "@chakra-ui/icons";

// 챗봇
// import Notifications from "react-push-notification";
// import NotificationComponent from "./chatbot/NotificationComponent";
// import SimpleChatBox from "./chatbot/SimpleChatBox";
// import SimpleForm from "./chatbot/form/SimpleForm";

function Chatbot() {
  return (
    <div className="Chatbot">
      {/* <div className="chat-widget"></div> */}

      {/* 챗봇 위젯 동그라미 버튼 */}
      <div className="chatbot-widget">
        <span className="chatbot-icon">
          <ChatIcon />
        </span>
      </div>

      {/* <Notifications /> */}
      {/* <NotificationComponent /> */}
      {/* <SimpleChatBox /> */}
      {/* <SimpleForm /> */}
    </div>
  );
}

export default Chatbot;
