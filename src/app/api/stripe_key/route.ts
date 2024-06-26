import { NextResponse } from "next/server";
import stripe from "stripe";

const stripeSecretKey = "sk_test_51Nnz1ASDTdclJtfgBhdXYXT5FiSJcqVu4sMJyFt3olCg6AYVUdFIzLLkOefULbw5XKeFtOVQXC6ziWsdGyLfUWsT00VWW2utEc";

// Initialize Stripe with your secret key
const stripeInstance = new stripe(stripeSecretKey);

export async function POST() {
  try {
    // Create a PaymentIntent
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: 1999, // Amount in cents
      currency: "eur", // Currency must be in lowercase
      payment_method_types: ["card"], // Specify payment method types
    });

    // Send publishable key and PaymentIntent details to client
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error creating PaymentIntent:", error);
    return NextResponse.json({
      error: {
        message: "Failed to create PaymentIntent",
      },
    });
  }
}
