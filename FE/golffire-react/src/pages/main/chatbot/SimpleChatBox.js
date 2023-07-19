import React from "react";
import ChatBot from "react-simple-chatbot";
// import styled from 'styled-components'

function SimpleChatBox() {
    const steps = [
        {
            id: '0',
            message: 'Welcome to react chatbot!',
            trigger: '1',
        },
        {
            id: '1',
            message: 'Bye!',
            end: true,
        },
    ];

    return (
        <div>
            <ChatBot
                steps={steps} />
        </div>
    )
}

export default SimpleChatBox;