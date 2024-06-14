import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Flip } from "react-awesome-reveal";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SelectedClass = () => {
  const {
    data: selectedClass = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["selectedClass"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/getCarts");
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
        axios.delete(`http://localhost:5000/carts/${cls?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your class has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full">
      <Flip>
        <h1 className="text-2xl text-[#2196F3] font-semibold mb-8">Selected Classes</h1>
      </Flip>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Class Image</th>
            <th>Class Name</th>
            <th>Instructor Name</th>
            <th>
              Available <br /> Seats
            </th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedClass?.map((cls) => (
            <tr key={cls?._id}>
              <td>
                <img className="h-10 w-10" src={cls?.image} alt="" />
              </td>
              <td>{cls?.className}</td>
              <td>{cls?.instructorName}</td>
              <td>{cls?.availableSeats}</td>
              <td>${cls?.price}</td>
              <td>
                <button className="btn btn-ghost bg-[#6aa5cd] mr-3 text-white">
                  <Link
                    to={`/dashboard/payment/${cls?._id}`}
                    className="text-white"
                  >
                    Pay
                  </Link>
                </button>
                <button
                  onClick={() => handleDelete(cls)}
                  className="btn btn-ghost bg-red-600  text-white"
                >
                  <FaTrashAlt></FaTrashAlt>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedClass;
