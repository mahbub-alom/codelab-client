import React, {useState } from "react";
import { useForm } from "react-hook-form";
import loginImage from "../../../assets/login/login.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { logIn, googleSignIn } = useAuth()

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    logIn(data?.email, data?.password)
      .then((result) => {
        const user = result.user;
        console.log(user)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Login successfully.",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { relative: true });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  // google sign up or log in
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        // console.log(user);
        const saveUser = {
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
        };
        axios
        .post("https://codelab-server.onrender.com/postUser", saveUser)
        .then((data) => {
          if (data?.data?.insertedId) {
            reset();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User google sign in successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Something went wrong: ${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  // toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="grid grid-cols-1 pt-20 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block md:mt-28">
        <img className="w-full h-96 object-cover" src={loginImage} alt="" />
      </div>
      <div className=" flex flex-col justify-center ">
        <div className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-200 p-8 shadow-2xl px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-4xl text-[#2196F3] font-bold text-center">
              Log In
            </h2>
            <div className="flex flex-col black py-2">
              <label>Email</label>
              <input
                className="rounded-lg text-black bg-gray-300 mt-2 p-2 focus:border-blue-500 focus:bg-gray-100 focus:outline-none"
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter email address"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600 text-sm">Email field is required</p>
              )}
            </div>
            <div className="flex flex-col text-gray-800 py-2">
              <label>Password</label>
              <div className="relative">
                <input
                  className="w-full rounded-lg text-black bg-gray-300 mt-2 p-2 focus:border-blue-500 focus:bg-gray-100 focus:outline-none"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  className="absolute top-5 right-2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-600 text-sm">
                  Password field is required
                </p>
              )}
            </div>

            <button className="w-full my-5 py-2 bg-[#6aa5cd] text-white shadow-lg shadow-[#b2dbf6] hover:shadow-[#405c6e] font-semibold rounded-lg">
              Log In
            </button>
          </form>
          <p className="text-gray-800 text-center">
            Don't have an account? Please
            <Link to="/register" className="text-[#2196F3]">
            {" "}
            Register
            </Link>
          </p>
          <div className="divider">OR</div>
          <button
            onClick={() => handleGoogleLogin()}
            className="btn w-full text-white btn-outline bg-[#6aa5cd]"
          >
            <span className="mr-4 text-[#2196F3]">
              <FaGoogle />
            </span>
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
