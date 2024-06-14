import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./CheckoutForm.css"
import useAuth from "../../Hook/useAuth";

const CheckoutForm = ({ payClass, id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useAuth();

  const navigate = useNavigate();
  const price = parseFloat(payClass?.price);

  useEffect(() => {
    if (price > 0) {
      axios
        .post(
          "http://localhost:5000/create-payment-intent",
          {
            price,
          }
        )
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price]);

  // pay button click function
  const handleSubmit = async (event) => {
    setProcessing(true);
    event.preventDefault();
    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setProcessing(false);
      console.error("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      setProcessing(false);
      console.log(confirmError);
    }

    if (paymentIntent?.status === "succeeded") {
      const transactionId = paymentIntent.id;
      setTransactionId(transactionId);
      // send to mongodb
      const payment = {
        classId: payClass?._id,
        className: payClass?.className,
        classImage: payClass?.image,
        instructorName: payClass?.instructorName,
        instructorEmail: payClass?.email,
        studentName: user?.displayName,
        transactionId,
        price,
        date: new Date(),
      };
    //   const token = localStorage.getItem("access-token");
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };
      axios
        .post(
          "http://localhost:5000/payments",
          payment,
        //   config
        )
        .then((res) => {
          // console.log("from step one", res.data);
          if (res.data.postResult.insertedId) {
            axios
              .delete(
                `http://localhost:5000/classes/selected?email=${user?.email}`,
                // config
              )
              .then((res) => {
                if (res.data.deletedCount > 0) {
                  setProcessing(false);
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Payment Success",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/dashboard/myEnrolledClasses", { replace: true });
                  return;
                }
              });
          }
        });
    }
    setProcessing(false);
  };

  return (
    <div>
      <div
        className={` ${
          !processing && "hidden"
        } text-primary my-5 flex flex-col items-center justify-center gap-4`}
      >
        <span className="loading loading-bars loading-lg"></span>
        <p>Please wait. Payment is processing</p>
      </div>

      <h1 className="text-xl my-5">
        Make payment for{" "}
        <span className="text-[#2196F3] font-bold">{payClass?.className}</span>
      </h1>

      <p className="my-5">Enter your Bank Details</p>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="ms-5 py-2 px-4 bg-[#6aa5cd] text-white shadow-lg shadow-[#b2dbf6] hover:shadow-[#405c6e] font-semibold rounded-lg"
          disabled={!stripe || !clientSecret || processing || !user}
        >
          {processing ? (
            <span>
              Processing <span className="loading loading-spinner"></span>
            </span>
          ) : (
            "Pay"
          )}
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500">
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
