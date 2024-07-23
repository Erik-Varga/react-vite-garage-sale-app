import React from 'react'
import { Gamepad, Gamepad2, MessageSquareText } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const LightsOutGameButton = () => {
    const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center font4'>
        <button onClick={() => navigate("/lightsout")} className='flex items-center gap-2 my-2 ml-2 hover:bg-gray-100 py-2 px-3 rounded-sm'>          
          Lights Out
          <Gamepad2 />
        </button>
    </div>
  )
}

export default LightsOutGameButton