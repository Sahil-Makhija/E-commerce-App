import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center '>
        <div className='rounded-[50%] h-[7vmax] w-[7vmax] bg-transparent border-b-2 border-black animate-spin '></div>
    </div>
  )
}

export default Loading
