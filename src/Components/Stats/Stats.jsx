import React, { useState, useEffect} from 'react';

function Stats() {
  
  const [usernames, setUsernames] = useState([]);

  useEffect(()=>{
    const localData = localStorage.getItem("usernames");
    console.log(localData);
    const parsedlocalData = JSON.parse(localData);
    setUsernames(parsedlocalData);
  }, [])

  const dataLoader = async (usernames) => {  
    const userData = await Promise.all(usernames.map(async (username) => {
      try {
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
  
        const response3 = await fetch(`http://localhost:3000/${username}`)
        const userData = await response3.json();
        const name = userData.name;
  
        return {
          name,
          username,
          acceptedSolutionsToday,
          acceptedSolutionsWeek,
          contestRating,
        };
      } catch (error) {
        console.error(`Error fetching data for user ${username}:`, error);
        // Handle the error here, for example, return a default object
        return {
          name: "Unknown",
          username,
          acceptedSolutionsToday: 0,
          acceptedSolutionsWeek: 0,
          contestRating: 0,
        };
      }
    }));
  
    return userData;
  }



  const [userData, setUserData] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const data = await dataLoader(usernames);
      data.sort((a, b) => b.acceptedSolutionsWeek - a.acceptedSolutionsWeek);
      setUserData(data);
    };
    fetchData();
  }, [usernames]);

  // Sort userData when it changes
  useEffect(() => {
    if (userData) {
      userData.sort((a, b) => b.acceptedSolutionsWeek - a.acceptedSolutionsWeek);
    }
  }, [userData]);

  const [newUsername, setNewUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernames(prevUsernames => {
      const updatedUsernames = [...prevUsernames, newUsername];
      localStorage.setItem('usernames', JSON.stringify(updatedUsernames));
      return updatedUsernames;
    });
    setNewUsername('');
  };
  

  if (!userData) {
    return (
      
      <div role="status" className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-400 to-black text-white transition-all duration-100'>
          <svg aria-hidden="true" className=" w-32 h-32 mx-auto text-gray-200 animate-spin dark:text-white fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              <span className="sr-only">...Loading...</span>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>

    )
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-400 to-black text-white transition-all duration-100">
        <div className="w-1/2 mx-auto text-white my-auto mt-60 mb-60">
          <h1 className='text-center text-white'>leaderboard: according to problem solved this week</h1>
        <form onSubmit={handleSubmit} className="mt-4 mx-auto">
          <div className="flex items-centerpy-2">
            <input
              className="bg-transparent border-black shadow-xl rounded-xl w-full text-black bg-white mr-3 py-1 px-2 "
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter LeetCode username"
            />
            <button
              className="flex-shrink-0 bg-gray-800 hover:bg-white hover:text-black border-gray-700 hover:border-black duration-300 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
        <table className="mx-auto mt-5 w-full border-black shadow-2xl bg-gray-700">
          <thead>
            <tr>
              <th className="border border-gray-600 p-2 text-center">Rank</th>
              <th className="border border-gray-600 p-2 text-center">Name</th>
              <th className="border border-gray-600 p-2 text-center">Username</th>
              <th className="border border-gray-600 p-2 text-center">Accepted Solutions (today)</th>
              <th className="border border-gray-600 p-2 text-center">Accepted Solutions (this week)</th>
              <th className="border border-gray-600 p-2 text-center">Contest Rating</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={user.username}>
                <td className="border border-gray-600 p-2 text-center">{index + 1}</td>
                <td className="border border-gray-600 p-2 text-center">{user.name}</td>
                <td className="border border-gray-600 p-2 text-center">
                  <a href={`https://leetcode.com/u/${user.username}`} target="_black">{user.username}</a>
                </td>
                <td className="border border-gray-600 p-2 text-center">{user.acceptedSolutionsToday}</td>
                <td className="border border-gray-600 p-2 text-center">{user.acceptedSolutionsWeek}</td>
                <td className="border border-gray-600 p-2 text-center">{Math.round(user.contestRating)}</td>
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



// export ;


