'use client'
import { useEffect, useState } from 'react'
import styles from './HomeSliderContent.module.css'
import { IBook } from '@/app/_Interfaces/IBooks'
import BasicRating from '@/app/_Components/MicroComps/BasicRating/BasicRating'
import MainButton from '@/app/_Components/MicroComps/MainButton/MainButton'
import Link from 'next/link'


export default function SlideContent({ book, isActive }: { book: IBook, isActive:boolean}) {
  const book_id = book?.id;
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isActive) {
      setAnimate(false)
      requestAnimationFrame(() => {
        setAnimate(true)
      })
    }
  }, [isActive])

  const bgImage = book.volumeInfo.imageLinks?.thumbnail?.replace('zoom=1', 'zoom=4').replace('http://', 'https://')
  const ratingNumber = book.volumeInfo?.averageRating === undefined ? 3 : book.volumeInfo?.averageRating;
  const authors = book.volumeInfo?.authors?.join(', ') === undefined ? 'Not Provided' : book.volumeInfo?.authors?.join(', ');

  return (
    <div
      className={`relative h-[80vh] w-full bg-cover bg-center rounded-xl shadow-md transition-all duration-500 ease-in-out ${
        animate ? styles.fadeIn : ''
      }`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
        <div className="childOfSlide grid grid-cols-12 h-full relative">
           

            <div className={`bookImage h-[80vh] w-[80wh] absolute left-3/4 -mx-4 md:mx-0 -translate-x-full top-0 rounded-xl  z-10 ${ animate ?styles.book_imgSlideInRight: ''}`}>
                <img className='h-full w-full object-contain drop-shadow-xl rounded-xl' src={bgImage} alt="book thumbnail"  />
            </div>

             <div className={`mainBookInfo  ${ animate ?styles.slideInRight: ''} bg-slate-200/75 w-[175%] rounded-xl flex flex-col justify-center items-center p-5  col-start-8 col-span-7 `}>
                <div className="bookInfo">
                    <h3 className="text-[1rem] md:text-[2rem] font-semibold">{book.volumeInfo?.title}</h3>
                    <p className="text-lg md:text-xl self-end mb-5">Authors: {authors}</p>
                    <p className="text-lg md:text-xl self-end">Publisher{book.volumeInfo?.publisher}, PublisherDate: {book.volumeInfo?.publishedDate} </p>
                    <div className="text-lg md:text-xl self-end"><BasicRating ratingNumber={ratingNumber} /></div>
                    <Link href={`/books/${book_id}`}>
                      <MainButton btnTitle={'View More'} customWidth={'50%'} isDisabled={false} customizedBtnStyles={'btnYellow'} />
                    </Link>
                </div>
            </div>
        </div>
        

    </div>
  )
}
