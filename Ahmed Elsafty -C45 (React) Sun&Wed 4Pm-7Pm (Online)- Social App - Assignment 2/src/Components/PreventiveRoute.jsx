import { Navigate } from "react-router-dom"

export const PreventiveRoute = (props) => {
  if (!localStorage.getItem("token")) {
    return props.children
  } else {
    return <Navigate to={"/"}></Navigate>
  }
}
