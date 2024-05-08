import React from 'react'
import { useLoaderData } from 'react-router-dom'

function Stats() {
  const data = useLoaderData()

  return (
    <>
    <div className='text-center bg-black flex'>
        <div className="w-1/2 text-center text-white my-auto">
            <h1>LeetCode UserName: {data.username}</h1>
            <h1>Name: {data.name}</h1>
            <h1>Reputation : {data.reputation}</h1>
        </div>
        <div className="w-1/2">
            <img src={data.avatar} className='rounded-full shadow-2xl p-3' alt="avatar" />
        </div>
    </div>
    </>
  )
}

export default Stats


export const dataLoader = async() =>{
    const response = await fetch("https://alfa-leetcode-api.onrender.com/QuietQuerist")
    return response.json();
}