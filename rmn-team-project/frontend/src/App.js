import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import AboutUs from "./components/HomePage/AboutUs.jsx";
import ContactUs from "./components/HomePage/ContactUs.jsx";
import Dashboard from "./components/UserDashboard/Dashboard.jsx";
import LoginModal from "./components/HomePage/LoginModal";
import RegisterModal from "./components/HomePage/RegisterModal";

function App() {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  const openLoginModal = () => setLoginModalIsOpen(true);
  const closeLoginModal = () => setLoginModalIsOpen(false);
  const openRegisterModal = () => setRegisterModalIsOpen(true);
  const closeRegisterModal = () => setRegisterModalIsOpen(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage openModal={openLoginModal} />} />
          <Route
            path="/about"
            element={<AboutUs openModal={openLoginModal} />}
          />
          <Route
            path="/contact"
            element={<ContactUs openModal={openLoginModal} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <LoginModal
          isOpen={loginModalIsOpen}
          onRequestClose={closeLoginModal}
        />
        <RegisterModal
          isOpen={registerModalIsOpen}
          onRequestClose={closeRegisterModal}
        />
      </div>
    </Router>
  );
}

export default App;
