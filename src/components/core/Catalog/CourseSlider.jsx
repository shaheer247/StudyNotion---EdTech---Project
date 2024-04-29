import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination, Autoplay,Navigation } from "swiper/modules"
import CourseCard from './CourseCard'

const CourseSlider = ({Courses}) => {
  return (
    <>
      {Courses?.length ? (<>
        <Swiper
          slidesPerView={3}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          modules={[FreeMode, Pagination, Autoplay,Navigation]}
          autoplay={{
            delay: 200,
            disableOnInteraction: false,
          }}
          navigation={true}
          className="w-full hidden sm:block"
          >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full block sm:hidden"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
          </>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider