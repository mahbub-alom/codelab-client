import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Bounce } from "react-awesome-reveal";

const Instructor = () => {
  const { data: instructor = [], isPending } = useQuery({
    queryKey: ["instructor"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/instructor");
      return res.data;
    },
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  console.log(instructor);

  return (
    <div className="pt-20">
      <Bounce>
        <h2 className="text-xl md:text-3xl font-bold text-center my-4 text-[#2196F3]">
          Popular Instructor
        </h2>
        /{" "}
      </Bounce>
      <div className="grid md:grid-cols-3 gap-10">
        {instructor?.slice(0, 3).map((singleClass) => (
          <div
            key={singleClass?._id}
            className="card w-96 bg-base-100 shadow-xl"
          >
            <figure>
              <img className="h-80" src={singleClass?.photoURL} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                <span className="font-bold text-[#2196F3]">Name :</span>{" "}
                {singleClass?.name}
              </h2>
              <p className="font-bold">
                <span className="font-bold text-[#2196F3]">Email:</span>{" "}
                {singleClass?.email}
              </p>
              <p className="font-bold">
                <span className="font-bold text-[#2196F3]">Phone:</span>{" "}
                {singleClass?.userPhone}
              </p>
              <p className="font-bold">
                <span className="font-bold text-[#2196F3]">Address: </span>
                {singleClass?.userAddress}
              </p>
              <div className="card-actions justify-end">
                <button
                  className={`w-full my-5 py-2 bg-[#6aa5cd] text-white shadow-lg shadow-[#b2dbf6] hover:shadow-[#405c6e] font-semibold rounded-lg`}
                >
                  Tap To See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructor;
