const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Create an instance of the express app
const app = express();
const port = 5000;

// Enable CORS to allow your frontend to make requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// API endpoint to check for data breaches using the LeakCheck API
app.post('/api/breaches/check', async (req, res) => {
    const { type, value } = req.body;

    if (!type || !value) {
        return res.status(400).json({ error: 'Type and value are required.' });
    }

    try {
        // Construct the LeakCheck API URL
        const url = `https://leakcheck.io/api/public?check=${value}`;

        // Make the GET request to the LeakCheck API
        const response = await axios.get(url);

        // If the LeakCheck API is successful, check if the data is found
        if (response.data.success) {
            return res.json({
                breached: response.data.found > 0,
                details: response.data, // This contains breach details if found
            });
        } else {
            return res.json({ breached: false, details: null });
        }
    } catch (error) {
        console.error('Error checking breach:', error);
        return res.status(500).json({ error: 'Error checking data breach.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
