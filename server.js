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
    const authToken = "your-auth-token-here"; // Sostituisci con il tuo token di autenticazione
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
