import React from "react";
import Banner from "./Banner/Banner";
import Review from "./Review/Review";
import PopularClass from "./PopularClass/PopularClass";

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularClass />
      <Review />
    </div>
  );
};

export default Home;
