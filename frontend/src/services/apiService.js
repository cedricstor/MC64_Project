const API_BASE = "https://lichess.org/api";

export async function fetchLichessMoves(fen) {
    try {
        const response = await fetch(`${API_BASE}/cloud-eval?fen=${fen}`);
        return await response.json();
    } catch (error) {
        console.error("Lichess API Error:", error);
    }
}