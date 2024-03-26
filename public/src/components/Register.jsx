import { Form, Link, useActionData, useNavigation, useSubmit } from "react-router-dom"
import { HashLoader } from "react-spinners";
import Button from "./miniComponents/Button";
import { useState } from "react";

const Register = () => {
    const submitThis = useSubmit();
    const  navigation = useNavigation();
    const loginErrors = useActionData();
    const [notEqual, setNotEqual] = useState("")

    const handleConfirmPwd = (Event) => {
        const origPwd = document.querySelector("#password").value;
        const confPwd = document.querySelector("#password-confirm").value;
        if (origPwd !== confPwd) {
            setNotEqual(true)
        } else {
            setNotEqual(false)
        }
    }

    const handleSubmit = (Event) => {
        Event.preventDefault();
        const formData = new FormData(Event.target);
        formData.append("userType", document.querySelector('input[name="userType"]:checked').value);

        submitThis(Event.target);
    }

  return (
    <div className="max-lg:mx-4">
        <h4 className='underline font-semibold text-3xl mb-2 tracking-wide leading-10'>
            Register an account
            <span className='lg:hidden'> with THEUNIGALLERY</span>
        </h4>
        <Form className='flex flex-col max-w-xl' method='post' onSubmit={handleSubmit}>
            {/* Username */}
            <label className='text-lg' htmlFor="username">Username:</label>
            <input type="text" id="username" name='username' className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-50 block w-full ps-4 p-2" placeholder="Username here" required />
            {loginErrors?.userName && <p className='text-red-700'>{loginErrors.userName}</p>}
            {/* Email */}
            <label className='text-lg' htmlFor="email">Email:</label>
            <input type="email" id="email" name='email' className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-50 block w-full ps-4 p-2" placeholder="Email address" required />
            {loginErrors?.email && <p className='text-red-700'>{loginErrors.email}</p>}
            {/* Password */}
            <label className='text-lg mt-2' htmlFor="password">Password:</label>
            <input onChange={handleConfirmPwd} type="password" id="password" name='password' className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-50 block w-full ps-4 p-2" placeholder="Unique password" required />

            {/* Confirm Password */}
            <label className='text-lg mt-2' htmlFor="password-confirm">Confirm Password:</label>
            <input type="password" onChange={handleConfirmPwd} id="password-confirm" name='password-confirm' className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-50 block w-full ps-4 p-2" placeholder="Confirm unique password" required />
            {notEqual && <p className='text-red-700'>Password does not match the unique one above</p>}
            
            {/* Select User Type */}
            <label className='text-lg mt-2' htmlFor="userType">You are a:</label>
            <div className="w-full flex gap-3">
                <label className="cursor-pointer w-1/2">
                    <input required type="radio" name="userType" value="student" className="sr-only peer" />
                    <div className="flex gap-3 justify-center items-center rounded-md border text-center border-altBgColor hover:bg-altBgColor hover:text-altTextColor transition duration-200 ease-in-out px-2 py-3 text-lg peer-checked:bg-altBgColor peer-checked:text-altTextColor">
                        Student
                    </div>
                </label>
                <label className="cursor-pointer w-1/2">
                    <input type="radio" name="userType" value="company" className="sr-only peer" />
                    <div className="rounded-md border text-center border-altBgColor hover:bg-altBgColor hover:text-altTextColor transition duration-200 ease-in-out px-2 py-3 text-lg peer-checked:bg-altBgColor peer-checked:text-altTextColor">
                        Company
                    </div>
                </label>
            </div>

            
            <Button type="submit" classname={`${notEqual ? 'pointer-events-none' : '`'} w-full mt-5 inline-flex items-center justify-center py-2 px-3 text-base font-semibold text-mainTextColor bg-mainBgColor rounded-md border border-mainTextColor hover:bg-altBgColor hover:text-altTextColor transition-all ease-in-out duration-200 focus:ring-4 focus:outline-none focus:ring-altBgColor/50`}>
                {navigation.state == "submitting" && <HashLoader color='white' size={25} className='mr-3' />}
                {navigation.state == "submitting" ? "Submitting" : "Create Account"}
            </Button>
            {loginErrors?.message && <p className='text-red-700'>{loginErrors.message}</p>}
        </Form>

        <p className='text-lg mt-3'>You have an account already? <Link to="/" className='underline text-blue-700 hover:text-blue-500 duration-200'>Login here</Link></p>
    </div>
  )
}

export default Register
