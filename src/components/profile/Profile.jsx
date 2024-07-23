import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
// import { uploadProfileImage } from '../../firebase/FirebaseConfig'
import { ChevronRightCircle } from 'lucide-react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/FirebaseConfig';



const Profile = () => {
    // user
    const user = JSON.parse(localStorage.getItem('users'));
    // var storage;
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);

    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleSubmit = () => {
        const imageRef = ref(storage, "image");
        uploadBytes(imageRef, image).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setUrl(url);
            }).catch((error) => {
                console.log(error.message, "error getting the image URL")
            });
            setImage(null)
        })
        .catch((error) => {
            console.log(error.message)
        });
    };

    return (
        <div className='flex items-center gap-2'>
            <input type="file" onChange={handleImageChange} />

            <img src={url} alt="" className='h-12 w-12 object-cover' />

            <div className="m-2">
                <Button disabled={!image} onClick={handleSubmit}>
                    Upload
                    &nbsp;
                    {/* <span className="flex h-3 w-3"> */}
                    <span className="animate-ping">
                        <ChevronRightCircle size={10} />

                    </span>
                    {/* <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span> */}
                    {/* </span> */}
                </Button>

            </div>
        </div>
    )
}

export default Profile