import React from "react";
import { useSelector } from "react-redux";
import Banner1 from "../assets/images/budha-palace.jpg";
import Banner2 from "../assets/images/budha-palace2.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HeroSection = () => {
  const [category, setCategory] = useState([]);
  const [searchData, setSearchData] = useState({});
  const [responseData, setResponseData] = useState([]);
  const { token } = useSelector((state) => state.user);
  // console.log("category", category);
  const navigate = useNavigate();

  // console.log("searchData", searchData);

  useEffect(() => {
    getCategory();
  }, []);

  //function to get the category
  const getCategory = async () => {
    try {
      const res = await axios.get("/proxy/api/global/category/get");
      if (res.data.success) {
        setCategory(res.data.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.msg || error?.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchData.category) {
      return toast.error("Please select a category");
    }
    if (!searchData.targetedDate) {
      return toast.error("Please select a date");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    };

    const res = await axios.post(
      "/proxy/api/partypalace/get-by-category-date",
      searchData,
      config
    );
    console.log("res data", res.data);

    if (res.data.success) {
      setResponseData(res.data.data);
      navigate("/quick-search", {
        state: {
          data: res.data.data, // the array you want to list
          totalCount: res.data.totalCount, // extra meta
          totalPage: res.data.totalPage,
          searchData, // the form values you sent
        },
      });
    }
    try {
    } catch (error) {
      console.log(error?.response?.data?.msg || error?.message);
    }
  };

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="min-h-[calc(90vh-64px)] bg-neutral-100 relative  "
    >
      <SwiperSlide>
        <div className="h-44 min-h-[calc(90vh-64px)]">
          <img
            src={Banner1}
            alt="img1"
            className="h-full w-full"
            style={{ filter: "brightness(70%)" }}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-44 min-h-[calc(76vh-64px)]">
          <img
            src={Banner2}
            alt="img2"
            className="h-full w-full object-cover"
            style={{ filter: "brightness(70%)" }}
          />
        </div>
      </SwiperSlide>
      <div className=" text-neutral-200 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <p className="text-5xl font-bold text-center">
          Easy Booking, Find Faster
        </p>
        <p className="text-xl text-center mt-2">
          One stop party palace and event solution
        </p>

        <div className="bg-white/90 rounded-xl max-w-3xl mx-auto p-4 mt-4 ">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 text-neutral-700">
              <label htmlFor="category">Category</label>

              <select
                className="border border-neutral-400 p-1.5 rounded-md"
                name="category"
                id="category"
                onChange={handleChange}
              >
                <option value="">Select </option>
                {category.map((el) => (
                  <option key={el._id} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>

              <label htmlFor="checkout">Check-in</label>
              <input
                type="date"
                name="targetedDate"
                id="checkin"
                className="border border-neutral-400 p-1.5 rounded-md"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-neutral-800 text-white px-12 py-1.5 rounded-lg"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </Swiper>
  );
};

export default HeroSection;
