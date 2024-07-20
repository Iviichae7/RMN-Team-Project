import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import axios from "../../config/axiosConfig";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";
import Chat from "./Chat";
import Footer from "./Footer";
import Plans from "./Plans";
import Payment from "./Payment";
import SignOutModal from "./SignOutModal";
import CreateTicket from "./CreateTicket";

const Dashboard = ({ redirectToPlans }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showCorrespondence, setShowCorrespondence] = useState(null);
  const [showReply, setShowReply] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleViewClick = (ticket) => {
    setShowCorrespondence(ticket);
  };

  const handleReplyClick = () => {
    setShowReply(!showReply);
  };

  const handleSignOutClick = () => {
    setIsSignOutModalOpen(true);
  };

  const handleSignOutConfirm = () => {
    setIsSignOutModalOpen(false);
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleSignOutCancel = () => {
    setIsSignOutModalOpen(false);
  };

  const removePlan = () => {
    setSelectedPlan(null);
    setCartItems(0);
  };

  const purchasePlan = () => {
    if (selectedPlan) {
      const params = new URLSearchParams({
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        planPrice: selectedPlan.price,
        userId: userId,
      }).toString();
      navigate(`/dashboard/payment?${params}`);
    } else {
      alert("No plan selected");
    }
  };

  const clearCart = () => {
    setSelectedPlan(null);
    setCartItems(0);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user");
        if (response.data && response.data.userId) {
          setUserId(response.data.userId);
          localStorage.setItem("userId", response.data.userId);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    if (redirectToPlans) {
      navigate("/dashboard/plans");
    }
  }, [redirectToPlans, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-10">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header
          handleSignOut={handleSignOutClick}
          cartItems={cartItems}
          selectedPlan={selectedPlan}
          removePlan={removePlan}
          purchasePlan={purchasePlan}
          clearCart={clearCart}
          currentRoute={location.pathname}
        />
        <Routes>
          <Route
            path="/"
            element={
              <MainContent
                userId={userId}
                handleViewClick={handleViewClick}
                handleReplyClick={handleReplyClick}
                showCorrespondence={showCorrespondence}
                setShowCorrespondence={setShowCorrespondence}
                showReply={showReply}
                setShowReply={setShowReply}
              />
            }
          />
          <Route
            path="plans"
            element={
              <Plans
                setCartItems={setCartItems}
                setSelectedPlan={setSelectedPlan}
                selectedPlan={selectedPlan}
              />
            }
          />
          <Route path="payment" element={<Payment clearCart={clearCart} />} />
          <Route path="create-ticket" element={<CreateTicket />} />
        </Routes>
        <Chat isChatOpen={isChatOpen} toggleChat={toggleChat} />
        <Footer />
        <SignOutModal
          isOpen={isSignOutModalOpen}
          onRequestClose={handleSignOutCancel}
          onConfirm={handleSignOutConfirm}
        />
      </div>
    </div>
  );
};

export default Dashboard;
