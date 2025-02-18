import React, { useContext, useEffect, useState } from "react";
import SubHeading from "../components/SubHeading";
import userContext from "../context/userContext";
import VenueCard from "../components/VenueCard";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CategoryLayout = () => {
  const { userId } = useSelector((state) => state?.user);
  const {
    getPartyPalaceByCategory,
    categoryData,
    otherCategoryData,
    getAllCategory,
    allCategory,
  } = useContext(userContext);
  const [page, setPage] = useState(1);
  //   console.log(categoryData);
  //   console.log(page);

  useEffect(() => {
    const fetchAllCategoryAndDisplay = async () => {
      if (allCategory.length > 0) {
        try {
          const promises = allCategory.map((cat) =>
            getPartyPalaceByCategory(cat.name, page)
          );
          await Promise.all(promises);
        } catch (error) {
          console.error("Error fetching party palace data:", error);
        }
      }
    };

    fetchAllCategoryAndDisplay();
  }, [page, allCategory]);

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <>
      {allCategory.map((c, i) => (
        <section key={i} className="max-w-7xl mx-auto px-6 py-6  ">
          <p className="font-bold text-xl uppercase tracking-wider text-center text-neutral-600">
            {c.name}
          </p>
          <SubHeading subheading={"categories"} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4  overflow-y-hidden  pb-4 ">
            {(categoryData[c.name] || []).map((pp, index) => (
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
                  //   toggleLike={toggleLike}
                  //   isLiked={isLiked}
                  userId={userId}
                  category={pp.category}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-2">
            <div className="flex gap-4 items-center">
              <button
                onClick={() =>
                  setPage((prev) => ({
                    ...prev,
                    [c.name]: (prev[c.name] || 1) - 1,
                  }))
                }
                disabled={(page[c.name] || 1) === 1}
                className={`px-4 py-2 rounded-md text-white font-semibold transition-colors shadow-sm 
        ${
          (page[c.name] || 1) === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-[#FBAD34] hover:bg-[#e69d2e] cursor-pointer"
        }`}
              >
                <FaArrowLeft />
              </button>
              <div className="rounded-lg px-4 py-2 inline-flex items-center">
                <span className="text-base font-semibold text-neutral-500">
                  Page <span>{page[c.name] || 1}</span> of{" "}
                  <span>{otherCategoryData[c.name]?.totalPage || 1}</span>
                </span>
              </div>
              <button
                onClick={() =>
                  setPage((prev) => ({
                    ...prev,
                    [c.name]: (prev[c.name] || 1) + 1,
                  }))
                }
                disabled={
                  (page[c.name] || 1) ===
                  (otherCategoryData[c.name]?.totalPage || 1)
                }
                className={`px-4 py-2 rounded-md text-white font-semibold transition-colors shadow-sm
        ${
          (page[c.name] || 1) === (otherCategoryData[c.name]?.totalPage || 1)
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-[#FBAD34] hover:bg-[#e69d2e] cursor-pointer"
        }`}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default CategoryLayout;
