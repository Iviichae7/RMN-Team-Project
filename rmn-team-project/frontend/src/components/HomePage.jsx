import React from 'react';
import FeaturesSection from './FeaturesSection';

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-between flex-wrap bg-white p-6">
        <div className="flex items-center text-black mr-6 ml-4">
          <img src="/assets/RMN_transparent.png" alt="Logo" className="max-w-20 h-auto" />
        </div>
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z"/></svg>
            </button>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="lg:flex-grow"></div>
              <div className="text-sm lg:flex-grow text-center space-x-8">
                <a href="#" className="relative block mt-4 lg:inline-block lg:mt-0 text-black px-4 py-2 hover:text-gray-700 hover:border hover:border-gray-700 hover:rounded-md transition duration-300 before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-blue-500 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300">Home</a>
                <a href="#" className="relative block mt-4 lg:inline-block lg:mt-0 text-black px-4 py-2 hover:text-gray-700 hover:border hover:border-gray-700 hover:rounded-md transition duration-300 before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-blue-500 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300">Services</a>
                <a href="#" className="relative block mt-4 lg:inline-block lg:mt-0 text-black px-4 py-2 hover:text-gray-700 hover:border hover:border-gray-700 hover:rounded-md transition duration-300 before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-blue-500 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300">About Us</a>
                <a href="#" className="relative block mt-4 lg:inline-block lg:mt-0 text-black px-4 py-2 hover:text-gray-700 hover:border hover:border-gray-700 hover:rounded-md transition duration-300 before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-blue-500 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300">Contact Us</a>
              </div>
              <div className="lg:flex-grow"></div>
              <div className="flex items-center space-x-4 mr-12">
                <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white hover:bg-black mt-4 lg:mt-0">Login</a>
                <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-blue-500 border-blue-500 hover:border-transparent hover:bg-blue-700 mt-4 lg:mt-0">Register</a>
              </div>
          </div>
      </nav>
        {/* main section */}
        <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <section className="flex flex-col lg:flex-row items-center text-center lg:text-left">
          <div className="lg:w-1/2 px-4">
            <h1 className="text-4xl font-bold mb-4">Professional IT Support Services</h1>
            <p className="text-lg mb-6">Your Trusted Partner for Reliable IT Solutions</p>
            <div className="flex justify-center lg:justify-start mb-6">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Get Started</button>
              <button className="bg-transparent hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border border-gray-500">Learn More</button>
            </div>
          </div>
          <div className="lg:w-1/2 px-4">
            <img src="/assets/landingpagevector.png" alt="3D Illustration" className="w-full h-full object-cover"/>
          </div>
        </section>
      </main>
      <FeaturesSection />
    </div>
  );
}

export default HomePage;
