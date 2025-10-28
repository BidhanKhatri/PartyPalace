import React, { useEffect } from "react";
import {
  FaClock,
  FaLocationArrow,
  FaRegBookmark,
  FaRegHeart,
  FaUsers,
} from "react-icons/fa";
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
  _id,
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
    <>
      <div className="flex flex-col bg-white rounded-lg w-full border border-neutral-100 shadow-sm overflow-hidden">
        <div
          // to={userId ? `/booking/${partyPalaceId}` : "/login"}
          key={partyPalaceId || _id}
          className="bg-neutral-200  rounded-lg h-[250px] w-full  flex flex-col items-center justify-center gap-2 group relative "
        >
          <div className="bg-neutral-50 border-b border-neutral-200 w-full h-full overflow-hidden p-2">
            <img
              src={images[0] || "https://via.placeholder.com/400"}
              alt={name}
              className="w-full h-full object-scale-down group-hover:scale-105 transition-all duration-300 ease-in-out"
            />
          </div>

          <div className=" w-1/3  rounded-md mt-2 flex items-center justify-end gap-2 absolute top-2 right-2  ">
            {" "}
            {totalLikes ? (
              <p className="text-xs flex items-center gap-2">
                <FaHeart className="text-red-500" />{" "}
                <span>Likes {totalLikes}</span>
              </p>
            ) : (
              <div
                onClick={() => toggleLike(partyPalaceId || _id)}
                className="bg-neutral-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                {isLoved ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="" />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-neutral-800 font-semibold tracking-wider text-xl truncate">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h3>
          <p className="text-neutral-600 text-sm">{description}</p>
          <p className="flex flex-row items-center gap-2">
            <FaLocationArrow className="text-neutral-600" /> {location}
          </p>
          <p className="flex flex-row items-center gap-2">
            <FaUsers className="text-neutral-600" /> {capacity} people
          </p>
          <div className="flex flex-row items-center  gap-2">
            {category.map((cat) => (
              <span className="flex flex-row items-center  justify-centergap-2 bg-neutral-200 p-1 rounded-md gap-1 text-xs select-none">
                <FaRegBookmark className="text-neutral-600" />
                {cat}
              </span>
            ))}
          </div>
          <div className="flex flex-row items-center justify-between gap-2 ">
            <div className=" flex flex-row items-center gap-2">
              <FaClock className="text-neutral-600" /> Rs {pricePerHour}/hrs
            </div>
            <Link to={`/booking/${partyPalaceId || _id}`}>
              <button className="bg-neutral-800 text-neutral-200 rounded-md shaodw-sm px-2 py-1 text-sm cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out">
                View Details
              </button>
            </Link>
          </div>
          {/* <div className="flex justify-between items-center ">
            <div className=" w-1/2  rounded-md mt-2 font-semibold">{name} </div>
            <div className=" w-1/3  rounded-md mt-2 flex items-center justify-end gap-2">
              {" "}
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
            </div>
          </div>
          <div className=" w-full h-4 rounded-md mt-2 flex items-center justify-between ">
            <span>{location}</span>{" "}
            <span className=" flex items-center gap-2 text-xs  ">
              {category.map((cat, i) => (
                <span
                  key={i}
                  className="rounded-md bg-neutral-200 px-2 py-0.5 text-neutral-700 text-center"
                >
                  {cat}{" "}
                </span>
              ))}
            </span>{" "}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default VenueCard;
