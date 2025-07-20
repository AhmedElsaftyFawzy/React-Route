import { useEffect } from "react"
import avatar from "../assets/avataaars.svg"

export const Home = () => {
  useEffect(() => {
    document.title = `Home`
  }, [])
  return (
    <div className="home d-flex flex-column justify-content-center align-items-center min-vh-100">
      <img src={avatar} alt="" />
      <h2>start Framework</h2>
      <div>
        <span></span>
        <i className="fa-solid fa-star"></i>
        <span></span>
      </div>
      <p>Graphic Artist - Web Designer - Illustrator</p>
    </div>
  )
}
