import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  setPartyPalace,
  setSelectedPartyPalace,
} from "../redux/features/partypalaceSlice";
import axios from "axios";
import DatePicker from "react-datepicker";
import { setSelectedChat } from "../redux/features/userSlice";
import "react-datepicker/dist/react-datepicker.css";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import userContext from "../context/userContext";

const BookingPage = () => {
  const { partypalace, selectedPartyPalace } = useSelector(
    (state) => state?.partypalace
  );
  const { token } = useSelector((state) => state?.user);
  const { getBookingData } = useContext(userContext);
  //   console.log(partypalace);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [imageIndex, setImageIndex] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [hoursBooked, setHoursBooked] = useState(1);

  useEffect(() => {
    fetchAllPartyPalace();
  }, []);

  // Find the selected party palace only if Redux has data

  useEffect(() => {
    if (partypalace?.length > 0) {
      const selectedPP = partypalace.find((el) => el._id === id);
      if (selectedPP) {
        dispatch(setSelectedPartyPalace(selectedPP));
      }
    }
  }, [id, partypalace, dispatch]);


  const handleImgIndex = (index) => {
    setImageIndex(index);
  };

  const fetchAllPartyPalace = async () => {
    try {
      const res = await axios.get("/proxy/api/partypalace/get-all");
      if (res && res.data.success) {
        dispatch(setPartyPalace(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle case where data is not available yet
  if (!selectedPartyPalace) {
    return <div>Loading...</div>;
  }

  //making api call

  const payload = {
    partyPalaceId: selectedPartyPalace._id,
    bookingDate: startDate,
    hoursBooked: hoursBooked,
    totalPrice: selectedPartyPalace.pricePerHour * hoursBooked,
  };
  // console.log("booking payload", payload);

  const handleBooking = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        "/proxy/api/booking/create",
        payload,
        config
      );
      if (res && res.data.success) {
        toast.success(res.data.msg);
        getBookingData();
        setStartDate(null);
        setHoursBooked(1);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  };

  //function to dispatch the selected party palace name, user name and user id

  const dispatchSelectedPartyPalace = () => {
    const payload = {
      partyPalaceName: selectedPartyPalace.name,
      userId: selectedPartyPalace.createdBy._id,
      userName: selectedPartyPalace.createdBy.username,
    };
    dispatch(setSelectedChat(payload));
    localStorage.setItem("selectedChat", JSON.stringify(payload));
  };

  return (
    <section className="mt-14 max-w-7xl mx-auto " >
      <div className="flex ">
        <div className="flex-1 ">
          <div className="p-6 ">
            <div className="h-[450px] max-w-xl ring-1 ring-[#FBAD34] shdaow-md">
              <img
                src={selectedPartyPalace.images[imageIndex]}
                alt={selectedPartyPalace.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="h-20 max-w-xl  mt-4 flex items-center justify-center gap-4">
              {selectedPartyPalace.images.map((im, i) => (
                <div
                  onClick={() => handleImgIndex(i)}
                  key={i}
                  className="h-full w-56 border border-neutral-400 bg-neutral-100 cursor-pointer hover:scale-110 transition-all duration-300 shadow-md"
                >
                  <img
                    src={selectedPartyPalace.images[i]}
                    alt={selectedPartyPalace.name[i]}
                    className="w-full h-full object-scale-down"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="px-6 py-4 ">
            <div className="flex items-center justify-between">
              <p className="font-bold text-4xl tracking-wider text-neutral-600">
                {selectedPartyPalace.name}
              </p>
              <span className="flex items-center gap-2">
                {selectedPartyPalace.likes}
                <FaHeart className="text-red-500" />
              </span>
            </div>
            <p className="mt-2">{selectedPartyPalace.description}</p>
            <div>
              <p className="text-gray-500 text-sm mt-2">
                📍 {selectedPartyPalace.location}
              </p>
              <p className="text-gray-500 text-sm">
                👥 Capacity: {selectedPartyPalace.capacity}
              </p>
              <p className="text-green-600 font-semibold mt-2 text-2xl">
                💰 NPR {selectedPartyPalace.pricePerHour} / hour
              </p>
            </div>
            <div className="mt-2 flex gap-10">
              <div className="max-w-64">
                <DatePicker
                  inline
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                <div>
                  {/* <span className="text-neutral-600">
                    🕒Enter Total Booking Hours
                  </span> */}
                  <input
                    type="number"
                    className="my-2 outline-none border border-neutral-400 focus:border-[#FBAD34] w-full rounded-sm p-1.5 placeholder:text-sm"
                    placeholder="Enter total booking hours"
                    // value={hoursBooked}
                    min="1"
                    max="12"
                    required
                    onChange={(e) => setHoursBooked(e.target.value)}
                  />
                </div>

                <div className="bg-black/10 p-2 rounded-md">
                  <div className="mb-1 ">
                    📅{" "}
                    <span className="font-semibold text-neutral-600">
                      Selected Date:{" "}
                    </span>{" "}
                    {startDate === null ? (
                      <span className="text-red-500 text-xs ">
                        No Date Selected
                      </span>
                    ) : (
                      new Date(startDate).toISOString().split("T")[0]
                    )}
                  </div>
                  <p className="font-semibold text-neutral-600 mb-1">
                    🕒Total Hours:{" "}
                    <span className="text-xs"> {hoursBooked} hours</span>
                  </p>
                  <p className="font-semibold text-neutral-600">
                    💸Total Price:{" "}
                    <span className="text-xs">
                      {" "}
                      NPR {selectedPartyPalace.pricePerHour * hoursBooked}{" "}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-xl font-semibold">
                  Choose a date and time to book
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleBooking}
                    disabled={startDate === null}
                    className={`${
                      startDate === null
                        ? "bg-neutral-400 cursor-not-allowed"
                        : "bg-[#FBAD34] cursor-pointer scale-105 transition-all duration-300 ease-in-out"
                    } text-white px-4 py-2 rounded-md w-full mt-4`}
                  >
                    Book
                  </button>
                  <Link
                    to={`/chat/${selectedPartyPalace.createdBy._id}/${selectedPartyPalace._id}`}
                    onClick={dispatchSelectedPartyPalace}
                    className="text-center bg-lime-500 text-white px-4 py-2 rounded-md w-full mt-4"
                  >
                    Chat
                  </Link>
                </div>
                <div className="mt-4 rounded-md overflow-hidden border border-neutral-300 bg-neutral-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.2148396731245!2d85.33767297485124!3d27.741518776162994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb194f5011d8d7%3A0x949bc3536d79803!2sAustralian%20Embassy!5e0!3m2!1sen!2snp!4v1739001392095!5m2!1sen!2snp"
                    width="280"
                    height="200"
                    allowfullscreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="font-semibold text-neutral-500 mt-2">
                  📅 Unavailable Dates:
                </p>
                <div className="flex items-center gap-4 flex-wrap mt-4 max-w-3xs">
                  <span className="w-20 h-4 bg-gray-200 rounded-md p-1"></span>
                  <span className="w-20 h-4 bg-gray-200 rounded-md p-1"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
