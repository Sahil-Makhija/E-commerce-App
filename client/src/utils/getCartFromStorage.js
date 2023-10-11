import axios from "axios"
import { BACKEND_URI } from "../config"

const getCartFromStorage = (dispatch) => {
    try {
        var arr =  localStorage.getItem('yourCart')?.split(',')
        if (arr?.length > 1){
            let index = 0
            while (index<arr.length){
                let qty = arr[index+1]
                axios.get(BACKEND_URI+`/productbyId/${arr[index]}`).then((response)=>{
                    const {productData} = response.data
                    dispatch({
                        type: 'ADD_ITEM_FROM_LS',
                        payload: {
                            productID: productData._id,
                            productName: productData?.productName,
                            image: productData.images[0],
                            qty: Number.parseInt(qty),
                            slug: productData.slug,
                            price: productData.productSP
                        }
                    })
                }).catch((error)=>{
                    console.log(error);
                    return
                })
                index = index+2
            }

        }

    } catch (error) {
        console.log(error);
        return []
    }
}

export default getCartFromStorage