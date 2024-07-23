import React from 'react'
import { Home, MessageSquareText } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import ViewItems from './ViewItems';

const HomeOnlyButton = () => {
    const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center gap-2 font4'>
        <button onClick={() => navigate("/")} className='flex items-center gap-2 mt-5 hover:bg-gray-100 pt-2 px-3 rounded-sm'>          
          Home
          <Home />
        </button>
    </div>
  )
}

export default HomeOnlyButton