import { Box, Tooltip } from "@mui/material";
import SourceIcon from '@mui/icons-material/Source';
import Link from "next/link";
import CartBtn from "@/app/_Components/Buttons/CartBtn/CartBtn";
import { IBook } from "@/app/_Interfaces/IBooks";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/reduxStore";
import WishListBtn from "@/app/_Components/Buttons/WishListBtn/WishListBtn";


export default function CardPaymentColIcons({book}:{book:IBook}){

    const {user:userData} = useSelector((state:RootState)=> state.userStore);
    const fallbackImg:string = 'https://picsum.photos/400';
    const bookId = book?.id;
    const bookImg = book.volumeInfo.imageLinks?.thumbnail?.replace('zoom=1', 'zoom=4').replace('http://', 'https://') || fallbackImg;

    return (

        <>
            <Box className="cardPaymentCol flex items-center gap-1 flex-col content-center bg-slate-200/50 rounded-xl p-2 translate-x-[250%] group-hover:translate-x-[140%] duration-500 delay-400">

                    <Link href={`/books/${bookId}`}> <Tooltip title={`To Book Details}`}><SourceIcon fontSize={'large'} color="success" sx={{marginY:'1rem'}} /></Tooltip> </Link>

                    <CartBtn    btnType={'button'} btnTitle={''} customizedBtnStyles={'btnYellow'} customWidth={'auto'} 
                                isDisabled={false}  btnIconColor={"gold"} 
                                cartPayLoad={{      book_id:book.id,
                                                    bookOrder: {
                                                        book_id:book.id,
                                                        user_id:userData?.id,
                                                        book_title:book.volumeInfo.title,
                                                        book_img:bookImg,
                                                        book_price: book?.saleInfo?.listPrice?.amount ?? '500',
                                                        book_count:1,

                                                    },
                                                    fromWishList:false,}} /> 
           

                     <WishListBtn   btnType={'button'} btnTitle={''} customizedBtnStyles={'btnWishlist'} 
                                    customWidth={'auto'} isDisabled={false}  btnIconColor={"gold"} 
                                    cartPayLoad={ { book_id:bookId,
                                                    bookOrder: {
                                                        book_id:bookId,
                                                        user_id:userData?.id,
                                                        book_title:book.volumeInfo.title,
                                                        book_img:bookImg,
                                                        book_price: book?.saleInfo?.listPrice?.amount ?? '500',
                                                        book_count:1,

                                                    },
                                                    fromWishList:true,}} /> 
                  
            </Box>
        </>

    )
}