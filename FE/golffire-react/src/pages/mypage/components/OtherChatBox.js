import React from "react";

function OtherChatBox({ props }) {
    const { pic, userId, nickname, message, time } = props;

    return (
        <div className="OtherChatBox chatbox">
            <div className="otherchat-time">{time}</div>
            <div className="otherchat-message">{message}</div>
        </div>
    )
}

export default OtherChatBox;