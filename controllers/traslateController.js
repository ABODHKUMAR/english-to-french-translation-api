const axios = require('axios');

const translateController = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text to translate is required' });
        }

        const encodedParams = new URLSearchParams();
        encodedParams.set('from', 'en');
        encodedParams.set('to', 'fr');
        encodedParams.set('text', text); // Corrected variable name to 'text'

        const options = {
          method: 'POST',
          url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '3926835e04msh1bd925d479a3f19p16ecd4jsn71da831a39ad',
            'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
          },
          data: encodedParams,
        };

        try {
            const response = await axios.request(options);
            console.log(response);
        } catch (error) {
            console.error('Error in translating text:', error);
            return res.status(500).json({ error: 'Translation service error' });
        }
    } catch (error) {
        console.error('Error in handling translation request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = translateController;
