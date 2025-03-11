const express = require('express');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');
const urlRoute = require('./routes/url');

connectDB();
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/url', urlRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; 
