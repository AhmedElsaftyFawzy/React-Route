export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row p-5 text-white">
          <div className="col-12 col-lg-4 text-center">
            <h3>LOCATION</h3>
            <p>2215 John Daniel Drive</p>
            <p>Clark, MO 65243</p>
          </div>
          <div className="col-12 col-lg-4 text-center">
            <h3>AROUND THE WEB</h3>
            <div className="icons">
              <i className="fa-brands fa-facebook mx-1 icon" />
              <i className="fa-brands fa-twitter mx-1 icon" />
              <i className="fa-brands fa-linkedin-in mx-1 icon" />
              <i className="fa-solid fa-globe mx-1 icon" />
            </div>
          </div>
          <div className="col-12 col-lg-4 text-center">
            <h3>ABOUT FREELANCER</h3>
            <p>
              Freelance is a free to use, licensed Bootstrap theme created by
              Route
            </p>
          </div>
        </div>
      </div>
      <div className="secondFooter text-center p-4">
        <p className="text-white">Copyright © Your Website 2021</p>
      </div>
    </footer>
  )
}
