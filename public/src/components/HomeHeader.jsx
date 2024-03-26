import React from 'react'
import Headroom from 'react-headroom'
import { Form, useSubmit } from 'react-router-dom'
import sampleTwo from "../assets/media/sampleTwo.png"
import { FaArrowRightFromBracket } from 'react-icons/fa6'

const HomeHeader = () => {

    const submitThis = useSubmit();

    const handleLogout = (Event) => {
        Event.preventDefault();

        const logout = confirm("Do you want to logout?");
        if (logout) {
            submitThis(Event.target.parentElement.parentElement);
        } else {
            return null;
        }
    }

  return (
    <Headroom className='z-50'>
            <header className="z-50 w-full flex items-center bg-altBgColor py-2 h-14">
                <h1 className='max-sm:hidden uppercase text-altTextColor pl-4 text-lg'>theunigallery</h1>
                <Form className="max-w-md mx-auto min-w-96">   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-mainTextColor/40" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm border border-gray-900 rounded-lg bg-gray-50 focus:ring-mainBgColor focus:border-mainBgColor" placeholder="Search for internships..." required />
                        <button type="submit" className="text-altTextColor absolute end-2.5 top-1 bg-altBgColor hover:scale-105 font-medium rounded-lg text-sm px-4 py-1">Search</button>
                    </div>
                </Form>

                {/* Inbox Icon */}
                <Form action='/home/logout' method='post' title='Log out' onClick={handleLogout} className="w-8 h-8 rounded-full border overflow-hidden border-mainBgColor max-sm:hidden absolute end-3 top-3">
                    <input type="hidden" name="logout" />
                    <button type='submit'>
                        <img src={sampleTwo} className="w-full h-full" alt="" />
                    </button>
                </Form>
                <div className="hidden absolute group-hover:absolute right-2 z-10 mt-1 w-48 origin-top-right rounded-md bg-gray-100 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="" role="none">
                        <form method='post' action='/home/logout'>
                            <button type="submit" className="flex rounded-md gap-2 justify-start items-center text-red-600 w-full px-4 py-2 text-left text-md hover:bg-red-100" role="menuitem">
                                <FaArrowRightFromBracket />
                                Log out
                            </button>
                        </form>
                    </div>
                </div>

            </header>
        </Headroom>
  )
}

export default HomeHeader
