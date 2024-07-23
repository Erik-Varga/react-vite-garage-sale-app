import React from 'react'
import Layout from '../../components/layout/Layout'
import './NoPage.css'
import HomeButton from './../../components/buttons/HomeButton';

const NoPage = () => {
  return (
    <Layout>
      <div className='flex flex-col mt-10 justify-center items-center'>
        <div className='relative text404 font-bold z-5 flicker'>
            404
        </div>
        <div className="mb-10 text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</div>
        <HomeButton />
      </div>
      
    </Layout>
  )
}

export default NoPage