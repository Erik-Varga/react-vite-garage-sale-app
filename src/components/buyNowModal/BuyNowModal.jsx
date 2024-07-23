import React, { useState } from 'react';
import { Button, Dialog, DialogBody } from '@material-tailwind/react';
import { XCircle, CircleUserRound } from 'lucide-react';
import HorizontalRow from '../horizontalRow/HorizontalRow';

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    // user
    const user = JSON.parse(localStorage.getItem('users'));
    
    // cartItems
    const cart = JSON.parse(localStorage.getItem('cart'));

    // modal state
    const [open, setOpen] = useState(false);

    // functions
    const handleOpen = () => setOpen(!open);

    const formatPhoneNumber = (value) => {
        // return value if falsey
        if (!value) return value;
        // removes non-digit values
        const phoneNumber = value.replace(/[^\d]/g, "");
        const phoneNumberLength = phoneNumber.length;

        // returns phone number formatted
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    const handlePhoneNumberInput = (e) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setAddressInfo({
            ...addressInfo,
            mobileNumber: formattedPhoneNumber
        })
    } 

    return (
        <>
            <Button
                type='button'
                onClick={handleOpen}
                className='w-full px-4 py-3 text-center text-white bg-gray-600 border border-transparent dark:border-gray-700 hover:border-gray-500 hover:text-white hover:bg-green-600 rounded-xl'
            >
                Send Order
            </Button>
            <Dialog open={open} handler={handleOpen} className='bg-gray-50'>
                <DialogBody>
                    <div className='flex justify-between items-center px-1 pb-4'>
                        <span className="font2">Order Form</span>
                        <XCircle onClick={handleOpen} className='cursor-pointer hover:text-red-900' />
                    </div>

                    <div className="font4 font-bold">
                        {cart.map((item, index) => (
                            <div key={index}>
                            <span>
                                {item.title} | ${item.price}
                            </span>
                            <span>
                            {cart.totalPrice}
                            </span>
                            </div>
                        ))}
                    </div>
                    <div className="font4 font-bold bg-gray-200 p-2 my-4">
                        Total Items: {cart.length} | ${cart.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0)}
                    </div>

                    <span className='flex items-center gap-2 text-sm font2'>
                        {user?.avatar
                            ?
                            <div key={user?.itemID}>
                                <img src={user?.avatar} alt="" className='h-12 w-auto rounded-full' />
                            </div>
                            :
                            <>
                                <CircleUserRound size={40} />
                            </>}
                        {user?.name} | {user?.email} | {user?.role}
                    </span>

                    <div className="mb-3">
                        <input
                            name='name'
                            type='text'
                            defaultValue={addressInfo.name}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    name: e.target.value
                                })
                            }}
                            placeholder='Enter your name'
                            className='bg-gray-50 border border-gray-200 px-2 py-2 w-full rounded-md outline-none text-gray-600 placeholder-gray-500'
                            readOnly
                            hidden
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            name='address'
                            type='text'
                            defaultValue={addressInfo.email}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    email: e.target.value
                                })
                            }}
                            placeholder='Enter your address'
                            className='bg-gray-50 border border-gray-200 px-2 py-2 w-full rounded-md outline-none text-gray-600 placeholder-gray-500'
                            readOnly
                            hidden
                        />
                    </div>
                    <div className="mb-3">

                        <input
                            name='mobileNumber'
                            type='text'
                            value={addressInfo.mobileNumber}
                            onChange={(e) => {
                                handlePhoneNumberInput(e)
                            }}
                            placeholder='Enter your Mobile Number'
                            className='bg-gray-50 border border-gray-200 px-2 py-2 w-full rounded-md outline-none text-gray-600 placeholder-gray-500'
                            required />
                    </div>

                    <div className='w-full'>
                        <Button
                            onClick={() => {
                                handleOpen();
                                buyNowFunction();
                            }}
                            type='button'
                            className='w-full px-4 py-3 text-center text-gray-100 bg-gray-600 border border-transparent dark:border-gray-700 hover:border-gray-500 hover:text-white hover:bg-green-400 rounded-lg'
                        >
                            Submit Order
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    )
}

export default BuyNowModal