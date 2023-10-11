import React from 'react'
import { Link } from 'react-router-dom'
import shortenString from '../../utils/shortenStr'

const ImageCard = ({ item }) => {
    return (
        <>
            <div className='image-card '>
                <img  className='max-h-[25vmin] pr-image ' src={item.images[0]} alt="" />
                <Link to={'/product/' + item?.slug} className='card-data'>

                    <div className='p-2  w-full flex flex-col items-center justify-center bg-white text-center rounded-t-lg  '>
                        <h2 className='text-[2.5vmin]' >{shortenString(item?.productName)}</h2>
                        <p className='text-[2vmin] text-green-500'>Extra &#8377; {item?.productMRP - item?.productSP} off</p>
                        <div>
                            <span className='font-bold text-[3vmin]'>&#8377; {item?.productSP} </span>
                        </div>

                    </div>
                </Link>
            </div>
        </>
    )
}

export default ImageCard
