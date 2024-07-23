import React from 'react'
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const AboutButton = () => {
    const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center font4'>
        <button onClick={() => navigate("/about")} className='flex items-center gap-2 my-2 ml-2 hover:bg-gray-100 py-2 px-3 rounded-sm'>          
          About
          <Info />
        </button>
    </div>
  )
}

export default AboutButton