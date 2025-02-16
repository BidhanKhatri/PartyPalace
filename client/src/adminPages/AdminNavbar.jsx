import axios from "axios";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../redux/features/userSlice";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { GiIndianPalace } from "react-icons/gi";
import { FaBell } from "react-icons/fa";
import adminContext from "../context/adminContext";
import { FaMessage } from "react-icons/fa6";

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setMyPartyPalaceData } = useContext(adminContext);

  async function handleLogout() {
    try {
      const res = await axios.get("/proxy/api/user/logout");

      if (res && res.data.success) {
        toast.success(res.data.msg);
        dispatch(logout());
        navigate("/login");
        setMyPartyPalaceData([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  }

  return (
    <aside className="h-screen w-72 p-4 shadow-md border-r border-neutral-200">
      <p className="text-xl font-semibold text-neutral-600">Admin Dashboard</p>

      <div className="flex items-center  gap-8 mt-4 text-neutral-600">
        <img
          src={""}
          alt="profile"
          className="size-12 rounded-full bg-neutral-400 text-neutral-200 ring-1 ring-sky-500 flex items-center text-xs justify-center"
        />
        <p>Name</p>
      </div>
      <div className="flex min-h-[calc(90vh-64px)] flex-col  overflow-x-hidden overflow-y-scroll  mt-4">
        {/* content here */}

        <ul className="flex flex-col grow gap-4  ">
          <Link
            to="/admin/dashboard"
            className={` ${
              location.pathname === "/admin/dashboard"
                ? "bg-sky-500 text-white"
                : "bg-neutral-100 text-neutral-700"
            } hover:bg-sky-500 hover:text-white p-2  cursor-pointer select-none  border-y-1 border-neutral-200 transition-all duration-300 ease-in-out flex items-center gap-2`}
          >
            <MdDashboard /> Dashboard
          </Link>
          <Link
            to="/admin/create-partypalace"
            className={` ${
              location.pathname.includes("/create-partypalace")
                ? "bg-sky-500 text-white"
                : "bg-neutral-100 text-neutral-700"
            } hover:bg-sky-500 hover:text-white p-2   cursor-pointer select-none border-y-1 border-neutral-200 transition-all duration-300 ease-in-out flex items-center gap-2`}
          >
            <IoIosCreate /> Create Party Palace
          </Link>
          <Link
            to="/admin/display-partypalace"
            className={` ${
              location.pathname.includes("/display-partypalace")
                ? "bg-sky-500 text-white"
                : "bg-neutral-100 text-neutral-700"
            } hover:bg-sky-500 hover:text-white p-2   cursor-pointer select-none border-y-1 border-neutral-200 transition-all duration-300 ease-in-out flex items-center gap-2`}
          >
            <GiIndianPalace /> Display Party Palaces
          </Link>
          <Link
            to="/admin/booking-userstatus"
            className={` ${
              location.pathname.includes("/booking-userstatus")
                ? "bg-sky-500 text-white"
                : "bg-neutral-100 text-neutral-700"
            } hover:bg-sky-500 hover:text-white p-2   cursor-pointer select-none border-y-1 border-neutral-200 transition-all duration-300 ease-in-out flex items-center gap-2`}
          >
            <FaBell /> Notifications
          </Link>
          <Link
            to="/admin/chat"
            className={` ${
              location.pathname.includes("/chat")
                ? "bg-sky-500 text-white"
                : "bg-neutral-100 text-neutral-700"
            } hover:bg-sky-500 hover:text-white p-2   cursor-pointer select-none border-y-1 border-neutral-200 transition-all duration-300 ease-in-out flex items-center gap-2`}
          >
            <FaMessage /> Chat
          </Link>
        </ul>
        <div className=" flex items-center justify-between divide-x-1 ">
          <span
            onClick={handleLogout}
            className="flex-1 p-2 text-center cursor-pointer hover:bg-sky-500 hover:text-white"
          >
            Logout
          </span>
          <span className="flex-1 p-2 text-center cursor-pointer hover:bg-sky-500 hover:text-white">
            Setting
          </span>
        </div>
      </div>
    </aside>
  );
};

export default AdminNavbar;
