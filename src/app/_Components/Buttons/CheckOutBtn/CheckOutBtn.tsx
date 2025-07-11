'use client';
import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { defineOrderBooksIds } from '@/lib/redux/OrdersSlice/OrdersSlice';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MainButton from '@/app/_Components/MicroComps/MainButton/MainButton';
import { IMainBtn } from '@/app/_Interfaces/IButtons';

import { loadStripe } from '@stripe/stripe-js';

import toast from "react-hot-toast";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckOutBtn(props: IMainBtn): ReactElement {
  const dispatch = useDispatch();

  const checkOutItemsInCart = async () => {
    const toastId = toast.loading('Checking Out...');  
    try {
      const stripe = await stripePromise;

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: props.cartCheckOut }),
      });

      const data = await res.json();

      if (data.error) {
        toast.dismiss(toastId);
        const dataError = data.error || "Unexpected error during ordering";
        toast.error(dataError);
        throw new Error(data.error);
      }

      if (!data.id) {
        toast.dismiss(toastId);
        const fetchingError = 'No session ID received from Stripe';
        toast.error(fetchingError);
        throw new Error('No session ID received from Stripe');
      }
      
      const booksIds = props.cartCheckOut ? props.cartCheckOut.map((item)=> ({ book_id: item.book_id })) : [];
      sessionStorage.setItem('orderBooksIds', JSON.stringify(booksIds));
      dispatch(defineOrderBooksIds(booksIds));

      toast.dismiss(toastId);
      toast.success(`To Stripe ...`);

      const result = await stripe?.redirectToCheckout({
        sessionId: data.id
      });

      if (result?.error) {
        toast.dismiss(toastId);
        const stripeError = result?.error.message || 'UnExpected Stripe Error';
        toast.error(stripeError);
        throw stripeError;
      }
      
      
    } catch (error:unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to start checkout';
      toast.dismiss(toastId);
      toast.error(errorMessage);
      throw errorMessage
    }
  };

  const icon = (
    <AttachMoneyIcon style={{ fontSize: '1.2rem', color: props.btnIconColor }} />
  );

  return <MainButton {...props} icon={icon} isDisabled={false} btnFunction={checkOutItemsInCart} />;

}