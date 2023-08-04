import React from "react";

function HistoryBox({ place, date, score }) {
    return (
        <div className="HistoryBox">
            <div className="history-info">
                <div className="history-place">{place}</div>
                <div className="history-date">{date}</div>
            </div>
            <div className="history-score">{score} 타</div>
        </div >
    );
}

export default HistoryBox;
