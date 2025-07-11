
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBookOrders } from '@/app/_Interfaces/IAddedBookData';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';

export const loadWishListFromDB = createAsyncThunk<
    IBookOrders[], 
    string,
     { rejectValue: string }
    >(
  'wishList/loadWishListFromDB',
  async (userId, {rejectWithValue}) => {

    const supabase = createClient();

    // ^^Loading Data from wishList
    const { data, error:loadingWishListError } = await supabase
      .from('wishlist')
      .select('*')
      .eq('user_id', userId); 

    if (loadingWishListError) {
          // ^^At loading WishList Error
          toast.error(loadingWishListError.message);
          return rejectWithValue(loadingWishListError.message); 
    }

    return data.map(item => ({
      book_id: item.book_id,
      bookOrder: {
        book_id: item.book_id,
        user_id: item.user_id,
        book_title: item.book_title,
        book_img: item.book_img,
        book_price: item.book_price,
        book_count: item.book_count,
      }
    }));
  }
);

