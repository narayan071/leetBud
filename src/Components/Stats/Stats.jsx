import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

function Stats() {
  
  const userData = useLoaderData();
  userData.sort((a, b) => b.acceptedSolutionsWeek - a.acceptedSolutionsWeek);

  const [newUsername, setNewUsername] = useState('');
  const [usernames, setUsernames] = useState(['QuietQuerist', 'manoharss0407', 'antim_sankalp', 'user4097e']);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernames(prevUsernames => [...prevUsernames, newUsername]);
    setNewUsername('');
    console.log(usernames)
  };

  return (
    <>
      <div className="text-center bg-zinc-700 flex mt-5">
        <div className="w-1/3 mx-auto text-white my-auto">
        <form onSubmit={handleSubmit} className="mt-4 w-1/4 mx-auto">
          <div className="flex items-center border-b-2 border-gray-600 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter LeetCode username"
            />
            <button
              className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
          <table className="mx-auto mt-5 w-full border-collapse border border-gray-600">
            <thead>
              <tr>
                <th className="border border-gray-600 p-2">UserName</th>
                <th className="border border-gray-600 p-2">Accepted Solutions (today)</th>
                <th className="border border-gray-600 p-2">Accepted Solutions (this week)</th>
                <th className="border border-gray-600 p-2">Contest Rating</th>
              </tr>
            </thead>
            <tbody>
              {userData.map(user => (
                <tr key={user.username}>
                  <td className="border border-gray-600 p-2">{user.username}</td>
                  <td className="border border-gray-600 p-2">{user.acceptedSolutionsToday}</td>
                  <td className="border border-gray-600 p-2">{user.acceptedSolutionsWeek}</td>
                  <td className="border border-gray-600 p-2">{user.contestRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Stats;



export const dataLoader = async () => {
  const usernames = ["QuietQuerist", "manoharss0407", "antim_sankalp", "sghosal18222", "bishnu9009", "adityasahu6603", "Amar___"];

  const userData = await Promise.all(usernames.map(async (username) => {
    const response1 = await fetch(`http://localhost:3000/${username}/acSubmission`);
    const submissions = await response1.json();

    const currentTimestamp = Date.now();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); 

    // Set start of the week to Sunday
    const startOfWeek = new Date(startOfDay);
    const dayOfWeek = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust if Sunday
    startOfWeek.setDate(diff);

    const filteredSubmissionsToday = submissions.submission.filter(submission => {
      const submissionTimestamp = parseInt(submission.timestamp) * 1000;
      return submissionTimestamp >= startOfDay && submissionTimestamp <= currentTimestamp;
    });

    const filteredSubmissionsWeek = submissions.submission.filter(submission => {
      const submissionTimestamp = parseInt(submission.timestamp) * 1000;
      return submissionTimestamp >= startOfWeek && submissionTimestamp <= currentTimestamp;
    });

    const acceptedSolutionsToday = filteredSubmissionsToday.length;
    const acceptedSolutionsWeek = filteredSubmissionsWeek.length;

    const response2 = await fetch(`http://localhost:3000/${username}/contest`);
    const contestData = await response2.json();
    const contestRating = contestData.contestRating;

    return {
      username,
      acceptedSolutionsToday,
      acceptedSolutionsWeek,
      contestRating,
    };
  }));

  return userData;
};


