import React, { useContext, useEffect } from "react";
import SubHeading from "../components/SubHeading";
import { useSelector } from "react-redux";
import VenueCard from "../components/VenueCard";
import userContext from "../context/userContext";
import TopLikeCard from "../components/TopLikeCard";
import { TfiControlBackward, TfiControlForward } from "react-icons/tfi";
import HomeSkeletonDiv from "../components/HomeSkeletonDiv";

const TopLikedPalace = () => {
  const { getTopLikedPartyPalace, topLiked } = useContext(userContext);
  const { userId } = useSelector((state) => state?.user);

  useEffect(() => {
    getTopLikedPartyPalace();
  }, []);

  // Filtered liked venues
  const likedVenues = topLiked.filter((pp) => pp.likes >= 5);

  // Calculate empty slots
  const emptySlots =
    likedVenues.length > 0 ? (4 - (likedVenues.length % 4)) % 4 : 0;

  return (
    <section className="max-w-7xl mx-auto px-10 py-6">
      <div className="flex items-center  justify-between">
        <p className="font-bold text-xl uppercase tracking-wider  text-neutral-600">
          Top Liked Party Palace
        </p>
        {/* <SubHeading subheading="top liked palaces" /> */}

        <p className="font-semibold text-sm select-none cursor-pointer">
          View All (20)
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pb-4">
        {/* {likedVenues.map((pp) => (
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
              totalLikes={pp.likes}
              category={pp.category}
              userId={userId}
            />
          </div>
        ))} */}

        {likedVenues.map((pp) => (
          <TopLikeCard
            partyPalaceId={pp._id}
            name={pp.name}
            description={pp.description}
            location={pp.location}
            capacity={pp.capacity}
            pricePerHour={pp.pricePerHour}
            unavailableDates={pp.unavailableDates}
            images={pp.images}
            totalLikes={pp.likes}
            category={pp.category}
            userId={userId}
          />
        ))}

        {/* Render empty skeleton divs */}
        {Array.from({ length: emptySlots }).map((_, index) => (
         <HomeSkeletonDiv key={index} />
        ))}

        <div className=" col-span-4 mt-4 flex items-center justify-center gap-4">
          <TfiControlBackward
            size={24}
            className="bg-neutral-400 rounded-md text-white cursor-pointer"
          />{" "}
          <span className="bg-neutral-100 rounded-md text-neutral-600 cursor-pointer px-2 border border-neutral-300">
            1
          </span>
          <TfiControlForward
            size={24}
            className="bg-neutral-400 rounded-md text-white cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default TopLikedPalace;
