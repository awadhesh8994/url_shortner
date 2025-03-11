const express = require('express');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

const router = express.Router();
const Url = require('../models/url');


connectDB();
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
router.get('/', (req, res) => {
  res.json({ message: "URL Shortener API is working!" });
});

module.exports = router;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app; // ✅ Vercel needs this export
