import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const {pathname} = useLocation();
  const pathsArray = pathname.split("/");
  const breadcrumb_elements = pathsArray.map((path, index) => {
    if (index === 0) return null;
    let linkTo = "";
    for (let i = 1; i < index+1; i++) {
      linkTo+= `/${pathsArray[i]}`;
    }
    return <li className="inline-flex items-center truncate" key={path}>
            <a className="capitalize flex items-center hover:text-altTextColor focus:outline-none focus:text-altTextColor" href={linkTo}>
            {path}
            </a>
            {index == pathsArray.length-1 ? "" :<svg className="flex-shrink-0 size-5 text-gray-400 dark:text-gray-600 mx-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round"/>
            </svg>}
        </li>
  });

  return (
    <ol className="mb-2 text-sm flex items-center whitespace-nowrap text-gray-700 font-semibold" aria-label="Breadcrumb">
        {breadcrumb_elements}
    </ol>
  )
}

export default Breadcrumb;
