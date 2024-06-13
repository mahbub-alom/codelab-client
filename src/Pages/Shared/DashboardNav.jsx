import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../Hook/useAuth";

const DashboardNav = () => {
  const { user } = useAuth();

  const navItems = (
    <>
      <li>
        <NavLink
          to="userInfo"
          className="text-[#2196F3] text-2xl hover:bg-[#6aa5cd] hover:text-white w-full rounded-lg px-4 py-2 mb-2 inline-block leading-loose"
        >
          User Info
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myClasses"
          className="text-[#2196F3] text-2xl hover:bg-[#6aa5cd] hover:text-white w-full rounded-lg px-4 py-2 mb-2 inline-block leading-loose"
        >
          Add A Class
        </NavLink>
      </li>
      <li>
        <NavLink
          to="paymentHistory"
          className="text-[#2196F3] text-2xl hover:bg-[#6aa5cd] hover:text-white w-full rounded-lg px-4 py-2 mb-2 inline-block leading-loose"
        >
          My Added Class
        </NavLink>
      </li>
      <li>
        <NavLink
          to="paymentHistory"
          className="text-[#2196F3] text-2xl hover:bg-[#6aa5cd] hover:text-white w-full rounded-lg px-4 py-2 mb-2 inline-block leading-loose"
        >
          Selected Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="paymentHistory"
          className="text-[#2196F3] text-2xl hover:bg-[#6aa5cd] hover:text-white w-full rounded-lg px-4 py-2 mb-2 inline-block leading-loose"
        >
          Enrolled Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="paymentHistory"
          className="text-[#2196F3] text-2xl hover:bg-[#6aa5cd] hover:text-white w-full rounded-lg px-4 py-2 mb-2 inline-block leading-loose"
        >
          Payment History
        </NavLink>
      </li>
      <div className="divider"></div>
      <li>
        <NavLink
          to="/"
          className="text-[#2196F3] text-2xl hover:bg-[#6aa5cd] hover:text-white w-full rounded-lg px-4 py-2 mb-2 inline-block leading-loose"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allClasses"
          className="text-[#2196F3] text-2xl hover:bg-[#6aa5cd] hover:text-white w-full rounded-lg px-4 py-2 mb-2 inline-block leading-loose"
        >
          Classes
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="w-96 h-full p-5 pt-8 relative">
      <div className="items-center">
        <h1 className="text-[#2196F3] origin-left text-3xl">
          Hi, {user?.displayName}
        </h1>
        <ul className="mt-10">{navItems}</ul>
      </div>
    </div>
  );
};

export default DashboardNav;
