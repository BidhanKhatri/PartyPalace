import React, { useState } from "react";
import { FaArrowAltCircleRight, FaStar } from "react-icons/fa";

const Review = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  console.log(rating);
  return (
    <section className="bg-neutral-50  w-full  rounded-md p-2 max-w-7xl mx-auto">
      {/* This is the review section  */}
      <p className="font-bold text-2xl tracking-wider">Customer Reviews</p>
      <div className="flex gap-4  mt-4">
        <div className="w-12 h-12 rounded-full overflow-hidden ">
          <img
            src={""}
            className="w-full h-full object-cover shrink-0 bg-neutral-200"
          />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between  ">
            <span className="font-semibold ">UserName</span>
            <span className="tex-sm text-neutral-500">2 days ago</span>
          </div>
          <span className="flex gap-1 mt-1">
            {Array(5)
              .fill()
              .map((_, i) => (
                <FaStar key={i} className="text-[#FBAD34]" size={20} />
              ))}
          </span>
          <p className="mt-1 text-neutral-500 break-words  ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente,
            minus Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Quisquam, illum dolorum. Earum nemo beatae totam eligendi deleniti
            nobis a soluta, cum minus fuga magnam consequuntur officiis sequi
            debitis cupiditate nisi maiores asperiores! Quidem suscipit quasi
            cupiditate facilis fugiat maiores? Deleniti eligendi earum quisquam
            molestiae obcaecati maiores ipsum nobis doloribus, minima ea
            officiis soluta accusamus incidunt rem quia. Doloribus magnam
            numquam eveniet vel explicabo! Odit sed distinctio perferendis aut
            eius temporibus sapiente consectetur suscipit officia iure excepturi
            ea enim accusamus nostrum voluptates facilis, repudiandae aliquam
            sequi error laborum? Eaque voluptatibus quia placeat amet? Quidem
            voluptates repellat aperiam? Nihil accusantium sunt iure.
          </p>
        </div>
      </div>
      <div className="bg-neutral-100 w-full  mt-4 rounded-md p-2">
        <p className="font-semibold text-neutral-800 text-xl tracking-wide">
          Write a Review
        </p>
        <textarea
          className="w-full bg-white rounded-md p-2 mt-2 border border-neutral-300 resize-none outline-none  focus:border-[#FBAD34]"
          rows={4}
          maxLength={200}
          placeholder="share your thoughts about our place"
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              const starId = `start-${currentRating}`;
              return (
                <>
                  <input
                    type="radio"
                    id={starId}
                    onClick={() => setRating(currentRating)}
                    value={currentRating}
                    hidden
                  />
                  <label htmlFor={starId}>
                    <FaStar
                      color={
                        currentRating <= (hover || rating) ? "#FBAD34" : ""
                      }
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                      size={24}
                      className="cursor-pointer"
                    />
                  </label>
                </>
              );
            })}
          </div>
          <button className="p-2 rounded-md bg-black text-white  tracking-wide cursor-pointer flex items-center gap-2">
            <FaArrowAltCircleRight /> Submit Review
          </button>
        </div>
      </div>
    </section>
  );
};

export default Review;
