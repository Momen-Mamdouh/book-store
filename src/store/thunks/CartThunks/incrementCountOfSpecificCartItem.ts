  // thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "@/utils/supabase/client";
import { RootState } from "@/lib/redux/reduxStore";
import toast from "react-hot-toast";
import { IBookOrders } from '@/app/_Interfaces/IAddedBookData';


  export const incrementCountOfSpecificCartItem = createAsyncThunk<
    IBookOrders, // return type
    IBookOrders, // argument type
    { rejectValue: string } // optional: for error messages
  >(
    'cart/incrementItem',
    async (cartItem, { rejectWithValue, getState }) => {
      const toastId = toast.loading('Incrementing book count by 1...');
      try {
        const supabase = createClient();
        const { cartItems } = (getState() as RootState).cartStore;
        const existingItem = cartItems.find(item => item.book_id === cartItem.book_id);

        if (existingItem) {
            const currentCount = existingItem?.bookOrder.book_count! ?? 0;

            const { data, error:incrementItemError } = await supabase
            .from("cart_items")
            .update({ book_count: currentCount + 1 })
            .eq("book_id", cartItem.book_id)  
            .eq("user_id", cartItem.bookOrder.user_id)
            .select()
            .single();

             if (incrementItemError){
                toast.dismiss(toastId);
                toast.error(incrementItemError.message);
                return rejectWithValue(incrementItemError.message);   
              }

              toast.dismiss(toastId);
              toast.success(`Incremented successfully 👌`);
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
                      }
        } else{
            const { data, error:insertingNewItemError } = await supabase
            .from("cart_items")
            .insert([cartItem])
            .select()
            .single();

            
            if (insertingNewItemError){
              toast.dismiss(toastId);
              toast.error(insertingNewItemError.message);
              return rejectWithValue(insertingNewItemError.message);   
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
          const errorMessage = error.message || "Failed to conect the cart";
          toast.dismiss(toastId);
          toast.error(errorMessage);
          return rejectWithValue(errorMessage);
        }
  }
  );
