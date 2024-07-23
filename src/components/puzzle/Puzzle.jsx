import './Puzzle.css'
import React from 'react'
import Layout from './../layout/Layout';
import Board from './Board';
import BackButton from './../buttons/BackButton';
import Timer from './Timer';

const Puzzle = () => {
  return (
    <Layout>
      <BackButton />
      <div className='puzzle font2'>
        <h1 className='p-2 text-2xl text-white'>15 Puzzle Game</h1>
        <Board />
      </div>

      <div>
        <Timer />
      </div>
    </Layout>
  )
}

export default Puzzle