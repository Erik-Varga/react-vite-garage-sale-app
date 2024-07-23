import React from 'react'
import { Gamepad, MessageSquareText } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const PuzzleGameButton = () => {
    const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center font4'>
        <button onClick={() => navigate("/puzzle")} className='flex items-center gap-2 my-2 ml-2 hover:bg-gray-100 py-2 px-3 rounded-sm'>          
          Puzzle
          <Gamepad />
        </button>
    </div>
  )
}

export default PuzzleGameButton