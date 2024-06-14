import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Bounce } from "react-awesome-reveal";

const PopularClass = () => {
  const { data: popularClass = [], isPending } = useQuery({
    queryKey: ["popularClass"],
    queryFn: async () => {
      const res = await axios.get("https://codelab-server.onrender.com/getAllClass");
      return res.data;
    },
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <Bounce>
        <h2 className="text-xl md:text-3xl font-bold text-center my-4 text-[#2196F3]">
          Popular Class
        </h2>
        /{" "}
      </Bounce>
      <div className="pt-20 grid md:grid-cols-3 gap-10">
        {popularClass?.slice(0, 3).map((singleClass) => (
          <div
            key={singleClass?._id}
            className="card w-96 bg-base-100 shadow-xl"
          >
            <figure>
              <img className="h-80" src={singleClass?.classImage} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                <span className="font-bold text-[#2196F3]">Class Name :</span>{" "}
                {singleClass?.className}
              </h2>
              <p className="font-bold">
                <span className="font-bold text-[#2196F3]">
                  Instructor Name:
                </span>{" "}
                {singleClass?.instructorName}
              </p>
              <p className="font-bold">
                <span className="font-bold text-[#2196F3]">
                  Available seats:
                </span>{" "}
                {singleClass?.availableSeats}
              </p>
              <p className="font-bold">
                <span className="font-bold text-[#2196F3]">Price </span> $
                {singleClass?.price}
              </p>
              <p>
                <span className="font-bold text-[#2196F3]">Description: </span>{" "}
                {singleClass?.description}
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

export default PopularClass;
