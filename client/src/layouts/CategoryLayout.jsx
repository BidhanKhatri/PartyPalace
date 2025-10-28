import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";
import VenueCard from "../components/VenueCard";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import HomeSkeletonDiv from "../components/HomeSkeletonDiv";

const CategoryLayout = () => {
  const { userId } = useSelector((state) => state?.user);
  const {
    getPartyPalaceByCategory,
    categoryData,
    otherCategoryData,
    getAllCategory,
    allCategory,
  } = useContext(userContext);

  const [page, setPage] = useState({}); // ✅ Initialize as an object

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    const fetchAllCategoryAndDisplay = async () => {
      if (allCategory.length > 0) {
        try {
          const promises = allCategory.map((cat) =>
            getPartyPalaceByCategory(cat.name, page[cat.name] || 1)
          );
          await Promise.all(promises);
        } catch (error) {
          console.error("Error fetching party palace data:", error);
        }
      }
    };

    fetchAllCategoryAndDisplay();
  }, [JSON.stringify(page), allCategory]); // ✅ Convert page object to string

  return (
    <>
      {allCategory.map((c, i) => {
        const currentPage = page[c.name] || 1;
        const totalPages = otherCategoryData[c.name]?.totalPage || 1;

        return (
          <section key={i} className="max-w-7xl mx-auto px-10 py-6">
            <div className="flex items-center justify-between">
              <p className="font-bold text-xl uppercase tracking-wider text-neutral-600">
                Places By Category : {c.name}
              </p>
              <p className="font-semibold text-sm select-none cursor-pointer">
                View All ({totalPages * 4})
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pb-4">
              {(categoryData[c.name] || []).map((pp) => (
                <VenueCard
                  key={pp._id}
                  {...pp}
                  userId={userId}
                  partyPalaceId={pp._id}
                />
              ))}
              {/* Empty Skeleton Divs to Fill Grid */}
              {Array.from({
                length: 4 - ((categoryData[c.name]?.length || 0) % 4),
              }).map((_, index) => (
                <HomeSkeletonDiv key={index} />
              ))}
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-center items-center mt-2">
              <div className="flex gap-4 items-center">
                <button
                  onClick={() =>
                    setPage((prev) => ({
                      ...prev,
                      [c.name]: Math.max(1, (prev[c.name] || 1) - 1),
                    }))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md text-white font-semibold shadow-sm ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#FBAD34] hover:bg-[#e69d2e]"
                  }`}
                >
                  <FaArrowLeft />
                </button>

                <div className="rounded-lg px-4 py-2 inline-flex items-center">
                  <span className="text-base font-semibold text-neutral-500">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>

                <button
                  onClick={() =>
                    setPage((prev) => ({
                      ...prev,
                      [c.name]: Math.min(totalPages, (prev[c.name] || 1) + 1),
                    }))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md text-white font-semibold shadow-sm ${
                    currentPage === totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#FBAD34] hover:bg-[#e69d2e]"
                  }`}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default CategoryLayout;
