import React, { useEffect } from "react";
import Board from "../components/Board";
import useWebSocket from "../hooks/useWebSocket";
import { fetchLichessMoves } from "../services/apiService";

export default function Game() {
    const { bestMove, sendMove } = useWebSocket();

    useEffect(() => {
        if (bestMove) {
            console.log("Best move from WebSocket:", bestMove);
        }
    }, [bestMove]);

    return (
        <div>
            <h1>MC64 Chess</h1>
            <Board sendMove={sendMove} />
            <p>Best Move: {bestMove || "Waiting..."}</p>
        </div>
    );
}