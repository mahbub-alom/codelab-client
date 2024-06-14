import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JackInTheBox } from "react-awesome-reveal";
import useAuth from "../../Hook/useAuth";

const img_hosting_token = import.meta.env.VITE_IMGBB_KEY;

const UpdateClass = () => {
  const id = useParams();
  const datas = useLoaderData();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const navigate = useNavigate();

  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Update this class",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#50C878",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update Class!",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("image", data.classImage[0]);
        fetch(img_hosting_url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgResponse) => {
            if (imgResponse.success) {
              const imgURL = imgResponse.data.display_url;
              const classData = {
                classId: id.id,
                className: data.className,
                classImage: imgURL,
                availableSeats: data.availableSeats,
                price: data.price,
              };

              handleSwalFireWithUpdate(classData);
            }
          })
          .catch((err) => {
            Swal.fire(`Something went wrong!`, `${err.message}`, "error");
          });
      }
    });
  };

  const handleSwalFireWithUpdate = (classData) => {
    const token = localStorage.getItem("access-token");

    axios
      .patch(
        "https://codelab-server.onrender.com/classes/update",
        { classData },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${classData.className} has been updated!`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/myclass", { replace: true });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full">
      {datas?.map((cls) => (
        <div key={cls._id}>
          <JackInTheBox>
            <h1 className="text-2xl font-semibold text-[#2196F3]">
              Update Class:
              <span className=" font-bold">{cls?.className}</span>
            </h1>
          </JackInTheBox>
          <div className="w-full mx-auto my-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-11/12 md:w-9/12 mx-auto p-4 bg-gray-100 shadow-md rounded-md"
            >
              <div className="flex gap-4">
                <div className="mb-4 md:w-1/2">
                  <label className="text-gray-700 font-semibold">
                    Class Name:
                  </label>
                  <input
                    type="text"
                    defaultValue={cls?.className}
                    {...register("className", { required: true })}
                    className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4 md:w-1/2">
                  <label className="text-gray-700 font-semibold">
                    Class Image:
                  </label>
                  <input
                    type="file"
                    {...register("classImage", { required: true })}
                    className="file-input bg-indigo-100 h-11 file-input-bordered w-full "
                  />
                </div>
              </div>
              <div className="md:flex gap-4">
                <div className="mb-4 md:w-1/2">
                  <label className="text-gray-700 font-semibold">
                    Instructor Name:
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4 md:w-1/2">
                  <label className="text-gray-700 font-semibold">
                    Instructor Email:
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    readOnly
                    className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="md:flex gap-4">
                <div className="mb-4 md:w-1/2">
                  <label className="text-gray-700 font-semibold">
                    Available Seats:
                  </label>
                  <input
                    type="number"
                    defaultValue={cls?.availableSeats}
                    {...register("availableSeats", { required: true })}
                    className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4 md:w-1/2">
                  <label className="text-gray-700 font-semibold">Price:</label>
                  <input
                    type="number"
                    defaultValue={cls?.price}
                    {...register("price", { required: true })}
                    className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  value="Update Class"
                  className="w-full my-5 py-2 bg-[#6aa5cd] text-white shadow-lg shadow-[#b2dbf6] hover:shadow-[#405c6e] font-semibold rounded-lg"
                />
              </div>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateClass;
