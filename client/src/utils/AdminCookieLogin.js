import axios from "axios"
import Cookies from "js-cookie"
import { BACKEND_URI } from "../config"


const AdminCookieLogin = async (state,dispatch) => {
    if (!state){
        if (Cookies.get('admin_id')) {
            const admin_id = Cookies.get('admin_id')
            await axios.post(BACKEND_URI+'/admin/retrieve', { admin_id }).then((response) => {
                const {status ,adminData } = response.data
                console.log(adminData);
                if (status){
                    dispatch({
                        type : 'ADMIN_LOGIN',
                        payload : adminData
                    })
                }
            })
        }
    }

}

export default AdminCookieLogin
