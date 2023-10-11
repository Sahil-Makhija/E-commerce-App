import React, { useEffect } from 'react'
import ImageCarousel from '../components/ImageCarousel'
import ProductCatalog from '../components/ProductCatalog'
import { useDispatch, useSelector } from 'react-redux'
import loginWithCookie from '../../utils/loginWithCookie'
import getCartFromStorage from '../../utils/getCartFromStorage'
import { userReducer } from '../../redux/reducers'


const HomePage = () => {
    const category = [
        {
            key:1,
            title: 'Televisions',
            category: `television`
        },
        {
            key:2,
            title: 'Refrigerators',
            category: `refrigerator`
        },
        {
            key:3,
            title: 'Coolers',
            category: `cooler`
        },
        {
            key:4,
            title: 'Washing Machines',
            category: `washing_machine`
        },
        {
            key:5,
            title: 'Sewing Machines',
            category: `sewing_machine`
        },

    ]
    const dispatch = useDispatch()
    const { isLoggedIn, itemsFromLocalStorage } = useSelector(state => state.User)
    if (!itemsFromLocalStorage) {
        getCartFromStorage(dispatch)
    }
    loginWithCookie(isLoggedIn, dispatch)
    return (
        <div className=' min-h-screen flex flex-col items-center space-y-10 '>
            <ImageCarousel />
            <div className='w-[95vw] flex flex-col  items-baseline '>
                {category.map(category =>(<ProductCatalog  data={category} />))}

            </div>
        </div>
    )
}

export default HomePage
