import React from "react";
import ChessBoard from "./components/Board";
import WebSocketMessages from "./components/WebSocketMessages";
import "./App.css";

export default function App() {
    return (
        <div className="app-container">
            <h1>MC64 Chess Application</h1>
            <ChessBoard />
            <WebSocketMessages />
        </div>
    );
}