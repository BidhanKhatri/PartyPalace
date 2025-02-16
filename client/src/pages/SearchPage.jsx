import React, { useContext, useState } from "react";
import userContext from "../context/userContext";
import VenueCard from "../components/VenueCard";
import { useSelector } from "react-redux";
import { FaExclamationTriangle } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import FilterSearch from "../components/FilterSearch";

const SearchPage = () => {
  const { searchData, loading } = useContext(userContext);
  const { userId } = useSelector((state) => state?.user);
  const [color, setColor] = useState("#FBAD34");

  return (
    <section className="max-w-7xl mx-auto bg-gradient-to-b from-neutral-100 to-transparent mt-14 min-h-[calc(100vh-64px)]">
      <div className="flex flex-col md:flex-row ">
        {/* Filter Search Component */}
        <div className="w-full md:w-1/4">
          <FilterSearch />
        </div>

        {/* Loader or No Results */}
        <div className="w-full flex justify-center items-center">
          {loading ? (
            <BeatLoader
              color={color}
              size={24}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : searchData.length === 0 ? (
            <div className="min-h-[calc(95vh-64px)] flex items-center justify-center  w-full ">
              <span className="bg-red-200 px-8 py-2 font-semibold text-red-500 flex items-center gap-2">
                <FaExclamationTriangle />
                No results found
              </span>
            </div>
          ) : (
            // Venue Cards Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-4 h-[calc(100vh-64px)] overflow-x-none overflow-y-auto">
              {searchData.map((sd) => (
                <div key={sd._id} className="w-full">
                  <VenueCard
                    name={sd.name}
                    description={sd.description}
                    location={sd.location}
                    capacity={sd.capacity}
                    pricePerHour={sd.pricePerHour}
                    images={sd.images}
                    partyPalaceId={sd._id}
                    likedBy={sd.likedBy}
                    category={sd.category}
                    userId={userId}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
