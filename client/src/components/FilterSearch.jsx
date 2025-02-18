import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";

const FilterSearch = () => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [category, setCategory] = useState([]);
  const [capacity, setCapacity] = useState(1);
  const {
    getPartyPalaceByCategory,
    getPartyPalaceByFilter,
    getAllCategory,
    allCategory,
  } = useContext(userContext);

  //function to get min and maxed filtered data
  const handleSubmitFind = (e) => {
    e.preventDefault();

    let payload = {};
    // console.log(payload);

    if (min && max) {
      payload.min = min;
      payload.max = max;
    }

    if (category && category.length > 0) {
      payload.category = category;
    }

    if (capacity) {
      payload.capacity = capacity;
    }

    getPartyPalaceByFilter(payload);
  };

  const handleCategoryChange = (e) => {
    const categoryValue = e.target.value;
    setCategory((prevCategory) => {
      if (prevCategory.includes(categoryValue)) {
        return prevCategory.filter((c) => c !== categoryValue); // remove the category if it's already selected
      } else {
        return [...prevCategory, categoryValue];
      }
    });
  };
  //   console.log(category);
  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <aside className="w-64 h-[calc(100vh-64px)]  bg-neutral-100 shadow-sm border-r border-neutral-200 2xl:w-96">
      <div className=" h-full overflow-x-hidden overflow-y-auto p-4 space-y-4">
        <div>
          <p className="font-semibold text-lg">Category</p>

          {allCategory &&
            allCategory.length > 0 &&
            allCategory.map((el, i) => (
              <div className="flex items-center gap-4 mt-2 ">
                <input
                  value={el.name}
                  type="checkbox"
                  className="w-4 h-4"
                  onChange={handleCategoryChange}
                  id={el.name}
                />{" "}
                <label htmlFor={el.name}>{el.name}</label>
              </div>
            ))}
        </div>
        <div>
          <p className="font-semibold text-lg">Price Range</p>
          <div className="flex gap-2">
            <input
              type="number"
              name="min"
              className="w-full mt-2 outline-none rounded-md px-2 py-1 border border-neutral-500 placeholder:text-neutral-700"
              placeholder="min price"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
            <input
              type="number"
              name="max"
              className="w-full mt-2  outline-none rounded-md px-2 py-1 border border-neutral-500 placeholder:text-neutral-700"
              value={max}
              placeholder="max price"
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
        </div>

        <div>
          <p className="font-semibold text-lg">Capacity</p>
          <input
            // value={capacity}
            type="number"
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full mt-2  outline-none rounded-md px-2 py-1 border border-neutral-500 placeholder:text-neutral-700"
            placeholder="enter the capacity"
          />
        </div>

        <button
          onClick={handleSubmitFind}
          className="bg-[#FBAD34] text-white py-2 px-4 mt-4 rounded-md hover:bg-[#FBAD34] w-full cursor-pointer tracking-wider"
        >
          Find
        </button>
      </div>
    </aside>
  );
};

export default FilterSearch;
