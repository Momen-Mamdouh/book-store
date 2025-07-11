import { loadCartFromDB } from "@/store/thunks/CartThunks/loadCartFromDB";
import { loadOrdersFromDB } from "@/store/thunks/OrdersThunk/loadOrdersFromDB";
import { AppDispatch } from "@/lib/redux/reduxStore";

import { IOrderBooksIds } from "@/app/_Interfaces/IAddedBookData";
import toast from "react-hot-toast";
import { IFetchingResponse } from "@/app/(main)/orders/page";

export const finalizeOrderAndRefresh = async (user_id: string, 
  books_ids:IOrderBooksIds[], 
  dispatch: AppDispatch,
  setFetchingLoading:  (fetcingLoading: boolean) => void ,
  setFetchingResponse: (fetchingResponse:IFetchingResponse)=> void ,) =>{

  const toastId = toast.loading('Finalize Order...'); 
  setFetchingLoading(true); 
  try {
    const res = await fetch('/api/checkoutSuccess', {
      method: 'POST',
      body: JSON.stringify({ user_id, books_ids }),
    });

    const data = await res.json();

    if (data.success) {
      setFetchingLoading(false);
      setFetchingResponse({responseStatus:200, error:null});
      dispatch(loadCartFromDB(user_id));
      dispatch(loadOrdersFromDB(user_id));
      toast.dismiss(toastId);
      toast.success(`Order in transit`);
      sessionStorage.removeItem('orderBooksIds');
      
    } else {
        const dataError = data.error || "Unexpected error during ordering";
        setFetchingLoading(false);
        setFetchingResponse({responseStatus:500, error:dataError});
        toast.dismiss(toastId);
        toast.error(dataError);
    }
  } catch (error:any) {
      setFetchingLoading(false); 
      toast.dismiss(toastId);
      const errorMessage = error.message || "Unexpected error during ordering";
      toast.error(errorMessage);
      setFetchingResponse({responseStatus:500, error:errorMessage});

  }
};
