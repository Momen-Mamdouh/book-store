
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";

import WishListBtn from "@/app/_Components/Buttons/WishListBtn/WishListBtn";
import CartBtn from "@/app/_Components/Buttons/CartBtn/CartBtn";
import TitleAndDataComp from "@/app/_Components/MicroComps/TitleAndDataComp/TitleAndDataComp";
import BookDetailsTabs from "@/app/_Components/BookDetailsComps/BookDetailsTabs/BookDetailsTabs";
import { IBookDetails } from "@/app/_Interfaces/IBookDetails";
import BooksResponseLoader from "@/app/_Components/Loaders/BooksResponseLoader/BooksResponseLoader";
import bookDataExtractor from "@/utils/BookHelpers/bookDataExtractor";




export default  function BookDetailsData({book, user_id}:{book:IBookDetails, user_id: string}){
    // ^^3rd BookDetails get bookData and userId to can give bookData modified to shop cart comp when i click in cartBtn and also execute addToCart Logic
    // ^^Add to cart logic hadnles addignto redux and DB on each user_id

    const {  book_img, book_title, bookAuthors, book_price, bookCurrencyCode, 
            bookStockKeepingUnit, bookCategories, bookIsSaleable, bookTabs, bookToDB } = bookDataExtractor(book, user_id);
    
    return(

        <>
            {!book && <BooksResponseLoader />}
         {book && (
            <Box sx={{ py: 4 }}>
                <Container sx={{ display: 'flex', flexDirection: 'column',  rowGap: '5rem', }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'flex-start' },
                    justifyContent: 'center', gap: { xs: 4, md: 8 },}} >

                    {/* Book Image */}
                    <Box sx={{ width: { xs: '70%', sm: '60%', md: '30%' }, mx: 'auto',}}>
                        <Avatar className="book_imgAvatar" variant="rounded" src={book_img} alt={book_title}
                            sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
                            slotProps={ {img:{ loading: 'eager', style: { width: '100%', height: 'auto' } }} }
                        />
                    </Box>

                    {/* Book Info */}
                    <Box  sx={{ width: { xs: '100%', md: '65%' }, display:{xs:'flex'}, flexDirection:{xs:'column'},  
                                alignItems:{xs:'center', lg:'flex-start'}    ,pl: { xs: 0, md: 4 }, pt: { xs: 2, md: 2 },}}>

                        <Typography variant="h4" component="h1" className="book_title">
                            {book_title}
                        </Typography>

                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={'4rem'}>

                            <Typography variant="h6"  className="bookAuthors">
                                {bookAuthors}
                            </Typography>

                            <Typography variant="body1" component="span"
                                className="book_price bg-yellow-500 text-white main_fontSize p-2 rounded-xl"
                                sx={{ display: 'inline-block', my: 4 }}>
                                {bookIsSaleable ? `${book_price} ${bookCurrencyCode}` : 'Not for sale'}
                            </Typography>

                        </Stack>

                    <Stack className="bookBtnsStack" direction={{ xs: 'column', sm: 'row' }} spacing={5}
                        sx={{ alignItems: { xs: 'center', sm: 'flex-start' }, mb: 3 }}>

                        <WishListBtn
                            btnType="button"
                            btnTitle="Add to Wishlist"
                            customizedBtnStyles="btnWishlist"
                            customWidth="auto"
                            isDisabled={false}
                            btnIconColor="lightpink"
                            cartPayLoad={bookToDB}
                        />

                        <CartBtn
                            btnType="button"
                            btnTitle="Add to Cart"
                            customizedBtnStyles="btnYellow"
                            customWidth="auto"
                            isDisabled={false}
                            btnIconColor="gold"
                            cartPayLoad={bookToDB}
                        />

                    </Stack>

                    <Stack className="bookInfoStack main-border-top pt-5" spacing={2} sx={{ mt: '2rem' }}>

                        <Typography variant="body1" component="span" className="bookStockKeepingUnit main_fontSize" 
                                    sx={{ display: 'inline-block' }}>

                            <TitleAndDataComp dataTitle="SKU" data={bookStockKeepingUnit}  />
                            
                        </Typography>

                        <Typography variant="body1" component="span" className="main_fontSize" sx={{ display: 'inline-block' }}>

                            <TitleAndDataComp dataTitle="Categories" data={bookCategories} />

                        </Typography>
                        
                    </Stack>
                    </Box>
                </Box>

                <BookDetailsTabs bookTabs={bookTabs} />
                </Container>
            </Box>
        )}

            
        </>

    )
}


