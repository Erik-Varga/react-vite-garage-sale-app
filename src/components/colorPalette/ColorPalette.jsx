import React from 'react'

const ColorPalette = () => {
  return (
    <div className='flex w-full text-sm'>
        <div className='w-1/5 text-center text-white p-2 bg-woods-black'>Woods Black</div>
        <div className='w-1/5 text-center text-white p-2 bg-woods-taupe'>Woods Taupe</div>
        <div className='w-1/5 text-center text-black p-2 bg-woods-tan'>Woods Tan</div>
        <div className='w-1/5 text-center text-white p-2 bg-woods-rust'>Woods Rust</div>
        <div className='w-1/5 text-center text-white p-2 bg-woods-gray'>Woods Gray</div>
        <div className='w-1/5 text-center text-white p-2 bg-woods-red'>Woods Red</div>
    </div>
  )
}

export default ColorPalette