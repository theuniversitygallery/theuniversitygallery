import { useRouteError } from "react-router-dom";
import { LuBadgeAlert } from "react-icons/lu";
import Button from "../miniComponents/Button";

const NotFound = () => {
    const indexError = useRouteError();
    console.log(indexError);

  return (
    <div className='px-2 w-screen h-screen bg-mainBgColor flex flex-col gap-3 text-xl justify-center items-center'>
      <LuBadgeAlert fontSize={60} />
        Route does not exist!
      <div className="flex gap-4">
        <Button url="/">Log In</Button>
        <Button url="/home">Go Home</Button>
      </div>
    </div>
  )
}

export default NotFound
