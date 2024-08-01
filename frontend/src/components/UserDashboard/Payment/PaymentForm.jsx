import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "../../../config/axiosConfig";
import SuccessModal from "../Modals/SuccessModal";

const PaymentForm = ({ amount, onSuccess, planId, userId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
    country: "IE",
  });

  const handleChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      const response = await axios.post("/api/create-payment-intent", {
        amount,
      });
      const clientSecret = response.data.clientSecret;

      if (!clientSecret) {
        throw new Error("Missing client secret");
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: billingDetails.name,
            email: billingDetails.email,
            address: {
              country: billingDetails.country,
            },
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          await axios.post("/api/update-user-plan", { planId, userId });
          setShowSuccessModal(true);
          onSuccess(result.paymentIntent);
          setProcessing(false);
        }
      }
    } catch (error) {
      setError("Payment failed. " + error.message);
      setProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Payment Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={billingDetails.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name on card
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={billingDetails.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country or region
              </label>
              <select
                id="country"
                name="country"
                value={billingDetails.country}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 py-2 px-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                <option value="US">United States</option>
                <option value="IE">Ireland</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Card Information</h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="card-element"
                className="block text-sm font-medium text-gray-700"
              >
                Card information
              </label>
              <div className="mt-1">
                <CardElement
                  id="card-element"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#32325d",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#fa755a",
                      },
                    },
                    hidePostalCode: true,
                  }}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {processing ? "Processing..." : `Pay €${amount / 100}`}
        </button>
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
      </form>
      <SuccessModal show={showSuccessModal} onClose={handleCloseModal} />
    </div>
  );
};

export default PaymentForm;
