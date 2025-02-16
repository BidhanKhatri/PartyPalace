import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";
import { useSelector } from "react-redux";

const UpdateBookingModal = ({ prevBookingData, setPrevBookingData, close }) => {
  const { partypalace } = useSelector((state) => state?.partypalace);
  // console.log(partypalace);

  // console.log("prev data", prevBookingData);
  const { fetchAllPartyPalace, updateBooking, getBookingData, loading } =
    useContext(userContext);

  const [data, setData] = useState({
    bookingId: prevBookingData._id,
    partyPalaceId: prevBookingData?.partyPalace?._id || "",
    bookingDate:
      new Date(prevBookingData?.bookingDate).toISOString().split("T")[0] || "",
    hoursBooked: prevBookingData.hoursBooked || 1,
    totalPrice: prevBookingData.totalPrice || 0,
  });
  console.log(data);

  useEffect(() => {
    fetchAllPartyPalace();
  }, []);

  const filterCurrentPrice = partypalace.find(
    (el) => el?._id === data?.partyPalaceId
  );

  useEffect(() => {
    if (filterCurrentPrice) {
      setData((prev) => ({
        ...prev,
        totalPrice: filterCurrentPrice.pricePerHour * prev.hoursBooked,
      }));
    }
  }, [data.hoursBooked, data.partyPalaceId, filterCurrentPrice]);

  const handleUpdateChange = (e) => {
    const { name, value, type } = e.target;

    const newValue = type === "number" ? Number(value) : value;

    setData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setPrevBookingData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateBooking(data);
    getBookingData();
    if (close) {
      close();
    }
  };

  return (
    <section className="fixed z-50 bg-black/80 inset-0 w-full h-screen flex items-center ">
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleUpdateSubmit}
        className="bg-white max-w-md rounded-md mx-auto w-full p-4 space-y-2 "
      >
        <div>
          <label htmlFor="name">Party Palace Name</label>
          <select
            onChange={handleUpdateChange}
            id="name"
            name="partyPalaceId"
            className="w-full border rounded-md p-2 mt-2"
            value={data.partyPalaceId || ""}
          >
            <option value="">Select Party Palace</option>
            {partypalace.length > 0 &&
              partypalace.map((pp, i) => (
                <option key={i} value={pp._id}>
                  {pp.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="bookingDate"
            id="date"
            className="w-full border rounded-md p-2 mt-2"
            value={data.bookingDate}
            onChange={handleUpdateChange}
          />
        </div>
        <div>
          <label htmlFor="hour">Hour Booked</label>
          <input
            type="number"
            min="1"
            max="12"
            id="hour"
            name="hoursBooked"
            className="w-full border rounded-md p-2 mt-2"
            onChange={handleUpdateChange}
            value={prevBookingData.hoursBooked}
          />
        </div>
        <div>
          <label htmlFor="price">Total Price</label>
          <input
            type="number"
            name="totalPrice"
            id="price"
            className="w-full border rounded-md p-2 mt-2"
            readOnly
            value={data.totalPrice}
          />
        </div>

        <button className="bg-[#FBAD34] text-white rounded-md p-2 w-full hover:bg-[#FBBF3F] cursor-pointer mt-2">
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </section>
  );
};

export default UpdateBookingModal;
