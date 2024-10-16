const express = require('express');
const axios = require('axios'); // Importa axios
const config = require('./config');

const app = express();
const PORT = process.env.PORT || config.port;

// Middleware per gestire le richieste JSON
app.use(express.json());

// Funzione per inviare una richiesta all'endpoint udio_wrapper
async function callUdioWrapper() {
    try {
        const response = await axios.get('https://udio-wrapper.onrender.com/udio_wrapper_endpoint'); // Sostituisci con l'URL corretto
        return response.data;
    } catch (error) {
        console.error('Errore durante la chiamata a udio_wrapper:', error);
        throw error;
    }
}

// Definizione di una route di esempio
app.get('/', async (req, res) => {
    try {
        const data = await callUdioWrapper();
        res.send(`Risposta da udio_wrapper: ${data}`);
    } catch (error) {
        res.status(500).send('Errore durante la chiamata a udio_wrapper');
    }
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
