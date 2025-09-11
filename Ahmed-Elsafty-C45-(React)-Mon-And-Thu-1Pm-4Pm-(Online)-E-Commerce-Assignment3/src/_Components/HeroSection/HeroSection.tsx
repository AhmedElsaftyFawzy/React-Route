import React from "react"
import MainSlider from "../MainSlider/MainSlider"
import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="m-5 grid grid-cols-12">
      <div className="col-span-9">
        <MainSlider />
      </div>
      <div className="col-span-3">
        <Image
          src="/slider-image-1.jpeg"
          alt="slider-image-1"
          width={100}
          height={100}
          className="w-full h-48"
        ></Image>
        <Image
          src="/slider-image-2.jpeg"
          alt="slider-image-2"
          width={100}
          height={100}
          className="w-full h-48"
        ></Image>
      </div>
    </div>
  )
}
