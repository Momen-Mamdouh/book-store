'use client';


import Link from 'next/link';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/reduxStore';

import { IconButton, Badge, Menu, MenuItem, Typography, Box, Divider, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import MainButton from '@/app/_Components/MicroComps/MainButton/MainButton';
import CartBtn from '@/app/_Components/Buttons/CartBtn/CartBtn';
import DeleteItemBtn from '@/app/_Components/Buttons/DeleteItemBtn/DeleteItemBtn';
import {  IBookData } from '@/app/_Interfaces/IAddedBookData'; 
import ClearAllItemsBtn from '@/app/_Components/Buttons/ClearAllItemsBtn/ClearAllItemsBtn';
import useMenuAnchor from '@/app/hooks/useMenuAnchor';


export default function WishListMenu({ wishListItems }: {wishListItems:IBookData[]}) {

    const user_id = useSelector((state: RootState) => state.userStore.user_id);
    const { anchorEl, openMenu, closeMenu, isOpen } = useMenuAnchor();
    

  return (
    <>

      <IconButton color="inherit" onClick={openMenu}>
         <Badge  badgeContent={ user_id === '' ? '?' : wishListItems.length} showZero={true} color="warning">
            <FavoriteIcon />
        </Badge>
      </IconButton>

      <Menu anchorEl={anchorEl} open={isOpen} onClose={closeMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              width: 400,
              maxHeight: 400,
              overflowY: 'auto',
              mt: 1,
              p: 1,
              borderRadius: 2,
            },
          },
        }}
      >
        <Stack direction={'row'} sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          
            <Typography variant="subtitle1" sx={{ px: 2, py: 1 }}>
                WishList 
            </Typography>

            {user_id && wishListItems.length !== 0 && <ClearAllItemsBtn user_id={user_id} inWhichComp={'wishlist'} />}
          </Stack>

        <Divider />

            {wishListItems.length === 0 ? (
            <MenuItem disabled>
                <Typography variant="body2" color="text.secondary">Your cart is empty.</Typography>
            </MenuItem>
            ) : (wishListItems.map((item) => (
                    <MenuItem key={item.book_id} onClick={closeMenu} sx={{ alignItems: 'flex-start', gap:'1rem', padding:'1rem' }}>
                        <Box display="flex" gap={1} width="100%">
                          <Box component="img" src={item.book_img} alt={item.book_title} className={'w-[25%] '}
                              sx={{
                                objectFit: 'cover',
                                borderRadius: 2,
                              }}
                          />

                    <Box flexGrow={1}>

                        <Stack  gap={'1rem'} justifyContent={'space-between'} sx={{marginLeft:'0.5rem'}}>
                            <Typography variant="subtitle1" >
                              {item.book_title}
                            </Typography>

                            <Typography variant="subtitle2"  className={'bg-yellow-400 p-1 rounded-xl w-min'}>
                              {item.book_price} EGP
                            </Typography>
                          </Stack>

                          <Stack sx={{display:'flex', alignItems:'center', gap:'2rem', justifyContent:'center', marginTop:'1rem', width:'50%'}} direction='row'>
                              <CartBtn btnType={'button'} btnTitle={''}
                                    customizedBtnStyles={'btnYellow'} customWidth={'auto'} 
                                    isDisabled={false}  btnIconColor={"gold"} cartPayLoad={{
                                        book_id: item.book_id,
                                        bookOrder: {
                                            book_id: item.book_id,
                                            user_id,
                                            book_title: item.book_title,
                                            book_img: item.book_img ,
                                            book_price: item.book_price,
                                            book_count: item.book_count,
                                            
                                        },
                                        fromWishList:true,
                                    }} />

                              { user_id && <DeleteItemBtn book_id={item.book_id} user_id={user_id} inWhichComp={'wishlist'} /> }

                                  
                          </Stack>
                    </Box>
                    </Box>
                </MenuItem>
            ))

        )}
        
        <Divider sx={{ mt: 1 }} />
        <MenuItem onClick={closeMenu} sx={{display:'flex', justifyContent: 'center', alignItems:'center', width:'100%'}}>
            <Stack sx={{display:'flex', alignItems:'center', justifyContent:'center', margin:0, width:'100%'}} direction='row'>
                <Link href={'/cart'}>
                    <MainButton btnTitle='Go To Cart' isDisabled={false} customizedBtnStyles='btnWishlist'  />
                </Link>
            </Stack>
        </MenuItem>
      </Menu>
    </>
  );
}
