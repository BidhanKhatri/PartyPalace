import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import adminContext from "../context/adminContext";
import { useSelector } from "react-redux";
import { set } from "mongoose";
import { toast } from "react-toastify";

const UserStatusListPage = () => {
  const location = useLocation();
  const {
    fetchUserBookingData,
    userBookingData,
    setUserBookingData,
    updateUserBookingStatus,
  } = useContext(adminContext);
  const { token, userId } = useSelector((state) => state?.user);
  const [status, setStatus] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [partyPalaceId, setPartyPalaceId] = useState("");
  // console.log(status, bookingId);

  const ppId = location.state.partyPalaceId;

  //   console.log(ppId);
  // console.log("user booking data", userBookingData);

  useEffect(() => {
    if (token && userId) {
      fetchUserBookingData(ppId);
    }
  }, [token, userId]);

  useEffect(() => {
    setUserBookingData([]); // clearing the state when the route changes or on navigation
  }, []);

  // console.log(location);

  const handleStatusChange = () => {
    const payload = {
      bookingId,
      status,
      partyPalaceId,
    };

    if (bookingId) {
      updateUserBookingStatus(payload);
    } else {
      toast.error("bookingId is required");
    }
  };

  return (
    <div>
      <div>
        {userBookingData.length > 0 &&
          userBookingData?.map((el) => (
            <div
              key={el._id}
              className=" w-full rounded-md shadow-md p-4 mt-2 flex gap-4 items-center justify-between  "
            >
              {/* user image section */}
              <div>
                <img
                  src=""
                  alt="img"
                  className="size-14 rounded-md bg-neutral-200 text-xs object-cover text-center border border-neutral-500 flex items-center justify-center"
                />
              </div>

              {/* user name section */}
              <div>
                <p className=" mb-1 font-semibold">👤User Name</p>
                <span> {el.user.username}</span>
              </div>

              {/* partypalace name section */}
              <div>
                <p className=" mb-1 font-semibold">🏠Party Palace Name</p>
                <span> {el.partyPalace.name}</span>
              </div>

              {/* booking date */}
              <div>
                <p className=" mb-1 font-semibold">🔖Booking Date</p>
                <span>
                  {" "}
                  {new Date(el.bookingDate).toISOString().split("T")[0]}
                </span>
              </div>

              {/* Total hour section */}
              <div>
                <p className=" mb-1 font-semibold">🕒Total Hour</p>
                <span> {el.hoursBooked}</span>
              </div>

              {/* Total price section */}
              <div>
                <p className=" mb-1 font-semibold">💸Total Price</p>
                <span> {el.totalPrice}</span>
              </div>

              {/* status section */}
              <div>
                <p className=" mb-1 font-semibold">Status</p>
                <select
                  onClick={() => {
                    setBookingId(el._id);
                    setPartyPalaceId(el.partyPalace._id);
                  }}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  className={`border rounded-md px-2 py-1  ${
                    el.status === "confirmed"
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  }`}
                >
                  <option value={el.status} onClick={handleStatusChange}>
                    {el.status}
                  </option>
                  <option value="confirmed" onClick={handleStatusChange}>
                    Confirm
                  </option>
                  <option value="pending" onClick={handleStatusChange}>
                    Pending
                  </option>
                </select>
              </div>
            </div>
          ))}

        {userBookingData.length === 0 && (
          <p className=" text-center text-red-500 bg-red-100 p-4">
            {" "}
            No Booking Details Found
          </p>
        )}
      </div>
    </div>
  );
};

export default UserStatusListPage;
