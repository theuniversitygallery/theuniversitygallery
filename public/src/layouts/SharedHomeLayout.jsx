import React from "react";
import { Breadcrumb, HomeBottomNavbar, HomeHeader } from "../components";
import { Outlet, useLoaderData } from "react-router-dom";
import { UserContext } from "../utils/contexts/UserContext";


const SharedHomeLayout = () => {
  const userInfo = useLoaderData();

  return (
    <div className="w-full h-full">
      <UserContext.Provider value={userInfo}>

        {/* Header */}
        <HomeHeader />
        {/* Masonry Grid */}
        <main className="px-3 py-2 mb-4">
          <Breadcrumb />
            <Outlet />
        </main>
        {/* Bottom Navbar */}
        <HomeBottomNavbar />

      </UserContext.Provider>
    </div>
  )
}

export default SharedHomeLayout
