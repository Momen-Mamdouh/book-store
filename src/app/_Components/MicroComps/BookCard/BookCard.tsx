
import styles from './BookCard.module.css'
import { IBook } from '@/app/_Interfaces/IBooks'
import CardPaymentColIcons from "@/app/_Components/MicroComps/CardPaymentColIcons/CardPaymentColIcons";
import { getSaleInfo } from '@/utils/BookHelpers/bookInfoHelper';

export default function BookCard({book}:{book:IBook}){
    
    const fallbackImg:string = 'https://picsum.photos/400';
    const bgImage = book.volumeInfo.imageLinks?.thumbnail?.replace('zoom=1', 'zoom=4').replace('http://', 'https://') || fallbackImg;
    const bookTitle = book?.volumeInfo?.title.split(" ").slice(0, 4).join(" ");
    const bookIsSaleable = getSaleInfo(book);
    const book_price = book?.saleInfo?.listPrice?.amount ?? '500';
    const bookCurrencyCode = book?.saleInfo?.listPrice?.currencyCode ?? 'EGP';

    return(
        <>
    
            <div className={`${styles.book} group flex flex-col justify-start items-end font-jim overflow-hidden`}
                     style={{ backgroundImage: `url(${bgImage})` }}>
                        <CardPaymentColIcons book={book}/>

                <div className={`${styles.cover} flex flex-col items-center`}>
                    <h3 className='text-xl px-12 text-center book_title'>{bookTitle}</h3>
                    <p className='text-xl px-12 text-center mt-16 bookAuthor'>{book?.volumeInfo?.authors?.[0]}</p>
                    <p className='text-xl px-12 text-center  bookAuthor'>{book?.volumeInfo?.publishedDate?.split("-").slice(0, 1).join("")}</p>
                    <p className='text-2xl text-center main_fontSize p-4 rounded-full  bookPrice'>{bookIsSaleable ? `${book_price}  ${bookCurrencyCode}` : 'Not for sale'}</p>

                </div>
            </div>

        </>
    )
}