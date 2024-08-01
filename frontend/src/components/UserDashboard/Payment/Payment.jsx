import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = ({ clearCart }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get("planId");
  const planPrice = searchParams.get("planPrice");
  const userId = searchParams.get("userId");

  return (
    <div>
      {planId && userId ? (
        <Elements stripe={stripePromise}>
          <PaymentForm
            amount={planPrice * 100}
            planId={planId}
            userId={userId}
            onSuccess={() => {
              clearCart();
            }}
          />
        </Elements>
      ) : (
        <div>No plan selected</div>
      )}
    </div>
  );
};

export default Payment;
