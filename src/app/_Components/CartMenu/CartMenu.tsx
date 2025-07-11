'use client';


import Link from 'next/link';

import { IconButton, Badge, Menu, MenuItem, Typography, Box, Divider, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { IBookItem } from '@/app/_Interfaces/IAddedBookData'; 

import MainButton from '@/app/_Components/MicroComps/MainButton/MainButton';
import DecreaseQuantityBtn from '@/app/_Components/Buttons/DecreaseQuantityBtn/DecreaseQuantityBtn';
import IncreaseQuantityBtn from '@/app/_Components/Buttons/IncreaseQuantityBtn/IncreaseQuantityBtn';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/reduxStore';
import DeleteItemBtn from '@/app/_Components/Buttons/DeleteItemBtn/DeleteItemBtn';
import ClearAllItemsBtn from '@/app/_Components/Buttons/ClearAllItemsBtn/ClearAllItemsBtn';
import CheckOutBtn from '@/app/_Components/Buttons/CheckOutBtn/CheckOutBtn';
import useMenuAnchor from '@/app/hooks/useMenuAnchor';


export default function CartMenu({ cartItems }: {cartItems:IBookItem[]}) {

  const user_id = useSelector((state:RootState)=> state.userStore.user_id);
  const { anchorEl, openMenu, closeMenu, isOpen } = useMenuAnchor();
  const fallbackImg:string = 'https://picsum.photos/800';

  const cartItemsToCheckOut = cartItems.map((item)=> (  { book_id:item.id,
                                                          bookOrder:{
                                                            book_id:item.id,
                                                            user_id,
                                                            book_title:item.title,
                                                            book_img:item.img || fallbackImg,
                                                            book_price:item.price,
                                                            book_count:item.quantity,
                                                            }
                                                          }))


  return (
    <>

      <IconButton color="inherit" onClick={openMenu}>
         <Badge badgeContent={user_id === ''  ? '?' : cartItems.length} showZero={true} color="warning">
                <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper:{
            sx: {
            width: 400,
            maxHeight: 400,
            overflowY: 'auto',
            mt: 1,
            p: 1,
            borderRadius: 2,
          },
          }
          
        }}
      >
        <Stack direction={'row'} sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <Typography variant="subtitle1" sx={{ px: 2, py: 1 }}>
              Cart Items
          </Typography>

          {user_id && cartItems.length !== 0 && <ClearAllItemsBtn user_id={user_id} inWhichComp={'cart'} />}

        </Stack>

        <Divider />

            {cartItems.length === 0 ? (
            <MenuItem disabled>
                <Typography variant="body2" color="text.secondary">Your cart is empty.</Typography>
            </MenuItem>
            ) : (cartItems.map((item) => (
                    
                <MenuItem key={item.id} onClick={closeMenu} sx={{ alignItems: 'flex-start' }}>
                        <Box display="flex" gap={1} width="100%">
                        <Box component="img" src={item.img || fallbackImg} alt={item.title}  className={'w-[25%] '}
                            sx={{
                            objectFit: 'cover',
                            borderRadius: 2,
                            }}
                        />
                      <Box flexGrow={1}>

                            <Typography variant="subtitle2" noWrap>
                              {item.title.split(" ").slice(0, 4).join(" ")}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                              Qty: {item.quantity} • E£ {item.price.toFixed(2)}
                            </Typography>

                            <Stack direction='row'  sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                    <DecreaseQuantityBtn item={{
                                                                  book_id:item.id,
                                                                  bookOrder:{
                                                                    book_id:item.id,
                                                                    user_id,
                                                                    book_title:item.title,
                                                                    book_img:item.img || fallbackImg,
                                                                    book_price:item.price,
                                                                    book_count:item.quantity,
                                                                  }
                                                                }
                                                              } />
                                    <IncreaseQuantityBtn item={{
                                                                  book_id:item.id,
                                                                  bookOrder:{
                                                                    book_id:item.id,
                                                                    user_id,
                                                                    book_title:item.title,
                                                                    book_img:item.img || fallbackImg,
                                                                    book_price:item.price,
                                                                    book_count:item.quantity,
                                                                  }
                                                                }} />
                                </Box>

                                <Box display={'flex'} gap={'1rem'} alignItems={'center'} justifyContent={'center'}>
                                  {
                                      cartItems.length !== 0 && 
                                      <Box >
                                        <CheckOutBtn btnTitle='' customWidth={'100%'} isDisabled={false} btnIconColor='gold' customizedBtnStyles='btnInfo' cartCheckOut={[{
                                                                    book_id:item.id,
                                                                    bookOrder:{
                                                                      book_id:item.id,
                                                                      user_id,
                                                                      book_title:item.title,
                                                                      book_img:item.img || fallbackImg,
                                                                      book_price:item.price,
                                                                      book_count:item.quantity,
                                                                    }
                                                                  }]}  />   
                                      </Box>
                                    }

                                  { user_id && <DeleteItemBtn book_id={item.id} user_id={user_id} inWhichComp={'cart'} /> }
                                </Box>

                            </Stack>
                      </Box>
                    </Box>
                </MenuItem>
            ))

        )}
        
        <Divider sx={{ mt: 1 }} />
        <MenuItem onClick={closeMenu} sx={{ justifyContent: 'center' }}>
            <Stack sx={{display:'flex', alignItems:'center', justifyContent:'space-around',gap:'1rem', margin:0}} direction='row'>
            
                {cartItems.length !== 0 && <CheckOutBtn btnTitle='Check Out' isDisabled={false} btnIconColor='gold' customizedBtnStyles='btnInfo' cartCheckOut={cartItemsToCheckOut} customWidth={'100%'}  />}
                <Link href={'/cart'}>
                    <MainButton btnTitle='To Cart' icon={<ShoppingCartIcon />} isDisabled={false} customizedBtnStyles='btnYellow' customWidth={'100%'} />
                </Link>
            </Stack>
        </MenuItem>
      </Menu>
    </>
  );
}
