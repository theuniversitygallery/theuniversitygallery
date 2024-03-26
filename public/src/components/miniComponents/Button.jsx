import { Link } from "react-router-dom"

const Button = ({url, children, classname, type}) => {
    const classes = 'flex justify-center items-center gap-4 bg-altBgColor text-altTextColor rounded-md py-2 px-4 shadow-md hover:opacity-80 hover:px-6 hover:py-3 transition-all ease-in-out duration-200';

    return (
    url ?
    <Link to={url} className={classname || classes}>{children}</Link> :
    <button type={type || "button"} className={classname || classes}>{children}</button>
  )
}

export default Button
