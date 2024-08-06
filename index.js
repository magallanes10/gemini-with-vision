const express = require('express');
const Gemini = require('@onepunya/ez-gemini');
const app = express();
const port = process.env.PORT || 3000;

const gemini = new Gemini();

app.get('/gemini', async (req, res) => {
  const { ask, imgurl } = req.query;
  const response = {};

  try {
    if (ask) {
      if (imgurl) {
        const vision = await gemini.vision(imgurl, ask);
        response.vision = vision;
      } else {
        const textResponse = await gemini.pro(ask);
        response.textResponse = textResponse;
      }
    } else {
      response.message = 'The "ask" parameter is required.';
    }

    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
