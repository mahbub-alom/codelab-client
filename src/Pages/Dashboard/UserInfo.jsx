import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hook/useAuth";

const UserInfo = () => {
  const { user } = useAuth();
  const { data: users = [], isPending } = useQuery({
    queryKey: ["userInfo",user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/getUser?email=${user.email}`
      );
      return res.data;
    },
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      {users.map((user) => (
        <div
          key={user._id}
          className="min-h-screen flex items-center justify-center bg-gray-100"
        >
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 w-full max-w-md">
            <div className="flex items-center mb-6">
              <img
                className="w-16 h-16 rounded-full mr-4"
                src={user?.photoURL}
                alt="Profile"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-600">{user?.name}</p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700">Email:</h3>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700">Phone:</h3>
              <p className="text-gray-600">{user?.phone}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700">Address:</h3>
              <p className="text-gray-600">{user?.address}</p>
            </div>
            <Link>
              <button className="w-full my-5 py-2 bg-[#6aa5cd] text-white shadow-lg shadow-[#b2dbf6] hover:shadow-[#405c6e] font-semibold rounded-lg">
                Update Profile
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserInfo;
