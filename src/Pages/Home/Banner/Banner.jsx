import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-red-100 h-screen w-full">
      <Swiper
        loop={true}
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Autoplay, Pagination]}
        className="mySwiper"
      >
        {/* python  */}
        <SwiperSlide>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/564x/63/94/f5/6394f5e99919e42f3278307506b8e73e.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-[#2196F3] text-2xl md:text-5xl font-bold uppercase">
                  Python
                </h1>
                <p className="mb-5 ">
                  Learn Python programming from scratch with our
                  beginner-friendly course. Whether you're new to coding or
                  switching careers, this course will teach you the fundamentals
                  of Python, from variables and loops to functions and
                  object-oriented programming.
                </p>
                <Link to="/allClasses">
                  <button className="btn bg-[#6aa5cd] text-white rounded-full btn-outline ml-5">
                    View Prices
                  </button>
                </Link>
                <Link to="/instructors">
                  <button className="bg-[#6aa5cd] text-white btn rounded-full btn-outline ml-5">
                    Talk To An Advisor
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* javascript  */}
        <SwiperSlide>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/564x/bb/15/7c/bb157c215a923c3b692799f2bf9a71ce.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-2xl md:text-5xl text-[#2196F3] font-bold uppercase">
                  javascript
                </h1>
                <p className="mb-5">
                  Dive into the world of web development with JavaScript! This
                  course covers the fundamentals of JavaScript programming,
                  including variables, data types, functions, and control flow.
                  Perfect for beginners looking to build a solid foundation in
                  front-end and back-end web development.
                </p>
                <Link to="/allClasses">
                  <button className="btn bg-[#6aa5cd] text-white rounded-full btn-outline ml-5">
                    View Prices
                  </button>
                </Link>
                <Link to="/instructors">
                  <button className="bg-[#6aa5cd] text-white btn rounded-full btn-outline ml-5">
                    Talk To An Advisor
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/564x/56/ce/90/56ce90590871f6117d4cdf515db97c5a.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1
                  className="mb-5  text-2xl md:text-5xl text-[#2196F3] font-bold uppercase"
                  style={{ lineHeight: "1" }}
                >
                  java
                </h1>
                <p className="mb-5">
                  Start your programming journey with Java! This course is
                  designed for absolute beginners. Learn the basics of Java
                  syntax, object-oriented programming principles, and essential
                  programming concepts. Build a strong foundation to pursue a
                  career in software development.
                </p>
                <Link to="/allClasses">
                  <button className="btn bg-[#6aa5cd] text-white rounded-full btn-outline ml-5">
                    View Prices
                  </button>
                </Link>
                <Link to="/instructors">
                  <button className="bg-[#6aa5cd] text-white btn rounded-full btn-outline ml-5">
                    Talk To An Advisor
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
