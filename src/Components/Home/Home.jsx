import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-400 to-black text-white transition-all duration-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Problem Solving Gamified!</h1>
        <p className="text-lg mb-8">Hi, I'm Narayan, also known as QuietQuerist on LeetCode. I've created this project to turn problem-solving into a fun and rewarding experience.</p>
        <p className="text-lg mb-8">Are you ready to challenge yourself, enhance your problem-solving skills, and climb the ranks?</p>
        <Link to="/stats">
          <button className="bg-white text-gray-800 font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            View Stats
          </button>
        </Link>
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-lg mb-8">I'm a passionate problem solver with a love for coding and algorithms. Through this project, I aim to create a community of like-minded individuals who enjoy the thrill of solving complex problems.</p>
        <p className="text-lg mb-8">Join me on this journey as we embark on a quest to sharpen our minds, improve our coding skills, and have a great time along the way!</p>
      </div>
    </div>
  );
}

export default Home;
