import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    itemsFromLocalStorage: false,
}

const userReducer = createSlice({
    name: 'User',
    initialState,
    reducers: {
        User_Login: (state, action) => {
            return {
                ...state,
                isLoggedIn: true,
                ...action.payload
            }
        },
        User_Logout: (state) => (
            {
                isLoggedIn: false,
                itemsFromLocalStorage:state.itemsFromLocalStorage
            }
        ),
        Items_Added:(state)=>({
            ...state,
            itemsFromLocalStorage:true
        })
    }
})

export const { User_Login , User_Logout , Items_Added } = userReducer.actions
export default userReducer.reducer