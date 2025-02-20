import express from "express";
import cors from "cors";
import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());  // Ensure CORS is enabled
app.use(express.json());

const PORT = 5000;

// Start HTTP server
const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});

// Handle move requests
app.post("/move", async (req, res) => {
    const { fen } = req.body;

    if (!fen) {
        return res.status(400).json({ error: "FEN string is required." });
    }

    try {
        const bestMove = await getBestMove(fen);
        res.json({ bestMove });
    } catch (error) {
        console.error("Failed to get best move:", error);
        res.status(500).json({ error: "Failed to get best move." });
    }
});

// Function to fetch best move from Stockfish
async function getBestMove(fen) {
    return new Promise((resolve, reject) => {
        const stockfish = require("child_process").spawn("/usr/games/stockfish");

        stockfish.stdin.write(`position fen ${fen}\n`);
        stockfish.stdin.write("go depth 15\n");

        stockfish.stdout.on("data", (data) => {
            const output = data.toString();
            const match = output.match(/bestmove\s(\S+)/);
            if (match) {
                resolve(match[1]);
                stockfish.kill();
            }
        });

        stockfish.stderr.on("data", (data) => {
            console.error(`Stockfish Error: ${data}`);
            reject(data.toString());
        });

        stockfish.on("exit", (code) => {
            if (code !== 0) {
                reject(`Stockfish exited with code ${code}`);
            }
        });
    });
}

// Health check endpoint
app.get("/", (req, res) => {
    res.send("MC64 Backend Running!");
});

// Graceful shutdown
process.on("SIGINT", () => {
    console.log("Shutting down...");
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});