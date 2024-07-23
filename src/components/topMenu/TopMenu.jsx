import { Menu } from 'antd'
import React from 'react'

const TopMenu = () => {
  return (
    <div>
        <Menu 
            className='bg-bitter-chocolate top-0 p-1 antMenu'
            style={{ color: "white" }}
            mode='horizontal'
            items={[
                {
                    label: "Home",
                    key: "home",
                },
                {
                    label: "All Items",
                    key: "allItems",
                },
                {
                    label: "About",
                    key: "about",
                },
                {
                    label: "Login",
                    key: "login",
                },
            ]}></Menu>
    </div>
  )
}

export default TopMenu