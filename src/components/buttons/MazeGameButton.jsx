import React from 'react'
import { Gamepad, Gamepad2, MessageSquareText } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const MazeGameButton = () => {
    const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center font4'>
        <button onClick={() => navigate("/maze")} className='flex items-center gap-2 my-2 ml-2 hover:bg-gray-100 py-2 px-3 rounded-sm'>          
          Maze
          <Gamepad2 />
        </button>
    </div>
  )
}

export default MazeGameButton