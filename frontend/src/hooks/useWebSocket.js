
import { useEffect, useState, useRef } from "react";

export default function useWebSockets() {
    const [messages, setMessages] = useState([]);
    const [bestMove, setBestMove] = useState(null);
    const wsRef = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        wsRef.current = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

        wsRef.current.onopen = () => {
            console.log("Connected to WebSocket server!");
            wsRef.current.send(JSON.stringify({ type: "info", message: "Frontend connected" }));
        };

        wsRef.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("Received message:", data);

                switch (data.type) {
                    case "bestMove":
                        setBestMove(data.move);
                        break;
                    case "error":
                        console.error("Error from server:", data.message);
                        break;
                    default:
                        setMessages((prev) => [...prev, JSON.stringify(data)]);
                }
            } catch (error) {
                console.error("Failed to parse WebSocket message:", error);
            }
        };

        wsRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        wsRef.current.onclose = () => {
            console.log("Disconnected from WebSocket server");
        };

        // Cleanup on component unmount
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    // Send move to WebSocket server
    const sendMove = (fen) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            console.log("Sending move...");
            wsRef.current.send(JSON.stringify({ type: "move", fen }));
        } else {
            console.error("WebSocket is not connected.");
        }
    };

    return { messages, bestMove, sendMove };
}