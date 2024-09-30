import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { userSignup } from "../../Api/UserApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";

function UserRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const schema = z
    .object({
      name: z.string().min(2, "Name should be at least 2 characters").max(20, "Name should be up to 20 characters"),
      number: z.string().refine((value) => /^\d{10}$/.test(value), {
        message: "Phone number must be exactly 10 digits.",
      }),
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(20, "Password cannot exceed 20 characters.")
        .refine((value) => /^(?=.*[a-zA-Z])(?=.*\d).+$/g.test(value), {
          message: "Password must contain at least one letter and one digit.",
        }),
      confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters."),
      role: z.string() // Added a default role for user
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const submitData = async (formData) => {
    const response = await userSignup(formData); // Await the API call

    console.log(response.data,"data"); // Log the response to check its structure

    if (response.data.status) {
      const { newUser, role } = response.data;
      dispatch(loginSuccess(newUser));
      toast(response.data.alert);

      if (role === "seller") {
        navigate("/sellerDashboard");
      } else {
        navigate("/userDashboard");
      }

    } else {
      toast(response.data.alert);
    }
 
};

  

  return (
    <div className="flex flex-col w-[50vw] h-[80vh] justify-center items-center rounded-lg border border-gray-600 text-center">
      <div className="flex flex-col w-[40vw]">
        <h1 className="font-bold text-3xl text-white m-4 px-1">Sign Up</h1>
        <form onSubmit={handleSubmit(submitData)} className="flex flex-col w-full">
          <input
            type="text"
            {...register("name")}
            placeholder="Enter your name"
            className="h-8 w-full rounded-md bg-black shadow-md text-center mb-2 mt-2 border border-slate-300"
          />
          {errors.name && <span className="text-red-950">{errors.name.message}</span>}
          
          <input
            type="text"
            {...register("number")}
            placeholder="Enter your contact number"
            className="h-8 w-full rounded-md bg-black shadow-md text-center mb-2 mt-2 border border-slate-300"
          />
          {errors.number && <span className="text-red-950">{errors.number.message}</span>}
          
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
          
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm your password"
            className="h-8 w-full rounded-md bg-black shadow-md text-center mb-2 mt-2 border border-slate-300"
          />
          {errors.confirmPassword && <span className="text-red-950">{errors.confirmPassword.message}</span>}

          {/* Optionally allow users to select a role */}
          <select {...register("role")} className="h-8 w-full rounded-md bg-black text-white shadow-md text-center mb-2 mt-2 border border-slate-300">
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
          
          <button type="submit" className="h-8 w-full rounded-md text-white font-semibold shadow-md text-center mt-2 border border-slate-300">
            Register
          </button>
        </form>
        <div className="flex flex-row justify-center text-center pt-3">
          <p className="text-[#872341]">Already have an account?</p>
          <Link to="/login">
            <p className="text-[#872341] font-bold ml-2">Sign In</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
