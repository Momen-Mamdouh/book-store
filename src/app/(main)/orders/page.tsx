'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/reduxStore';

import { finalizeOrderAndRefresh } from '@/utils/BookHelpers/finalizeOrdersHelper';
import { defineOrderBooksIds } from '@/lib/redux/OrdersSlice/OrdersSlice';

import OrdersCard from '@/app/_Components/MicroComps/OrdersCard/OrdersCard';
import BooksResponseLoader from '@/app/_Components/Loaders/BooksResponseLoader/BooksResponseLoader';
import ErrorResponseComp from '@/app/_Components/ErrorResponseComp/ErrorResponseComp';

export interface IFetchingResponse{
  responseStatus?: number | string,
  error: string | null,
}


export default function Orders(){

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [, setFetchingLoading] = useState<boolean>(true);
  const [fetchingResponse, setFetchingResponse] = useState<IFetchingResponse>({} as IFetchingResponse);
  const user_id = useSelector((state: RootState) => state.userStore.user?.id);
  const { ordersItems , isLoading:ordersLoading, orderBooksId } = useSelector((orderState:RootState)=> orderState.orderStore);


  useEffect(() => {
    if (user_id === null) {
      router.push('/home');
    }

     if (!user_id) return;

    const stored = sessionStorage.getItem('orderBooksIds');
    const parsed = stored ? JSON.parse(stored) : [];

    if (parsed.length > 0 && orderBooksId.length === 0) {
      dispatch(defineOrderBooksIds(parsed));
    }

    const IdsSent = parsed.length > 0 ? parsed : orderBooksId;

    finalizeOrderAndRefresh(user_id, IdsSent, dispatch, setFetchingLoading, setFetchingResponse);
  }, [user_id, router, dispatch,orderBooksId]);

  
  return(
    <>
    
      {ordersLoading && <BooksResponseLoader />}
      {ordersItems.length > 0 && <OrdersCard orders={ordersItems}/>}
      {ordersItems.length <= 0 && fetchingResponse && <ErrorResponseComp 
                        responseStatus={fetchingResponse.responseStatus} error={fetchingResponse.error} />}
    
    </>
  )

}