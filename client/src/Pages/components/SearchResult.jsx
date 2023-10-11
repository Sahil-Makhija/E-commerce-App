import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({item}) => {
  
  return (
    <Link className='card-bg hover:text-black w-[95vw] lg:w-[60%]  my-2 hover:shadow-gray-500 shadow-md  ' to={'/product/' + item.slug}>

            <div className=' flex space-x-6  rounded-sm p-2'>
              <div className=' w-[20vw] flex justify-center items-center '>
                <img className=' max-h-[25vh]' src={item?.images[0]} alt={item.productName} />
              </div>
              <div className='w-[75%] flex flex-col justify-center'>
                <h2 className='font-bold text-[3vmin]  mb-3'  >{item.productName}</h2>
                <p className='text-xs text-gradient'>Extra &#8377; {item?.productMRP - item?.productSP} off</p>
                <div>
                  <span className=' font-bold text-green-500 text-[4vmin]'>&#8377; {item?.productSP} </span><span className=' line-through'>&#8377; {item?.productMRP}</span>
                </div>
                {/* <ul className='list-disc mx-7 my-2' >
                  {item?.highlights.map((point, index) => {
                    if (index > 2) { return null }
                    return (<li>{point}</li>)
                  })}
                </ul> */}
              </div>

            </div>
          </Link>
  )
}

export default SearchResult
