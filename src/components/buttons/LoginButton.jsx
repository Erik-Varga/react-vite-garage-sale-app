import { MoveRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const LoginButton = () => {
    return (
        <div>
            <Link to={'/login'}>
                <button className="inline-flex h-12 w-full items-center justify-center rounded bg-outline hover:bg-woods-rust text-black hover:text-white px-6 font-medium tracking-wide shadow-md transition focus:outline-none md:mr-4 md:mb-0 md:w-auto font4">
                    Login
                </button>
            </Link>
        </div>
    )
}

export default LoginButton