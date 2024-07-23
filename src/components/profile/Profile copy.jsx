import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { uploadProfileImage } from '../../firebase/FirebaseConfig'
import { ChevronRightCircle } from 'lucide-react';

const Profile = () => {
    // user
    const user = JSON.parse(localStorage.getItem('users'));

    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    }

    const handleClick = () => {
        uploadProfileImage(photo, user, setLoading);
    }

    useEffect(() => {
        if (user.avatar) {
            setPhotoURL(user.avatar);
        }
    }, [user]);

    return (
        <div className='flex items-center gap-2'>
            <input type="file" onChange={handleChange} />

            <img src={photoURL}
                alt=""
                className='h-12 w-12 object-cover'
            />
            <div className="m-2">
                <Button className='animate' disabled={loading || !photo} onClick={handleClick}>
                    Upload
                    &nbsp;
                    {/* <span className="flex h-3 w-3"> */}
                    <span className={photo && "animate-ping"}>
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