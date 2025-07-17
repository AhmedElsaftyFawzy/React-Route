import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Home } from "./components/Home"
import { About } from "./components/About"
import { Portfolio } from "./components/Portfolio"
import { Contact } from "./components/Contact"
import { Error } from "./components/Error"

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          index: true,
          element: <Home></Home>,
        },
        {
          path: "/about",
          element: <About></About>,
        },
        {
          path: "/portfolio",
          element: <Portfolio></Portfolio>,
        },
        {
          path: "/contact",
          element: <Contact></Contact>,
        },
        {
          path: "*",
          element: <Error></Error>,
        },
      ],
    },
  ])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
