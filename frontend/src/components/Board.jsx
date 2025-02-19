import { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js"; // Chess.js for move validation
import { Chessground } from "chessground"; // Chessground for the UI

const Board = () => {
    const [chess] = useState(new Chess());
    const boardRef = useRef(null);
    const groundRef = useRef(null);

    useEffect(() => {
        groundRef.current = Chessground(boardRef.current, {
            fen: chess.fen(),
            draggable: { enabled: true },
            movable: {
                events: {
                    after: (from, to) => {
                        try {
                            const move = chess.move({ from, to, promotion: "q" });
                            if (move) groundRef.current.set({ fen: chess.fen() });
                        } catch (error) {
                            groundRef.current.set({ fen: chess.fen() });
                        }
                    },
                },
            },
        });

        return () => groundRef.current.destroy();
    }, [chess]);

    return <div ref={boardRef} style={{ width: "400px", height: "400px" }} />;
};

export default Board;