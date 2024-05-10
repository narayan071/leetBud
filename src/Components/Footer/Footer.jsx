import React from 'react'
import { Link, NavLink} from 'react-router-dom'
function Footer() {
  return (
    <>
    <footer className='bg-black text-white text-center py-4 fixed bottom-0 left-0 w-full'>
      <p>built with love by  <span className='text-yellow-500'><a href="https://narayan-pradhan.netlify.app/" target='_blank'>@murthy</a></span></p>
    </footer>
    </>
  )
}

export default Footer