const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse JSON bodies
app.use(express.json());
// Serve static frontend files
app.use(express.static(path.join(__dirname, '..', 'frontend')));
// Fallback route for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});
// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Endpoint to fetch exchange rates
app.get("/api/rates/:fromCode", async (req, res) => {
  let fromCode = req.params.fromCode;

  // Strip .json extension if sent by the frontend
  if (fromCode.endsWith(".json")) {
    fromCode = fromCode.slice(0, -5);
  }

  fromCode = fromCode.trim().toLowerCase();

  // Validate the currency code (must be exactly 3 alphabetic characters)
  if (!/^[a-z]{3}$/.test(fromCode)) {
    return res.status(400).json({
      error: "Invalid currency code format. Must be a 3-letter currency code (e.g., usd).",
    });
  }

  const apiKey = process.env.API_KEY;
  const isApiKeyConfigured = apiKey && apiKey !== "YOUR_API_KEY" && apiKey.trim() !== "";

  try {
    let exchangeData;

    if (isApiKeyConfigured) {
      console.log(`Fetching rates for ${fromCode.toUpperCase()} using secure ExchangeRate-API...`);
      // Call the secure external ExchangeRate API using the server-side API Key
      const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCode.toUpperCase()}`;
      const response = await fetch(apiURL);

      if (!response.ok) {
        throw new Error(`External API responded with status ${response.status}`);
      }

      const externalData = await response.json();

      if (externalData.result !== "success") {
        throw new Error(externalData["error-type"] || "Failed to fetch rates from external API.");
      }

      // Map the response to the frontend's expected format (lowercase codes, nested rates object)
      const rates = {};
      if (externalData.conversion_rates) {
        for (const [key, value] of Object.entries(externalData.conversion_rates)) {
          rates[key.toLowerCase()] = value;
        }
      }

      exchangeData = {
        date: new Date().toISOString().split("T")[0],
        [fromCode]: rates,
      };
    } else {
      console.log(`API_KEY not set. Using public fawazahmed0 API fallback for ${fromCode.toUpperCase()}...`);
      // Fallback to the public API
      const fallbackURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCode}.json`;
      const response = await fetch(fallbackURL);

      if (!response.ok) {
        throw new Error(`Fallback API responded with status ${response.status}`);
      }

      exchangeData = await response.json();
    }

    // Return the response
    res.json(exchangeData);
  } catch (error) {
    console.error("Error fetching exchange rates:", error.message);
    res.status(502).json({
      error: "Failed to fetch exchange rates. The external rate provider might be down or rate-limited.",
      details: error.message,
    });
  }
});

// Error handling middleware for unexpected errors
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "An unexpected error occurred on the server.",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`Currency Converter Backend running on port ${PORT}`);
  console.log(`Local Endpoint: http://localhost:${PORT}/api/rates`);
  console.log(`==================================================`);
});
