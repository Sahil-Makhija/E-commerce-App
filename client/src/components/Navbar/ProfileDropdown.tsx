import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineGift,
  AiOutlineLogout,
  AiOutlineDown,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/reducers/userReducer";
import { RootState } from "../../types";
import { BiUser } from "react-icons/bi";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector((state:RootState)=>state.User)
  const { isLoggedIn } = useSelector((state: RootState) => state.User);
  const items = [
    {
      key: "1",
      label: <Link to="/user/profile">Your Profile</Link>,
      icon: <AiOutlineUser />,
    },
    {
      key: "2",
      label: <Link to="/user/orders">Your Orders</Link>,
      icon: <AiOutlineGift />,
    },
    {
      key: "3",
      label: (
        <Link onClick={() => dispatch(Logout())} to={"/"}>
          Logout
        </Link>
      ),
      icon: <AiOutlineLogout />,
    },
  ];
  return (
    <>
      {isLoggedIn ? (
        <div className="flex max-lg:hidden">
          <Dropdown menu={{ items }} placement="bottom">
            <div className="flex items-center  space-x-2  rounded-md p-2 hover:bg-prm-dark hover:text-white duration-150  ">
              <span className="text-[2.5vmin] "> Hii , {userData?.name.split(" ")[0] || 'User'}</span>
              <AiOutlineDown className="text-[2.5vmin]" />
            </div>
          </Dropdown>
        </div>
      ) : (
        <div className=" hidden lg:flex flex-col group">
          <div className=" relative w-36 overflow-visible rounded-md h-12 flex-center font-neon group-hover:bg-prm-dark group-hover:text-white  group ">
            <BiUser size={30} />
            <Link className="hover:underline" to='/user/login'>Sign In</Link>
            <AiOutlineDown
              className=" group-hover:rotate-180 duration-300 font-semibold "
              size={15}
            />
          </div>
          <div className=" hidden hover:flex group-hover:flex animate-slideup shadow-lg shadow-gray-500 bg-white rounded-md w-64 h-14 absolute top-14 text-lg  justify-around items-center p-2 ">
            <span className=" font-roboto text-black ">New User ?</span>
            <Link
              to={"/user/signup"}
              className=" text-prm-dark font-semibold font-nenon hover:underline"
            >
              SignUp
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
