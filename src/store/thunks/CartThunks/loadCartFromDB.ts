
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBookOrders } from '@/app/_Interfaces/IAddedBookData';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';

export const loadCartFromDB = createAsyncThunk<
    IBookOrders[], 
    string,
    { rejectValue: string }

    >('cart/loadCartFromDB',
  async (userId, {rejectWithValue}) => {

    const supabase = createClient();

     // ^^Loading Data from Cart
    const { data, error:cartLoadingError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId); 

    if (cartLoadingError) {
        // ^^At loading Cart Error
        toast.error(cartLoadingError.message);
        return rejectWithValue(cartLoadingError.message); 
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

