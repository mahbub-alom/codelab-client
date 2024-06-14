import axios from "axios";
import React from "react";
import useAuth from "../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Slide } from "react-awesome-reveal";

const PaymentHistory = () => {
  const { user } = useAuth();
  const { data: paymentHistory = [], isPending } = useQuery({
    queryKey: ["paymentHistory", user?.email],
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
    <div className="w-full">
      <Slide>
        <h1 className="text-2xl font-semibold mb-8">Payment History</h1>
      </Slide>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Class Name</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {paymentHistory?.map((stn, index) => (
              <tr key={stn._id}>
                <th>{index + 1}</th>
                <td>{stn?.studentName}</td>
                <td>{stn?.instructorEmail}</td>
                <td>{stn?.className}</td>
                <td>{stn?.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
