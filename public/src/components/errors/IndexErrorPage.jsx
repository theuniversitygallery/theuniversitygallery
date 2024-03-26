import { useRouteError } from "react-router-dom";
import { LuBadgeAlert } from "react-icons/lu";
import Button from "../miniComponents/Button";

const IndexErrorPage = () => {
    const indexError = useRouteError();
    console.log(indexError);

  return (
    <div className='px-2 w-screen h-screen bg-mainBgColor flex flex-col gap-3 text-xl justify-center items-center'>
      <LuBadgeAlert fontSize={60} />
      {indexError.error?.message || indexError?.message}
      <Button url="/">Go Home</Button>
    </div>
  )
}

export default IndexErrorPage
