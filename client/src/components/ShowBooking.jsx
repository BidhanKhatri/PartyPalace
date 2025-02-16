import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";
import UpdateBookingModal from "./UpdateBookingModal";

const ShowBooking = ({ close, isBookOpen }) => {
  const { bookingData, getBookingData, handleCancel } = useContext(userContext);

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [prevBookingData, setPrevBookingData] = useState({});
  console.log(bookingData);

  useEffect(() => {
    getBookingData();
  }, []);

  useEffect(() => {
    if (isBookOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => (document.body.style.overflow = "auto");
  }, [isBookOpen]);

  const toggleUpdate = (el) => {
    setIsModelOpen((prev) => !prev);
    setPrevBookingData(el);
  };

  return (
    <section
      onClick={close}
      className="fixed inset-0 w-full z-10 bg-black/40 text-neutral-600 "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={` bg-white absolute transition-all duration-700 ease-in-out p-4  ${
          isBookOpen ? "right-0 opacity-100 w-[50%]" : "opacity-0 w-0"
        }`}
      >
        <span
          onClick={close}
          className="text-4xl cursor-pointer select-none absolute top-2 right-4"
        >
          &times;
        </span>
        <p className="font-semibold text-xl">Booking Details</p>
        <div className="mt-4 flex flex-col gap-4">
          {bookingData.length === 0 && (
            <div className="text-center">No Booking Found</div>
          )}

          <div className=" h-[calc(100vh-64px)] flex flex-col gap-4 overflow-y-scroll">
            {bookingData?.map((el, i) => (
              <div
                key={el?._id}
                className="flex items-center gap-4 p-4 border-b border-gray-300 bg-white shadow-sm rounded-lg"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                  <img
                    src={
                      el.partyPalace?.images[0] ||
                      "https://via.placeholder.com/400"
                    }
                    alt={el.partyPalace?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Party Palace Details */}
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-700">
                    {el.partyPalace?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {el.partyPalace?.location}
                  </p>
                </div>

                {/* Booking Details */}
                <div className="text-center">
                  <p className="text-sm text-gray-500">📅Date</p>
                  <p className="text-xs font-medium text-gray-700">
                    {new Date(el?.bookingDate).toISOString().split("T")[0]}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500">Hrs</p>
                  <p className="text-xs font-medium text-gray-700">
                    {el?.hoursBooked}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500">💰Price</p>
                  <p className="text-xs font-medium text-gray-700">
                    NPR {el?.totalPrice}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500">📌Status</p>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      el.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {el?.status}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {/* update button */}
                  {el?.status !== "confirmed" && (
                    <button
                      onClick={() => toggleUpdate(el)}
                      className={`  bg-green-500 hover:bg-green-600 cursor-pointer
                       text-white px-4 py-1 rounded-md text-sm font-medium transition `}
                    >
                      Update
                    </button>
                  )}

                  {/* Cancel Button */}
                  <button
                    onClick={() => handleCancel(el._id)}
                    disabled={el.status === "confirmed"}
                    className={` ${
                      el?.status === "confirmed"
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600 cursor-pointer"
                    } text-white px-4 py-1 rounded-md text-sm font-medium transition `}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModelOpen && (
        <UpdateBookingModal
          prevBookingData={prevBookingData}
          setPrevBookingData={setPrevBookingData}
          close={toggleUpdate}
        />
      )}
    </section>
  );
};

export default ShowBooking;
