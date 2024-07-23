import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/myContext';
import toast from 'react-hot-toast';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import { FaHome } from "react-icons/fa";
import Layout from './../../components/layout/Layout';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineMailLock } from 'react-icons/md';

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const toggleEmailLogin = () => {
    setShowEmailLogin(!showEmailLogin)
  }

  // user signup state
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  // user login function
  const userLoginFunction = async () => {
    // validation
    if (userLogin.email === '' || userLogin.password === '') {
      return toast.error('All fields are required!');
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
      // console.log(users);

      try {
        const q = query(
          collection(fireDB, 'user'),
          where('uid', '==', users?.user?.uid)
        );

        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => user = doc.data());
          localStorage.setItem('users', JSON.stringify(user));
          setUserLogin({
            email: '',
            password: ''
          });
          toast.success('Login successful');
          setLoading(false);
          if (user.role === 'user') {
            navigate('/');
          } else {
            navigate('/admin-dashboard');
          }
        })
        return () => data;

      } catch (error) {
        console.log(error);
        setLoading(false);
      }

    } catch (error) {
      console.log(error);
      toast.error('Username/password is not correct!')
      setLoading(false);
    }
  };

  // google login function
  const googleLoginFunction = async () => {
    const provider = new GoogleAuthProvider();

    setLoading(true);
    try {
      const users = await signInWithPopup(auth, provider);

      try {
        const q = query(
          collection(fireDB, 'user'),
          where('uid', '==', users?.user?.uid)
        );

        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => user = doc.data());
          localStorage.setItem('users', JSON.stringify(user));
          setUserLogin({
            email: '',
            password: ''
          });
          toast.success('Login successful');
          setLoading(false);
          if (user.role === 'user') {
            navigate('/');
          } else {
            navigate('/');
          }
        })
        return () => data;

      } catch (error) {
        console.log(error);
        setLoading(false);
      }


    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  // forget password function
  const handleResetPassword = () => {
    navigate('/reset')
  }

  return (
    <Layout>
      {/* loader component */}
      <div className="flex justify-center relative top-20">
        {loading && <Loader />}
      </div>

      <div className='flex justify-center items-center mt-5'>
        {/* login form */}
        <div className="login_form bg-gray-50 px-8 py-6 border border-gray-100 rounded-xl shadow-md">
          {/* heading */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-gray-500">
              Login
            </h2>
          </div>

          <div className="flex items-center justify-center">
            <button 
                onClick={googleLoginFunction}
                className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:bg-gray-100 hover:shadow transition duration-150">
              <FcGoogle size={25} />
              <span>using Google</span>
            </button>
          </div>
          
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-3 bg-gray-400 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-gray-50 left-1/2 dark:text-white dark:bg-gray-900">or</span>
          </div>

          <div className="flex items-center justify-center mb-5">
            <button
              onClick={toggleEmailLogin}
              className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:bg-gray-100 hover:shadow transition duration-150">
              <MdOutlineMailLock size={25} />
              <span>using Email & Password</span>
            </button>
          </div>

          {showEmailLogin && <>
            {/* input email */}
            <div className="mb-3">
              <input
                type="email"
                placeholder='Email Address'
                value={userLogin.email}
                onChange={(e) => {
                  setUserLogin({
                    ...userLogin,
                    email: e.target.value
                  })
                }}
                className='bg-gray-50 border border-gray-300 px-2 py-2 w-full rounded outline-none placeholder-gray-700'
              />
            </div>

            {/* input password */}
            <div className="mb-3">
              <input
                type="password"
                placeholder='Password'
                value={userLogin.password}
                onChange={(e) => {
                  setUserLogin({
                    ...userLogin,
                    password: e.target.value
                  })
                }}
                className='bg-gray-50 border border-gray-300 px-2 py-2 w-full rounded outline-none placeholder-gray-700'
              />
            </div>

            {/* login button */}
            <div className="mb-5">
              <button
                onClick={userLoginFunction}
                type='button'
                className='bg-gray-500 hover:bg-gray-600 w-full text-white dark:text-black text-center py-2 font-bold rounded-md'
              >
                Login
              </button>
            </div>
          </>}

          <div className='flex flex-col justify-around text-sm md:text-base'>
            <h2 className='text-black'>Don't have an account?
              <Link className='text-gray-500 hover:text-gray-600 font-bold' to={'/signup'}> Sign Up</Link>
            </h2>

            <h2 className='mt-2 text-black'>
              <Link className='text-gray-500 hover:text-gray-600 font-bold' to={'/forgot-password'}> Forgot Password?</Link>
            </h2>

            <div className='flex justify-end text-gray-600 hover:text-gray-500'>
              <Link to={'/'}>
                <FaHome />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login