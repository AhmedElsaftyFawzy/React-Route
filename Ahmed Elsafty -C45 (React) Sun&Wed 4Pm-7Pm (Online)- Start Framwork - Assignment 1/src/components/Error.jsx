import { useEffect } from "react"

export const Error = () => {
  useEffect(() => {
    document.title = `404`
    return () => {
      document.title = "404"
    }
  }, [])
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 ">
      <h2>NOT FOUND WORK</h2>
    </div>
  )
}
