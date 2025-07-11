  // thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "@/utils/supabase/client";
import { IBookOrders } from "@/app/_Interfaces/IAddedBookData";
import { RootState } from "@/lib/redux/reduxStore";
import toast from 'react-hot-toast';


  export const addCartItemToDatabase = createAsyncThunk<
    IBookOrders, // return type
    IBookOrders, // argument type
    { rejectValue: string } // optional: for error messages
  >(
    'cart/addItem',
    async (cartItem, { rejectWithValue, getState }) => {
      const toastId = toast.loading('Adding to Cart...');
      try {
        const supabase = createClient();

        const { cartItems } = (getState() as RootState).cartStore;

        const existingItem = cartItems.find(item => item.book_id === cartItem.book_id);
        const { book_id, bookOrder } = cartItem;
        const { book_id: _, ...bookOrderWithoutId } = bookOrder;
        
        
       if (existingItem) {
       
        const { data, error:updateCartErr } = await supabase
          .from("cart_items")
          .update({ book_count: existingItem.bookOrder.book_count + cartItem.bookOrder.book_count })
          .eq("book_id", cartItem.book_id)
          .eq("user_id", cartItem.bookOrder.user_id)
          .select()
          .single();

        if (updateCartErr){
          toast.dismiss(toastId);
          toast.error(updateCartErr.message);
          return rejectWithValue(updateCartErr.message);
        } 

        toast.dismiss(toastId);
        toast.success(`Current book count ${existingItem.bookOrder.book_count + cartItem.bookOrder.book_count}`);

        return {
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

      } else {

        const { data, error:addItemToCartErr } = await supabase
          .from("cart_items")
          .insert([
            {
             book_id,
              ...bookOrderWithoutId, 
            }
          ])
          .select()
          .single();

        if (addItemToCartErr){
            toast.dismiss(toastId);
            toast.error(addItemToCartErr.message);
            return rejectWithValue(addItemToCartErr.message);
        }

        toast.dismiss(toastId);
        toast.success(`Added to cart successfully 👌`);
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
          const errorMessage = error.message || "Failed cto connect to cart table";
          toast.dismiss(toastId);
          toast.error(errorMessage);
          return rejectWithValue(errorMessage);
      }
    }
  );
