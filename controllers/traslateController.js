const axios = require('axios');

const translateController = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text to translate is required' });
        }

        const options = {
            method: 'POST',
            url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '3926835e04msh1bd925d479a3f19p16ecd4jsn71da831a39ad',
                'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
            },
            data: {
                q: text,
                source: 'en',
                target: 'fr'
            }
        };

        try {
            const response = await axios.request(options);
            // Check if response data contains translation
            if (response.data && response.data.data && response.data.data.translations && response.data.data.translations.translatedText) {
                const translation = response.data.data.translations.translatedText;
                return res.json({ translation: translation });
            } else {
                return res.status(500).json({ error: 'Translation not found' });
            }
        } catch (error) {
            // Handle axios request error
            console.error('Error during translation:', error);
            return res.status(500).json({ error: 'Translation service error' });
        }

    } catch (error) {
        // Handle other errors
        console.error('Error in handling translation request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = translateController;
