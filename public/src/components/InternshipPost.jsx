import React from 'react'
import { Link } from 'react-router-dom';

const InternshipPost = ({data}) => {
    const sizeMap = {
        'sm': 'h-36',
        'md': 'h-48',
        'lg': 'h-60',
        'xl': 'h-72',
    }
    const {id, size,companyLogo, color, bgImg, companyName, location, title, tags } = data;
    const bgColor = `w-full h-full ${(color && color !== "") && `bg-[${color}]`}`;

  return (
    <div className={`text-white ${sizeMap[size] || 'h-36'} hover: relative post-item intern-post p-0 overflow-hidden rounded-lg border-altBgColor border`}>
        <img src={companyLogo} className="object-cover absolute left-1 top-1 w-8 h-8 rounded-full border border-altBgColor" alt="" />
        <div className={`${bgColor} peer`}>
            {(bgImg && bgImg !== "") && <img src={bgImg} className="w-full h-full object-cover" alt="" />}
        </div>
        <div className="transition duration-200 ease-in-out absolute bg-gradient-to-t from-[#1c1b1b] to-transparent px-1 h-full bottom-0 w-full hidden hover:flex peer-hover:flex flex-col items-baseline justify-end">
            <Link to={`/home/posts/${id}`} className="text-lg cursor-pointer font-bold post-title">{title}</Link>
            <Link to="" className="cursor-pointer text-sm">
                <span className="font-thin">{companyName}</span> - <span className="italic">{location}</span>
            </Link>
            <ul className="text-xs flex gap-2 px-0 my-1 post-fields">
                {
                    tags.map(tag => (
                        <li key={Math.random()} className="bg-altBgColor border border-altBgColor rounded-xl py-1 px-2">
                            <Link to="">{tag}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default InternshipPost
