
import { createAsyncThunk } from '@reduxjs/toolkit';
import {  IOrder } from '@/app/_Interfaces/IAddedBookData';
import { createClient } from '@/utils/supabase/client';

export const loadOrdersFromDB = createAsyncThunk<
        IOrder[], //^^ return type
        string,   //^^ argument 
        { rejectValue: string } //^^ rejectWithValue type 

    >('orders/loadOrdersFromDB',
  async (userId, { rejectWithValue }) => {
    try {

      const supabase = createClient();
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('user_id', userId); 

      if (error){
         return rejectWithValue(error.message);
      };

      return data.map(item => ({
          id: item.id,
          order_id:item.order_id,
          created_at:item.created_at,
          book_id: item.book_id,
          user_id: item.user_id,
          book_title: item.book_title,
          book_price: item.book_price,
          book_count: item.book_count,
      }));

    } catch (error:unknown) {
        const errorMessage = error instanceof Error ? error.message : "UnExpected Error at loading orders from Supabase";
        return rejectWithValue(errorMessage)
    }
    
  }
);

