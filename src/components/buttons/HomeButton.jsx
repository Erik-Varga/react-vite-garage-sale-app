import React from 'react'
import { Home, MessageSquareText } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import ViewItems from './ViewItems';

const HomeButton = () => {
    const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center gap-2 font4'>
        <button onClick={() => navigate("/")} className='flex items-center gap-2 my-2 ml-2 hover:bg-gray-100 py-2 px-3 rounded-sm'>          
          Home
          <Home />
        </button>
        <ViewItems />
    </div>
  )
}

export default HomeButton