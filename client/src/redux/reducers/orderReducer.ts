import { API } from "../../API/routes";
import { ORDER_STATUS } from "../../constants/overlays";
import { Message, OpenOverlay } from "../../redux/reducers/appReducer";
import { Dispatch } from "@reduxjs/toolkit";
import { ClearCart } from "./cartReducer";

type checkoutProps = (
  dispatch: Dispatch,
  paymentMethod: string | null,
  products: { [key: string]: number },
  user_id:string
) => void;

export const checkout: checkoutProps = (dispatch, paymentMethod, products,user_id) => {
    try {
        if (paymentMethod) {
          switch (paymentMethod) {
              case "CARD":
                  API.Checkout({data:{user_id,orderItems:products}}).then((response)=>{
                    window.location.href = response.redirect
                  })
                  break;
              case "COD":
                  API.PlaceOrder({data:{user_id,orderItems:products,modeOfPayment:paymentMethod}}).then((response)=>{
                    if (response.status){
                      dispatch(ClearCart())
                      dispatch(OpenOverlay({OverlayValue:ORDER_STATUS}))
                    }
                  })
                  break;
              default:
                  break;
          }
        } else {
          dispatch(
            Message({ msg: "Please choose a Payment Method!", msgType: "error" })
          );
        }
    } catch (error) {
        console.error(error);
    }
};
