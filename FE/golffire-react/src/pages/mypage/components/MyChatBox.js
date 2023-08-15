import React from "react";

function MyChatBox({ props }) {
    const { memberId, memberNickname, content, time } = props;

    return (
        <div className="MyChatBox chatbox">
            <div className="mychat-time">{time}</div>
            <div className="mychat-message">{content}</div>
        </div>
    )
}

export default MyChatBox;