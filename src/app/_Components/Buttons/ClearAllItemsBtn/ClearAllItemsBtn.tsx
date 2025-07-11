'use client'

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/reduxStore';
import IconButton from '@mui/material/IconButton';
import { IUserMainpulateData } from '@/app/_Interfaces/IUserData';
import { clearWishListFromDatabase } from '@/store/thunks/WishListThunks/clearWishListFromDatabase';
import { clearUserCartItemFromDatabase } from '@/store/thunks/CartThunks/clearUserCartItemFromDatabase';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { Tooltip } from '@mui/material';
import { clearUserOrdersFromDatabase } from '@/store/thunks/OrdersThunk/clearUserOrdersFromDatabase';
import { loadOrdersFromDB } from '@/store/thunks/OrdersThunk/loadOrdersFromDB';



export default function ClearAllItemsBtn({  user_id, inWhichComp }: IUserMainpulateData){
   
    const dispatch = useDispatch<AppDispatch>();
    const handleClear = () => {
        if(inWhichComp == 'cart' && user_id){
            dispatch(clearUserCartItemFromDatabase(user_id));
        }
        else if(inWhichComp == 'wishlist' && user_id){
             dispatch(clearWishListFromDatabase(user_id));
        }
        else if(inWhichComp == 'orders' && user_id){
            dispatch(clearUserOrdersFromDatabase(user_id));
            dispatch(loadOrdersFromDB(user_id));
        }
        
    }
   

    return(
        <>
        <Tooltip title={`Clear ${inWhichComp}`}>
            <IconButton onClick={handleClear} sx={{ alignSelf: 'flex-start', }}>
                    <CleaningServicesIcon color={'error'}/>
            </IconButton>
        </Tooltip>
        </>

    )
}
