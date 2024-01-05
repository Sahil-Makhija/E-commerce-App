import React from 'react'
import {useNavigate} from 'react-router-dom'
import {twMerge} from 'tailwind-merge'
type LogoProps = {
  src:string,
  className?:string
}
const Logo:React.FC<{src:string,className?:string}> = ({src,className=""}:LogoProps) => {
  const navigate = useNavigate()
  return (
    <img
      onClick={()=>navigate('/')}
        src={src||"https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/flipkart-095e08.svg"}
        alt="_logo"
        className={ twMerge(className," object-contain w-auto lg:h-[55%] cursor-pointer  max-lg:hidden ") }
      />
  )
}


export default Logo