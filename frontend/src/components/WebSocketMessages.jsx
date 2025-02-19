import React from "react";
import useWebSocket from "../hooks/useWebSocket";

const WebSocketMessages = () => {
    const { messages, bestMove } = useWebSocket("ws://localhost:3000");

    return (
        <div className="websocket-messages">
            <h2>WebSocket Messages</h2>
            {bestMove && <p><strong>Best Move:</strong> {bestMove}</p>}
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketMessages;