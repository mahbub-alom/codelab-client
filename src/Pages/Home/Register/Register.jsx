import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RegisterImage from "../../../assets/Register/register.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { registerWithPass, updateUserProfile } = useAuth();
  const [passMatch, setPassMatch] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    if (data?.password !== data?.confirmPassword) {
      setPassMatch("Password not matched");
      return;
    } else {
      setPassMatch("");
    }

    //creating a new user
    registerWithPass(data?.email, data?.password)
      .then((result) => {
        const loggedUser = result.user;
        // add additional information of user
        updateUserProfile(data?.name, data?.photoURL).then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
            photoURL: data.photoURL,
          };
          axios
            .post("http://localhost:5000/postUser", saveUser)
            .then((data) => {
              if (data?.data?.insertedId) {
                reset();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(from, { replace: true });
              }
            });
        });
      })
      .catch((err) => {
        console.log(err.message);
        Swal.fire("Something went wrong", `${err.message}`, "error");
      });
  };

  return (
    <div className="grid grid-cols-1 pt-20 pe-10 sm:grid-cols-2 h-full w-full mt-4">
      <div className="hidden sm:block">
        <img
          className="max-w-[600px] mx-auto mt-16"
          src={RegisterImage}
          alt=""
        />
      </div>

      <div className="bg-white flex flex-col justify-center">
        <form
          className="max-w-[450px] w-full mx-auto rounded-lg bg-gray-200 p-8 px-8 shadow-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-4xl text-[#2196F3] font-bold text-center">
            Register
          </h2>
          <div className="flex flex-col text-gray-800 py-2">
            <label>Name</label>
            <input
              className="rounded-lg text-black bg-gray-300 mt-2 p-2 focus:border-indigo-500 focus:bg-gray-100 focus:outline-none"
              type="text"
              {...register("name")}
              placeholder="Enter Your Name"
            />
          </div>
          <div className="flex flex-col text-gray-800 py-2">
            <label>Photo URL</label>
            <input
              className="rounded-lg text-black bg-gray-300 mt-2 p-2 focus:border-indigo-500 focus:bg-gray-100 focus:outline-none"
              type="text"
              {...register("photoURL")}
              placeholder="Enter Your Photo URL"
            />
          </div>
          <div className="flex flex-col text-gray-800 py-2">
            <label>Email</label>
            <input
              className="rounded-lg text-black bg-gray-300 mt-2 p-2 focus:border-indigo-500 focus:bg-gray-100 focus:outline-none"
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter Your Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600 text-sm">Email field is required</p>
            )}
          </div>
          <div className="flex flex-col text-gray-800 py-2">
            <label>Password</label>
            <input
              className="rounded-lg text-black bg-gray-300 mt-2 p-2 focus:border-indigo-500 focus:bg-gray-100 focus:outline-none"
              type="password"
              {...register("password", {
                minLength: 6,
                maxLength: 32,
                pattern: /(?=.*[A-Z])/,
                required: true,
              })}
              placeholder="Enter a Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">Password must have one Uppercase</p>
            )}
          </div>
          <div className="flex flex-col text-gray-800 py-2">
            <label>Confirm Password</label>
            <input
              className="rounded-lg text-black bg-gray-300 mt-2 p-2 focus:border-indigo-500 focus:bg-gray-100 focus:outline-none"
              type="password"
              {...register("confirmPassword", { required: true })}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword?.type === "required" && (
              <p className="text-red-600 text-sm">
                Confirm Password field is required
              </p>
            )}
            {passMatch && <p className="text-red-600 text-sm">{passMatch}</p>}
          </div>

          <button className="w-full my-5 py-2 bg-[#6aa5cd] text-white shadow-lg shadow-[#b2dbf6] hover:shadow-[#405c6e] font-semibold rounded-lg">
            Register
          </button>
          <p className="text-gray-800 text-center">
            Already have an account? Please
            <Link to="/login" className="text-[#2196F3]">
              {" "}
              Log In
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
