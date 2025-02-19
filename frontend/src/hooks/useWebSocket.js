import { useEffect, useState } from "react";

const useWebSocket = (url) => {
    const [messages, setMessages] = useState([]);
    const [bestMove, setBestMove] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(url);
        setSocket(ws);

        ws.onopen = () => {
            console.log("Connected to WebSocket server");
            ws.send(JSON.stringify({ type: "connect", message: "Frontend connected" }));
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("Message from server:", data);

                if (data.bestMove) {
                    setBestMove(data.bestMove);
                }

                if (typeof data.message === "string") {
                    setMessages((prev) => [...prev, data.message]);
                } else {
                    setMessages((prev) => [...prev, JSON.stringify(data)]);
                }
            } catch (error) {
                console.error("Invalid JSON received:", event.data);
            }
        };

        ws.onclose = () => console.log("Disconnected from WebSocket server");

        return () => ws.close();
    }, [url]);

    return { bestMove, messages, socket };
};

export default useWebSocket;