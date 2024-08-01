import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import Chat from "./Chat";
import SignOutModal from "./SignOutModal";
import DashboardOverview from "./DashboardOverview";
import Tickets from "./Tickets";
import Emails from "./Emails";
import AddUserForm from "./AddUserForm";
import RDPSupport from "./RDPSupport";

const AdminDashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header handleSignOut={handleSignOutClick} />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="emails" element={<Emails />} />
            <Route path="addUser" element={<AddUserForm />} />
            <Route path="rdpSupport" element={<RDPSupport />} />
          </Routes>
        </main>
        <Footer />
        <Chat isChatOpen={isChatOpen} toggleChat={toggleChat} />
        <SignOutModal
          isOpen={isSignOutModalOpen}
          onRequestClose={handleSignOutCancel}
          onConfirm={handleSignOutConfirm}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
