// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Import environment variables in order to connect to database - DO NOT MODIFY
require('dotenv').config();

// Import the models used in these routes - DO NOT MODIFY
const { Band, Musician } = require('./db/models');

// Express using json - DO NOT MODIFY
app.use(express.json());

// STEP 1: Lazy load the musicians of a single the band
app.get('/bands/:id', async (req, res, next) => {
    const band = await Band.findByPk(req.params.id);
    const bandMembers;
    const payload; // Fill this with the band data and their associated musicians
    res.json(payload);
});

// STEP 2: Lazy load the musicians of all the bands
app.get('/bands', async (req, res, next) => {
    const allBands = await Band.findAll({ order: [ ['name'] ] })
    const payload = []; // Fill this with all band data and their associated musicians
    res.json(payload);
});

// BONUS Step 1: Lazy load all the instruments of a musician
const { MusicianInstrument, Instrument } = require('./db/models');

app.get('/musicians/:musicianId', async (req, res, next) => {
    // Your code here
});

// BONUS Step 2: Lazy load all the instruments of all the musicians
app.get('/musicians', async (req, res, next) => {
    // Your code here
});

// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
if (require.main === module) {
    const port = 8000;
    app.listen(port, () => console.log('Server is listening on port', port));
} else {
    module.exports = app;
}