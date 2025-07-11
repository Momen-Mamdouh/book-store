'use client'

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/reduxStore';
import { IBookOrders } from '@/app/_Interfaces/IAddedBookData';
import IconButton from '@mui/material/IconButton';
import { incrementCountOfSpecificCartItem } from '@/store/thunks/CartThunks/incrementCountOfSpecificCartItem';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';





export default function IncreaseQuantityBtn({ item }: { item: IBookOrders }){
   
    const dispatch = useDispatch<AppDispatch>();
    const handleIncrease = () => {
        dispatch(incrementCountOfSpecificCartItem(item));
    }

    return(
        <>
            <Tooltip title={'Increase Quantity by 1'}>
                <IconButton onClick={handleIncrease}>
                    <AddIcon color={'success'} />
                </IconButton>
            </Tooltip>
        </>

    )
}
