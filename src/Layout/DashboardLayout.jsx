import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNav from "../Pages/Shared/DashboardNav";

const DashboardLayout = () => {
  return (
    <div className="flex relative">
      <div className="h-screen sticky top-0">
        <DashboardNav />
      </div>
      <div className="h-full flex-1 p-7">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
