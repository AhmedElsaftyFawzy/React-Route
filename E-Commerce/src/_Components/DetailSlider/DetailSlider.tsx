"use client"
import Image from "next/image"
import Slider from "react-slick"

export default function DetailSlider({ images }: { images: string[] }) {
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images?.map((image, index) => {
          return (
            <div key={image}>
              <Image
                src={image}
                alt={`slider-image-${index}`}
                width={100}
                height={100}
                className="w-full h-96 object-contain"
                priority={true}
              ></Image>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}
