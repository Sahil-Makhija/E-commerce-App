const { createSlice } = require("@reduxjs/toolkit");

const cartReducer = createSlice({
    name: 'Cart',
    initialState: { cart: [] },
    reducers: {
        ADD_ITEM: (state, action) => {
            state.cart = [...state.cart, action.payload]
        },
        REMOVE_ITEM: (state, action) => {
            state.cart = [...state.cart].pop()
        },
        ADD_ITEM_FROM_LS: (state, action) => {
            return {...state}
        },
        EMPTY_CART: (state, action) => {
            state.cart = []
        }
    },
})

export default cartReducer.reducer;
export const { ADD_ITEM } = cartReducer.actions;