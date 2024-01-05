import { configureStore } from "@reduxjs/toolkit";
import { adminReducer, cartReducer, userReducer ,appReducer ,productReducer} from "../reducers";

export const store = configureStore({
  reducer: {
    App: appReducer,
    Admin: adminReducer,
    User: userReducer,
    Cart: cartReducer,
    Product:productReducer
  },
});
