import React from 'react';

function About() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-500 to-zinc-900">
      <div className="max-w-4xl w-full mx-auto p-8 rounded-lg shadow-lg bg-white text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-8">About me</h1>
        <div className="mt-16 text-center">
          <p className="text-lg mb-8">I'm a passionate problem solver with a love for coding and algorithms. Through this project, I aim to create a community of like-minded individuals who enjoy the thrill of solving complex problems.</p>
          <p className="text-lg mb-8">Join me on this journey as we embark on a quest to sharpen our minds, improve our coding skills, and have a great time along the way!</p>
        </div>
      </div>
    </div>
  );
}

export default About;
