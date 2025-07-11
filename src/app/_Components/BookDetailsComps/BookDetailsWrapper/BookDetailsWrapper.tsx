
'use client'
import BookDetailsData from "@/app/_Components/BookDetailsComps/BookDetails/BookDetails";
import { useGoogleSpecificBook } from "@/lib/hooks/useGoogleSpecificBook";
import { RootState } from "@/lib/redux/reduxStore";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import ResponseLoader from "@/app/_Components/Loaders/responseLoader/ResponseLoader";
import ErrorResponseComp from "@/app/_Components/ErrorResponseComp/ErrorResponseComp";

export default  function BookDetailsWrapper() {
    // ^^2nd BookDetailsWrapper get book_id from url and then useGoogleSpecificBook get this bookData to pass it to BookDetails
    // !!This comp is client to can get id from url and get user_id from reduxUserSlice

    const user_id = useSelector((state:RootState)=> state.userStore.user_id);
    const book_id:string = usePathname().split("/").at(-1)!;
    const { book, isLoading, error } =  useGoogleSpecificBook(book_id);

    return(

        <>

            {isLoading && !error && <ResponseLoader />}
            {error && <ErrorResponseComp   error={error?.message || "Can't fetch Google Book Details "} />}
            {!isLoading && !error && <BookDetailsData book={book!} user_id={user_id} />}

        </>
    )
}
