const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY =
"YOUR_MAKAMESCO_SECRET_KEY";

// STK Push
app.post("/stkpush", async (req, res) => {
  try {
    const response = await axios.post(
      "https://makamescopay.com/api/payments/stkpush",
      {
        phoneNumber: req.body.phoneNumber,
        amount: req.body.amount,
        accountReference: req.body.accountReference,
        transactionDesc: req.body.transactionDesc,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (e) {
    res.status(500).json({
      error: e.response?.data ?? e.message,
    });
  }
});

// Payment Status
app.get("/status/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://makamescopay.com/api/payments/status/${req.params.id}`,
      {
        headers: {
          "X-API-Key": API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (e) {
    res.status(500).json({
      error: e.response?.data ?? e.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Peace M Bible backend running on port 3000");
});
