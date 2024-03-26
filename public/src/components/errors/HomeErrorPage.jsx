import { useRouteError } from "react-router-dom";
import { LuBadgeAlert } from "react-icons/lu";
import Button from "../miniComponents/Button";

const HomeErrorPage = () => {
    const indexError = useRouteError();
    console.log(indexError);

  return (
    <div className='w-screen px-2 h-screen bg-mainBgColor flex flex-col gap-3 text-xl justify-center items-center'>
      <LuBadgeAlert fontSize={60} />
      {indexError.error?.message || indexError?.message}
      <div className="flex gap-4">
        <Button url="/home">Go Home</Button>
        <Button url="/">Log In</Button>
      </div>
    </div>
  )
}

export default HomeErrorPage
