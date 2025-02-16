import React, { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPartyPalace } from "../redux/features/partypalaceSlice";
import SubHeading from "../components/SubHeading";
import { toast } from "react-toastify";

const RecentPalace = () => {
  const dispatch = useDispatch();
  const { partypalace } = useSelector((state) => state?.partypalace); // It a array of data
  const { token, userId } = useSelector((state) => state?.user);

  const [isLiked, setIsLiked] = useState(false);

  // console.log("token at recent palace", token);
  // console.log("userId at recent palace", userId);

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

  useEffect(() => {
    fetchAllPartyPalace();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 bg-gradient-to-b from-orange-100 to-transparent py-6 rounded-t-4xl ">
      <p className="font-bold text-xl uppercase tracking-wider text-center text-neutral-600">
        recently added party palace
      </p>
      <SubHeading />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4  overflow-y-hidden   pb-4 ">
        {partypalace.map((pp, index) => (
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
