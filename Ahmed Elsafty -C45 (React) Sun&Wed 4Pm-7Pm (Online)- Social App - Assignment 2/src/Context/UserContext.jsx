import axios from "axios"
import { createContext, useState } from "react"

export const UserContext = createContext()
export function UserProvider(props) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function getUserData() {
    await axios
      .get("https://linked-posts.routemisr.com/users/profile-data", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setUser(response.data.user)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
  return (
    <UserContext.Provider
      value={{ user, setUser, getUserData, loading, setLoading }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
