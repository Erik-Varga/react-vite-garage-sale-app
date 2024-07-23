import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../searchBar/SearchBar'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { PiGarage, PiPerson, PiUser } from "react-icons/pi";
import { FaHamburger, FaQuestionCircle, FaUserCheck } from 'react-icons/fa';
import { CircleUserRound, Moon, ShieldCheck, ShoppingCart, Sun, UserCheck } from 'lucide-react';
import Weather from '../weather/Weather';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button, Drawer } from 'antd';
import HorizontalRow from './../horizontalRow/HorizontalRow';
import ContactButton from './../buttons/ContactButton';
import { FaTemperatureHigh } from 'react-icons/fa';
import LightDark from '../footer/LightDark';
import ColorPalette from './../colorPalette/ColorPalette';

const Navbar = () => {
  // get user from localStorage
  const user = JSON.parse(localStorage.getItem('users'));

  // navigate
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.clear('users');
    toast.success('Logout successful');
    navigate('/');
  };

  const handleHome = () => {
    navigate('/')
    setOpen(false)
  }

  const handleViewItems = () => {
    navigate('/all-items')
    setOpen(false)
  }

  const handleLogin = () => {
    navigate('/')
    navigate('/login')
    setOpen(false)
  }

  const handleRegister = () => {
    navigate('/')
    navigate('/register')
    setOpen(false)
  }

  const handleAbout = () => {
    navigate('/')
    navigate('/about')
    setOpen(false)
  }

  const handleContact = () => {
    navigate('/')
    navigate('/contact')
    setOpen(false)
  }

  const handleUserDashboard = () => {
    navigate('/')
    navigate('/user-dashboard')
    setOpen(false)
  }

  // cart items
  const cartItems = useSelector((state) => state.cart);
  const cartItemsTotal = cartItems.map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

  // navList Data
  const navList = (
    <ul className='flex space-x-2 md:space-x-6 text-white dark:text-black font-medium text-md font1'>
      {/* <LightDark /> */}
      {/* home */}
      {/* <li><Link to={'/'}>Home</Link></li> */}

      {/* latest items */}
      {/* <li><Link to={'/latest-items'}>Latest</Link></li> */}

      {/* all items */}
      <li><Link to={'/all-items'}>View Items</Link></li>

      {/* about */}
      {/* <li><Link to={'/about'}>About</Link></li> */}

      {/* sign up */}
      {/* {!user ? <li><Link to={'/register'}>Sign Up</Link></li> : ''} */}

      {/* login */}
      {/* {!user ? <li><Link to={'/login'}>Login</Link></li> : ''} */}

      {/* user */}
      {user?.role === 'user' && <li><Link to={'/user-dashboard'}>Profile</Link></li>}


      {/* logout */}
      {/* {user && <li className='cursor-pointer' onClick={logout}>Logout</li>} */}

      {/* cart */}
      {cartItemsTotal > 0 ?
        <li>
          <Link to={'/cart'}>
            <span className='flex items-center gap-1 font4'>
              <ShoppingCart /> Cart({cartItemsTotal})
            </span>
          </Link>
        </li>
        :
        <></>}

      <div className='flex items-center cursor-pointer'>
        <GiHamburgerMenu size={25} onClick={showDrawer} />
      </div>

      {/* <Button type="primary" onClick={showDrawer}>
        Open
      </Button> */}

      <Drawer className='font1' title="Garage Sale App" placement="right" onClose={onClose} open={open}>
        <div className='text-black font-base font1 flex flex-col'>
          {user && <>
            <span className='flex items-center gap-2 text-sm font1 mb-2'>
              {user?.avatar
                ?
                <div key={user?.itemID}>
                  <img src={user?.avatar} alt="" className='h-12 w-auto rounded-full' />
                </div>
                :
                <>
                  <CircleUserRound size={40} />
                </>}
              {user?.name} | {user?.email}
            </span>
          </>}

          <div className='font4'>
            {cartItemsTotal > 0 ?
              <div className='w-full hover:bg-gray-200 cursor-pointer p-2'>
                <Link to={'/cart'}>
                  <span className='flex items-center gap-1'>
                    <ShoppingCart /> Cart({cartItemsTotal})
                  </span>
                </Link>
              </div>
              :
              <div className='cursor-default p-2'>
                Cart(0)
              </div>
            }
          </div>

          <div>
            <hr className="w-48 h-1 mx-auto bg-gray-100 border-0 rounded md:my-1" />
          </div>

          <div onClick={handleHome} className='w-full text-left hover:bg-gray-200 cursor-pointer p-2'>
            Home
          </div>
          <div onClick={handleViewItems} className='w-full text-left hover:bg-gray-200 cursor-pointer p-2'>
            View Items
          </div>
          <div onClick={handleContact} className='w-full text-left hover:bg-gray-200 cursor-pointer p-2'>
            Contact
          </div>
          <div onClick={handleAbout} className='w-full text-left hover:bg-gray-200 cursor-pointer p-2'>
            About
          </div>
          <div>
            <hr className="w-48 h-1 mx-auto bg-gray-100 border-0 rounded md:my-1" />
          </div>

          
          {/* {user?.role === 'user' && <li><Link to={'/user-dashboard'}>Profile</Link></li>} */}

          {user?.role === 'user' &&
            <div className='w-full hover:bg-gray-200 cursor-pointer p-2'>
              <Link to={'/user-dashboard'}>
                <span className='flex items-center gap-1' onClick={handleUserDashboard}>
                  <span className=''>Profile</span>
                </span>
              </Link>
            </div>
          }

          {user?.role === 'admin' &&
            <>
              <div className='w-full hover:bg-gray-200 cursor-pointer p-2'>
                <Link to={'/admin-dashboard'}>
                  <span className='flex items-center gap-1'>
                    <span className=''>Admin Dashboard</span>
                  </span>
                </Link>
              </div>
            </>
          }

          {/* {!user && <div className='w-full hover:bg-gray-200 cursor-pointer p-2' onClick={handleRegister}>Register</div>} */}
          {!user && <div className='w-full hover:bg-gray-200 cursor-pointer p-2' onClick={handleLogin}>Login</div>}

          {user && 
          <div className='w-full hover:bg-gray-200 cursor-pointer p-2' onClick={logout}>Logout</div>
          }
        </div>
      </Drawer>
    </ul>
  );

  // theme light & dark
  const [dark, setDark] = useState(false);

  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    setDark(!dark);
  }

  return (
    <div className='bg-woods-taupe dark:bg-woods-taupe-dark top-0'>
      <div className="font1 flex justify-between items-center p-2">
        <Link to='/' className='flex flex-col justify-center items-center'>
          <span className="flex flex-row items-center gap-1 text-white hover:text-gray-300">
            <PiGarage size={35} />
            <h2 className='flex text-center'>Garage Sale App</h2>
          </span>
        </Link>
        {user && <>
        <div className='flex justify-center items-center text-white font4'>
          {user?.role === 'admin' &&
            <>
              <ShieldCheck size={20}/> Admin
            </>
          }
        </div>
        <div className='flex justify-center items-center text-white font4'>
          {user?.role === 'user' &&
            <>
              <UserCheck size={20}/> &nbsp;{user?.name}
            </>
          }
        </div>
      </>}
        <div className="text-base">
          {navList}
        </div>
      </div>
      {/* <ColorPalette /> */}
    </div>
  )
}

export default Navbar