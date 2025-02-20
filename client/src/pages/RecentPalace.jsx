import React, { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPartyPalace } from "../redux/features/partypalaceSlice";
import SubHeading from "../components/SubHeading";
import { toast } from "react-toastify";
import { socket } from "../../socket";

const RecentPalace = () => {
  const dispatch = useDispatch();
  const { partypalace } = useSelector((state) => state?.partypalace); // It a array of data
  const { token, userId } = useSelector((state) => state?.user);

  const [isLiked, setIsLiked] = useState(false);

  // console.log("token at recent palace", token);
  // console.log("userId at recent palace", userId);
  // console.log("all partypalace", partypalace);

  const toggleLike = (partyPalaceId) => {
    setIsLiked(!isLiked);
    handleLike(partyPalaceId);
  };

  const handleLike = async (partyPalaceId) => {
    try {
      const payload = { partyPalaceId, incLikes: isLiked ? -1 : 1 };
      const res = await axios.put("/proxy/api/partypalace/like", payload);
      if (res && res.data.success) {
        fetchAllPartyPalace();
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
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

  //socket implementation to get realtime fetch party palace
  useEffect(() => {
    const handleSocketEvent = (createdPP) => {
      // console.log("Socket created party palace:", createdPP);

      const exists = partypalace.some((pp) => pp._id === createdPP._id);
      if (!exists) {
        dispatch(setPartyPalace([createdPP, ...partypalace]));
      }
    };

    const handleDeletePartyPalaceSocketEvent = (deletePartyPalace) => {
      const filterData = partypalace.filter(
        (pp) => pp._id !== deletePartyPalace._id
      );
      dispatch(setPartyPalace(filterData));
    };

    socket.on("createdPartyPalace", handleSocketEvent);
    socket.on("deletePartyPalace", handleDeletePartyPalaceSocketEvent);

    return () => {
      // Cleanup listener on component unmount
      socket.off("createdPartyPalace", handleSocketEvent);
      socket.off("deletedPartyPalace", handleDeletePartyPalaceSocketEvent);
    };
  }, [dispatch, partypalace]); // Only attach once, when component mounts

  useEffect(() => {
    fetchAllPartyPalace();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 bg-gradient-to-b from-orange-100 to-transparent py-6 rounded-t-4xl mt-4 ">
      <p className="font-bold text-xl uppercase tracking-wider text-center text-neutral-600">
        recently added party palace
      </p>
      <SubHeading />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4  overflow-y-hidden   pb-4 ">
        {/* implemented this logic if there is more than 8 partypalace in the array for maintaing UI of pagination, as I am sending limit 8 for this pagination */}
        {partypalace.length > 8 &&
          partypalace.slice(0, partypalace.length - 1).map((pp, index) => (
            <div key={pp._id}>
              <VenueCard
                partyPalaceId={pp._id}
                name={pp.name}
                description={pp.description}
                location={pp.location}
                capacity={pp.capacity}
                pricePerHour={pp.pricePerHour}
                unavailableDates={pp.unavailableDates}
                images={pp.images}
                toggleLike={toggleLike}
                isLiked={isLiked}
                userId={userId}
                category={pp.category}
                likedBy={pp.likedBy}
              />
            </div>
          ))}
        {partypalace.length <= 8 &&
          partypalace.map((pp, index) => (
            <div key={pp._id}>
              <VenueCard
                partyPalaceId={pp._id}
                name={pp.name}
                description={pp.description}
                location={pp.location}
                capacity={pp.capacity}
                pricePerHour={pp.pricePerHour}
                unavailableDates={pp.unavailableDates}
                images={pp.images}
                toggleLike={toggleLike}
                isLiked={isLiked}
                userId={userId}
                category={pp.category}
                likedBy={pp.likedBy}
              />
            </div>
          ))}
      </div>
    </section>
  );
};

export default RecentPalace;
