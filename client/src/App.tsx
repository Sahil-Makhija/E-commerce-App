import React, { useEffect } from "react";
import Background from "./Overlays/Background";
import { Navbar } from "./components";
import { Outlet, useNavigate } from "react-router-dom";
import * as WebFont from "webfontloader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./types";
import { message } from "antd";
import {
  ClearMessage,
  ClearRedirect,
  SetMobileView,
} from "./redux/reducers/appReducer";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Set Mobile View
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        dispatch(SetMobileView(false));
      } else {
        dispatch(SetMobileView(true));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fontConfig = {
      google: {
        families: ["Montserrat", "Roboto"],
      },
    };
    WebFont.load(fontConfig);
  });

  const { Redirect, Message } = useSelector((state: RootState) => state.App);
  const [messageApi, contextProvider] = message.useMessage();

  useEffect(() => {
    if (Message) {
      messageApi.open({
        type: Message?.msgType,
        content: Message?.msg as string,
        className: "font-neon font-semibold",
      });
      dispatch(ClearMessage());
    }
  }, [dispatch, Message, messageApi]);

  useEffect(() => {
    if (Redirect) {
      navigate(Redirect);
      dispatch(ClearRedirect());
    }
  });

  return (
    <>
      {contextProvider}
      <div className=" min-h-screen   borderTest ">
        <Navbar />
        <Background>
          <main className=" mt-16 px-1 lg:px-5 ">
            <Outlet />
          </main>
        </Background>
      </div>
    </>
  );
};

export default App;
