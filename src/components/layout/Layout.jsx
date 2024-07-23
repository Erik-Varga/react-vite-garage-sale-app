import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import TopMenu from '../topMenu/TopMenu'

const Layout = ({children}) => {
  return (
    <div>
        {/* <TopMenu /> */}
        <Navbar />
        <div>
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout