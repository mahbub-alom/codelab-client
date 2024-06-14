import { Elements } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const { id } = useParams();
  const { data: selectedClass = [] } = useQuery({
    queryKey: ["selectedClass"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/getCarts");
      return res.data;
    },
  });

  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

  const payClass = selectedClass.find(
    (cls) => parseFloat(cls._id) === parseFloat(id)
  );

  return (
    <div className="w-full">
    <h1 className="text-2xl font-semibold mb-8 text-[#2196F3]" >Payment Page</h1>
    <Elements stripe={stripePromise}>
        <CheckoutForm payClass={payClass} id={id}></CheckoutForm>
    </Elements>

</div>
  );
};

export default Payment;
