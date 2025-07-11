import { RootState } from '@/lib/redux/reduxStore';
import { useSelector } from 'react-redux';


export const useCartItems = () => useSelector((state: RootState) => state.cartStore.cartItems);
