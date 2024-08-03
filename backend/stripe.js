const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("./dbconfig");

/*
 * Route to create a payment with Stripe.
 */
router.post("/create-payment-intent", async (req, res) => {
  // amount to be charged from the request body
  const { amount } = req.body;

  try {
    // Create a new payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    // Send the client secret back to the client
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*
 * Route to update a user's subscription plan in the database.
 */
router.post("/update-user-plan", async (req, res) => {
  // Getting the plan ID and user ID from the body
  const { planId, userId } = req.body;

  try {
    /*
     * Validate that userId is provided and not null.
     * If userId is invalid, throw an error.
     */
    if (!userId || userId === "null") {
      throw new Error("Invalid userId received");
    }

    // Query to update the user's plan in the database
    const updateQuery = "UPDATE Users SET Plan = ? WHERE User_ID = ?";

    // Run the query with the provided plan ID and user ID
    await db.query(updateQuery, [planId, userId]);

    // Send a success response back to the client
    res.status(200).json({ message: "User plan updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
