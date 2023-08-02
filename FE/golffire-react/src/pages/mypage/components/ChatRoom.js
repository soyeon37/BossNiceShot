import React from "react";

import TeeRed from "../../../assets/source/icons/flag-red.png";
import TeeWhite from "../../../assets/source/icons/flag-white.png";
import TeeBlack from "../../../assets/source/icons/flag-black.png";
import TeeAll from "../../../assets/source/icons/flag-all.png";

function ChatRoom({ title, tee, field, date }) {
    // 티박스 (깃발)
    let teeImage;
    switch (tee) {
        case 'red':
            teeImage = TeeRed;
            break;
        case 'white':
            teeImage = TeeWhite;
            break;
        case 'black':
            teeImage = TeeBlack;
            break;
        default: // 'all'
            teeImage = TeeAll;
            break;
    }

    return (
        <div className="ChatRoom">
            <div className="chatroom-header">
                <div className="chatroom-title">{title}</div>
                <img className="chatroom-tee" src={teeImage} alt={`${tee} tee`} />
            </div>
            <div className="chatroom-data">
                <div>{field}</div>
                <div>{date}</div>
            </div>
        </div>
    );
}

export default ChatRoom;
