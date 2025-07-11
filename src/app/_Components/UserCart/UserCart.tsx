'use client'

import Link from 'next/link'
import {  useSelector } from 'react-redux'
import {  RootState } from '@/lib/redux/reduxStore'

import { Box, Container, Typography, Card, CardContent, CardMedia, Stack, } from '@mui/material'

import MainButton from '@/app/_Components/MicroComps/MainButton/MainButton'
import CheckOutBtn from '@/app/_Components/Buttons/CheckOutBtn/CheckOutBtn'
import DecreaseQuantityBtn from '@/app/_Components/Buttons/DecreaseQuantityBtn/DecreaseQuantityBtn'
import IncreaseQuantityBtn from '@/app/_Components/Buttons/IncreaseQuantityBtn/IncreaseQuantityBtn'
import DeleteItemBtn from '@/app/_Components/Buttons/DeleteItemBtn/DeleteItemBtn'
import ClearAllItemsBtn from '@/app/_Components/Buttons/ClearAllItemsBtn/ClearAllItemsBtn'
import Grid from '@mui/material/Grid';
import BooksResponseLoader from '@/app/_Components/Loaders/BooksResponseLoader/BooksResponseLoader'


export default function UserCart() {
    const user_id = useSelector((state:RootState)=> state.userStore.user?.id);
    const {cartItems, isLoading:cartItemsLoading} = useSelector((state: RootState) => state.cartStore);
    const cartTotalPrice = cartItems.reduce((acc, item) => acc + (item.bookOrder.book_price * item.bookOrder.book_count), 0);  
    const fallbackImg:string = 'https://picsum.photos/400';

  return (

    <>
      {(cartItems.length < 0 || cartItemsLoading) && <BooksResponseLoader />}
    
         <Container maxWidth="xl" sx={{ py: 4 }}>

            <Stack direction={'row'} sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:'3rem', mb:2 }} className='headingStack'>

              <Typography variant="h4" align="center" gutterBottom>
                {cartItems.length !== 0?  'Shopping Cart' : 'Your Cart is Empty 🛒'}
              </Typography>

              {user_id && cartItems.length !== 0 && <ClearAllItemsBtn user_id={user_id} inWhichComp={'cart'} />}
            </Stack>

 
                <>
                    <Grid container spacing={3} sx={{justifyContent:"center", alignItems:'center'}}>
                      {cartItems.map((item) => (
                        <Grid size={{ xs: 12, sm: 12, md:6, lg:4, xl:3 }}  key={item.book_id}>
                          <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Card className="bg-white shadow-[0_0_20px_#aaa] rounded-[10px] overflow-hidden 
                                              transition-all duration-300 relative"
                                sx={{ width: 300, height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 1,
                                  position: 'relative',
                                }}
                            >

                              <Box sx={{ position: 'absolute', top: '10px', right: '10px', fontSize: '28px', color: '#999',}}>
                                  {user_id && (
                                        <Box>
                                            <DeleteItemBtn book_id={item.book_id} user_id={user_id} inWhichComp="cart" />
                                        </Box>
                                      )}
                              </Box>


                          
                              <CardMedia component="img" image={item.bookOrder.book_img ||  fallbackImg}
                                alt={item.bookOrder.book_title}
                                sx={{ width: '100%', height: '65%', objectFit: 'cover', border: '2px solid gray', borderRadius: '5px',}}/>


                                  <CardContent sx={{ padding: '0.8rem', textAlign: 'center' }}>
                                    <Typography
                                      className="title"
                                      sx={{ fontSize: '1.2rem', fontWeight: 600, mb: 1 }}
                                    >
                                      {item.bookOrder.book_title.split(" ").slice(0, 4).join(" ")}
                                    </Typography>

                                    <Typography sx={{ fontSize: '14px', color: 'gray' }}>
                                      E£ {item.bookOrder.book_price.toFixed(2)}
                                    </Typography>
                                  </CardContent>


                                  <Box className="buttons-area" sx={{ width: '100%', mt: 'auto', display: 'flex', gap: 1,
                                          alignItems: 'flex-start', justifyContent:'space-around'}}>

                          
                                        <Box display="flex"  alignItems="center" gap={1}>
                                          <DecreaseQuantityBtn item={item} />
                                          <Typography>{item.bookOrder.book_count}</Typography>
                                          <IncreaseQuantityBtn item={item} />
                                        </Box>

                
                                        <Box width="25%">
                                          <CheckOutBtn  btnTitle="" customWidth="auto" isDisabled={false} btnIconColor="gold"
                                            customizedBtnStyles="btnInfo" cartCheckOut={[item]}/>
                                        </Box>

                          
                                      
                                  </Box>
                            </Card>
                            </Box>

                        </Grid>
                      ))}
                    </Grid>

                    <Box mt={4} textAlign="center">
                          <Typography variant="h6">Total: ${cartTotalPrice.toFixed(2)}</Typography>
                            {
                              cartItems.length !== 0 && 
                                  <Stack sx={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'2rem', gap:'1rem'}} direction='row'>

                                    <CheckOutBtn btnTitle='Check Out' isDisabled={false} btnIconColor='gold' customizedBtnStyles='btnInfo' cartCheckOut={cartItems}  />

                                    <Link href={'/shop'}>
                                        <MainButton btnTitle='Shopping' isDisabled={false} customizedBtnStyles='btnYellow'  />
                                      </Link>

                                  </Stack>
                            }

                            {
                              cartItems.length === 0 && 
                                  <Stack sx={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'2rem'}} direction='row'>
                                        <Link href={'/shop'}>
                                          <MainButton btnTitle='Shopping' isDisabled={false} customizedBtnStyles='btnYellow'  />
                                        </Link>
                                  </Stack>
                            }
            

                    </Box>
                </>   
            

            

          
          </Container> 
    </>
    
   
  )
}
