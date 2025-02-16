import React, { useContext, useEffect } from "react";
import SubHeading from "../components/SubHeading";
import { useSelector } from "react-redux";
import VenueCard from "../components/VenueCard";
import userContext from "../context/userContext";

const TopLikedPalace = () => {
  const { getTopLikedPartyPalace, topLiked } = useContext(userContext);
  const { userId } = useSelector((state) => state?.user);
  //   console.log(partypalace);

  useEffect(() => {
    getTopLikedPartyPalace();
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-6 py-6  ">
      <p className="font-bold text-xl uppercase tracking-wider text-center text-neutral-600">
        Top Liked Party Palace
      </p>
      <SubHeading subheading="top liked palaces" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4  overflow-y-hidden   pb-4 ">
        {topLiked
          .filter((pp) => pp.likes >= 5)
          .map((pp, index) => (
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
          ))}
      </div>
    </section>
  );
};

export default TopLikedPalace;
