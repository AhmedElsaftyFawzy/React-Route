"use client"
import Image from "next/image"
import Slider from "react-slick"

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <Image
            src="/slider-image-1.jpeg"
            alt="slider-image-1"
            width={1000}
            height={1000}
            className="w-full h-96 object-cover"
          ></Image>
        </div>
        <div>
          <Image
            src="/slider-image-2.jpeg"
            alt="slider-image-2"
            width={1000}
            height={1000}
            className="w-full h-96 object-cover "
          ></Image>
        </div>
        <div>
          <Image
            src="/slider-image-3.jpeg"
            alt="slider-image-3"
            width={1000}
            height={1000}
            className="w-full h-96 object-cover"
          ></Image>
        </div>
      </Slider>
    </div>
  )
}
