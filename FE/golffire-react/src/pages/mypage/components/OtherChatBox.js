import React from "react";

function OtherChatBox({ props }) {
    const { memberId, memberNickname, content, time } = props;

    return (
        <div className="OtherChatBox chatbox">
            <div className="otherchat-time">{time}</div>
            <div className="otherchat-message">{content}</div>
        </div>
    )
}

export default OtherChatBox;