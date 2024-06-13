import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Zoom } from "react-awesome-reveal";
import useAuth from "../../Hook/useAuth";
import axios from "axios";

const img_hosting_token = import.meta.env.VITE_IMGBB_KEY;

const AddAClass = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to add this class",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#50C878",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add Class!",
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
                className: data.className,
                classImage: imgURL,
                instructorName: user?.displayName,
                instructorEmail: user?.email,
                availableSeats: data.availableSeats,
                description:data.description,
                price: data.price,
                status: "pending",
                totalEnrolled: 0,
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
    // const token = localStorage.getItem("access-token");
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    axios
      .post("http://localhost:5000/classes", classData)
      .then((data) => {
        if (data.data.insertedId) {
          reset();
          Swal.fire(
            `${classData.className} Added Successfully!`,
            "Your class has been added.",
            "success"
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Zoom>
        <h1 className="text-2xl font-semibold text-[#2196F3]">
          Add A New Class
        </h1>
      </Zoom>
      <div className="w-full mx-auto my-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-11/12 md:w-9/12 mx-auto p-4 bg-gray-100 shadow-md rounded-md"
        >
          <div className="flex gap-4">
            <div className="mb-4 md:w-1/2">
              <label className="text-gray-700 font-semibold">Class Name:</label>
              <input
                type="text"
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
                value={user?.displayName}
                readOnly
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4 md:w-1/2">
              <label className="text-gray-700 font-semibold">
                Instructor Email:
              </label>
              <input
                type="email"
                value={user?.email}
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
                {...register("availableSeats", { required: true })}
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4 md:w-1/2">
              <label className="text-gray-700 font-semibold">Price:</label>
              <input
                type="number"
                {...register("price", { required: true })}
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="form-control">
              <div className="label">
              <label className="text-gray-700 font-semibold">Description:</label>
              </div>
              <textarea
              {...register("description", { required: true })}
                className="textarea textarea-bordered h-24"
                placeholder="Course Description"
              ></textarea>
            </label>
          </div>
          <div>
            <input
              type="submit"
              value="Add Class"
              className="px-4 py-2 cursor-pointer my-3 w-full font-semibold text-white bg-[#6aa5cd] rounded-lg hover:bg-[#308bb3] focus:outline-none focus:bg-[#3e6985] shadow-lg hover:shadow-[#405c6e] shadow-[#b2dbf6]"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAClass;
