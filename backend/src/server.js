import express from "express";
import cors from "cors";
import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = app.listen(3000, "0.0.0.0", () => 
    console.log("Server running on http://4.248.203.4:3000")
);

// WebSocket setup
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.send(JSON.stringify({ message: "Welcome to the WebSocket server!" }));
    ws.on("message", (data) => console.log("Received:", data));
    ws.on("close", () => console.log("Client disconnected"));
    });
// Fetch best move from Stockfish running on Azure VM
async function getBestMove(fen) {
    try {
        const response = await fetch("http://4.248.203.4:5000/move", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fen }),
        });
        const data = await response.json();
        return data.bestMove || null;
    } catch (error) {
        console.error("Error fetching Stockfish move:", error);
        return null;
    }
}

app.get("/", (req, res) => res.send("MC64 Backend Running!"));