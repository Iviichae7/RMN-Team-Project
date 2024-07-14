import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import HomePage from "./components/HomePage/HomePage.jsx";
import AboutUs from "./components/HomePage/AboutUs.jsx";
import ContactUs from "./components/HomePage/ContactUs.jsx";
import Dashboard from "./components/UserDashboard/Dashboard.jsx";
import LoginModal from "./components/HomePage/LoginModal";
import RegisterModal from "./components/HomePage/RegisterModal";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [redirectToPlans, setRedirectToPlans] = useState(false);

  const openLoginModal = (isPlanRedirect = false) => {
    setLoginModalIsOpen(true);
    setRedirectToPlans(isPlanRedirect);
  };

  const closeLoginModal = () => setLoginModalIsOpen(false);
  const openRegisterModal = () => setRegisterModalIsOpen(true);
  const closeRegisterModal = () => setRegisterModalIsOpen(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<HomePage openLoginModal={openLoginModal} />}
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/dashboard/*"
            element={<Dashboard redirectToPlans={redirectToPlans} />}
          />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
        <LoginModal
          isOpen={loginModalIsOpen}
          onRequestClose={closeLoginModal}
          openRegisterModal={openRegisterModal}
          redirectToPlans={redirectToPlans}
        />
        <RegisterModal
          isOpen={registerModalIsOpen}
          onRequestClose={closeRegisterModal}
          openLoginModal={openLoginModal}
        />
      </div>
    </Router>
  );
}

const WrappedApp = () => (
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
);

export default WrappedApp;
