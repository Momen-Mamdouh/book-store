
import { createAsyncThunk } from "@reduxjs/toolkit";

import { createClient } from "@/utils/supabase/client";

import toast from "react-hot-toast";

import { IUserMainpulateData } from "@/app/_Interfaces/IUserData";


export const deleteWhishListFromDatabase = createAsyncThunk<
  string, 
  IUserMainpulateData, 
  { rejectValue: string }>(
  'whishList/deleteItem',

  async ({book_id, user_id}:IUserMainpulateData, {rejectWithValue}) => {
    const toastId = toast.loading('Deleting Item...');
    try {

      const supabase = createClient();
      const {data:userData, error:userError} = await supabase.auth.getUser();
      if (userError){
          toast.dismiss(toastId);
          toast.error(userError.message);
          return rejectWithValue(userError.message)
      }

      const { error:deleteWishListItemError } = await supabase
        .from("wishlist")
        .delete()
        .eq('book_id', book_id)
        .eq('user_id', user_id)

     if (deleteWishListItemError){
            toast.dismiss(toastId);
            toast.error(deleteWishListItemError.message);
            return rejectWithValue(deleteWishListItemError.message);
        }

        toast.dismiss(toastId);
        toast.success(`Item deleted from wishList for user ${userData?.user?.identities?.[0]?.identity_data?.username} 👌`);
        
      return book_id || 'Not defined Book_id';
    } catch (error:any) {
        const errorMessage = error.message || "Failed to delete item from whishList"
        toast.dismiss(toastId);
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);

    }
  }
);
