  // thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "@/utils/supabase/client";
import { RootState } from "@/lib/redux/reduxStore";
import toast from "react-hot-toast";
import { IBookOrders } from "@/app/_Interfaces/IAddedBookData";


  export const decrementCountOfSpecificCartItem = createAsyncThunk<
    IBookOrders | null, // return type
    IBookOrders, // argument type
    { rejectValue: string } // optional: for error messages
  >(
    'cart/decrementItem',
    async (cartItem, { rejectWithValue, getState }) => {
      const toastId = toast.loading('Decrementing book count by 1...');
      try {

        const supabase = createClient();
        const { cartItems } = (getState() as RootState).cartStore;

        const existingItem = cartItems.find(item => item.book_id === cartItem.book_id);
        
        if(existingItem){
            const currentCount = existingItem?.bookOrder.book_count ?? 0;
             if (currentCount > 1) {

            const { data:dataDecreasedByOne, error:decrementItemError } = await supabase
              .from("cart_items")
              .update({ book_count: currentCount - 1 })
              .eq("book_id", cartItem.book_id)
              .eq("user_id", cartItem.bookOrder.user_id)
              .select()
              .single();

              if (decrementItemError){
                  toast.dismiss(toastId);
                  toast.error(decrementItemError.message);
                  return rejectWithValue(decrementItemError.message);   
              }

              toast.dismiss(toastId);
              toast.success(`Decremented successfully 👌`);

              return  {
                        book_id: dataDecreasedByOne.book_id,      
                        bookOrder: {                  
                          book_id: dataDecreasedByOne.book_id,
                          user_id: dataDecreasedByOne.user_id,
                          book_title: dataDecreasedByOne.book_title,
                          book_img: dataDecreasedByOne.book_img,
                          book_price: dataDecreasedByOne.book_price,
                          book_count: dataDecreasedByOne.book_count,
                        }
                      };
            } else if (currentCount === 1) {

              const { data:dataOfThisItem , error:deleteItemError } = await supabase
                .from("cart_items")
                .delete()
                .eq("book_id", cartItem.book_id)
                .eq("user_id", cartItem.bookOrder.user_id)
                .select()
                .single();

              if (deleteItemError){
                toast.dismiss(toastId);
                toast.error(deleteItemError.message);
                return rejectWithValue(deleteItemError.message);   
                  
              }
              toast.dismiss(toastId);
              toast.success("Item deleted Successfully from Cart");
              return  {
                        book_id: dataOfThisItem.book_id,      
                        bookOrder: {                  
                          book_id: dataOfThisItem.book_id,
                          user_id: dataOfThisItem.user_id,
                          book_title: dataOfThisItem.book_title,
                          book_img: dataOfThisItem.book_img,
                          book_price: dataOfThisItem.book_price,
                          book_count: dataOfThisItem.book_count,
                        }
                      };
              } else {
                  toast.dismiss(toastId);
                  toast.error("Book count is already zero");
                  return rejectWithValue("Book count is already zero");
              }
        }

        toast.dismiss(toastId);
        toast.error("Item not found in Cart Table");
        return rejectWithValue("Not Found Item in Cart");
    } catch (error:any) {
      const errorMessage = error.message || "Failed to conect the cart";
      toast.dismiss(toastId);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
  );
