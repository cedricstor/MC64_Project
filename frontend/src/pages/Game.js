import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import { connectToStockfish } from "../services/stockfishService";
import { fetchLichessMoves } from "../services/apiService";

export default function Game() {
    const [bestMove, setBestMove] = useState(null);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const socket = connectToStockfish(setBestMove);
        setWs(socket);

        return () => {
            socket.close();
        };
    }, []);

    const handleSendMove = async (fen) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "move", fen }));
            console.log("Sent move request for FEN:", fen);
        } else {
            console.error("WebSocket is not connected.");
        }
    };

    const handleFetchLichessMoves = async (fen) => {
        const data = await fetchLichessMoves(fen);
        if (data) {
            console.log("Lichess Evaluation:", data);
        }
    };

    return (
        <div>
            <h1>MC64 Chess</h1>
            <Board sendMove={handleSendMove} />
            <p>Best Move: {bestMove || "Waiting..."}</p>
            <button onClick={() => handleFetchLichessMoves("rnbqkb1r/pppppppp/5n2/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 0 1")}>
                Fetch Lichess Move
            </button>
        </div>
    );
}
