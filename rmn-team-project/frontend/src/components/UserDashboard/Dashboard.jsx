import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";
import Chat from "./Chat";
import Footer from "./Footer";
import SignOutModal from "./SignOutModal";
import Plans from "./Plans";

const Dashboard = ({ redirectToPlans }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showCorrespondence, setShowCorrespondence] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleViewClick = () => {
    setShowCorrespondence(!showCorrespondence);
  };

  const handleReplyClick = () => {
    setShowReply(!showReply);
  };

  const handleSignOutClick = () => {
    setIsSignOutModalOpen(true);
  };

  const handleSignOutConfirm = () => {
    setIsSignOutModalOpen(false);
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
    setSelectedPlan(null);
    setCartItems(0);
  };

  useEffect(() => {
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
        />
        <Routes>
          <Route
            path="/"
            element={
              <MainContent
                handleViewClick={handleViewClick}
                handleReplyClick={handleReplyClick}
                showCorrespondence={showCorrespondence}
                showReply={showReply}
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
