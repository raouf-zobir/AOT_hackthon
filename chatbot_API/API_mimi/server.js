// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.static('public', { index: '../mimi.html' }));

app.get('/api/medicine', async (req, res) => {
    const medicineName = req.query.name;
    if (!medicineName) {
        return res.status(400).send({ error: 'Medicine name is required' });
    }

    try {
        const response = await axios.get(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${medicineName}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching data from OpenFDA API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
