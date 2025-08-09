import axios from "axios"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import Loading from "../Components/Loading"
import avatar from "../assets/avatar.png"
import { Link } from "react-router-dom"
import ReactPaginate from "react-paginate"

export const Home = () => {
  const [posts, setPosts] = useState()
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState("")
  const [page, setPage] = useState(info.currentPage || 1)

  let arr = Array(10)
  arr = arr.fill("post")

  useEffect(() => {
    getAllPosts()
  }, [page])

  async function getAllPosts() {
    await axios
      .get(`https://linked-posts.routemisr.com/posts?limit=50&page=${page}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setPosts(response.data.posts)
        setInfo(response.data.paginationInfo)
        setLoading(false)
      })
      .catch((err) => toast.error(err.message))
  }

  return (
    <>
      {loading ? (
        arr.map((e, i) => {
          return (
            <div key={i} className="my-5">
              <Loading />
            </div>
          )
        })
      ) : (
        <>
          {posts.map((post) => {
            return (
              <Link key={post._id} to={`/post/${post._id}`}>
                <div className="mx-auto my-10 max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <div className=" flex justify-start items-center gap-10 text-white">
                    <img
                      src={post.user.photo}
                      alt=""
                      className="w-25 rounded-3xl"
                    />
                    <div>
                      <p>{post.user.name}</p>
                      <p>{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-white py-10">{post.body}</p>
                  <div className="flex justify-center">
                    {post.image ? <img src={post.image} alt="" /> : null}
                  </div>
                  {post.comments.length > 0 ? (
                    <div className="text-white my-5 bg-gray-400 py-5 px-2.5 rounded-full">
                      <div className=" flex justify-start items-center gap-10 pb-5">
                        <img
                          src={
                            post.comments[
                              post.comments.length - 1
                            ].commentCreator.photo.endsWith("undefined")
                              ? avatar
                              : post.comments[post.comments.length - 1]
                                  .commentCreator.photo
                          }
                          className="h-12 ms-5 rounded-3xl"
                          alt=""
                        />
                        <div>
                          <p>
                            {
                              post.comments[post.comments.length - 1]
                                .commentCreator.name
                            }
                          </p>
                          <p>
                            {new Date(
                              post.comments[post.comments.length - 1].createdAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <hr className="w-1/2 mx-auto" />
                      <p className="p-5 ms-5">
                        {post.comments[post.comments.length - 1].content}
                      </p>
                    </div>
                  ) : null}
                </div>
              </Link>
            )
          })}
          <ReactPaginate
            pageCount={info.numberOfPages}
            forcePage={page - 1}
            onPageChange={({ selected }) => {
              setPage(selected + 1)
              setLoading(true)
            }}
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            containerClassName="flex flex-wrap justify-center items-center gap-2 mt-10 py-5"
            pageClassName="page-item"
            pageLinkClassName="min-w-[40px] h-10 flex items-center justify-center px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors duration-200"
            activeClassName="z-10"
            activeLinkClassName="bg-blue-600 text-white dark:bg-blue-500 dark:text-white font-semibold border-blue-600 dark:border-blue-500 shadow-sm ring-2 ring-blue-300 dark:ring-blue-400 transition-all duration-200"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="min-w-[40px] h-10 flex items-center justify-center px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            nextLinkClassName="min-w-[40px] h-10 flex items-center justify-center px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            breakClassName="page-item"
            breakLinkClassName="min-w-[40px] h-10 flex items-center justify-center px-3 text-gray-400 dark:text-gray-500"
          />
        </>
      )}
    </>
  )
}
