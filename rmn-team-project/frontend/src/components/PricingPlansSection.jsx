import React from 'react';

const plans = [
  {
    name: 'Basic',
    price: '99',
    period: 'month',
    features: [
      '24/7 Helpdesk Support.',
      'Basic Security Monitoring: Ensure basic protection against common cyber threats.',
      'Basic Network Setup & Management',
      'Monthly Newsletter: Receive a monthly newsletter with IT tips and updates.',
    ],
    buttonText: 'Try the Basic Plan',
    buttonClass: 'bg-blue-500 text-white hover:bg-blue-700',
  },
  {
    name: 'Plus',
    price: '149',
    period: 'month',
    features: [
      'All Features of Basic Plan',
      '24/7 Helpdesk and Phone Support',
      'Advanced Security Monitoring: Enhanced security measures to protect against more sophisticated threats.',
      'Cloud Storage Integration: Seamlessly integrate with cloud storage solutions.',
      'Weekly Reports: Receive weekly reports on your IT infrastructure and performance.',
    ],
    buttonText: 'Try the Plus plan',
    buttonClass: 'bg-blue-500 text-white hover:bg-blue-700',
  },
  {
    name: 'Pro',
    price: '299',
    period: 'month',
    features: [
      'All Features of Plus Plan',
      '24/7 Helpdesk, Phone, and On-site Support',
      'Real-time Security Monitoring',
      'Custom Cloud Solutions: Tailored cloud solutions to meet your business needs.',
      'Dedicated Account Manager: A dedicated account manager to oversee your IT services and provide personalized support.',
    ],
    buttonText: 'Try the Pro plan',
    buttonClass: 'bg-blue-500 text-white hover:bg-blue-700',
  },
];

const PricingPlansSection = () => {
  return (
    <div className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold tracking-wide uppercase">Choose the Right Plan for Your IT Needs</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Explore our flexible pricing options
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.name} className="flex flex-col bg-gray-600 bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-lg border border-gray-300 border-opacity-50 shadow-lg transform transition-transform duration-300 hover:scale-105">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="mt-4 text-gray-700">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-5xl font-extrabold text-gray-900">€{plan.price}</span>
                    <span className="text-base font-medium text-gray-700"> / {plan.period}</span>
                  </div>
                </div>
                <ul className="mt-6 mb-8 space-y-4">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                        <img src="/assets/icons/check.png" alt="Check" className="flex-shrink-0 w-6 h-6" />
                        <span className="ml-3 text-gray-700">{feature}</span>
                        </li>
                    ))}
                </ul>
                <button className={`mt-auto py-2 px-4 rounded-md ${plan.buttonClass}`}>{plan.buttonText}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlansSection;
