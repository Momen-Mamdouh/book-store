import { AppDispatch } from "@/lib/redux/reduxStore";
import { loadOrdersFromDB } from "@/store/thunks/OrdersThunk/loadOrdersFromDB";
import { loadUserProfileFromDB } from "@/store/thunks/UserThunk/loadUserProfileFromDB";
import { useEffect } from "react";


export function useProfileLogic(user_id:string | undefined , dispatch:AppDispatch){

    useEffect(() => {
            if(user_id){
                dispatch(loadUserProfileFromDB(user_id));
                dispatch(loadOrdersFromDB(user_id));
                
            }
    }, [dispatch, user_id]);
     
}