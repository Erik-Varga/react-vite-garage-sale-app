import React from 'react'
import Layout from '../../components/layout/Layout'
import HomeButton from '../../components/buttons/HomeButton'


const ThankYouOrder = () => {
  return (
    <Layout>
        <div className="flex items-center justify-center m-10">
      <div>
        <div className="flex flex-col items-center space-y-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="font2 text-4xl font-bold">Thank You for your Order!</h1>
          <p>I will get back with you when item(s) are ready for pickup.</p>
          
          <HorizontalRow />
          
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default ThankYouOrder