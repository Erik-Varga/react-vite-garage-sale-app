import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/myContext';
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import { FaHome } from 'react-icons/fa';
import Layout from '../../components/layout/Layout';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineMailLock } from 'react-icons/md';
import Img1 from '../../assets/userImage.svg'

const Signup = () => {
  // context
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  const [showEmailSignUp, setShowEmailSignup] = useState(false);
  
  const toggleEmailSignup = () => {
    setShowEmailSignup(!showEmailSignUp)
  }

  // user signup state
  const [userSignup, setUserSignup] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  // user signup function
  const userSignupFunction = async () => {
    // validation
    if (userSignup.name === '' || userSignup.email === '' || userSignup.password === '') {
      return toast.error('All fields are required!');
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

      // create user object
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        avatar: Img1,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          'en-US',
          {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }
        )
      };

      // create user reference
      const userReference = collection(fireDB, 'user');

      // add user details
      addDoc(userReference, user);

      setUserSignup({
        name: '',
        email: '',
        password: ''
      });

      toast.success("Sign up successful");
      setLoading(false);
      navigate('/login');

    } catch (error) {
      console.log(error)
      toast.error(error.message);
      setLoading(false);
    }
  };

  // google signup function
  const googleSignupFunction = async () => {
    const provider = new GoogleAuthProvider();
    // const users = await signInWithPopup(auth, provider)
    // console.log(users)
    // return users

    setLoading(true);
    try {
      const users = await signInWithPopup(auth, provider);

      // create user object
      const user = {
        name: users.user.displayName,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        avatar: users.user.photoURL,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          'en-US',
          {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }
        )
      };

      // create user reference
      const userReference = collection(fireDB, 'user');

      // add user details
      addDoc(userReference, user);

      setUserSignup({
        name: '',
        email: '',
        password: ''
      });

      toast.success("Sign up successful");
      setLoading(false);
      navigate('/login');

    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  };


  return (
    <Layout>
      {/* loader component */}
      <div className="flex justify-center relative top-20">
        {loading && <Loader />}
      </div>

      <div className='flex justify-center items-center mt-5'>
        {/* sign up form */}
        <div className="bg-gray-50 px-8 py-6 border border-gray-100 rounded-xl shadow-md">
          {/* heading */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-gray-500">
              Sign Up
            </h2>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={googleSignupFunction}
              // onClick={() => navigate('/login')}
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
              onClick={toggleEmailSignup}
              className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:bg-gray-100 hover:shadow transition duration-150">
              <MdOutlineMailLock size={25} />
              <span>using Email & Password</span>
            </button>
          </div>

          {showEmailSignUp && <>
            {/* input name */}
            <div className="mb-3">
              <input
                type="text"
                placeholder='Full Name'
                value={userSignup.name}
                onChange={(e) => setUserSignup({
                  ...userSignup,
                  name: e.target.value
                })}
                className='bg-gray-50 border border-gray-300 px-2 py-2 w-full rounded outline-none placeholder-gray-700'
              />
            </div>

            {/* input email */}
            <div className="mb-3">
              <input
                type="email"
                placeholder='Email Address'
                value={userSignup.email}
                onChange={(e) => setUserSignup({
                  ...userSignup,
                  email: e.target.value
                })}
                className='bg-gray-50 border border-gray-300 px-2 py-2 w-full rounded outline-none placeholder-gray-700'
              />
            </div>

            {/* input password */}
            <div className="mb-3">
              <input
                type="password"
                placeholder='Password'
                value={userSignup.password}
                onChange={(e) => setUserSignup({
                  ...userSignup,
                  password: e.target.value
                })}
                className='bg-gray-50 border border-gray-300 px-2 py-2 w-full rounded outline-none placeholder-gray-700'
              />
            </div>

            {/* signup using email and password button */}
            <div className="mb-5">
              <button
                onClick={userSignupFunction}
                type='button'
                className='bg-gray-500 hover:bg-gray-600 w-full text-white text-center py-2 font-bold rounded-md'
              >
                Sign up
              </button>
            </div>

          </>}
          <div className='mt-5 flex flex-col justify-around text-sm md:text-base'>
            <h2 className='text-black'>Already have an account?
              <Link className='text-gray-500 hover:text-gray-600 font-bold' to={'/login'}> Login</Link>
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

export default Signup