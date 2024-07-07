import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';
import Chat from './Chat';
import Footer from './Footer';
import SignOutModal from './SignOutModal';

const Dashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showCorrespondence, setShowCorrespondence] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
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
    navigate('/');
  };

  const handleSignOutCancel = () => {
    setIsSignOutModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-10">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header handleSignOut={handleSignOutClick} />
        <MainContent 
          handleViewClick={handleViewClick} 
          handleReplyClick={handleReplyClick} 
          showCorrespondence={showCorrespondence} 
          showReply={showReply} 
        />
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