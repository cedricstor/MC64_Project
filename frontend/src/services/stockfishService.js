const WEBSOCKET_URL = "ws://4.248.203.4:8080";

export function connectToStockfish(onMessage) {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
        console.log("Connected to remote Stockfish server");
    };

    ws.onmessage = (event) => {
        onMessage(event.data);
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    return ws;
}