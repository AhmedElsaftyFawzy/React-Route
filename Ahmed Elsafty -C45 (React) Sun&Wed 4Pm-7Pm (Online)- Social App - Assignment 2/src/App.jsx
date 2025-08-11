import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from "./Components/Layout"
import { Home } from "./Pages/Home"
import { Login } from "./Pages/Login"
import { SingUp } from "./Pages/SingUp"
import { NotFound } from "./Pages/NotFound"
import { Toaster } from "react-hot-toast"
import PostDetails from "./Pages/PostDetails"
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import { UserProvider } from "./Context/UserContext"
import { Edit } from "./Pages/Edit"
import { ProtectedRoute } from "./Components/ProtectedRoute"
import { PreventiveRoute } from "./Components/PreventiveRoute"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

function App() {
  const queryClient = new QueryClient()
  const route = createBrowserRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          ),
        },
        {
          path: "/post/:id",
          element: (
            <ProtectedRoute>
              <PostDetails></PostDetails>
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <PreventiveRoute>
              <Login></Login>
            </PreventiveRoute>
          ),
        },
        {
          path: "/signup",
          element: (
            <PreventiveRoute>
              <SingUp></SingUp>
            </PreventiveRoute>
          ),
        },
        {
          path: "/edit",
          element: (
            <ProtectedRoute>
              <Edit></Edit>
            </ProtectedRoute>
          ),
        },
        ,
      ],
    },
    { path: "*", element: <NotFound></NotFound> },
  ])
  return (
    <>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={route}></RouterProvider>
          <Toaster></Toaster>
        </QueryClientProvider>
      </UserProvider>
    </>
  )
}

export default App
