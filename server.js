const express = require("express");
const morgan = require("morgan"); // Import morgan middleware
const dotenv = require("dotenv");
const translateRoute = require("./routes/translateRoute");


// Configure env
dotenv.config();

// Rest object
const app = express();

app.use(express.json());
app.use(morgan("dev")); // Use morgan middleware for logging
app.get('/', (req, res) => {
    res.send('Welcome to the translation API. To translate text, send a POST request to the https://thoughtful-bear-cuff-links.cyclic.app/translate endpoint with a JSON body containing the text to translate.');
});
// Routes
app.use("/", translateRoute);


// PORT
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
