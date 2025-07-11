'use client'

import MainButton from '@/app/_Components/MicroComps/MainButton/MainButton';
import { IMainBtn } from '@/app/_Interfaces/IButtons';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/reduxStore';
import { IBookOrders } from '@/app/_Interfaces/IAddedBookData';
import { addWishListItemToDatabase } from '@/store/thunks/WishListThunks/addWishListItemToDatabase';
import toast from 'react-hot-toast';



export default function  WishListBtn(props: IMainBtn) {

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((wishListState:RootState)=> wishListState.wishListStore);


    const handleWhislListing = () => {
      
      if(props.cartPayLoad){
        const cartPayload: IBookOrders = {
            book_id: props.cartPayLoad?.book_id,
            bookOrder:  props.cartPayLoad?.bookOrder,
        };
        dispatch(addWishListItemToDatabase(cartPayload));
      }else{
        toast.error('There is no book data sent to wishList DataBase')
      }
      
      
    };
    const iconColor = isLoading ? props.btnIconColor : 'red';


  const icon = (
    <FavoriteIcon style={{ fontSize: '1.2rem', color: iconColor }} />
  );

  return <MainButton {...props} icon={icon} isDisabled={false} btnFunction={handleWhislListing}  />;

}