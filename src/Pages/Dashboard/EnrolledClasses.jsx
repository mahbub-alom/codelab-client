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
        `http://localhost:5000/payments/enrolled/student?email=${user?.email}`
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
        <h1 className="text-2xl font-semibold mb-8">My Enrolled Classes</h1>
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
                <button className="btn text-white bg-fuchsia-500">
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
