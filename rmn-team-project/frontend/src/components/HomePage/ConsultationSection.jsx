import React from "react";
import { useNavigate } from "react-router-dom";

const ConsultationSection = () => {
  const navigate = useNavigate();

  const handleConsultationClick = () => {
    navigate("/contact");
  };

  return (
    <div className="relative bg-white py-16">
      <div className="absolute inset-0 bg-cover bg-center">
        <div className="absolute inset-0 bg-white opacity-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-base font-semibold tracking-wide uppercase text-blue-600">
          Your business, our priority!
        </h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
          Not sure which plan is right for you?
        </p>
        <p className="max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Book a consultation with one of our experts to discuss your needs and
          find the perfect solution.
        </p>
        <div className="mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
            onClick={handleConsultationClick}
          >
            Book a Consultation
          </button>
        </div>
      </div>
      <div className="relative mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl font-semibold text-gray-500 text-center">
          Why Book a Consultation?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-center">
          <div className="bg-white shadow-2xl rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900">
              Personalised Solutions
            </h4>
            <p className="mt-2 text-base text-gray-500">
              Get tailored IT solutions that meet your specific business needs.
            </p>
          </div>
          <div className="bg-white shadow-2xl rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900">
              Expert Advice
            </h4>
            <p className="mt-2 text-base text-gray-500">
              Receive professional advice from our experienced IT experts.
            </p>
          </div>
          <div className="bg-white shadow-2xl rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900">
              Cost-Effective Plans
            </h4>
            <p className="mt-2 text-base text-gray-500">
              Discover the most cost-effective plans that fit your budget.
            </p>
          </div>
        </div>
      </div>
      <div className="relative mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <img
          src="/assets/consultation_illustration.png"
          alt="Consultation Illustration"
          className="mx-auto h-48 w-auto"
        />
        <p className="mt-8 text-xl text-white italic">
          "Empowering businesses through innovative IT solutions."
        </p>
      </div>
    </div>
  );
};

export default ConsultationSection;
