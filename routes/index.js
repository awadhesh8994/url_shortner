const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/url');

const baseUrl = process.env.BASE_URL || 'https://your-vercel-url.vercel.app';

router.post('/api/url/shorten', async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    let url = await Url.findOne({ longUrl });

    if (url) {
      return res.json(url);
    }

    const urlCode = shortid.generate();
    const shortUrl = `${baseUrl}/${urlCode}`;

    url = new Url({
      urlCode,
      longUrl,
      shortUrl,
      createdAt: new Date()
    });

    await url.save();
    return res.status(201).json(url);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
