import React from "react";

function OtherChatBox({ props, dateFormat }) {
    const { memberImage, memberId, memberNickname, content, createdTime } = props;

    return (
        <div className="">
            <div className="otherchat-nickname">{memberNickname}</div>
            <div className="OtherChatBox chatbox" style={{background:""}}>
                <img src="../favicon.png" id="otherchat-pic" style={{width:"80px", margin:"-5px"}}></img>
                <div className="otherchat-message left">{content}</div>
                <div className="otherchat-time">{dateFormat(createdTime)}</div>
            </div>
        </div>
    )
}

export default OtherChatBox;