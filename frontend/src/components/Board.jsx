import React, { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessground } from "chessground";

// ✅ Dynamically load CSS from /public/ directory
const addStylesheet = (href) => {
    if (!document.querySelector(`link[href="${href}"]`)) {  // Prevent duplicate CSS loading
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
    }
};

export default function ChessBoard() {
    const boardRef = useRef(null);
    const chess = useRef(new Chess());
    const ground = useRef(null);
    const [fen, setFen] = useState(chess.current.fen());

    useEffect(() => {
        // ✅ Load CSS dynamically
        addStylesheet("/css/chessground.base.css");
        addStylesheet("/css/chessground.brown.css");
        addStylesheet("/css/chessground.cburnett.css");

        // ✅ Initialize Chessground
        ground.current = Chessground(boardRef.current, {
            fen,
            movable: { free: false, color: "white" },
            events: {
                move: (orig, dest) => {
                    if (chess.current.move({ from: orig, to: dest, promotion: "q" })) {
                        setFen(chess.current.fen());
                    }
                },
            },
        });
    }, []);

    return <div ref={boardRef} style={{ width: "400px", height: "400px" }} />;
}