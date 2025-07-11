import { IBook } from "@/app/_Interfaces/IBooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookState {
    userCurrentSearchKey:string,
    userBookSearchTerm:string,
    userCurrentSearch:string,
    homeCurrentPagination:number,
    booksFromSearch: IBook[],
    booksFromHomeSlider:IBook[],
}

const initialState:BookState = {
    userCurrentSearchKey:'',
    userCurrentSearch:'',
    userBookSearchTerm:'',
    homeCurrentPagination:1,
    booksFromSearch:[],
    booksFromHomeSlider:[],
 }
    


const bookStoreSlice = createSlice(
    {
        name: 'BooksSlice',
        initialState,
        reducers:{
          
            setBooksSearchKey(booksState, action: PayloadAction<string>) {
                booksState.userCurrentSearchKey = action.payload;
            },

            setBooksSearchTerm(booksState, action: PayloadAction<string>) {
                booksState.userBookSearchTerm = action.payload;
            },

            setUserCurrentSearch(booksState, action: PayloadAction<string>) {
                booksState.userCurrentSearch = action.payload;
            },

            setHomePaginationNumber(booksState, action: PayloadAction<number>) {
                booksState.homeCurrentPagination = action.payload;
            },

            setSearchedBooks(booksState, action: PayloadAction<IBook[]>) {
                booksState.booksFromSearch = action.payload;
            },

             setHomeSwiperBooks(booksState, action: PayloadAction<IBook[]>) {
                booksState.booksFromHomeSlider = action.payload;
            },
        }
    }
)


export const { setBooksSearchKey, setSearchedBooks, setBooksSearchTerm, setHomeSwiperBooks, setHomePaginationNumber, setUserCurrentSearch } = bookStoreSlice.actions;
export default bookStoreSlice.reducer;
