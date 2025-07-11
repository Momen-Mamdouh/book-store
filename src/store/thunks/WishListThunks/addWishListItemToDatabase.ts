  // thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "@/utils/supabase/client";
import { IBookOrders } from "@/app/_Interfaces/IAddedBookData";
import { RootState } from "@/lib/redux/reduxStore";
import toast from 'react-hot-toast';


export const addWishListItemToDatabase = createAsyncThunk<
    IBookOrders, // return type
    IBookOrders, // argument type
    { rejectValue: string } // optional: for error messages
  >(
    'wishlist/addItem',
    async (toAddWishListItem, { rejectWithValue, getState }) => {
      const toastId = toast.loading('Adding to WishList...');
      try {
        
        const supabase = createClient();

        const { wishListItems } = (getState() as RootState).wishListStore;
        const existingItem = wishListItems.find(item => item.book_id === toAddWishListItem.book_id);
        
        const { book_id, bookOrder } = toAddWishListItem;
        const { book_id: _, ...bookOrderWithoutId } = bookOrder;
        
       if (existingItem) {
          // ^^At item existence in wishList
          toast.dismiss(toastId);
          toast.success(`Already Existed Book`);
          toast.success(`Current items ${existingItem.bookOrder.book_count + toAddWishListItem.bookOrder.book_count}`);
          return rejectWithValue("Already Existed Book"); 
      } else {
        // ^^At item not exist in wishList
        const { data, error:insertingToWishListErr } = await supabase
          .from("wishlist")
          .insert([
            {
              book_id,
              ...bookOrderWithoutId
            }
          ])
          .select()
          .single();

        // ^^At inserting err to wishList
        if (insertingToWishListErr){
            toast.dismiss(toastId);
            toast.error(insertingToWishListErr.message);
            return rejectWithValue(insertingToWishListErr.message); 
        }

        toast.dismiss(toastId);
        toast.success(`Added to wishlist successfully 👌`);

        // ^^At Succssefully insert to wishList
        return  {
                  book_id: data.book_id,      
                  bookOrder: {                  
                    book_id: data.book_id,
                    user_id: data.user_id,
                    book_title: data.book_title,
                    book_img: data.book_img,
                    book_price: data.book_price,
                    book_count: data.book_count,
                  }
                };
      }

      } catch (error:any) {
          const errorMessage = error.message || "Failed to add item to wishlist"
          toast.dismiss(toastId);
          toast.error(errorMessage);
          return rejectWithValue(errorMessage);
      }
    }
  );
