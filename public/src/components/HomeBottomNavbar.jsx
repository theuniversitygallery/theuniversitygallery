import React from 'react'
import { AiOutlineForm } from 'react-icons/ai'
import { FaSquarePlus, FaWpexplorer } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useUserContext } from '../utils/contexts/UserContext'

const HomeBottomNavbar = () => {
    const {userType} = useUserContext();
    console.log(userType);

  return (
    <nav className="font-semibold sm:w-[500px] max-sm:w-full fixed bottom-0 left-1/2 -translate-x-1/2 z-50 max-sm:pb-4 sm:mb-3 px-3 text-lg rounded-t-md  sm:rounded-b-md bg-anotherAltBgColor text-altTextColor">
            <div className="flex w-full justify-around">
                <div className="w-1/3 text-center border-r-2 border-altBgColor">
                    <Link to="/home" className="w-full transition ease-in-out duration-200 py-2 justify-center h-full flex items-center hover:bg-mainBgColor hover:text-mainTextColor">
                        <FaWpexplorer className="mr-2" />
                        Explore
                    </Link>
                </div>
                <div className="w-1/3 text-center border-r-2 border-altBgColor">
                    <Link to="/home/post" className="w-full transition ease-in-out duration-200 py-2 justify-center h-full flex items-center hover:bg-mainBgColor hover:text-mainTextColor">
                        <FaSquarePlus className="mr-2" />
                        Post
                    </Link>
                </div>
                <div className="w-1/3 text-center">
                    <Link to="/home/account" className="w-full transition ease-in-out duration-200 py-2 justify-center h-full flex items-center hover:bg-mainBgColor hover:text-mainTextColor">
                        <AiOutlineForm className="mr-2" />
                        Applications
                    </Link>
                </div>
            </div>
        </nav>
  )
}

export default HomeBottomNavbar
