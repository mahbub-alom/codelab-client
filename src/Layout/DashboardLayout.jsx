import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hook/useAuth";
// import DashboardNav from "../Pages/Shared/DashboardNav";

const DashboardLayout = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open SideBar
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className=" p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <div className="items-center">
              <h1 className="text-[#2196F3] origin-left text-3xl">
                Hi, {user?.displayName}
              </h1>
            </div>
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
