import Cookies from "js-cookie"
import API from "../../API/Routes"
import { User_Login } from "../reducers/userReducer"

export const login = (data) => async (dispatch) => {
    API.Login({ data }).then((response) => {
        const { status } = response
        if (status) {
            const { userData } = response
            dispatch(User_Login(userData))
            Cookies.set('user_id',userData?.user_id)
        }
        else {
            console.log(response);
        }
    })
}