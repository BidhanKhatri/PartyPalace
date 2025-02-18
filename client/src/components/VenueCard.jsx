import React, { useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const VenueCard = ({
  name,
  description,
  location,
  capacity,
  pricePerHour,
  images = [],
  toggleLike,
  partyPalaceId,
  likedBy = [],
  userId,
  totalLikes,
  category,
  allData,
}) => {
  const isLoved = likedBy.some((el) => el === userId);

  // useEffect(() => {
  //   console.log("User ID changed:", userId);
  // }, [userId]);

  return (
    <div className=" mx-auto rounded-2xl overflow-hidden shadow-md bg-white p-5 border border-gray-200">
      <img
        className="w-full h-48 object-cover rounded-xl"
        src={images[0] || "https://via.placeholder.com/400"}
        alt={name}
      />
      <div className="py-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center justify-between">
          <p>{name}</p>{" "}
          {totalLikes ? (
            <p className="text-xs flex items-center gap-2">
              <FaHeart className="text-red-500" />{" "}
              <span>Likes {totalLikes}</span>
            </p>
          ) : (
            <div
              onClick={() => toggleLike(partyPalaceId)}
              className="bg-neutral-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              {isLoved ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="" />
              )}
            </div>
          )}
        </h2>
        {/* <p className="text-gray-600 text-sm mt-1">{description}</p> */}
        <p className="text-gray-500 text-sm mt-2">📍 {location}</p>
        <p className="text-gray-500 text-sm mt-2">👥 Capacity: {capacity}</p>
        <div className=" mt-2 flex gap-2 flex-wrap ">
          {category.map((ca, i) => (
            <span
              key={i}
              className="bg-neutral-200 px-2 py-1 rounded-md text-xs text-neutral-700"
            >
              <p>{ca}</p>
            </span>
          ))}
        </div>
        <p className="text-green-600 font-semibold mt-2">
          💰 NPR {pricePerHour} / hour
        </p>
      </div>
      <Link
        to={userId ? `/booking/${partyPalaceId}` : "/login"}
        className="w-full bg-[#FBAD34] text-white py-2 rounded-lg hover:bg-[#FFC107] transition mt-0 cursor-pointer inline-block text-center"
      >
        Book Now
      </Link>
    </div>
  );
};

export default VenueCard;
