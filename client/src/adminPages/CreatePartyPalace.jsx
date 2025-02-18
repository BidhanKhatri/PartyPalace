import React, { useContext, useEffect, useState } from "react";
import adminContext from "../context/adminContext";
import userContext from "../context/userContext";

const CreatePartyPalace = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    location: "",
    capacity: "",
    pricePerHour: "",
    category: [],
  });
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // Success feedback

  // console.log(data);

  const { addPartyPalace, loading } = useContext(adminContext);
  const { getAllCategory, allCategory } = useContext(userContext);

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const newValue = type === "number" ? parseInt(value) : value;
    setData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const isAllFills = Object.values(data).every(
    (el) => el !== "" && el.length !== 0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addPartyPalace(data);
      setSuccessMessage("Party Palace created successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setData({
        name: "",
        description: "",
        location: "",
        capacity: "",
        pricePerHour: "",
        category: [],
      });
      setSelectedCategory([]);
    }
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;

    // Find the selected category object by its ID
    const foundData = allCategory.find((el) => el._id === value);

    // Update selectedCategory, checking for duplicates
    setSelectedCategory((prev) => {
      const isAlreadySelected = prev.some((el) => el._id === foundData._id);
      if (isAlreadySelected) return prev; // Skip if duplicate
      return [...prev, foundData]; // Add the new category
    });

    // Update the `data.category` field
    setData((prev) => {
      const isAlreadyInData = prev.category.includes(foundData.name);
      if (isAlreadyInData) return prev; // Skip if duplicate
      return {
        ...prev,
        category: [...prev.category, foundData.name],
      };
    });
  };

  const removeCategory = (id, name) => {
    setSelectedCategory((prev) => prev.filter((el) => el._id !== id));
    setData((prev) => ({
      ...prev,
      category: prev.category.filter((cat) => cat !== name),
    }));
  };

  return (
    <section className=" w-full 2xl:items-start  overflow-x-hidden overflow-y-auto ">
      <form
        onSubmit={handleSubmit}
        className=" py-4 px-10 w-full space-y-4 2xl:max-w-7xl 2xl:mx-auto 2xl:mt-4 h-[calc(100vh)]  overflow-x-hidden overscroll-y-auto"
      >
        <p className="text-sky-500 text-2xl tracking-wider font-bold uppercase">
          Create Party Palace
        </p>

        {/* {successMessage && (
          <p className="text-green-500 font-medium mb-4">{successMessage}</p>
        )} */}

        <div>
          <label htmlFor="name">Party Palace Name</label>
          <input
            type="text"
            className="w-full outline-none p-2 rounded-md border border-neutral-400 mt-2 focus:border-sky-500"
            placeholder="Enter party palace name"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            maxLength="200"
            className="w-full outline-none p-2 rounded-md border border-neutral-400 mt-2 focus:border-sky-500 resize-none"
            placeholder="Add some description"
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="categorySelect">Select a Category</label>
          <select
            onChange={handleCategoryChange}
            id="categorySelect"
            name="category"
            className="block w-full px-4 py-2 mt-2 text-neutral-500 bg-white border border-neutral-400 rounded-lg focus:outline-none focus:border-sky-500"
          >
            <option value="" disabled selected>
              -- Choose a Category --
            </option>
            {allCategory.map((cat) => (
              <option
                key={cat._id}
                value={cat._id}
                class="hover:bg-sky-200 focus:bg-sky-300"
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory.length > 0 && (
          <div className="bg-neutral-200 rounded-md px-4 py-2 flex gap-4 flex-wrap">
            {selectedCategory.map((el) => (
              <span
                key={el._id}
                className="bg-neutral-50 w-fit px-2 py-0.5 rounded-md select-none"
              >
                <span>{el.name}</span>{" "}
                <span
                  onClick={() => removeCategory(el._id, el.name)}
                  className="cursor-pointer text-red-500 hover:text-neutral-500 transition-all ease-in-out duration-300"
                >
                  &times;
                </span>
              </span>
            ))}
          </div>
        )}

        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="w-full outline-none p-2 rounded-md border border-neutral-400 mt-2 focus:border-sky-500"
            placeholder="Enter location"
            id="location"
            name="location"
            value={data.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            className="w-full outline-none p-2 rounded-md border border-neutral-400 mt-2 focus:border-sky-500"
            placeholder="Enter total capacity like 100"
            id="capacity"
            name="capacity"
            value={data.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price per Hour</label>
          <input
            type="number"
            className="w-full outline-none p-2 rounded-md border border-neutral-400 mt-2 focus:border-sky-500"
            placeholder="Enter price per hour"
            id="price"
            name="pricePerHour"
            value={data.pricePerHour}
            onChange={handleChange}
            required
          />
        </div>

        <button
          disabled={!isAllFills}
          className={`${
            isAllFills
              ? "bg-sky-500 hover:bg-sky-600 cursor-pointer"
              : "cursor-not-allowed bg-neutral-500"
          } text-white w-full rounded-md p-2 tracking-wider transition-colors duration-500 ease-in-out`}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </section>
  );
};

export default CreatePartyPalace;
