import React from "react";
import Banner from "./Banner/Banner";

// import TopClasses from './TopClasses/TopClasses';
// import TopInstructors from './TopInstructors/TopInstructors';
// import { ToggleContext } from '../../Provider/ToggleProvider';
// import Community from './Community/Community';

const Home = () => {
  // const { isDark } = useContext(ToggleContext);
  return (
    <div>
      <Banner />
      {/* <h1
          className={`text-center text-xl md:text-4xl font-bold ${
            isDark ? "text-fuchsia-500" : "text-fuchsia-600"
          } mt-20`}
        >
          Popular Classes
        </h1> */}
      <div className="h-full md:w-9/12 mx-auto mt-20">
        {/* <TopClasses></TopClasses> */}
      </div>
      <div className="h-full md:w-10/12 mx-auto mt-20">
        {/* <h1
            className={`text-center text-xl md:text-4xl font-bold ${
              isDark ? "text-fuchsia-500-100" : "text-fuchsia-600"
            } my-20`}
          >
            Popular Instructors
          </h1> */}
        {/* <TopInstructors></TopInstructors> */}
      </div>
      {/* <Community></Community> */}
    </div>
  );
};

export default Home;
