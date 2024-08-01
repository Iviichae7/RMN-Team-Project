import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import axios from "../../../config/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RemoteSupportModal = ({ onClose, userId }) => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [anyDeskID, setAnyDeskID] = useState("");
  const [description, setDescription] = useState("");

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleDownloadConfirmation = () => {
    setIsDownloaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/remote-support-tickets", {
        userId,
        anydeskID: anyDeskID,
        description,
      });
      toast.success("Remote support ticket created successfully!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error creating remote support ticket:", error);
      toast.error("There was an error creating the ticket. Please try again.", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl p-2"
          onClick={onClose}
        >
          &times;
        </button>
        {!isDownloaded ? (
          <>
            <h2 className="text-xl font-bold mb-4">Download AnyDesk</h2>
            <p className="mb-4">
              Before using this feature, you must download AnyDesk. This
              software allows our support team to remotely access your computer
              to assist you with your issue. Please ensure you have
              administrative rights to install the software. Follow these steps:
            </p>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Click the link below to download the AnyDesk Client software.
              </li>
              <li>
                Run the downloaded file to install AnyDesk on your computer.
              </li>
              <li>
                Open AnyDesk and locate your AnyDesk ID on the main screen.
              </li>
            </ol>
            <a
              href="https://anydesk.com/en/downloads"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-md block text-center mb-4"
            >
              Download AnyDesk
            </a>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="confirmDownload"
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="confirmDownload" className="text-gray-700">
                Yes, I have downloaded and installed AnyDesk
              </label>
            </div>
            <button
              className={`bg-green-500 text-white px-4 py-2 rounded-md block text-center w-full ${
                isCheckboxChecked ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleDownloadConfirmation}
              disabled={!isCheckboxChecked}
            >
              Confirm Download
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Enter AnyDesk Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <label className="block text-gray-700 font-semibold mb-2">
                  AnyDesk ID
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={anyDeskID}
                    onChange={(e) => setAnyDeskID(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="ml-2 relative group">
                    <FaInfoCircle className="text-blue-500 hover:text-blue-500 cursor-pointer text-xl" />
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-xs text-gray-700 hidden group-hover:block z-50">
                      <img
                        src="/assets/AnyDesk.png"
                        alt="AnyDesk ID Location"
                        className="mb-2"
                      />
                      Find your AnyDesk ID on the main screen of the AnyDesk
                      application.
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Description of the Problem
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default RemoteSupportModal;
