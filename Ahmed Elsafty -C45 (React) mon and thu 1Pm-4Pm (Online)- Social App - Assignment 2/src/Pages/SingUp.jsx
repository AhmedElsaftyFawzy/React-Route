import { zodResolver } from "@hookform/resolvers/zod/src/zod.js"
import axios from "axios"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import * as zod from "zod"

const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name Is Required")
      .min(8, "At least 8 Characters"),
    email: zod
      .string()
      .nonempty("Email Is Required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please Enter Valid Email"
      ),
    password: zod
      .string()
      .nonempty("Password Is Required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        `At least 8 characters.
      At least one uppercase letter.
      At least one lowercase letter.
      At least one digit.
      At least one special character`
      ),
    rePassword: zod.string().nonempty("Repassword Is Required"),
    gender: zod.string().optional(["male", "female"], "Gender Is Required"),
    dateOfBirth: zod.coerce.date().refine(
      (val) => {
        let nowDate = new Date().getFullYear()
        let dateOfBirth = val.getFullYear()
        return nowDate - dateOfBirth >= 18
      },
      { message: "Has To Be 18 Or Older" }
    ),
  })
  .refine(
    (data) => {
      return data.password == data.rePassword
    },
    { message: "Password Not Matched", path: ["rePassword"] }
  )
export const SingUp = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  async function handleRegister(value) {
    await axios
      .post("https://linked-posts.routemisr.com/users/signup", value)
      .then((response) => {
        response.data.message == "success"
          ? toast.success("Login succeed")
          : null
        navigate("/login")
      })
      .catch((err) => toast.error(err.response.data.error))
  }
  return (
    <>
      <section className="flex justify-center relative">
        <img
          src="https://pagedone.io/asset/uploads/1702362010.png"
          alt="gradient background image"
          className="w-full h-full object-cover fixed"
        />
        <div className="mx-auto max-w-lg lg:w-lg px-6 lg:px-8 absolute py-20">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mx-auto lg:mb-11 mb-8 object-cover"
            alt="Flowbite Logo"
          />
          <div className="rounded-2xl bg-white shadow-xl">
            <form
              className="lg:p-11 p-7 mx-auto"
              onSubmit={handleSubmit(handleRegister)}
            >
              <div className="mb-11">
                <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">
                  Registration
                </h1>
              </div>
              <input
                type="text"
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                placeholder="Name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-600 mb-5">{errors.name.message}</p>
              )}
              <input
                type="email"
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600 mb-5">{errors.email.message}</p>
              )}
              <input
                type="password"
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                placeholder="Password"
                {...register("password")}
                autoComplete=""
              />
              {errors.password && (
                <p className="text-red-600 mb-5">{errors.password.message}</p>
              )}
              <input
                type="password"
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 my-5"
                placeholder="Repassword"
                {...register("rePassword")}
                autoComplete=""
              />
              {errors.rePassword && (
                <p className="text-red-600 mb-5">{errors.rePassword.message}</p>
              )}
              <select
                {...register("gender")}
                id="gender"
                className="w-full h-12 my-5 border-2 border-gray-200 border-solid focus:outline-0 rounded-full px-5 text-gray-400"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-600 mb-5">{errors.gender.message}</p>
              )}
              <input
                type="date"
                {...register("dateOfBirth")}
                className="w-full h-12 mb-5 border-2 border-gray-200 border-solid focus:outline-0 rounded-full px-5 text-gray-400"
              />
              {errors.dateOfBirth && (
                <p className="text-red-600 mb-5">
                  {errors.dateOfBirth.message}
                </p>
              )}
              <button className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-11 mt-5">
                Sign Up
              </button>
              <Link
                to="/login"
                className="flex justify-center text-gray-900 text-base font-medium leading-6"
              >
                Do you have an account?
                <span className="text-indigo-600 font-semibold pl-3">
                  Sign In
                </span>
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
