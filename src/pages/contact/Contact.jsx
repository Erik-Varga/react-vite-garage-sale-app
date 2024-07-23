import React, { useContext, useEffect, useRef, useState } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/myContext'
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Timestamp, addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import { FaQuestion, FaRegTrashCan } from 'react-icons/fa6';
import Category from '../../components/category/Category';
import { FaCheckCircle, FaHandHoldingUsd, FaQuestionCircle } from 'react-icons/fa';
import { Button } from '@material-tailwind/react';
import { IoAdd } from 'react-icons/io5';
import BackButton from '../../components/buttons/BackButton';
import moment from 'moment';
import emailjs from '@emailjs/browser';
import { Image } from 'antd';
import gsImg from '../../assets/garage-sale-bags1.jpg'

const ContactImg = "https://avatars.githubusercontent.com/u/67766949?v=4"

const Contact = () => {
  // ref
  const form = useRef();

  //context
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  let navigate = useNavigate();

  // item state
  const [item, setItem] = useState('');
  const [offerTitle, setOfferTitle] = useState('');
  const [offerImage, setOfferImage] = useState('');
  const [offerItemID, setOfferItemID] = useState('');

  // const [showOffer, setShowOffer] = useState(true);
  const [offerDate, setOfferDate] = useState(moment().format('MMMM Do YYYY, h:mm a'));
  const [offerEmail, setOfferEmail] = useState("");
  // const [originalPrice, setOriginalPrice] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  // const [offerDiff, setOfferDiff] = useState(0);
  const [offerMessage, setOfferMessage] = useState("");

  const [showPrompt, setShowPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");

  // useEffect(() => {
  //   setShowOffer(true)
  // }, []);

  useEffect(() => {
    setOfferDate(moment().format('MMMM Do YYYY, h:mm a'))
    // setOfferDiff((offerPrice) - (item?.price))
    // setOfferTitle(item?.title);
    // setOfferImage(item?.itemImageUrl1);
    // setOriginalPrice(Number(item?.price));
  }, [offerPrice]);




  // user
  const user = JSON.parse(localStorage.getItem('users'));

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_dsp8qnl",
      "template_n41avqe",
      form.current,
      "2CUMLFwZfp8nqcHBf")
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(result.text);
      });
    toast.success('Message sent')
    setOfferDate('')
    // setOfferPrice(0)
    setOfferEmail('')
    setOfferMessage('')
    setPrompt('Your message has been sent')
  };

  return (
    <Layout>
      <BackButton />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-md">
          {/* <div className="abg-orange-400 mx-auto w-60 h-auto overflow-hidden rounded-[6rem] rounded-br-none rounded-tl-none filter grayscale">
              <Image
                width={200}
                src={gsImg}
              />
          </div> */}
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Me</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a question? Need help?</p>

          <form ref={form} onSubmit={sendEmail} className="mx-auto">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="offerDate" className="w-20 text-sm font-medium text-gray-900 dark:text-white">Date</label>
              <input type="text" id="offerDate" name="offerDate" value={offerDate} onChange={(e) => setOfferDate(e.target.value)} className="bg-white border border-transparent text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly required />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <label htmlFor="offerEmail" className="w-1/4 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" id="offerEmail" name="offerEmail" value={offerEmail} onChange={(e) => setOfferEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@domain.com" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <label htmlFor="offerMessage" className="w-1/4 text-sm font-medium text-gray-900 dark:text-white">Message</label>
              <textarea id="offerMessage" name="offerMessage" value={offerMessage} onChange={(e) => setOfferMessage(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div>


              {/* <div className="flex items-center gap-2">
                        <label htmlFor="offerTitle" className="w-20 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="text" id="offerTitle" name="offerTitle" value={offerTitle} onChange={(e) => setOfferTitle(e.target.value)} className="bg-white border border-transparent text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                      </div> */}
              {/* <div className="flex items-center gap-2">
                        <label htmlFor="offerImage" className="w-20 text-sm font-medium text-gray-900 dark:text-white">Image URL</label>
                        <input type="text" id="offerImage" name="offerImage" value={offerImage} onChange={(e) => setOfferImage(e.target.value)} className="bg-white border border-transparent text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                      </div> */}
              {/* <div className="flex items-center gap-2 mb-2">
                        <label htmlFor="originalPrice" className="w-20 text-sm font-medium text-gray-900 dark:text-white">Original Price</label>
                        <input type="text" id="originalPrice" name="originalPrice" value={originalPrice} onChange={(e) => setOfferPrice(e.target.value)} className="bg-white border border-transparent text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                      </div> */}
              {/* <div className="flex items-center gap-2 mb-2">
                        <label htmlFor="offerDiff" className="w-20 text-sm font-medium text-gray-900 dark:text-white">Offer Diff</label>
                        $<input type="text" id="offerDiff" name="offerDiff" value={offerDiff} onChange={(e) => setOfferDiff(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter Offer' />
                      </div> */}
            </div>

            <button type="submit" className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Message</button>
          </form>
          {prompt && <>
            <div className='my-5 flex items-center gap-2'>
              <FaCheckCircle className='text-green-500' />
              {prompt} using<img src="https://www.emclient.com/assets/img/landing/emailjs_logo.png?v=638225293560000000" alt="" className='h-10 w-auto' />
            </div>
          </>}
        </div>
      </section>

      {/* <Category /> */}
    </Layout>
  )
}

export default Contact