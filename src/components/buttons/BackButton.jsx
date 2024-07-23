import { ArrowLeft, ArrowLeftCircle } from 'lucide-react';
import React from 'react'
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
    const navigate = useNavigate();

  return (
    <div>
        <button onClick={() => navigate(-1)} className='flex items-center gap-2 ml-2 hover:bg-gray-100 py-2 pl-3 pr-6 relative z-50 rounded-sm font4'>
          {/* <ArrowLeftCircle /> */}
          <MdOutlineKeyboardDoubleArrowLeft size={25} />
          Back
        </button>
    </div>
  )
}

export default BackButton