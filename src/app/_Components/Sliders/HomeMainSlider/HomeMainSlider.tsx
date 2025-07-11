'use client'

import ResponseLoader from '@/app/_Components/Loaders/responseLoader/ResponseLoader'
import SliderLogic from '@/app/_Components/Sliders/SliderLogic/SliderLogic';
import { useGoogleGetVolumes } from '@/lib/hooks/useGoogleGetVolumes';
import ErrorResponseComp from '@/app/_Components/ErrorResponseComp/ErrorResponseComp';
import { useDispatch, useSelector } from 'react-redux';
import { setHomeSwiperBooks } from '@/lib/redux/BooksSlice/BooksSlice';
import { RootState } from '@/lib/redux/reduxStore';
import { useEffect } from 'react';





export default  function HomeMainSlider({searchTerm, maxResults}:{searchTerm:string, maxResults:number}) {

  const dispatch = useDispatch();
  const { booksFromHomeSlider } = useSelector((bookState:RootState)=> bookState.bookStore)
  const { books, isLoading, error } =  useGoogleGetVolumes(searchTerm, maxResults);

    useEffect(()=>{
      if(books.length > 0 && booksFromHomeSlider.length === 0){
          dispatch(setHomeSwiperBooks(books))
      }
        

    }, [books,booksFromHomeSlider.length, dispatch]);



    if (isLoading && !error) {
      return <ResponseLoader />
    }else if (error){
      return <ErrorResponseComp   error={error?.message || "Can't fetch google books "} />
    }

    const sliderBooks = booksFromHomeSlider.length > 0 ? booksFromHomeSlider : books;



    return(
      <SliderLogic books={sliderBooks} />
    )
  
    
  
}
