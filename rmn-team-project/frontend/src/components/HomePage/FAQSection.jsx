import React from 'react';

const faqs = [
  {
    question: 'What IT services do you offer?',
    answer: 'We offer comprehensive IT support services including helpdesk support, cybersecurity solutions, network setup and management, cloud solutions, bot/live chat support, on-site IT support, IT training, and data backup and recovery.',
  },
  {
    question: 'How can I request IT support?',
    answer: 'You can request IT support by contacting our helpdesk via phone or email, or by submitting a support ticket through our online portal.',
  },
  {
    question: 'Do you provide on-site IT services?',
    answer: 'Yes, we offer on-site IT services for businesses that require in-person support for their IT infrastructure.',
  },
  {
    question: 'What industries do you specialize in for IT services?',
    answer: 'We specialize in providing IT services to a wide range of industries including healthcare, finance, education, and small businesses.',
  },
  {
    question: 'Can you help with data backup and recovery?',
    answer: 'Yes, we provide data backup and recovery solutions to ensure your business data is secure and can be restored in case of any data loss incidents.',
  },
  {
    question: 'What are the different subscription plans available?',
    answer: 'We offer three subscription plans: Basic, Plus, and Pro. Each plan is designed to cater to different business needs, providing various levels of support and features.',
  },
];

const FAQSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-blue-700 sm:text-4xl">FAQ</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Here are some of the most common questions that we get.
          </p>
        </div>
        <div className="space-y-10">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-100 transition duration-300">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{faq.question}</h3>
              <p className="mt-2 text-base text-gray-500">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
