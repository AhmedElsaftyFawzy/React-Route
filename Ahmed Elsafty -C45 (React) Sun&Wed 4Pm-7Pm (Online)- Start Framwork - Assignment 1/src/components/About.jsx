import { useEffect } from "react"

export const About = () => {
  useEffect(() => {
    document.title = `About`
  }, [])
  return (
    <div className="about d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h2>about component</h2>
      <div>
        <span></span>
        <i className="fa-solid fa-star"></i>
        <span></span>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <p>
              Freelancer is a free bootstrap theme created by Route. The
              download includes the complete source files including HTML, CSS,
              and JavaScript as well as optional SASS stylesheets for easy
              customization.
            </p>
          </div>
          <div className="col-12 col-lg-6">
            <p>
              Freelancer is a free bootstrap theme created by Route. The
              download includes the complete source files including HTML, CSS,
              and JavaScript as well as optional SASS stylesheets for easy
              customization.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
