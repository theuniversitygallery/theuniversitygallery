import { Outlet } from "react-router-dom"

const LandingPageLayout = () => {
  return (
    <div className='w-screen h-screen flex gap-0 m-0 p-0 overflow-hidden'>
        <div className="w-1/2 flex justify-start pl-8 text-xl items-center max-md:hidden bg-gray-100 index_left"></div>
        <div className="w-1/2 max-md:w-full flex flex-col justify-center items-center bg-mainBgColor">
            <Outlet />
        </div>
    </div>
  )
}

export default LandingPageLayout