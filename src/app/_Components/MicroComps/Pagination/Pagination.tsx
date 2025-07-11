import {ChangeEvent }from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { setHomePaginationNumber } from '@/lib/redux/BooksSlice/BooksSlice';
import { RootState } from '@/lib/redux/reduxStore';

export default function PaginationOutlined({pagesCount}:{pagesCount:number,}) {
    const dispatch = useDispatch();
    const {homeCurrentPagination: currentPage} = useSelector((state:RootState)=> state.bookStore);

    const handleChange = (e: ChangeEvent<unknown>, value:number)=>{
        dispatch(setHomePaginationNumber(value))

    }

    
  return (
   <div className="paginationBlock flex items-center justify-center  my-12">
             <Stack spacing={2}>
                <Pagination count={pagesCount} variant="outlined" color="primary"
                    page={currentPage}
                    onChange={handleChange}
                />
            </Stack>
   </div>
  );
}
