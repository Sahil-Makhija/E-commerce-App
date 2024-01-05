import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState, Overlay } from "../../types";
import { NoticeType } from "antd/es/message/interface";

const initialState: AppState = {
  mobileView: false,
  Loading: false,
  OverlayValue: 0,
  OverlayData: null,
  Error: null,
  Redirect: null,
  Message: null,
};

const appReducer = createSlice({
  name: "App",
  initialState,
  reducers: {
    CloseOverlay: (state: AppState) => {
      return { ...state, OverlayValue: 0 };
    },
    OpenOverlay: (state: AppState, action: PayloadAction<Overlay>) => {
      return { ...state, ...action.payload };
    },
    Redirect: (state: AppState, action: PayloadAction<string>) => {
      return { ...state, Redirect: action.payload };
    },
    ClearRedirect: (state: AppState) => ({ ...state, Redirect: null }),
    StartLoading: (state: AppState) => {
      return { ...state, Loading: true };
    },
    StopLoading: (state: AppState) => {
      return { ...state, Loading: false };
    },
    Message: (
      state: AppState,
      action: PayloadAction<{ msgType: NoticeType; msg: string }>
    ) => {
      return { ...state, Message: action.payload };
    },
    ClearMessage: (state: AppState) => ({ ...state, Message: null }),
    NewError: (state: AppState, action: PayloadAction<string>) => {
      return { ...state, Error: action.payload };
    },
    SetMobileView: (state: AppState, action: PayloadAction<boolean>) => ({
      ...state,
      mobileView: action.payload,
    }),
  },
});

export const {
  OpenOverlay,
  CloseOverlay,
  StopLoading,
  StartLoading,
  Message,
  ClearMessage,
  Redirect,
  ClearRedirect,
  NewError,
  SetMobileView,
} = appReducer.actions;
export default appReducer.reducer;

// Actions
export const ErrorRedirect = (dispatch: Dispatch, error: string) => {
  dispatch(Redirect("/404"));
  dispatch(NewError(error || "Unknown Error Occured!"));
};
