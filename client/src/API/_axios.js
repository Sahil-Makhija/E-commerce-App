import axios from "axios";
import { BACKEND_URI } from "../config";


//axios instance
const _axios =  axios.create({
    baseURL:BACKEND_URI,
})

const request = async ({url='/',method='GET',data={}}) =>{
    return await _axios({url,method,data}).then((response)=>{
        return response.data
    }).catch((error)=>{
        console.log(error?.message);
        return {
            status:false,
            error:error?.message || "'Couldn't fetch data at this moment! "
        }
    })
}

export default request