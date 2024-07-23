import { ArrowRight, ArrowRightFromLine, LucideMenuSquare, MailPlus, MoveRight } from 'lucide-react'
import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import RandomImage from '../randomImage/RandomImage';
import ViewItems from '../buttons/ViewItems';
import SignUp from '../buttons/SignUp';
import Stats from '../stats/Stats';
import myContext from '../../context/myContext';
import QrCodeComponent from '../qrCode/QrCodeComponent';
import RegisterButton from './../buttons/RegisterButton';
import LoginButton from './../buttons/LoginButton';

const HeroSection = () => {
  // get user from localStorage
  const user = JSON.parse(localStorage.getItem('users'));

  // navigate
  const navigate = useNavigate();

  // context
  const context = useContext(myContext);
  const { loading, getAllItems } = context;

  return (
    <section className="flex justify-center">
      <div className="grid max-w-screen-xl p-4 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="flex justify-center mb-6 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
            Garage Sale!
            
          </h1>
          <p className="text-center max-w-3xl px-6 mb-6 font-light text-slate-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Welcome! Are you looking for Garage, Rummage, Yard, Thrift Sale items in the Sanford / Orlando, FL area?
            <span className="flex justify-center items-center font-bold">
              <Stats /> 
            </span>
          </p>

          {/* <Stats />  */}
          <div className='flex items-center justify-around gap-1 mb-5'>
            <div className="flex items-center">
                <div className="group flex flex-col justify-center items-center">
                  Get Started <ArrowRight className='ml-4 h-6 w-6 transition-transform group-hover:translate-x-2' />
                </div>
            </div>
            
            {
              !user ?
                <div className='flex gap-1'>
                  {/* <RegisterButton /> */}
                  <ViewItems />
                  <LoginButton />
                </div>
                :
                <ViewItems />
            }
          </div>
          
        </div>
        <div className="lg:mt-0 lg:col-span-5 flex flex-col justify-center">
          <RandomImage />
          {/* <div className='flex justify-center mt-3'>
            <button 
              onClick={() => navigate("/contact")}
              className='flex justify-center items-center gap-2 mb-3 cursor-pointer text-gray-700 hover:text-black p-2'>
              Contact <MailPlus />
            </button>
          </div> */}
        </div>
        <div className="flex justify-center w-[300px]">
          {/* <Stats />  */}
          {/* <QrCodeComponent /> */}
        </div>
        
      
      </div>
      
    </section>
  )
}

export default HeroSection