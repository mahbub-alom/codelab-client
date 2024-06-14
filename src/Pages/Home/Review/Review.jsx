import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Review = () => {


  const { data: review = [], isPending } = useQuery({
    queryKey: ["review",],
    queryFn: async () => {
      const res = await axios.get(
        "https://codelab-server.onrender.com/review"
      );
      return res.data;
    },
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  return (
    <section className="my-20">
      <h2 className="text-center text-3xl mb-5">Client Feedback</h2>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {review.map((item) => (
          <SwiperSlide className="-mt-16" key={item._id}>
            <div className="mx-24 my-16 flex flex-col items-center">
              <Rating style={{ maxWidth: 180 }} value={item.rating} readOnly />
              <FaQuoteLeft className="text-6xl text-black mt-6"></FaQuoteLeft>
              <p className="py-8">{item.review}</p>
              <h2 className="text-2xl text-orange-400">{item.name}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Review;
