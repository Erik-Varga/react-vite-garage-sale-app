import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import NoPage from './pages/noPage/NoPage';
import ItemInfo from './pages/itemInfo/ItemInfo';
import ScrollTop from './components/scrollTop/ScrollTop';
import AddToCartPage from './pages/cart/AddToCartPage';
import AllItems from './pages/allItems/AllItems';
// import Signup from './pages/registration/Signup';
import ForgotPassword from './pages/registration/ForgotPassword';
// import Login from './pages/registration/Login';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddItemPage from './pages/admin/AddItemPage';
import UpdateItemPage from './pages/admin/UpdateItemPage';
import MyState from './context/myState';
import { Toaster } from 'react-hot-toast';
import { ProtectedRouteForUser } from './protectedRoute/ProtectedRouteForUser';
import { ProtectedRouteForAdmin } from './protectedRoute/ProtectedRouteForAdmin';
import CategoryPage from './pages/category/CategoryPage';
import axios from 'axios';
import LatestItems from './pages/latestItems/LatestItems';
import About from './pages/about/About';
import Services from './pages/services/Services';
import Forecast from './components/weather/Forecast';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Contact from './pages/contact/Contact';
// import ThankYou from './pages/thankYou/ThankYou';

import Puzzle from './components/puzzle/Puzzle';
import LightsOut from './components/lightsOut/LightsOut';

import Maze from './components/maze/Maze';
import WeatherApp from './components/weather/WeatherApp';
import UpdateOrderPage from './pages/admin/UpdateOrderPage';
import UpdateOfferPage from './pages/admin/UpdateOfferPage';
import ThankYouOrder from './pages/thankYou/ThankYouForOrder';
import ThankYouForOffer from './pages/thankYou/ThankYouForOffer';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/FirebaseConfig';

const App = () => {
  const [userState, setUserState] = useState(null); // Start with null to represent no user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserState(user);
      } else {
        setUserState(null); // Use null when there is no user
      }
    });

    return () => {
      unsubscribe();
      setUserState(null);
    };
  }, []);

  const [ip, setIp] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    // getUserIp();
  }, []);

  const getUserIp = async () => {
    const ip = await axios.get('https://ipapi.co/json');
    // console.log(ip.data.ip);
    setIp(ip.data.ip);
    setCity(ip.data.city);
    setState(ip.data.region);
  };

  return (
    <div className='bg-white text-black dark:bg-woods-black dark:text-white transition-all duration-300 w-full'>
      <MyState>
        <Router>
          <ScrollTop />
          <Routes>
            {/* public */}
            <Route path='/' element={<HomePage setUserState={setUserState} />} />
            <Route path='/*' element={<NoPage setUserState={setUserState} />} />
            <Route path='/contact' element={<Contact setUserState={setUserState} />} />
            <Route path='/item-info/:id' element={<ItemInfo setUserState={setUserState} />} />
            <Route path='/cart' element={<AddToCartPage setUserState={setUserState} />} />
            <Route path='/latest-items' element={<LatestItems setUserState={setUserState} />} />
            <Route path='/all-items' element={<AllItems setUserState={setUserState} />} />
            <Route path='/about' element={<About setUserState={setUserState} />} />
            <Route path='/puzzle' element={<Puzzle setUserState={setUserState} />} />
            <Route path='/maze' element={<Maze />} setUserState={setUserState} />
            <Route path='/lightsout' element={<LightsOut setUserState={setUserState} />} />
            
            {/* <Route path='/thank-you' element={<ThankYou />} /> */}
            <Route path='/thank-you-offer' element={<ThankYouForOffer setUserState={setUserState} />} />
            <Route path='/thank-you-order' element={<ThankYouOrder setUserState={setUserState} />} />
            <Route path='/services' element={<Services setUserState={setUserState} />} />


            {/* <Route path='/signup' element={<Signup />} /> */}
            {/* <Route path='/login' element={<Login />} /> */}
            
            <Route path='/register' element={<Register setUserState={setUserState}  />} />
            <Route path='/login' element={<Login setUserState={setUserState} />} />

            

            <Route path='/forgot-password' element={<ForgotPassword setUserState={setUserState} />} />
            <Route path='/weatherApp' element={<WeatherApp setUserState={setUserState} />} />
            <Route path='/forecast' element={<Forecast setUserState={setUserState}  />} />
            <Route path='/category/:categoryname' element={<CategoryPage setUserState={setUserState} />} />

            {/* protected */}
            <Route path='/user-dashboard' element={
              <ProtectedRouteForUser>
                <UserDashboard setUserState={setUserState} />
              </ProtectedRouteForUser>
            } />
            <Route path='/admin-dashboard' element={
              <ProtectedRouteForAdmin>
                <AdminDashboard setUserState={setUserState} />
              </ProtectedRouteForAdmin>
            } />
            <Route path='/add-item' element={
              <ProtectedRouteForAdmin>
                <AddItemPage setUserState={setUserState} />
              </ProtectedRouteForAdmin>
            } />
            <Route path='/update-item/:id' element={
              <ProtectedRouteForAdmin>
                <UpdateItemPage setUserState={setUserState} />
              </ProtectedRouteForAdmin>
            } />
            <Route path='/update-order/:id' element={
              <ProtectedRouteForAdmin>
                <UpdateOrderPage setUserState={setUserState} />
              </ProtectedRouteForAdmin>
            } />
            <Route path='/update-offer/:id' element={
              <ProtectedRouteForAdmin>
                <UpdateOfferPage setUserState={setUserState} />
              </ProtectedRouteForAdmin>
            } />
          </Routes>
          <Toaster />
          {/* <div className='text-xs'>IP: {ip} | {city}, {state} </div> */}
        </Router>
      </MyState>
    </div>
  )
}

export default App