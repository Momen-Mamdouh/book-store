'use client'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/reduxStore';

import BooksSubjectInput from '@/app/_Components/MicroComps/BooksSubjectInput/BooksSubjectInput';
import SearchInput from '@/app/_Components/MicroComps/SearchInput/SearchInput';
import BooksCards from '@/app/_Components/BooksCards/BooksCards'
import PaginationOutlined from '@/app/_Components/MicroComps/Pagination/Pagination';
import NoSearchForBooksGIF from '@/app/_Components/Loaders/NoSearchForBooksGIF/NoSearchForBooksGIF';



import BooksResponseLoader from '@/app/_Components/Loaders/BooksResponseLoader/BooksResponseLoader';
import { useGoogleGetVolumes } from '@/lib/hooks/useGoogleGetVolumes';
import { setSearchedBooks } from '@/lib/redux/BooksSlice/BooksSlice';
import ErrorResponseComp from '@/app/_Components/ErrorResponseComp/ErrorResponseComp';




export default function SearchSection(){

    const maxResults:number = 20;
    const dispatch = useDispatch();

    const { userBookSearchTerm, userCurrentSearch, booksFromSearch } = useSelector((state:RootState)=> state.bookStore);
    const { books, isLoading, totalItems, error:fetchingError } =  useGoogleGetVolumes(userBookSearchTerm, maxResults);

        //^^ Sync the display books when new results come in
        useEffect(() => {
            if (!isLoading && userBookSearchTerm && books) {
                dispatch(setSearchedBooks(books));
            }
        }, [books, isLoading, userBookSearchTerm, userCurrentSearch, dispatch]);
   
     
       
    return(

        <div className={`SearchSection sectionClasses`}>
      
            <BooksSubjectInput />
            <SearchInput />
        
            {isLoading && userBookSearchTerm !== '' && <BooksResponseLoader />}
            { userCurrentSearch === ''   && <NoSearchForBooksGIF />}
            { userCurrentSearch !== '' &&  booksFromSearch.length <= 0 &&  <ErrorResponseComp   error={fetchingError?.message || 'Not valid Search Term'} />}
            {!isLoading &&  booksFromSearch.length > 0 && <BooksCards Books={booksFromSearch} />}
            {!isLoading &&  booksFromSearch.length > 0 && <PaginationOutlined pagesCount={Math.floor(totalItems/maxResults)} />}
        </div>
    )


}