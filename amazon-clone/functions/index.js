const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51JZWaGHJ0Dupq8Ea9nqNMEsZi3ijRwoIQe7L7iMp4VQGB2C5kR5DAQkjNrRutMZyVafgKU4yiDoJvXekfrGyKNGF00inlaYFMm');

// Setting Up the API

// - App Config
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API Routes
app.get('/', (request, response) => response.status(200).send("hello word"));
app.get('/ricky', (request, response) => response.status(200).send("we vibin"));

// - Listen command
exports.api = functions.https.onRequest(app)