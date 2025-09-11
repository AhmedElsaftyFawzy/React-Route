import React from "react"

export default function PageLoading() {
  return (
    <div className="fixed inset-0 bg-gray-500 flex justify-center items-center z-40">
      <span className="loader"></span>
    </div>
  )
}
