import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "@/utils/supabase/client";

import { IUserMainpulateData } from "@/app/_Interfaces/IUserData";
import toast from "react-hot-toast";

export const deleteOrderItemFromDatabase = createAsyncThunk<
  string, //^^ return type when fulfilled
  IUserMainpulateData, //^^  args
  { rejectValue: string } //^^ rejected value type
>(
  'orders/deleteOrderItemFromDatabase',
  async ({ user_id, book_id }, { rejectWithValue }) => {
      const toastId = toast.loading('Deleting Item...');
    try {
      
      const supabase = createClient();
      const { data: userData, error:userError } = await supabase.auth.getUser();
       if (userError) {
          toast.error(userError.message);
          return rejectWithValue(userError.message); 
      }

      const { error:orderItemsError } = await supabase
        .from("order_items")
        .delete()
        .eq('book_id', book_id)
        .eq('user_id', user_id);

      if (orderItemsError) {
        toast.dismiss(toastId);
        toast.error(orderItemsError.message);
        return rejectWithValue(orderItemsError.message); 
      }

      toast.dismiss(toastId);
      toast.success(`Item deleted for user ${userData?.user?.user_metadata?.username ?? 'unknown'} 👌`);
      return book_id || 'No Defined Book'; 

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unexpected error during deleting";
        toast.dismiss(toastId);
        toast.error(errorMessage);
        return rejectWithValue(errorMessage); 
    }
    finally {
      toast.dismiss(toastId);
    }
  }
);
