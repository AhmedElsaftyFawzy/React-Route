import axios from "axios"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import * as zod from "zod"
import { zodResolver } from "./../../node_modules/@hookform/resolvers/zod/src/zod"
import toast from "react-hot-toast"
import { useContext, useEffect } from "react"
import { UserContext } from "../Context/UserContext"

const schema = zod.object({
  email: zod
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please Enter Valid Email"
    ),
  password: zod.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-=])[A-Za-z\d!@#$%^&*()_+-=]{8,}$/,
    `At least 8 characters.
      At least one uppercase letter.
      At least one lowercase letter.
      At least one digit.
      At least one special character`
  ),
})
export const Login = () => {
  const navigate = useNavigate()
  const { getUserData, setLoading } = useContext(UserContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  useEffect(() => {
    setLoading(false)
  }, [])

  async function handleLogin(value) {
    console.log(value)
    await axios
      .post("https://linked-posts.routemisr.com/users/signin", value)
      .then((response) => {
        toast.success("Login succeed")
        localStorage.setItem("token", response.data.token)
        setLoading(true)
        getUserData()
        navigate("/")
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
              action=""
              className="lg:p-11 p-7 mx-auto "
              onSubmit={handleSubmit(handleLogin)}
            >
              <div className="mb-11">
                <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">
                  Login
                </h1>
              </div>
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
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1"
                placeholder="Password"
                {...register("password")}
                autoComplete=""
              />
              {errors.password && (
                <p className="text-red-600 my-5">{errors.password.message}</p>
              )}
              <Link to="" className="flex justify-end mb-6">
                <span className="text-indigo-600 text-right text-base font-normal leading-6">
                  Forgot Password?
                </span>
              </Link>
              <button className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-11">
                Login
              </button>
              <Link
                to="/signup"
                className="flex justify-center text-gray-900 text-base font-medium leading-6"
              >
                Don’t have an account?
                <span className="text-indigo-600 font-semibold pl-3">
                  Sign Up
                </span>
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
