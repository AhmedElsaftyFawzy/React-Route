import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import Loading from "./../Components/Loading"
import avatar from "../assets/avatar.png"

const PostDetails = () => {
  const param = useParams()
  const [post, setPost] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPost()
  }, [])

  async function getPost() {
    await axios
      .get(`https://linked-posts.routemisr.com/posts/${param.id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((responde) => {
        setPost(responde.data.post)
        setLoading(false)
      })
      .catch((err) => toast.error("Failed To load The Post"))
  }
  return (
    <>
      {loading ? (
        <div className="h-screen flex items-center">
          <Loading></Loading>
        </div>
      ) : (
        <>
          <Link to={"/"} className="fixed top-25 left-5">
            <i className="fa-solid fa-arrow-left-long"></i>
          </Link>
          <div className="mx-auto my-20 max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className=" flex justify-start items-center gap-10 text-white">
              <img src={post.user.photo} alt="" className="w-25" />
              <div>
                <p>{post.user.name}</p>
                <p>{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-white py-10">{post.body}</p>
            {post.image ? <img src={post.image} alt="" /> : null}
            {post.comments.map((comment) => {
              return (
                <div
                  key={comment._id}
                  className="text-white my-5 bg-gray-400 py-5 px-2.5 rounded-full"
                >
                  <div className=" flex justify-start items-center gap-10 pb-5">
                    <img
                      src={
                        comment.commentCreator.photo.endsWith("undefined")
                          ? avatar
                          : comment.commentCreator.photo
                      }
                      className="h-12 ms-5 rounded-3xl"
                      alt=""
                    />
                    <div>
                      <p>{comment.commentCreator.name}</p>
                      <p>{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <hr className="w-1/2 mx-auto" />
                  <p className="p-5 ms-5">{comment.content}</p>
                </div>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}

export default PostDetails
