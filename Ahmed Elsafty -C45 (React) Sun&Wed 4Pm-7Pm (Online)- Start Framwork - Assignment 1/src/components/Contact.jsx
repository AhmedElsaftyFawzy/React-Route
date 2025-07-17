import { useEffect } from "react"

export const Contact = () => {
  useEffect(() => {
    document.title = `Contact`
    return () => {
      document.title = "Contact"
    }
  }, [])
  return (
    <div className="contact d-flex flex-column justify-content-center min-vh-100 text-center mt-5">
      <h2>conatct section</h2>
      <div>
        <span></span>
        <i className="fa-solid fa-star"></i>
        <span></span>
      </div>

      <form className="d-flex flex-column justify-content-around mt-5 gap-5 mx-auto w-50 pt-5">
        <input
          type="text"
          placeholder="userName"
          name="userName"
          id="userName"
          className="form-control"
        />
        <input
          type="text"
          placeholder="useAge"
          name="userAge"
          id="userAge"
          className="form-control"
        />
        <input
          type="email"
          placeholder="userEmail"
          name="userEmail"
          id="userEmail"
          className="form-control"
        />
        <input
          type="password"
          placeholder="userPassword"
          name="userPassword"
          id="userPassword"
          className="form-control"
        />
        <button className="btn align-self-start">Send Message</button>
      </form>
    </div>
  )
}
