import React, { useContext, useEffect } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "../Context/UserContext"

export const Navbar = () => {
  const { user, getUserData, loading, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    getUserData()
  }, [])

  function handleLogout() {
    localStorage.removeItem("token")
    setUser(null)
    navigate("/login")
  }

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 start-0 end-0 z-50 shadow-2xl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Social App
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {loading ? (
                <>
                  <div className="flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                      loading...
                    </div>
                  </div>
                </>
              ) : user ? (
                <>
                  <div className="flex items-center gap-4">
                    <Link className="flex items-center gap-4" to="/user">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user.photo}
                        alt=""
                      />
                      <div className="font-medium dark:text-white">
                        <div>{user.name}</div>
                      </div>
                    </Link>

                    <Link to="/edit/upload" className="ms-5">
                      <i className="fa-solid fa-gears dark:text-white"></i>
                    </Link>
                    <button
                      className="ms-5 cursor-pointer"
                      onClick={() => {
                        handleLogout()
                      }}
                    >
                      <i className="fa-solid fa-right-from-bracket dark:text-white"></i>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      aria-current="page"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/signup"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
