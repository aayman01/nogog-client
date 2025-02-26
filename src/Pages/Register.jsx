import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axiosPublic
      .post("/register", data)
      .then((res) => {
        // console.log(res.data);
        if (res?.data?.message === "success") {
          toast.success("Registration successful");
          reset();
          redirect('/login');
        }
      })
      .catch((err) => {
        // console.log(err);
        if (err.response && err.response.status === 400) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Registration</h2>
          <p className="text-gray-600">Create your new account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              5 Digit PIN
            </label>
            <input
              {...register("pin", {
                required: "PIN is required",
                pattern: {
                  value: /^\d{5}$/,
                  message: "PIN must be exactly 5 digits",
                },
              })}
              maxLength={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 5 digit PIN"
            />
            {errors.pin && (
              <span className="text-sm text-red-500">{errors.pin.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10,}$/,
                  message: "Please enter a valid mobile number",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter mobile number"
            />
            {errors.mobile && (
              <span className="text-sm text-red-500">
                {errors.mobile.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Type
            </label>
            <select
              {...register("accountType", {
                required: "Please select an account type",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select account type</option>
              <option value="agent">Agent</option>
              <option value="user">User</option>
            </select>
            {errors.accountType && (
              <span className="text-sm text-red-500">
                {errors.accountType.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NID Number
            </label>
            <input
              {...register("nid", { required: "NID number is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter NID number"
            />
            {errors.nidNumber && (
              <span className="text-sm text-red-500">
                {errors.nidNumber.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
