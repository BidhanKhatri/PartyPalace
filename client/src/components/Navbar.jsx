import { useContext, useEffect, useMemo, useState } from "react";
import {
  FaBook,
  FaCamera,
  FaFacebook,
  FaHome,
  FaInstagram,
  FaPhoneVolume,
  FaSearch,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { IoMdSettings } from "react-icons/io";
// import Logo from "../assets/images/logo.png";
import { IoLocationSharp } from "react-icons/io5";
import {
  FaArrowLeft,
  FaBookBookmark,
  FaScrewdriver,
  FaScrewdriverWrench,
  FaUser,
} from "react-icons/fa6";
import Banner1 from "../assets/images/banner1.jpg";
import { TypeAnimation } from "react-type-animation";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ShowBooking from "./ShowBooking";
import userContext from "../context/userContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const bookedPartyPalaceLength = useSelector(
    (state) => state.partypalace.bookedPartyPalaceLength
  );

  const { bookingData, getBookingData } = useContext(userContext);
  // console.log(location);

  const searchComponent = useMemo(() => <SearchBar />, []);

  useEffect(() => {
    getBookingData();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleBookMenu = () => {
    setIsBookOpen(!isBookOpen);
  };

  async function handleLogout() {
    try {
      const res = await axios.get("/proxy/api/user/logout");

      if (res && res.data.success) {
        toast.success(res.data.msg);
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  }

  let prevY = window.scrollY;
  function handleNavbarColor() {
    let curY = window.scrollY;
    const navEl = document.querySelector("#navbar");

    if (curY > prevY) {
      // console.log("Moving down ward");
      if (window.scrollY >= 80) {
        navEl.style.marginTop = "-100px";
        navEl.style.transition = "margin-top 0.3s ease-in-out";
      }
    } else {
      // console.log("moving up ward");

      navEl.style.marginTop = "0px";
    }
    return (prevY = curY);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleNavbarColor);

    return () => window.removeEventListener("scroll", handleNavbarColor);
  }, []);

  return (
    <nav
      className={` ${
        location.pathname === "/"
          ? "bg-white text-neutral-600 "
          : " bg-white shadow-lg text-neutral-600   "
      }  fixed w-full top-0 left-0 z-30 py-2 lg:py-0 `}
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 ">
        <div className="flex justify-between">
          <div className="flex space-x-7 items-center">
            <a href="/" className="w-32 h-10 relative">
              <img
                // src={Logo}
                alt="Logo"
                className="object-cover h-12 w-32  text-xl font-bold cursor-pointer"
              />
            </a>

            <div className="hidden md:flex items-center space-x-1">
              <Link
                to={"/"}
                className="py-4 px-2  hover:text-[#FBAD34] transition duration-300 cursor-pointer flex items-center gap-1"
              >
                <FaHome />
                Home
              </Link>

              <Link
                to={"/cameraman"}
                className="py-4 px-2  hover:text-[#FBAD34] transition duration-300 cursor-pointer flex items-center gap-1"
              >
                <FaCamera />
                CameraMan
              </Link>
              <a className="py-4 px-2  hover:text-[#FBAD34] transition duration-300 cursor-pointer flex items-center gap-1">
                <FaPhoneVolume />
                Contact
              </a>

              <a className="py-4 px-2  hover:text-[#FBAD34] transition duration-300 cursor-pointer flex items-center gap-1">
                <FaStar />
                Reviews
              </a>
              <div className="  cursor-pointer flex items-center gap-1  group">
                {location.pathname.includes("/search") ? (
                  searchComponent
                ) : (
                  <div
                    onClick={() => navigate("/search")}
                    className=" w-72 flex items-center gap-4 border border-neutral-400 p-2 rounded-lg group-focus-within:border-[#FBAD34] "
                  >
                    <FaSearch className="group-focus-within:text-[#FBAD34]" />
                    {/* <input
                      type="text"
                      placeholder="search"
                      className="w-full outline-none bg-transparent placeholder:text-neutral-200"
                    /> */}
                    <TypeAnimation
                      sequence={[
                        // Same substring at the start will only be typed out once, initially
                        "Search Party Palaces Here",
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        "Search Venues Here",
                        1000,
                        "Search Restaurants Here",
                        1000,
                        "Search Venues and Restaurants",
                        1000,
                      ]}
                      wrapper="span"
                      speed={50}
                      style={{ fontSize: "0.8em", display: "inline-block" }}
                      repeat={Infinity}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 relative ">
            <span onClick={toggleBookMenu} className=" relative cursor-pointer">
              {bookedPartyPalaceLength > 0 ? (
                <span className="size-4 p-3 rounded-full absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-xs text-white flex items-center justify-center">
                  {bookedPartyPalaceLength}
                </span>
              ) : (
                ""
              )}

              <FaBookBookmark size={24} />
            </span>

            {isBookOpen && (
              <ShowBooking close={toggleBookMenu} isBookOpen={isBookOpen} />
            )}

            <div className="group relative">
              <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden transition-all duration-200 hover:ring-2 hover:ring-gray-300">
                <img
                  src={Banner1}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="opacity-0 scale-95 min-w-56 text-neutral-600 bg-white backdrop-blur-xl rounded-md absolute top-10 -right-2 p-2 flex-col gap-4 divide-y divide-neutral-400 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:flex pointer-events-none group-hover:pointer-events-auto shadow-md">
                <div className="py-1">
                  <Link
                    to={"/profile"}
                    className="flex flex-row items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <FaUser /> Profile
                  </Link>
                  <Link
                    to={"/setting"}
                    className="flex flex-row items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <IoMdSettings />
                    Setting
                  </Link>
                  <Link
                    onClick={handleLogout}
                    className="flex flex-row items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
                  >
                    <FaArrowLeft /> Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-500" />
              ) : (
                <Menu className="w-6 h-6 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } divide-y divide-neutral-300 space-y-4`}
      >
        <a className="py-2 px-4 text-sm hover:bg-gray-200 flex items-center gap-2 mt-6">
          <FaHome /> Home
        </a>
        <a className="py-2 px-4 text-sm hover:bg-gray-200 flex items-center gap-2">
          <FaScrewdriverWrench /> Services
        </a>
        <a
          to="contact"
          className="py-2 px-4 text-sm hover:bg-gray-200 flex items-center gap-2"
        >
          <FaPhoneVolume /> Contact
        </a>
        <a className="py-2 px-4 text-sm hover:bg-gray-200 flex items-center gap-2">
          <FaStar /> Reviews
        </a>
        <a className="py-2 px-4 text-sm hover:bg-gray-200 flex items-center gap-2">
          <IoLocationSharp /> Location
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
