const express = require("express");
const http = require("http");
const WebSocket = require("ws");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);
            console.log("Received:", data);
            ws.send(JSON.stringify({ response: "Message received", data }));
        } catch (error) {
            console.error("Invalid JSON received:", message);
        }
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

app.get("/", (req, res) => {
    res.send("WebSocket Server Running!");
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});