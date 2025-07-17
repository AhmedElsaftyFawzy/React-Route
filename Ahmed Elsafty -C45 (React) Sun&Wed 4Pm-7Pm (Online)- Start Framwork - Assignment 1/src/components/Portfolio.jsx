import { useEffect, useState } from "react"
import image1 from "../assets/poert1.png"
import image2 from "../assets/port2.png"
import image3 from "../assets/port3.png"

export const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  useEffect(() => {
    document.title = `Portfolio`
    return () => {
      document.title = "Portfolio"
    }
  }, [])
  const images = [image1, image2, image3, image1, image2, image3]
  return (
    <>
      <div className="portfolio d-flex flex-column justify-content-center min-vh-100 text-center">
        <h2>Portfolio</h2>
        <div>
          <span></span>
          <i className="fa-solid fa-star"></i>
          <span></span>
        </div>
        <div className="container">
          <div className="row g-5 my-4">
            {images.map((img, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div className="overflow-hidden rounded-4 position-relative">
                  <img src={img} alt={`portfolio-${i}`} className="w-100" />
                  <div
                    className="layer position-absolute w-100 h-100 top-0 start-0 d-flex justify-content-center align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#modal"
                    onClick={() => setSelectedImage(img)}
                  >
                    <i className="fa-solid fa-plus fa-6x text-white"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="modal fade bg-primary bg-opacity-25 modal-scrollable"
        id="modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <img src={selectedImage} alt="" />
        </div>
      </div>
    </>
  )
}
