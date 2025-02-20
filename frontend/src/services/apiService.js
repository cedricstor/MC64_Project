const API_BASE = "https://lichess.org/api"; // Ensure this URL is correct and accessible
const backendAPI = import.meta.env.VITE_BACKEND_API;

console.log("Backend API:", backendAPI);
export async function fetchLichessMoves(fen) {
    try {
        const response = await fetch(`${API_BASE}/cloud-eval?fen=${encodeURIComponent(fen)}`);
        if (!response.ok) {
            throw new Error(`Lichess API responded with status ${response.status}`);
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Lichess API Error:", error);
        return null;
    }
}