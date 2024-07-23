import React, { useContext, useEffect, useRef, useState } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/myContext'
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Timestamp, addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import { FaRegTrashCan } from 'react-icons/fa6';
import Category from '../../components/category/Category';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { Button } from '@material-tailwind/react';
import { IoAdd } from 'react-icons/io5';
import BackButton from '../../components/buttons/BackButton';
import moment from 'moment';
import emailjs from '@emailjs/browser';
import MakeOfferModal from './../../components/makeOfferModal/MakeOfferModal';
import { TbSquareChevronDown, TbSquareChevronUp } from 'react-icons/tb';
import { Image } from 'antd';
import { ShoppingCart, ZoomIn } from 'lucide-react';
import RegisterButton from './../../components/buttons/RegisterButton';
import LoginButton from './../../components/buttons/LoginButton';
import LogoutButton from '../../components/buttons/LogoutButton';
import HorizontalRow from '../../components/horizontalRow/HorizontalRow';

const ItemInfo = () => {
  // user
  const user = JSON.parse(localStorage.getItem('users'));

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

  const [originalPrice, setOriginalPrice] = useState(item?.price);

  const [offerImage, setOfferImage] = useState('');
  const [offerItemID, setOfferItemID] = useState('');

  const [showOffer, setShowOffer] = useState(false);
  const [offerDate, setOfferDate] = useState("");
  const [offerEmail, setOfferEmail] = useState("");
  const [offerQuantity, setOfferQuantity] = useState(1);

  const [offerPrice, setOfferPrice] = useState(0);
  const [offerDiff, setOfferDiff] = useState(0);
  const [offerMessage, setOfferMessage] = useState("");

  const [showDescription, setShowDescription] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");

  const previewSize = 100;

  useEffect(() => {
    setShowOffer(false)
    setShowDescription(true)
  }, []);

  useEffect(() => {
    setOfferDate(moment().format('MMMM Do YYYY, h:mm a'))
    // setOfferDiff((offerPrice) - Number(item?.price))
    setOfferTitle(item?.title);
    setOriginalPrice(Number(item?.price));
    setOfferImage(item?.itemImageUrl1);
  }, [offerPrice]);

  const { id } = useParams();
  // console.log(item);

  // get item data
  const getItemData = async () => {
    setLoading(true);
    try {
      const itemTemp = await getDoc(doc(fireDB, 'items', id));
      setItem({ ...itemTemp.data(), id: itemTemp.id });
      // setOfferTitle(item.title);
      // setOfferItemID(item.itemID);
      // setOriginalPrice(Number(item?.price));
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('An error has occurred!');
      setLoading(false);
    }
  };

  // redux
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // functions
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success('Added to cart')
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success('Deleted from cart')
  };

  // handle images
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);

  const handleImg1 = () => {
    setIsActive1(true);
    setIsActive2(false);
    setIsActive3(false);
  };

  const handleImg2 = () => {
    setIsActive1(false);
    setIsActive2(true);
    setIsActive3(false);
  };

  const handleImg3 = () => {
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(true);
  };

  // make offer info
  const [makeOfferInfo, setMakeOfferInfo] = useState({
    name: user?.name,
    email: user?.email,
    userid: user?.uid,
    avatar: user?.avatar,
    offerAmount: '',
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      'en-US',
      {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    ),
  });

  const makeOfferFunction = () => {
    // validation
    if (makeOfferInfo.name === '' || makeOfferInfo.email === '' || makeOfferInfo.userid === '' || makeOfferInfo.offerAmount === '') {
      return toast.error('All fields are required!');
    };

    // order info
    const offerInfo = {
      offerID: Date.now(),
      offerDate: Timestamp.now(),
      key: Date.now(),
      title: offerTitle,
      price: item?.price,
      quantity: offerQuantity,
      makeOfferInfo,
      offerStatus: 'offer submitted',
      time: Timestamp.now(),
      offerDate2: new Date().toLocaleString(
        'en-US',
        {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }
      ),
    };

    try {
      const orderRef = collection(fireDB, 'offers');
      addDoc(orderRef, offerInfo);
      setMakeOfferInfo({
        // name: '',
        // email: '',
        // userid: '',
        offerAmount: '',
      })
      toast.success('Offer submitted!');
      // location.reload();

      function greeting() {
        navigate('/thank-you-offer')
      }

      setTimeout(greeting, 1000);
    } catch (error) {
      console.error(error);
      toast.error('An error has occurred!');
    };
  };

  // handle not logged in
  const handleAddToCartNotLoggedIn = () => {
    toast.error('Please Login to Add to Cart!')
  };

  // handle not logged in
  const handleMakeOfferNotLoggedIn = () => {
    toast.error('Please Login to Make an Offer!')
  }

  const handleOfferDiff = () => {
    setOfferDiff(item?.price - offerAmount)
  }

  const handleShowOffer = () => {
    setShowOffer(!showOffer)
  }

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
    toast.success('Offer sent')
    setOfferDate(null)
    setOfferPrice(0)
    setOfferEmail('')
    setOfferMessage('')
    setPrompt('Your offer has been sent')
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getItemData();
  }, []);

  useEffect(() => {
    setOfferItemID(item.itemID)
  }, [item.itemID])

  useEffect(() => {
    setOfferTitle(item.title)
  }, [item.title])

  return (
    <Layout>

      <section>
        <div className="relative z-10">
          {/* <div>
            <img
              className={!isActive1 ? 'hidden' : 'absolute opacity-15 h-auto w-full object-cover object-center'}
              src={item?.itemImageUrl1} alt={item?.title}
            />
            <img
              className={!isActive2 ? 'hidden' : 'absolute opacity-15 h-auto w-full object-cover object-center'}
              src={item?.itemImageUrl2} alt={item?.title}
            />
            <img
              className={!isActive3 ? 'hidden' : 'absolute opacity-15 h-auto w-full object-cover object-center'}
              src={item?.itemImageUrl3} alt={item?.title}
            />
          </div> */}
          <BackButton />

          <div className="relative z-50 md:flex items-start justify-center py-2 2xl:px-20 md:px-6 px-4">
            <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
              <div className="flex flex-wrap">
                <div className="w-full border-2 bg-white p-2 rounded-md">
                  <div className={!isActive1 ? 'hidden' : 'flex justify-center'} >
                    <img
                      className={!isActive1 ? 'hidden' : 'h-auto w-auto object-cover rounded-lg shadow-lg'}
                      src={item?.itemImageUrl1} alt={item?.title}
                    />
                  </div>
                  <div className={!isActive2 ? 'hidden' : 'flex justify-center'} >
                    <img
                      className={!isActive2 ? 'hidden' : 'h-auto w-auto object-cover rounded-lg shadow-lg'}
                      src={item?.itemImageUrl2} alt={item?.title}
                    />
                  </div>
                  <div className={!isActive3 ? 'hidden' : 'flex justify-center'} >
                    <img
                      className={!isActive3 ? 'hidden' : 'h-auto w-auto object-cover rounded-lg shadow-lg'}
                      src={item?.itemImageUrl3} alt={item?.title}
                    />
                  </div>
                  <div>
                    <div className='flex gap-1 md:gap-2 justify-around mt-3'>
                      <img src={item?.itemImageUrl1} alt="img1" onClick={handleImg1} className='w-[32%] h-40 object-cover rounded-lg cursor-pointer' />
                      <img src={item?.itemImageUrl2} alt="img2" onClick={handleImg2} className='w-[32%] h-40 object-cover rounded-lg cursor-pointer' />
                      <img src={item?.itemImageUrl3} alt="img3" onClick={handleImg3} className='w-[32%] h-40 object-cover rounded-lg cursor-pointer' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <div className={!isActive1 ? 'hidden' : 'flex justify-center'} >
                <img
                  className={!isActive1 ? 'hidden' : 'h-auto w-auto object-cover rounded-lg shadow-lg'}
                  src={item?.itemImageUrl1} alt={item?.title}
                />
              </div>
              <div className={!isActive2 ? 'hidden' : 'flex justify-center'} >
                <img
                  className={!isActive2 ? 'hidden' : 'h-auto w-auto object-cover rounded-lg shadow-lg'}
                  src={item?.itemImageUrl2} alt={item?.title}
                />
              </div>
              <div className={!isActive3 ? 'hidden' : 'flex justify-center'} >
                <img
                  className={!isActive3 ? 'hidden' : 'h-auto w-auto object-cover rounded-lg shadow-lg'}
                  src={item?.itemImageUrl3} alt={item?.title}
                />
              </div>
              <div className="flex items-center justify-center mt-3 space-x-2 md:space-x-0 mb-5">
                <img src={item?.itemImageUrl1} alt="img1" onClick={handleImg1} className='w-1/3 h-auto object-cover rounded-lg cursor-pointer' />
                <img src={item?.itemImageUrl2} alt="img1" onClick={handleImg2} className='w-1/3 h-auto object-cover rounded-lg cursor-pointer' />
                <img src={item?.itemImageUrl3} alt="img1" onClick={handleImg3} className='w-1/3 h-auto object-cover rounded-lg cursor-pointer' />
              </div>
            </div>

            <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 bg-white p-10 rounded-md opacity-100 border-2 shadow-xl">
              <div className="border-b border-gray-200 pb-6">
                <p className="text-sm leading-none text-black">{item?.category}</p>
                <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">{item?.title}</h1>
              </div>
              <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                <p className="text-2xl font-bold leading-4 text-gray-800 dark:text-gray-300">${item?.price}</p>

                {user ?
                  <>
                    <MakeOfferModal
                      makeOfferInfo={makeOfferInfo}
                      setMakeOfferInfo={setMakeOfferInfo}
                      makeOfferFunction={makeOfferFunction}
                      offerTitle={offerTitle}
                      originalPrice={item.price}
                      offerQuantity={offerQuantity}
                    />
                  </>
                  :
                  <>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      Make Offer
                      <Button
                        type='button'
                        onClick={handleMakeOfferNotLoggedIn}
                        className='flex justify-center items-center gap-1 px-3 py-2 text-center text-white bg-gray-600 border border-transparent dark:border-gray-700 hover:border-gray-500 hover:text-white hover:bg-woods-rust rounded-xl'
                      >
                        <FaHandHoldingUsd size={25} />
                      </Button>
                    </div>
                  </>}

              </div>
              <div className="py-4 flex items-center justify-between">
                <p className="text-sm leading-4 text-gray-800 dark:text-gray-300">added: {item?.date}</p>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  {user ?
                    <div className="font4 flex items-center justify-center">
                      {cartItems.some((p) => p.id === item.id)
                        ?
                        <button
                          onClick={() => deleteCart(item)}
                          className='inline-flex h-12 w-full items-center justify-center rounded bg-outline hover:bg-red-700 text-black hover:text-white px-6 font-medium tracking-wide shadow-md transition focus:outline-none md:mr-4 md:mb-0 md:w-auto gap-1'
                        >
                          <FaRegTrashCan size={25} />
                          &nbsp;
                          Remove Item
                        </button>
                        :
                        <button
                          onClick={() => addCart(item)}
                          className='inline-flex h-12 w-full items-center justify-center rounded bg-woods-taupe hover:bg-woods-rust text-white px-6 font-medium tracking-wide shadow-md transition focus:outline-none md:mr-4 md:mb-0 md:w-auto gap-1'
                        >
                          <ShoppingCart />
                          Add to Cart
                        </button>
                      }
                    </div>
                    :
                    <div className="font4 flex items-center justify-center">
                      <button
                        onClick={handleAddToCartNotLoggedIn}
                        className='inline-flex h-12 w-full items-center justify-center rounded bg-woods-taupe hover:bg-woods-rust text-white px-6 font-medium tracking-wide shadow-md transition focus:outline-none md:mr-4 md:mb-0 md:w-auto font4'
                      >
                        Add to Cart
                      </button>
                    </div>
                  }
                </div>

                <div className='flex'>
                  {!user && <LoginButton />}
                </div>
              </div>



              <div>
                {/* description */}
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className='mt-2 p-2 text-sm text-gray-600 hover:bg-white hover:text-gray-900'
                >
                  {showDescription ? <TbSquareChevronDown size={26} title='hide' /> : <TbSquareChevronUp size={26} title='show' />}
                </button>

                {showDescription && <>
                  <p className="w-full text-base lg:leading-tight leading-normal text-black bg-white p-1 rounded-md opacity-90 dark:text-gray-300">
                    {item?.description}
                  </p>

                  <p className='mt-3'>
                    <span className="bg-woods-gray text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">FREE Pickup</span>
                    Longwood, FL 32779
                  </p>

                  <div className='p-3 flex items-center justify-center gap-1'>
                    <span className='text-sm'>Zoom</span><ZoomIn />
                    <Image.PreviewGroup
                      preview={{
                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                      }}
                    >
                      <Image width={previewSize} height={previewSize} style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.75 }} src={item?.itemImageUrl1} />
                      <Image width={previewSize} height={previewSize} style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.75 }} src={item?.itemImageUrl2} />
                      <Image width={previewSize} height={previewSize} style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.75 }} src={item?.itemImageUrl3} />
                    </Image.PreviewGroup>
                  </div>

                </>
                }

              </div>
              {/* <div className='mt-5 flex justify-center'>
                {!user ?
                  <div className='flex'>
                    <RegisterButton />
                    <LoginButton />
                  </div>
                  :
                  ''
                }
              </div> */}


            </div>
          </div>


        </div>

      </section>
      <HorizontalRow />
      <div className="relative z-50">
        <Category />
      </div>
    </Layout>
  )
}

export default ItemInfo