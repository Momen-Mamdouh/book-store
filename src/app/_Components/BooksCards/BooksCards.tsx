import BookCard from "@/app/_Components/MicroComps/BookCard/BookCard";
import { IBook } from '@/app/_Interfaces/IBooks'


export default function BooksCards({Books}:{Books:IBook[]}){


    return(

        <div className=' cardsComp mt-16 grid gap-10 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                        items-center justify-evenly justify-items-center '>
            {Books.map((book)=> <BookCard key={book.id} book={book}/>)}
        </div>
    )
}