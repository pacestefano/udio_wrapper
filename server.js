const express = require('express');
const cors = require('cors');
const { UdioWrapper } = require('./udio_wrapper'); // Assicurati che il percorso sia corretto
const app = express();
const port = process.env.PORT || 10000; // Cambia la porta di default a 10000

app.use(cors());
app.use(express.json());

// Assicurati di avere la variabile d'ambiente configurata su Render.com
const apiKey = process.env.OPENAI_API_KEY;
console.log('API Key:', apiKey); // Aggiungi questo log

app.get('/api-key', (req, res) => {
    console.log('Request received for /api-key');
    res.json({ apiKey });
});

app.post('/generate-song', async (req, res) => {
    const authToken = "zUyMDQ3MDk0In0sImlkZW50aXRpZXMiOlt7ImlkZW50aXR5X2lkIjoiMDRmNjI2ZjMtMDczMS00ZTgyLWE1Y2ItYWYzM2I5ZDZmMDk4IiwiaWQiOiIxMTQ3MzgyNTYwMDczNTIwNDcwOTQiLCJ1c2VyX2lkIjoiYTlkNjJlMGMtZjMzYS00NWVjLTlhMjYtZDNmYTI2NGE5ODFhIiwiaWRlbnRpdHlfZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSVB4blBWc2dRSGFOOUlMREZzRXlEYUxhbjBVUmNJaHhtcEVNVUdmNDhITnl4ZERJalU2dz1zOTYtYyIsImVtYWlsIjoicGFjZS5zdGVmYW5vNzdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6InN0ZWZhbm8gcGFjZSIsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSIsIm5hbWUiOiJzdGVmYW5vIHBhY2UiLCJuZWVkc19vbmJvYXJkaW5nIjp0cnVlLCJuZXdfdXNlciI6dHJ1ZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSVB4blBWc2dRSGFOOUlMREZzRXlEYUxhbjBVUmNJaHhtcEVNVUdmNDhITnl4ZERJalU2dz1zOTYtYyIsInByb3ZpZGVyX2lkIjoiMTE0NzM4MjU2MDA3MzUyMDQ3MDk0Iiwic3ViIjoiMTE0NzM4MjU2MDA3MzUyMDQ3MDk0In0sInByb3ZpZGVyIjoiZ29vZ2xlIiwibGFzdF9zaWduX2luX2F0IjoiMjAyNC0xMC0xMFQwOToxMTowMC45MTQ1OThaIiwiY3JlYXRlZF9hdCI6IjIwMjQtMTAtMTBUMDk6MTE6MDAuOTE0NjQyWiIsInVwZGF0ZWRfYXQiOiIyMDI0LTEwLTEwVDA5OjExOjAwLjkxNDY0MloiLCJlbWFpbCI6InBhY2Uuc3RlZmFubzc3QGdtYWlsLmNvbSJ9XSwiY3JlYXRlZF9hdCI6IjIwMjQtMTAtMTBUMDk6MTE6MDAuOTA4NzY0WiIsInVwZGF0ZWRfYXQiOiIyMDI0LTEwLTEwVDA5OjExOjAxLjQ5Nzg5WiIsImlzX2Fub255bW91cyI6ZmFsc2V9LCJwcm92aWRlcl90b2tlbiI6InlhMjkuYTBBY002MTJ5ZUxMOGk4cDlST2x0eEozdGhPNHNVd2dKTGpvNUJ2S2ZKRmhZbVQzeGFDWGsweVdHNjZKcFhwTXNpazVnZjhNWWhmVkhJUTBBR254YlFQSjNESVhkZnFiOHp6U1hvUUVHcU56RXFxQ2lRQUQ5SWlWTmVKWGNBYW5Kdm9QV3IycDFIaUZKbzBicnZ6XzV5TmVMNEVmWnMzc3hGeG5EdGQwaEhhQ2dZS0FlZ1NBUkVTRlFIR1gyTWlEbmV6aHZBaUVZYi1MUEtINV83OERRMDE3NSJ9"; // Sostituisci con il tuo token di autenticazione
    const udioWrapper = new UdioWrapper(authToken);

    try {
        const { prompt, seed, customLyrics } = req.body;
        const shortSong = await udioWrapper.create_song(prompt, seed, customLyrics);
        res.json(shortSong);
    } catch (error) {
        console.error("Errore nella generazione della canzone:", error);
        res.status(500).send("Errore nella generazione della canzone.");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
