import React from "react";

function MyChatBox({ props }) {
    const { pic, userId, nickname, message, time } = props;

    return (
        <div className="MyChatBox chatbox">
            <div className="mychat-time">{time}</div>
            <div className="mychat-message">{message}</div>
        </div>
    )
}

export default MyChatBox;