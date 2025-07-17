import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 70)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        scrolled ? " p-2" : "p-4"
      }`}
    >
      <div className="container">
        <NavLink className="navbar-brand" to={"/"}>
          Start Framework
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to={"/about"}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/portfolio"}>
                Portfolio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/contact"}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
