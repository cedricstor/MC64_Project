import React from "react";
import useWebSocket from "../hooks/useWebSocket";

export default function WebSocketMessages() {
    const { bestMove } = useWebSocket();

    return (
        <div className="websocket-messages">
            <h2>WebSocket Messages</h2>
            {bestMove && <p><strong>Best Move:</strong> {bestMove}</p>}
        </div>
    );
}