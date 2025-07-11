
  import { createAsyncThunk } from "@reduxjs/toolkit";

  import { createClient } from "@/utils/supabase/client";

  import toast from "react-hot-toast";
  
  import { IUserMainpulateData } from "@/app/_Interfaces/IUserData";


  export const deleteCartItemFromDatabase = createAsyncThunk<string, IUserMainpulateData>(
    'cart/deleteItem',
    async ({user_id, book_id}:IUserMainpulateData, {rejectWithValue}) => {
       const toastId = toast.loading('Deleting Item...');
      try {
       
        const supabase = createClient();
        const {data:userData, error:userFetchError} = await supabase.auth.getUser();
        if (userFetchError){
            toast.dismiss(toastId);
            toast.error(userFetchError.message);
            return rejectWithValue(userFetchError.message)
        }

        const { error:deleteItemError } = await supabase
          .from("cart_items")
          .delete()
          .eq('book_id', book_id)
          .eq('user_id', user_id)

          if (deleteItemError){
            toast.dismiss(toastId);
            toast.error(deleteItemError.message);
            return rejectWithValue(deleteItemError.message)
          }

          toast.dismiss(toastId);
          toast.success(`Item deleted for user ${userData?.user?.identities?.[0]?.identity_data?.username} 👌`);
          
        return book_id || 'Not defined Book_id';
      } catch (error:unknown) {
          const errorMessage = error instanceof Error ? error.message : "Failed cto connect to cart table";
          toast.dismiss(toastId);
          toast.error(errorMessage);
          return rejectWithValue(errorMessage)

      }
    }
  );
