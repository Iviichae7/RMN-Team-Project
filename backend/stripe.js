const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("./dbconfig");

router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/update-user-plan", async (req, res) => {
  const { planId, userId } = req.body;

  try {
    if (!userId || userId === "null") {
      throw new Error("Invalid userId received");
    }
    const updateQuery = "UPDATE Users SET Plan = ? WHERE User_ID = ?";
    await db.query(updateQuery, [planId, userId]);
    res.status(200).json({ message: "User plan updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
