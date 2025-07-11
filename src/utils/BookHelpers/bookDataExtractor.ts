import { IBookDetails, IBookTab, IBookTabInfo } from "@/app/_Interfaces/IBookDetails";
import { getDownloadLink, getMaturityRating, getPdfMetadata, getSaleInfo } from "./bookInfoHelper";
import { IBookOrders } from "@/app/_Interfaces/IAddedBookData";




export default function bookDataExtractor(book:IBookDetails, user_id:string){
    const volumeInfo = book?.volumeInfo ?? {};
    const saleInfo = book?.saleInfo ?? {};
    const fallbackImg:string = 'https://picsum.photos/400';


        const book_img = volumeInfo.imageLinks?.thumbnail?.replace('zoom=1', 'zoom=4').replace('http://', 'https://') || fallbackImg; ;
        const book_title = volumeInfo.title;
        const bookAuthors = volumeInfo.authors?.join(", ");
        const bookPublisher = volumeInfo.publisher;
        const bookPublishingDate = volumeInfo.publishedDate;
        const bookLanguage = volumeInfo.language ?? "Unknown";
        const bookIsSaleable = getSaleInfo(book);
        const book_price = saleInfo.listPrice?.amount ?? '500';
        const bookCurrencyCode = saleInfo.listPrice?.currencyCode ?? 'EGP';
        const bookStockKeepingUnit = volumeInfo.industryIdentifiers?.[0]?.identifier ?? 'N/A';
        const bookCategories = volumeInfo.categories;
        const bookDescription = volumeInfo.description ?? 'Not Available';
        const bookPages = volumeInfo.pageCount ?? 'UnKnown';
        const bookPdf =  getPdfMetadata(book);
        const bookDownloadLink = getDownloadLink(book)
        const booKMaturityRating =  getMaturityRating(book?.volumeInfo?.maturityRating);
        
    
    
        const bookInfo:IBookTabInfo = {
                bookAuthors, bookPublisher, bookPublishingDate,bookLanguage,
                bookStockKeepingUnit, bookIsSaleable, bookPdf,bookPages, bookDownloadLink, booKMaturityRating};
    
        const bookTabs:IBookTab[] = [
            { tabLabel:"Description", tabValue:1,  tabData:bookDescription},
            { tabLabel:"Info", tabValue:2,  tabData:bookInfo},
        ]
    
    
        const bookToDB:IBookOrders = {
            book_id:book?.id,
            bookOrder:{
                book_id:book?.id,
                user_id,
                book_title,
                book_img,
                book_price,
                book_count:1,
            }
        }
     


     return { book_img, book_title, bookAuthors, book_price,  bookCurrencyCode, 
                bookStockKeepingUnit, bookCategories, bookIsSaleable, bookTabs, bookToDB,};
}