'use client'

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/reduxStore';
import { deleteCartItemFromDatabase } from '@/store/thunks/CartThunks/deleteCartItemFromDatabase';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { IUserMainpulateData } from '@/app/_Interfaces/IUserData';
import { deleteWhishListFromDatabase } from '@/store/thunks/WishListThunks/deleteWhishListFromDatabase';
import { Tooltip } from '@mui/material';
import { deleteOrderItemFromDatabase } from '@/store/thunks/OrdersThunk/deleteOrderItemFromDatabase';
import { loadOrdersFromDB } from '@/store/thunks/OrdersThunk/loadOrdersFromDB';




export default function DeleteItemBtn({ book_id, user_id, inWhichComp }: IUserMainpulateData){
   
    const dispatch = useDispatch<AppDispatch>();
    const handleRemove = () => {
        if(inWhichComp == 'cart'){
            dispatch(deleteCartItemFromDatabase({book_id, user_id}));
        }
        else if(inWhichComp == 'wishlist'){
             dispatch(deleteWhishListFromDatabase({book_id, user_id}));
        }
        else if(inWhichComp == 'orders' && user_id){
            dispatch(deleteOrderItemFromDatabase({book_id, user_id}));
            dispatch(loadOrdersFromDB(user_id));
        }
        
    }
   

    return(
        <>
            <Tooltip title={`Deleted this item from ${inWhichComp}`}>
                <IconButton onClick={handleRemove} sx={{ alignSelf: 'flex-start', }}>
                        <DeleteIcon color={'error'}/>
                    </IconButton>
            </Tooltip>
        </>

    )
}
