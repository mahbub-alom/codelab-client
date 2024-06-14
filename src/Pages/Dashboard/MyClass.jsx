import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import { Roll } from "react-awesome-reveal";
import Swal from "sweetalert2";

const MyClass = () => {
  const { user } = useAuth();

  const {
    data: classInfo = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["classInfo", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/getClass?email=${user.email}`
      );
      return res.data;
    },
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  const handleDelete = (cls) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/removeClass/${cls?._id}`)
          .then((data) => {
            refetch();
            if (data.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: `${cls?.className} has been deleted.`,
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="w-full">
      <Roll>
        <h1 className="text-2xl font-semibold mb-8 text-[#2196F3]">
          My Classes
        </h1>
      </Roll>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>
                Total <br /> Enrolled <br /> Students
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classInfo?.map((cls, index) => (
              <tr key={cls?._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={cls?.classImage} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{cls?.className}</td>
                <td>{cls?.price}</td>
                <td>{cls?.status}</td>
                <td>{cls?.totalEnrolled}</td>
                <th>
                  <Link to={`/dashboard/updateClass/${cls?._id}`}>
                    <button className="p-3 bg-[#6aa5cd] text-white shadow-lg shadow-[#b2dbf6] hover:shadow-[#405c6e] font-semibold rounded-lg">
                      Update
                    </button>
                  </Link>
                  <Link onClick={() => handleDelete(cls)}>
                    <button className="p-3 bg-[#6aa5cd] text-white shadow-lg ms-2 shadow-[#b2dbf6] hover:shadow-[#405c6e] font-semibold rounded-lg">
                      Delete
                    </button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClass;
