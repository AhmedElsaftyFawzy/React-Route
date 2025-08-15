import { useContext } from "react"
import { UserContext } from "../Context/UserContext"
import { useForm } from "react-hook-form"
import axios from "axios"
import toast from "react-hot-toast"

export const CreatePost = ({ refetch }) => {
  const { user, loading } = useContext(UserContext)
  const { register, handleSubmit } = useForm()

  async function handlePost(data) {
    let formData = new FormData()
    formData.append("body", data.body)
    data?.image[0] ? formData.append("image", data.image[0]) : null

    await axios
      .post(`https://linked-posts.routemisr.com/posts`, formData, {
        headers: { token: localStorage.getItem("token") },
      })
      .then(() => {
        toast.success("Post Created Successfully")
        refetch()
      })
      .catch(({ err }) =>
        toast.error(err.response.data.message || "ERROR Has Happened")
      )
  }
  return (
    <div className="mt-24 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handlePost)}
        className="w-2/4 flex flex-col gap-5 dark:bg-white bg-gray-700 p-5 rounded-3xl"
      >
        {loading ? (
          <>
            <div className="flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                loading...
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center  gap-5 ">
              <img
                className="w-10 h-10 rounded-full"
                src={user?.photo}
                alt="Rounded avatar"
              />
              <input
                type="text"
                id="post"
                autoComplete="off"
                {...register("body")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label htmlFor="image">
                <i className="fa-regular fa-image cursor-pointer text-3xl"></i>
              </label>
              <input type="file" id="image" hidden {...register("image")} />
            </div>
            <button
              type="submit"
              className="bg-gray-700 text-white  rounded-xl w-2/4 mx-auto cursor-pointer"
            >
              Post
            </button>
          </>
        )}
      </form>
    </div>
  )
}
