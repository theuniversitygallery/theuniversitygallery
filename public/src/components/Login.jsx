import { Form, Link, useActionData, useNavigation } from "react-router-dom"
import { HashLoader } from "react-spinners";
import Button from "./miniComponents/Button";

const Login = () => {
    const  navigation = useNavigation();
    const loginErrors = useActionData();
    
  return (
    <div>
        <h4 className='underline font-semibold text-3xl mb-2 tracking-wide leading-10'>
            LogIn
            <span className='lg:hidden'> to THEUNIGALLERY</span>
        </h4>
        <Form className='flex flex-col max-w-xl' method='post'>
            <label className='text-lg' htmlFor="username">Username:</label>
            <input type="text" id="username" name='username' className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-50 block w-full ps-4 p-2" placeholder="Username here" required />
            {loginErrors?.userName && <p className='text-red-700'>{loginErrors.userName}</p>}
            <label className='text-lg mt-2' htmlFor="password">Password:</label>
            <input type="password" id="password" name='password' className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-50 block w-full ps-4 p-2" placeholder="Unique password" required />
            {loginErrors?.pwd && <p className='text-red-700'>{loginErrors.pwd}</p>}
            <Button type="submit" classname="w-full mt-5 inline-flex items-center justify-center py-2 px-3 text-base font-semibold text-mainTextColor bg-mainBgColor rounded-md border border-mainTextColor hover:bg-altBgColor hover:text-altTextColor transition-all ease-in-out duration-200 focus:ring-4 focus:outline-none focus:ring-altBgColor/50">
                {navigation.state == "submitting" && <HashLoader color='white' size={25} className='mr-3' />}
                {navigation.state == "submitting" ? "Submitting" : "Log in"}
            </Button>
            {loginErrors?.message && <p className='text-red-700'>{loginErrors.message}</p>}
        </Form>

        <p className='text-lg mt-4'>
            Don't remember your password?
            <Link to="/reset-password" className='underline text-blue-700 hover:text-blue-500 duration-200'> Reset password</Link>
        </p>
        <p className='text-lg'>Haven't gotten your account? <Link to="/register" className='underline text-blue-700 hover:text-blue-500 duration-200'>Register now!</Link></p>
    </div>
  )
}

export default Login
