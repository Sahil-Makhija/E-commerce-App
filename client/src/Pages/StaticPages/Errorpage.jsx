import React from 'react'
import Navbar from '../components/Navbar'

const Errorpage = ({nav, msg }) => {
  return (
    <>
      {nav && (<Navbar/>)}
      <div className='w-full flex h-[50vh] justify-center items-center flex-col'>
        <h1 className='font-bold text-[5vmin] text-green-400'>Oops! Some Error Occured</h1>
        <i>sorry for inconvinience</i>
        <br />
        <span className='text-red-400 text-[3vmin] font-bold' >{msg}</span>
      </div>
    </>

  )
}

export default Errorpage
