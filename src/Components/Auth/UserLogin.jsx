import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { userLogin } from "../../Api/UserApi"; // Assuming there's a userLogin function
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";

function UserLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(20, "Password cannot exceed 20 characters."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const submitData = async (formData) => {
    const response = await userLogin(formData);
    console.log(response.data); // Log response data for debugging
  
    if (response.data.status) {
      const { newUser, role } = response.data;
      localStorage.setItem('user', JSON.stringify({ ...newUser, role })); // Store user with role in local storage
      dispatch(loginSuccess(newUser));
      toast.success(response.data.alert);
      navigate(role === "seller" ? "/sellerDashboard" : "/userDashboard");
    } else {
      toast.error(response.data.alert);
    }
  };
  

  return (
    <div className="flex flex-col w-[50vw] h-[80vh] p-9 items-center rounded-lg border border-gray-600 text-center">
      <div className="flex flex-col w-[30vw]">
        <div className="">
          <h1 className="font-bold text-3xl text-white m-4 px-1">Login</h1>
        </div>
        <form onSubmit={handleSubmit(submitData)} className="flex flex-col">
          <input
            type="text"
            {...register("email")}
            placeholder="Enter your email"
            className="h-8 w-full rounded-md bg-black shadow-md text-center mb-2 mt-2 border border-slate-300"
          />
          {errors.email && <span className="text-red-950">{errors.email.message}</span>}

          <input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="h-8 w-full rounded-md bg-black shadow-md text-center mb-2 mt-2 border border-slate-300"
          />
          {errors.password && <span className="text-red-950">{errors.password.message}</span>}

          <button
            type="submit"
            className="h-8 w-full rounded-md text-white font-semibold shadow-md text-center mt-2 border border-slate-300"
          >
            Login
          </button>
        </form>
        <div className="flex flex-row justify-center text-center pt-3">
          <p className="text-[#872341]">Don't have an account?</p>
          <Link to="/signup">
            <p className="text-[#872341] font-bold ml-2">Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
