import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [questionLink, setQuestionLink] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const link = await fetch(`https://alfa-leetcode-api.onrender.com/daily`);
        const linkData = await link.json();
        setQuestionLink(linkData.questionLink);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-400 to-black text-white transition-all duration-100">
      <span className="absolute top-0 right-0 mt-8 mr-8 z-10">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>
      <button className='p-3 bg-white text-black absolute top-0 right-0 mt-8 mr-8 rounded-3xl hover:shadow-2xl transform hover:scale-110 transition-transform'>
        <a href={questionLink} target="_blank" rel="noopener noreferrer">Today's Question</a>
      </button>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to leetBud!</h1>
        <p className="text-lg mb-8">Hi, I'm Narayan, also known as QuietQuerist on LeetCode. I've created this project to turn problem-solving into a fun and rewarding experience.</p>
        <p className="text-lg mb-8">Are you ready to challenge yourself, enhance your problem-solving skills, and climb the ranks?</p>
        <Link to="/stats">
          <button className="bg-white text-gray-800 font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            View Stats
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
