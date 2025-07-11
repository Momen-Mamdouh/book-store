'use client'

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/reduxStore';
import { decrementCountOfSpecificCartItem } from '@/store/thunks/CartThunks/decrementCountOfSpecificCartItem';
import { IBookOrders } from '@/app/_Interfaces/IAddedBookData';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import { Tooltip } from '@mui/material';





export default function DecreaseQuantityBtn ({ item }: { item: IBookOrders }){
   
    const dispatch = useDispatch<AppDispatch>();

    const handleDecrease = () => {
        dispatch(decrementCountOfSpecificCartItem(item));
  
    }

    return(
        <>
            <Tooltip title={'Decrease Quantity by 1'}>
                <IconButton onClick={handleDecrease}>
                    <RemoveIcon color={'error'} />
                </IconButton>
            </Tooltip>
        </>
        

    )
}