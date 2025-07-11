'use client'

import { useRef, useState } from 'react'

import { IBook } from '@/app/_Interfaces/IBooks'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import SlideContent from '@/app/_Components/Sliders/HomeSliderContent/HomeSliderContent'
import SwiperNavigationBtn from '@/app/_Components/MicroComps/SwiperNavigationBtn/SwiperNavigationBtn'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper as SwiperType } from 'swiper/types'





export default function SliderLogic ({books}:{books:IBook[]}){

    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

       return (

    <div className='homeSlider'

      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}

    >
        <Swiper
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onSwiper={(swiper) => swiperRef.current = swiper}
            modules={[Autoplay, Navigation]}
            navigation={{
                prevEl: '.swiper-prev',
                nextEl: '.swiper-next',
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            pagination={{ clickable: true }}
            spaceBetween={100}
            slidesPerView={1}
            >

                {books.map((book, index) => (
                    <SwiperSlide key={book.id}>
                        <SlideContent book={book} isActive={index === activeIndex} />
                    </SwiperSlide>
                ))}

                <div className="pointer-events-none absolute inset-0 z-40 flex justify-between items-center px-4">
                        <SwiperNavigationBtn btn={'swiper-prev'} btnSize={{xs:'1rem', md:'2rem'}} />
                        <SwiperNavigationBtn btn={'swiper-next'} btnSize={{xs:'1rem', md:'2rem'}} />
                </div>
        </Swiper>

    </div>
  )
}