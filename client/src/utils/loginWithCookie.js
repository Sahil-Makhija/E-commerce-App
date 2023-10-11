import Cookies from "js-cookie"
import { login } from "../redux/actions/userActions"


const loginWithCookie = async (state,dispatch) => {
    if (!state){
        try {
            const user_id = Cookies.get('user_id')
            if (user_id){
                dispatch(login({user_id}))
            }
        } catch (error) {
            return
        }
    }

}

export default loginWithCookie
