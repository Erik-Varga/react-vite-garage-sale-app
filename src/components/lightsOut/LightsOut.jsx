import './LightsOut.css'
import React from 'react'
import Layout from '../layout/Layout'
import BackButton from '../buttons/BackButton'
import Title from './Title'
import Board from './Board'
import Reload from './Reload'

const LightsOut = () => {
  
  return (
    <Layout>
      <BackButton />
      <div className="lightsOut">
        <Title />
        <Board lightsOutSize={5} />
        <Reload />
      </div>
    </Layout>
  )
}

export default LightsOut