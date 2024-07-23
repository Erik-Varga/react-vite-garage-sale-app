import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { auth } from '../../firebase/FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';
import { FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaQuestionCircle } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = e.target.email.value;
    sendPasswordResetEmail(auth, emailValue).then(data => {
      toast.success('Check your email for reset instructions');
      setShowThankYou(true);
    }).catch(err => {
      toast.error(err.code);
    });
  }

  return (
    <Layout>
      <div className='flex justify-center items-center mt-5'>
        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={(e) => handleSubmit(e)}>
          <div className="login_form bg-gray-50 px-8 py-6 border border-gray-100 rounded-xl shadow-md">
            <div className="mb-5">
              <h2 className="text-center text-2xl font-bold text-gray-500">
                Forgot Password
              </h2>
              <div className='flex justify-center'>
                <FaQuestionCircle size={30}/>
              </div>

            </div>
            {!showThankYou && (
              <>
              <p className='m-4 text-center'>It's okay, enter <strong>Email</strong> and select <strong>Reset</strong></p>
              <div className="mb-3 w-full">
                <input
                  name="email"
                  type="email"
                  placeholder='Email Address'
                  onChange={(e) => setEmail(e.target.value)}
                  className='bg-gray-50 border border-gray-300 px-2 py-2 w-96 rounded outline-none placeholder-gray-700'
                  required
                />
              </div>
              <div className="mb-5">
                <button
                  type='submit'
                  className='bg-gray-500 hover:bg-gray-600 w-full text-white dark:text-black text-center py-2 font-bold rounded-md'
                >
                  Reset
                </button>
              </div>
              </>
            )}
            {showThankYou && (
              <>
              <div className='bg-blue-50 mt-2 p-5 rounded'>An email has been sent to <strong>{email}</strong>. Please follow instruction links to reset your password.</div>
                
              </>
            )}
            <div className='flex flex-col justify-around mt-4'>
              <div className='flex justify-end text-gray-600 hover:text-gray-500'>
                <Link to={'/'}>
                  <FaHome />
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>





    </Layout>
  )
}

export default ForgotPassword