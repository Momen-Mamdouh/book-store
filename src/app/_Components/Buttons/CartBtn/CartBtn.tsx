  'use client'

  import MainButton from '@/app/_Components/MicroComps/MainButton/MainButton';
  import { IMainBtn } from '@/app/_Interfaces/IButtons';
  import { IBookOrders } from '@/app/_Interfaces/IAddedBookData';
  import { AppDispatch } from '@/lib/redux/reduxStore';
  import { addCartItemToDatabase } from '@/store/thunks/CartThunks/addCartItemToDatabase';
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  import { useDispatch } from 'react-redux';
  import { deleteWhishListFromDatabase } from '@/store/thunks/WishListThunks/deleteWhishListFromDatabase';
  import toast from "react-hot-toast";


  export default function  CartBtn(props: IMainBtn) { 

      const dispatch = useDispatch<AppDispatch>();

      const addItemToCart = async () => {
          const cartPayload: IBookOrders = {
            book_id: props.cartPayLoad!.book_id,
            bookOrder: props.cartPayLoad!.bookOrder,
          };

          try {
            await dispatch(addCartItemToDatabase(cartPayload)).unwrap();

            if (props.cartPayLoad?.fromWishList) {
              await dispatch(deleteWhishListFromDatabase({book_id:cartPayload.book_id, user_id:cartPayload.bookOrder.user_id!})).unwrap();
              toast.success(`Item deleted from wishList & added to Cart 👌`);
            }
            

          } catch (error:any) {
            toast.error(error.message);
          }
    };


    const icon = (
      <ShoppingCartIcon style={{ fontSize: '1.2rem', color: props.btnIconColor }} />
    );

    return <MainButton {...props} isDisabled={false} icon={icon} btnFunction={addItemToCart}  />;

  }