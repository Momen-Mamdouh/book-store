
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";


export const clearUserOrdersFromDatabase = createAsyncThunk<string, string, {rejectValue:string}>(
  'orders/clearUserOrdersFromDatabase',
  async (userId, { rejectWithValue }) => {
    const toastId = toast.loading('Clear the Cart...');
    try {
      
      const supabase = createClient();
      const {data:userData, error:userError} = await supabase.auth.getUser();
      if (userError){
            toast.dismiss(toastId);
            toast.error(userError.message);
            return rejectWithValue(userError.message);
      }

      const { error:clearOrderItemsError } = await supabase
        .from("order_items")
        .delete()
        .eq('user_id', userId);

      if (clearOrderItemsError){
            toast.dismiss(toastId);
            toast.error(clearOrderItemsError.message);
            return rejectWithValue(clearOrderItemsError.message);
      }
        
        toast.dismiss(toastId);
        toast.success(`Orders cleared for user ${userData?.user?.identities?.[0]?.identity_data?.username} 👌`);

      return userId;
    } catch (error:unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unexpected error during clearing";
        toast.dismiss(toastId);
        toast.error(errorMessage);
        return rejectWithValue(errorMessage); 
      }
  }
);
