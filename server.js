const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const storyRoutes = require('./routes/storyRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize Firebase
const { initializeFirebase } = require('./config/firebase-config');
initializeFirebase(); // Ensure Firebase is initialized

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use routes
app.use('/api', storyRoutes);
app.use('/api', authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
