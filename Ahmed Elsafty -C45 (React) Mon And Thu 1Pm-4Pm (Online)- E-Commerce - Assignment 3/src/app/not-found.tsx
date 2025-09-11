import React from "react"
import Image from "next/image"

export default function NotFound() {
  return (
    <Image
      src="/error.svg"
      alt="404 Image"
      width={1000}
      height={1000}
      className="w-full h-screen"
    />
  )
}
