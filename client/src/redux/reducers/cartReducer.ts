import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartProduct, CartState } from "../../types";

const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem("cartItems") as string) || [],
};

const cartReducer = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    AddItem: (state: CartState, action: PayloadAction<CartProduct>) => {
      const { _id: productID, quantity } = action.payload;
      const existing_item = state.cart.find((i) => i._id === productID);
      let updatedCart: CartProduct[];
      if (existing_item) {
        updatedCart = state.cart.map((i) => {
          if (i._id === productID) {
            return {
              ...i,
              quantity: i.quantity + quantity < 1 ? 1 : i.quantity + quantity,
            };
          }
          return i;
        });
        localStorage.setItem("cartItems",JSON.stringify(updatedCart))
        return {
          cart: updatedCart,
        };
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cart, action.payload])
      );
      return { cart: [...state.cart, action.payload] };
    },
    RemoveItem: (state: CartState, action: PayloadAction<string>) => {
      const updatedCart = state.cart.filter((i) => i._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    },
    ClearCart: () => {
      localStorage.removeItem("cartItems")
      return{ cart: [] }},
  },
});

export default cartReducer.reducer;
export const { RemoveItem, AddItem, ClearCart } = cartReducer.actions;
