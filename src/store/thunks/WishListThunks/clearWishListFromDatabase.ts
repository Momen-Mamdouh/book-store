
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";


export const clearWishListFromDatabase = createAsyncThunk<
    string,
    string,
    { rejectValue: string }>(

  'whishList/clearWishListForUser',
  async (userId, { rejectWithValue }) => {
    const toastId = toast.loading('Clearing the WhishList...');
    try {
      const supabase = createClient();

      const {data:userData, error:userError} = await supabase.auth.getUser();
      if (userError){
          toast.dismiss(toastId);
          toast.error(userError.message);
          return rejectWithValue(userError.message || "User fetching error"); 
      }

      const { error:clearWishListError } = await supabase
        .from("wishlist")
        .delete() 
        .eq('user_id', userId)

      if (clearWishListError){
          toast.dismiss(toastId);
          toast.error(clearWishListError.message);
          return rejectWithValue(clearWishListError.message || "Unexpected error at clearing wishList");  
      }
        
        toast.dismiss(toastId);
        toast.success(`WishList cleared for user ${userData?.user?.identities?.[0]?.identity_data?.username} 👌`);
      return userId;

    } catch (error:any) {
        const errorMessage = error.message  || "Failed to clear the whishList";
        toast.dismiss(toastId);
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);  
    }
  }
);
