const express = require("express");
const morgan = require("morgan"); // Import morgan middleware
const dotenv = require("dotenv");
const axios = require('axios');

// Configure env
dotenv.config();

// Rest object
const app = express();

app.use(express.json());
app.use(morgan("dev")); // Use morgan middleware for logging

// Routes
app.post('/translate', async (req, res) => {
    try {
        // Extract text and target language from the request body
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text to translate is required' });
        }

        const encodedParams = new URLSearchParams();
        encodedParams.set('q', text);
        encodedParams.set('target', 'fr');
        encodedParams.set('source', 'en');

        const options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'Accept-Encoding': 'application/gzip',
              'X-RapidAPI-Key': 'f29f522018msh74721a988fcfd45p14b032jsn2f2e39f7842f',
              'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            data: encodedParams,
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              if (response.data && response.data.data && response.data.data.translations && response.data.data.translations.length > 0) {
                  return res.send({ translation: response.data.data.translations[0].translatedText});
              } else {
                  return res.status(500).json({ error: 'Translation not found' });
              }
          } catch (error) {
              console.error('Error in translating text:', error);
              return res.status(500).json({ error: 'Internal server error' });
          }

    } catch (error) {
        console.error('Error in translating text:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// PORT
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
