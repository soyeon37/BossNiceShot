import React from "react";

function MyChatBox({ props, dateFormat }) {
    const { memberImage, memberId, memberNickname, content, createdTime } = props;

    return (
        <div className="">
            <div className="mychat-nickname">{memberNickname}</div>
            <div className="MyChatBox chatbox" style={{background:""}}>
                <img src="../favicon.png" id="mychat-pic" style={{width:"80px", margin:"-5px"}}></img>
                <div className="mychat-message right">{content}</div>
                <div className="mychat-time">{dateFormat(createdTime)}</div>
            </div>
        </div>
    )
}

export default MyChatBox;