import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-song', async (req, res) => {
  console.log('Richiesta ricevuta:', req.body);  // Aggiungi questo log

  const { storyText } = req.body;

  if (!storyText) {
    return res.status(400).json({ error: 'Il testo della storia è richiesto' });
  }

  try {
    const response = await fetch('http://ai-made-easy.it/Favole_CANZONI:5000/generate-song', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ storyText })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Errore nella generazione della canzone');
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});