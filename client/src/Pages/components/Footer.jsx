import React from 'react'

const Footer = () => {
    return (
        <section className='flex flex-col justify-center items-center bg-[#1E1E1E] py-5 text-[#FFFFFF]' >
            <div className='flex justify-evenly w-full '>
                <ul>
                    <li className='font-bold'>Get to know us</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                </ul>
                <ul>
                    <li className='font-bold'>Connect with us</li>
                    <li>Twitter</li>
                    <li>Instagram</li>
                    <li>Facebook</li>

                </ul>
            </div>
            <h2 >&copy; E-commerce App | All rights reserved</h2>
        </section>
    )
}

export default Footer
