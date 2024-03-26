import React from 'react'
import { useLoaderData } from 'react-router-dom'
import CompanyOnboardingForm from './miniComponents/CompanyOnboardingForm';
import StudentOnboardingForm from './miniComponents/StudentOnboardingForm';

const Onboarding = () => {
  const {userType, userId} = useLoaderData();

  return (
    <div className='bg-gray-100 p-6 h-screen w-screen flex justify-center items-center' id='onboarding'>
      <main className='bg-mainBgColor p-6 rounded max-lg:w-full lg:min-w-[980px] max-w-[1100px]'>
        <h2 className='text-2xl font-semibold text-center mb-4'>THEUNIGALLERY</h2>
        <h2 className='text-xl underline mb-6'>Complete your {userType} profile to continue:</h2>
        
        {userType == "company" ? <CompanyOnboardingForm userId={userId} userType={userType} /> : <StudentOnboardingForm userType={userType} userId={userId} />}
      </main>
    </div>
  )
}

export default Onboarding
