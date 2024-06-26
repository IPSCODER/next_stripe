"use client"
import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutFrom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import stripe from "stripe";

const stripeInstance = new stripe("sk_test_51Nnz1ASDTdclJtfgBhdXYXT5FiSJcqVu4sMJyFt3olCg6AYVUdFIzLLkOefULbw5XKeFtOVQXC6ziWsdGyLfUWsT00VWW2utEc");

function Payment() {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setStripePromise(loadStripe("pk_test_51Nnz1ASDTdclJtfg7A34SPUVbdb9PViaTiaD7m6bcchnfHpHVO1iZHxuKlehjbBaW75I6COCoiUIZ8xSIhMplBKP00yq0axetk"));
  }, []);



  const payment_intent = async () =>{
    const paymentIntent:any = await stripeInstance.paymentIntents.create({
        amount: 1999, // Amount in cents
        currency: "eur", // Currency must be in lowercase
        // payment_method_types: ["card"], // Specify payment method types
      });
      setClientSecret(paymentIntent.client_secret);


    //   const next_resullt = await axios.post("/api/stripe_key");
    //   setClientSecret(next_resullt.data.clientSecret);
  }


  useEffect(() => {
  payment_intent()
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
