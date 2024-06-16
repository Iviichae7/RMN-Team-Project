import React from 'react';

const features = [
  {
    title: 'Helpdesk Support: 24/7',
    description: 'Get round-the-clock assistance for all your IT needs',
    icon: '/assets/icons/customer-service.png',
  },
  {
    title: 'Cybersecurity Services',
    description: 'Protect your data and systems with our advanced security measures',
    icon: '/assets/icons/padlock.png',
  },
  {
    title: 'Network Setup and Management',
    description: 'Optimize your network for seamless connectivity and performance',
    icon: '/assets/icons/computer.png',
  },
  {
    title: 'Bot & Live Chat Support',
    description: 'Get instant support through our AI-powered chat services',
    icon: '/assets/icons/bot.png',
  },
  {
    title: 'On-site IT Support',
    description: 'Professional on-site support for all your IT infrastructure needs',
    icon: '/assets/icons/office-building.png',
  },
  {
    title: 'IT Training',
    description: 'Comprehensive IT training programs for your team',
    icon: '/assets/icons/training.png',
  },
  {
    title: 'Data Backup and Recovery',
    description: 'Secure and reliable data backup and recovery solutions',
    icon: '/assets/icons/disk.png',
  },
  {
    title: 'Cloud Services',
    description: 'Cloud setup, management, and support for businesses.',
    icon: '/assets/icons/service-cloud.png',
  },
];

const FeaturesSection = () => {
  return (
    <div className="bg-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide uppercase">Features</h2>
          <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Our IT Services Features
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
            Explore the key features that set our IT services apart
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start bg-gray-600 bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-lg border border-gray-300 border-opacity-50">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-200 text-white text-2xl">
                    <img src={feature.icon} alt={feature.title} className="h-10 w-10 rounded-md" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg leading-6 font-medium text-white">{feature.title}</h4>
                  <p className="mt-2 text-base text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
