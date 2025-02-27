import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";



const LoginForm = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identifier: "",
      pin: "",
    },
  });

  const validateIdentifier = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{11}$/;
    if (emailRegex.test(value) || phoneRegex.test(value)) {
      return true;
    }
    return "Please enter a valid email or phone number";
  };

  const validatePin = (value) => {
    const pinRegex = /^\d+$/;
    if (!pinRegex.test(value)) {
      return "PIN must contain only numbers";
    }
    if (value.length !== 5) {
      return "PIN must be at least 5 digits";
    }
    return true;
  };

  const onSubmit = async (data) => {
    // console.log(data);
    // axiosPublic
    //   .post("/login", data)
    //   .then((res) => {
        
    //     if (res?.data?.message === "success") {
    //       toast.success("Login successful");
    //       reset();
    //       redirect("/");
    //     }
    //   })
    //   .catch((err) => {
       
    //     if (err.response && err.response.status === 400) {
    //       toast.error(err.response.data.message);
    //     } else {
    //       toast.error("Something went wrong. Please try again.");
    //     }
    //   });
    await login(data.identifier, data.pin);
    
    

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Login</h2>
          <p className="text-sm text-gray-600">
            Enter your email/phone number and PIN to login
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700"
            >
              Email or Phone Number
            </label>
            <input
              {...register("identifier", { validate: validateIdentifier })}
              id="identifier"
              placeholder="Enter email or phone number"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            {errors.identifier && (
              <p className="text-sm text-red-500">
                {errors.identifier.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="pin"
              className="block text-sm font-medium text-gray-700"
            >
              PIN
            </label>
            <input
              {...register("pin", { validate: validatePin })}
              type="password"
              id="pin"
              maxLength={6}
              placeholder="Enter your PIN"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            {errors.pin && (
              <p className="text-sm text-red-500">{errors.pin.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;