const BACKEND_URL = "http://4.248.203.4:5000";

export async function getBestMove(fen) {
    const response = await fetch(`${BACKEND_URL}/move`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fen }),
    });

    if (!response.ok) throw new Error("Failed to get best move.");
    return await response.json();
}