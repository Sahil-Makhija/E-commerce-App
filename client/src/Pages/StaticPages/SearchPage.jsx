
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SearchResult from '../components/SearchResult'
import Loading from '../components/Loading'
import Errorpage from '../StaticPages/Errorpage'
// import { Pagination } from 'antd'
import { useGetProductByQueryQuery } from '../../redux/reducers/productAPI'
import loginWithCookie from '../../utils/loginWithCookie'
import { useDispatch, useSelector } from 'react-redux'


const SearchPage = () => {
  const dispatch = useDispatch()
  const {isLoggedIn} = useSelector(state=>state.User)
  loginWithCookie(isLoggedIn,dispatch)
  const location = useLocation()
  const [product, setProduct] = useState([])
  let queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search');
  const category = queryParams.get('category');

  const { data, error, isLoading } = useGetProductByQueryQuery({ search, category })
  useEffect(() => {
    setProduct(data?.allProductData)
  }, [data])




  if (isLoading) { return (<Loading />) }
  else if (error) { return <Errorpage msg={error} /> }
  return (
    <section className='flex flex-col items-center p-5'>
      {window.scrollTo(0,0)}
      {search?.length > 0 && (<h1 className='text-[3vmin]' >Search results for "{search}"</h1>)}
      {product?.length > 0 && product?.map((item) => {
        return (
          <SearchResult item={item} />
        )
      })
      }
      {!product?.length > 0 && (<h1 className='font-bold my-10 text-[4vmin]'>No Items matched your search!</h1>)

      }
      {/* <Pagination defaultCurrent={1} total={20} /> */}

    </section>
  )
}

export default SearchPage
