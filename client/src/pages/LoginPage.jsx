import React, { useContext, useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaEyeSlash,
  FaRegEye,
  FaHandPaper,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
// import Lottie from "lottie-react";
// import LoginAnimationData from "../assets/animations/login-ani.json";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/features/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import adminContext from "../context/adminContext";
import LoginImage from "../assets/images/login-image.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getMyPartyPalace } = useContext(adminContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const isAllFields = Object.values(data).every((el) => el !== "");

  const handleForChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const togglePassword = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/proxy/api/user/login", data);
      if (res && res.data.success) {
        toast.success(res.data.msg);
        dispatch(login(res.data));

        setTimeout(() => {
          if (res.data.role === "user") {
            navigate("/");
          } else if (res.data.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/login");
          }
        }, 100);

        setData({ email: "", password: "" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <div className="flex items-center justify-between h-screen bg-gradient-to-b from-neutral-50 to-transparent ">
      <div className="p-0 rounded-lg  w-full max-w-lg mx-auto">
        <div className="text-4xl  mb-10 flex items-center gap-4 tracking-wider text-[#FBAD34] font-bold">
          {/* <FaHandPaper className="text-orange-500 " /> */}
          Login to Party Palace{" "}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="flex items-center border-3 rounded-md border-[#FBAD34] p-3">
            <FaEnvelope className="text-neutral-600 mr-3" />
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 outline-none bg-transparent text-neutral-600 placeholder-neutral-600"
              tabIndex={0}
              name="email"
              value={data.email}
              onChange={handleForChange}
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-3 rounded-md border-[#FBAD34] p-3">
            <FaLock className="text-neutral-600 mr-3" />
            <input
              type={isPasswordShow ? "text" : "password"}
              placeholder="Password"
              className="flex-1 outline-none bg-transparent text-neutral-600 placeholder-neutral-600"
              name="password"
              value={data.password}
              onChange={handleForChange}
            />

            {isPasswordShow ? (
              <FaRegEye
                onClick={togglePassword}
                className="text-neutral-600 cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                className="text-neutral-600 cursor-pointer"
                onClick={togglePassword}
              />
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={!isAllFields}
            className={` ${
              isAllFields
                ? "bg-[#FBAD34] hover:bg-orange-600 cursor-pointer"
                : "bg-gray-500 cursor-not-allowed"
            } w-full  text-white py-2 rounded-lg  transition duration-300 `}
          >
            Login <FaArrowRight className="inline ml-2" />
          </button>
        </form>

        {/* Already have an account */}
        <p className="mt-4 text-center text-neutral-600">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-[#FBAD34] hover:underline">
            Signup
          </Link>
        </p>
      </div>
      <div className=" rounded-lg shadow-xl w-full max-w-xl bg-neutral-100 h-screen">
        <img
          src={LoginImage}
          alt="login page image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
