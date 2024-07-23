import React, { useState } from 'react';
import { Button, Dialog, DialogBody } from '@material-tailwind/react';
import { CircleUserRound, XCircle } from 'lucide-react';
import { FaHandHoldingUsd, FaQuestionCircle } from 'react-icons/fa';

const MakeOfferModal = ({ makeOfferInfo, setMakeOfferInfo, makeOfferFunction, offerTitle, originalPrice }) => {
    // modal state
    const [open, setOpen] = useState(false);

    // functions
    const handleOpen = () => setOpen(!open);

    // console.log(offerTitle)

    // user
    const user = JSON.parse(localStorage.getItem('users'));

    return (
        <>
            <div className="flex items-center gap-1 text-sm text-gray-700">
                Make Offer
                <Button
                    type='button'
                    onClick={handleOpen}
                    className='flex justify-center items-center gap-1 px-2 py-2 text-center text-white bg-gray-600 border border-transparent dark:border-gray-700 hover:border-gray-500 hover:text-white hover:bg-green-600 rounded-xl'
                >
                    <FaHandHoldingUsd size={25} />
                </Button>
            </div>
            <Dialog open={open} handler={handleOpen} className='bg-gray-50'>
                <DialogBody>
                    <div className='flex justify-between items-center px-1 pb-4'>
                        <span className="font2">Offer Form</span>
                        <XCircle onClick={handleOpen} className='cursor-pointer hover:text-red-900' />
                    </div>

                    <div className='border border-gray-200 my-2 p-4 flex flex-col justify-between gap-2'>
                        <div className="font-bold font1">
                            <span className="font-bold text-2xl ">{offerTitle}</span>
                            <input
                                name='name'
                                type='text'
                                defaultValue={offerTitle}
                                // placeholder='Enter your name'
                                className='px-1 font-bold bg-transparent'
                                readOnly
                                hidden
                            />
                        </div>

                        <div className="font4 font-bold">
                            <span className="font-bold">original price: </span> ${originalPrice} | <span className="font-bold">Your offer: </span> <span className='text-2xl'>
                                {makeOfferInfo.offerAmount > 0 ? <span>$</span> : <span className='animate-ping'>$</span>}{makeOfferInfo.offerAmount}</span>
                        </div>

                        <span className='flex items-center gap-2 text-sm font2'>
                            {user?.avatar
                                ?
                                <>
                                    <img src={user?.avatar} alt="" className='h-12 w-auto rounded-full' />
                                </>
                                :
                                <>
                                    <CircleUserRound size={40} />
                                </>}
                            {user?.name} | {user?.email} | {user?.role}
                        </span>


                        <div className="">
                            <input
                                name='name'
                                type='text'
                                defaultValue={makeOfferInfo.email}
                                // placeholder='Enter your name'
                                className='px-1 bg-transparent'
                                readOnly
                                hidden
                            />

                            <input
                                name='name'
                                type='text'
                                defaultValue={makeOfferInfo.name}
                                // placeholder='Enter your name'
                                className='px-1 bg-transparent'
                                readOnly
                                hidden
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <input
                            name='offerAmount'
                            type='text'
                            value={makeOfferInfo.offerAmount}
                            onChange={(e) => {
                                setMakeOfferInfo({
                                    ...makeOfferInfo,
                                    offerAmount: e.target.value
                                })
                            }}
                            placeholder='Your Offer $'
                            className='font4 font-bold bg-gray-50 border border-gray-200 px-2 py-2 w-full rounded-md outline-none text-gray-600 placeholder-gray-500'
                            required
                        />
                    </div>

                    <div className='w-full'>
                        <Button
                            onClick={() => {
                                handleOpen();
                                makeOfferFunction();
                            }}
                            type='button'
                            className='w-full px-4 py-3 text-center text-gray-100 bg-gray-600 border border-transparent dark:border-gray-700 hover:border-gray-500 hover:text-white hover:bg-green-400 rounded-lg'
                        >
                            Send Offer
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    )
}

export default MakeOfferModal