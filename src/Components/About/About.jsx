import React from 'react';

function About() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-500 to-zinc-900">
      <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg bg-white text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-8">About</h1>
        <p className="text-lg text-gray-700 mb-8">Welcome to the wild world of About! Here, you'll find all the extraordinary details about us.</p>
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-md transition duration-300 ease-in-out">Learn More</button>
        </div>
      </div>
    </div>
  );
}

export default About;
