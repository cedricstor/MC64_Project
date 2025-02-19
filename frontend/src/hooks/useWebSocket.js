import { useEffect, useState } from "react";

export default function useWebSocket() {
    const [bestMove, setBestMove] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket("ws://4.248.203.4:3000"); // Use Azure VM WebSocket URL

        ws.onopen = () => {
            console.log("Connected to WebSocket server");
            ws.send(JSON.stringify({ type: "connect", message: "Frontend connected" }));
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.bestMove) {
                    setBestMove(data.bestMove);
                }
            } catch (error) {
                console.error("Invalid JSON received:", event.data);
            }
        };

        ws.onerror = (error) => console.error("WebSocket error:", error);
        ws.onclose = () => console.log("Disconnected from WebSocket server");

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    const sendMove = (fen) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: "move", fen }));
        }
    };

    return { bestMove, sendMove };
}