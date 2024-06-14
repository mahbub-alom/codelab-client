import axios from "axios";
import React from "react";
import { Zoom } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateUserInfo = () => {
  const datas = useLoaderData();
  const { id: ids } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const navigate=useNavigate();

  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update your data",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#50C878",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update data!",
    }).then((result) => {
      if (result.isConfirmed) {
        const userData = {
          userName: data.name,
          userPhone: data.phone,
          userEmail: data.email,
          userAddress: data.address,
        };
        handleSwalFireWithUpdate(userData);
      }
    });
  };

  const handleSwalFireWithUpdate = (userData) => {
    axios
      .put(
        `http://localhost:5000/updateUser/${ids}`,
        userData,
        {
            headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`
            }
        }
      )
      .then((data) => {
        console.log(data.data);
        if (data.data.modifiedCount > 0) {
          reset();
          Swal.fire(
            `${userData.userName} data Update Successfully!`,
            "Your data has been Updated.",
            "success"
          );
          navigate("/dashboard/userInfo")
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Zoom>
        <h1 className="text-2xl font-semibold text-[#2196F3]">
          Update User Info
        </h1>
      </Zoom>
      {datas?.map((data) => (
        <div className="w-full mx-auto my-10" key={data._id}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-11/12 md:w-9/12 mx-auto p-4 bg-gray-100 shadow-md rounded-md"
          >
            <div className="flex gap-4">
              <div className="mb-4 md:w-1/2">
                <label className="text-gray-700 font-semibold">Name:</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="User Name"
                  defaultValue={data?.name}
                  className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4 md:w-1/2">
                <label className="text-gray-700 font-semibold">Phone:</label>
                <input
                  type="number"
                  defaultValue={data.userPhone}
                  {...register("phone", { required: true })}
                  placeholder="User Contact Number"
                  className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="md:flex gap-4">
              <div className="mb-4 md:w-1/2">
                <label className="text-gray-700 font-semibold">Email:</label>
                <input
                  type="email"
                  value={data?.email}
                  {...register("email", { required: true })}
                  readOnly
                  className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4 md:w-1/2">
                <label className="text-gray-700 font-semibold">Address:</label>
                <input
                  type="text"
                  placeholder="Address"
                  defaultValue={data?.userAddress}
                  {...register("address", { required: true })}
                  className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <input
                type="submit"
                value="Update User"
                className="px-4 py-2 cursor-pointer my-3 w-full font-semibold text-white bg-[#6aa5cd] rounded-lg hover:bg-[#308bb3] focus:outline-none focus:bg-[#3e6985] shadow-lg hover:shadow-[#405c6e] shadow-[#b2dbf6]"
              />
            </div>
          </form>
        </div>
      ))}
    </>
  );
};

export default UpdateUserInfo;
