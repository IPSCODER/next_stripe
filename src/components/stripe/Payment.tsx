"use client"
import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutFrom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setStripePromise(loadStripe("pk_test_51Nnz1ASDTdclJtfg7A34SPUVbdb9PViaTiaD7m6bcchnfHpHVO1iZHxuKlehjbBaW75I6COCoiUIZ8xSIhMplBKP00yq0axetk"));
  }, []);



  const payment_intent = async () =>{
    const next_resullt = await axios.post("/api/stripe_key");
    setClientSecret(next_resullt.data.clientSecret);
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
