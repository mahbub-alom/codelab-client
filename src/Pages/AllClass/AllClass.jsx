import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React  from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const AllClass = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: allclass = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allclass"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/getAllClass");
      return res.data;
    },
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  const handleAddToBuy = (singleClass) => {
    if (user && user?.email) {
      const cartItem = {
        email: user?.email,
        className: singleClass.className,
        instructorName: singleClass.instructorName,
        availableSeats: singleClass.availableSeats,
        price: singleClass.price,
        image:singleClass.classImage
      };
      axios.post("http://localhost:5000/carts", cartItem).then((data) => {
        const resultData = data.data;
        if (resultData.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${name} cart added successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="pt-20 grid md:grid-cols-3 gap-10">
      {allclass.map((singleClass) => (
        <div key={singleClass?._id} className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img className="h-80" src={singleClass?.classImage} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              <span className="font-bold text-[#2196F3]">Class Name :</span>{" "}
              {singleClass?.className}
            </h2>
            <p className="font-bold">
              <span className="font-bold text-[#2196F3]">Instructor Name:</span>{" "}
              {singleClass?.instructorName}
            </p>
            <p className="font-bold">
              <span className="font-bold text-[#2196F3]">Available seats:</span>{" "}
              {singleClass?.availableSeats}
            </p>
            <p className="font-bold">
              <span className="font-bold text-[#2196F3]">Price </span> $
              {singleClass?.price}
            </p>
            <p><span className="font-bold text-[#2196F3]">Description: </span> {singleClass?.description}</p>
            <div className="card-actions justify-end">
              <button
                onClick={() => handleAddToBuy(singleClass)}
                className={`w-full my-5 py-2 bg-[#6aa5cd] text-white shadow-lg shadow-[#b2dbf6] hover:shadow-[#405c6e] font-semibold rounded-lg`}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllClass;
