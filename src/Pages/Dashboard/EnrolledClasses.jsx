import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import { Rotate } from "react-awesome-reveal";

const EnrolledClasses = () => {
  const { user } = useAuth();

  const { data: enrolled = [], isPending } = useQuery({
    queryKey: ["enrolled", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `https://codelab-server.onrender.com/payments/enrolled/student?email=${user?.email}`
      );
      return res.data;
    },
  });
  if (isPending) {
    return <span>Loading...</span>;
  }
  
  return (
    <div>
      <Rotate>
        <h1 className="text-2xl font-semibold mb-8 text-[#2196F3]">My Enrolled Classes</h1>
      </Rotate>
      <div className="grid grid-cols-2 gap-5">
        {enrolled?.map((cls) => (
          <div
            key={cls?._id}
            className="card lg:card-side bg-base-100 shadow-xl"
          >
            <figure>
              <img className="h-20 w-32 rounded-lg" src={cls?.classImage} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Class Name: {cls?.className}</h2>
              <p>Instructor Name: {cls?.instructorName}</p>
              <div className="card-actions justify-end">
                <button className="my-5 px-2 py-2 bg-[#6aa5cd] text-white shadow-lg shadow-[#b2dbf6] hover:shadow-[#405c6e] font-semibold rounded-lg">
                  Continue Class
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledClasses;
