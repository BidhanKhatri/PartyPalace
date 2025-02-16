import React, { useContext, useState } from "react";
import adminContext from "../context/adminContext";

const CreatePartyPalace = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    location: "",
    capacity: "",
    pricePerHour: "",
  });

  // console.log("pp create", data);
  const { addPartyPalace, loading } = useContext(adminContext);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const newValue = type === "number" ? parseInt(value) : value;
    setData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const isAllFills = Object.values(data).every((el) => el !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addPartyPalace(data);
    } catch (error) {
      console.log(error);
    } finally {
      setData({
        name: "",
        description: "",
        location: "",
        capacity: "",
        pricePerHour: "",
      });
    }
  };

  return (
    <section className="flex items-center  w-full ">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-md max-w-lg py-4 px-6  mx-auto w-full shadow-md space-y-4 border border-neutral-300"
      >
        <p className=" text-center text-2xl tracking-wider">
          Create party palace
        </p>
        <div>
          <label htmlFor="name">Party Palace Name</label>
          <input
            type="text"
            className="w-full outline-none p-2 rounded-md border border-neutral-400 mt-2 focus:border-sky-500"
            placeholder="enter party palace name"
            autoFocus
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            maxLength="200"
            className="w-full outline-none p-2 rounded-md border border-neutral-400 mt-2 focus:border-sky-500 resize-none"
            placeholder="add some description "
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="w-full outline-none p-2 rounded-md border border-neutral-400 mt-2 focus:border-sky-500"
            placeholder="enter location"
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
            placeholder="enter total capacity like 100"
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
            placeholder="enter total capacity like 100"
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
              ? " bg-sky-500 hover:bg-sky-600 cursor-pointer"
              : "cursor-not-allowed bg-neutral-500"
          }  text-white w-full rounded-md p-2 tracking-wider  transition-colors duration-500 ease-in-out `}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </section>
  );
};

export default CreatePartyPalace;
