import { useEffect, useState } from "react";

export default function WebSocketMessages() {
    const [messages, setMessages] = useState([]);
    const [bestMove, setBestMove] = useState(null);
    let ws = null;

    // Initialize WebSocket connection
    useEffect(() => {
        ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

        ws.onopen = () => {
            console.log("Connected to WebSocket server!");
            ws.send(JSON.stringify({ type: "info", message: "Frontend connected" }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Received message:", data);

            // Handle different message types
            if (data.type === "bestMove") {
                setBestMove(data.move);
            } else if (data.type === "error") {
                console.error("Error from server:", data.message);
            } else {
                setMessages((prev) => [...prev, JSON.stringify(data)]);
            }
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("Disconnected from WebSocket server");
        };

        // Cleanup on component unmount
        return () => {
            if (ws) ws.close();
        };
    }, []);

    // Send move to WebSocket server
    const sendMove = (fen) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            console.log("Sending move...");
            ws.send(JSON.stringify({ type: "move", fen }));
        } else {
            console.error("WebSocket is not connected.");
        }
    };

    return (
        <div>
            <h2>WebSocket Messages</h2>

            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>

            {bestMove && (
                <div>
                    <h3>Best Move:</h3>
                    <p>{bestMove}</p>
                </div>
            )}

            <button onClick={() => sendMove("rnbqkb1r/pppppppp/7n/8/8/7N/PPPPPPPP/RNBQKB1R w KQkq - 0 1")}>
                Send Test Move
            </button>
        </div>
    );
}
