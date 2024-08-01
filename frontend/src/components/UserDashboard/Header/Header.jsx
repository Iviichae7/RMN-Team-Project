import React, { useState } from "react";
import { FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import RemoteSupportModal from "../Modals/RemoteSupportModal";

const Header = ({
  handleSignOut,
  cartItems,
  selectedPlan,
  removePlan,
  purchasePlan,
  currentRoute,
  userId,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRemoteSupportModalOpen, setIsRemoteSupportModalOpen] =
    useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handlePurchase = () => {
    purchasePlan();
    setIsCartOpen(false);
  };

  const toggleRemoteSupportModal = () => {
    setIsRemoteSupportModalOpen(!isRemoteSupportModalOpen);
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center relative">
      <div className="flex items-center space-x-4">
        <img
          src="/assets/RMN_transparent.png"
          alt="Logo"
          className="max-w-20 h-auto ml-2"
        />
      </div>
      <div className="flex-1 flex justify-center">
        {currentRoute === "/dashboard" && (
          <button
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg 
                          transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r 
                          hover:from-blue-500 hover:to-blue-700 hover:shadow-xl"
            onClick={toggleRemoteSupportModal}
          >
            Request Remote Support
          </button>
        )}
      </div>
      <div className="flex items-center space-x-8 mr-6 relative">
        <FaUser className="text-2xl cursor-pointer transition-transform duration-200 transform hover:scale-125 hover:text-blue-500" />
        <div className="relative">
          <FaShoppingCart
            className="text-2xl cursor-pointer transition-transform duration-200 transform hover:scale-125 hover:text-yellow-500"
            onClick={toggleCart}
          />
          {cartItems > 0 && (
            <span className="absolute left-4 bottom-4 inline-block w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full text-center">
              {cartItems}
            </span>
          )}
          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
              {selectedPlan ? (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {selectedPlan.name} Plan
                  </h3>
                  <p className="text-sm mb-4">
                    €{selectedPlan.price} / {selectedPlan.period}
                  </p>
                  <button
                    className="w-full bg-red-500 text-white py-1 rounded-md mb-2"
                    onClick={removePlan}
                  >
                    Remove
                  </button>
                  <button
                    className="w-full bg-green-500 text-white py-1 rounded-md"
                    onClick={handlePurchase}
                  >
                    Purchase
                  </button>
                </div>
              ) : (
                <p className="text-sm">No items in cart</p>
              )}
            </div>
          )}
        </div>
        <FaSignOutAlt
          className="text-2xl cursor-pointer transition-transform duration-200 transform hover:scale-125 hover:text-red-500"
          onClick={handleSignOut}
        />
      </div>
      {isRemoteSupportModalOpen && (
        <RemoteSupportModal
          onClose={toggleRemoteSupportModal}
          userId={userId}
        />
      )}
    </header>
  );
};

export default Header;
