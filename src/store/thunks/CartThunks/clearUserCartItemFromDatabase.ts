
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";


export const clearUserCartItemFromDatabase = createAsyncThunk<
  string, 
  string,
  { rejectValue: string }

  >('cart/clearCartForUser',
  async (userId, { rejectWithValue }) => {
     const toastId = toast.loading('Clear the Cart...');
    try {
     
      const supabase = createClient();
      const {data:userData, error:userError} = await supabase.auth.getUser();
      if(userError){
        toast.dismiss(toastId);
        toast.error(userError.message);
        return rejectWithValue(userError.message);
      }

      const { error:clearCartError } = await supabase
        .from("cart_items")
        .delete()
        .eq('user_id', userId)

      if (clearCartError){
        toast.dismiss(toastId);
        toast.error(clearCartError.message);
        return rejectWithValue(clearCartError.message);   
      }
        
        toast.dismiss(toastId);
        toast.success(`Cart cleared for user ${userData?.user?.identities?.[0]?.identity_data?.username} 👌`);
      return userId;
    } catch (error:unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to conect the cart";
      toast.dismiss(toastId);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
