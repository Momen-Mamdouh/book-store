import {  IBookOrders } from "@/app/_Interfaces/IAddedBookData";
import { loadCartFromDB } from "@/store/thunks/CartThunks/loadCartFromDB";
import { addCartItemToDatabase } from "@/store/thunks/CartThunks/addCartItemToDatabase";
import { createSlice } from "@reduxjs/toolkit";
import { deleteCartItemFromDatabase } from "@/store/thunks/CartThunks/deleteCartItemFromDatabase";
import { clearUserCartItemFromDatabase } from "@/store/thunks/CartThunks/clearUserCartItemFromDatabase";
import { decrementCountOfSpecificCartItem } from "@/store/thunks/CartThunks/decrementCountOfSpecificCartItem";
import { incrementCountOfSpecificCartItem } from "@/store/thunks/CartThunks/incrementCountOfSpecificCartItem";


interface CartState {
    cartItems:IBookOrders[],
    isLoading:boolean,
    error: string | null | unknown,
}

const initialState:CartState = {
    cartItems:[],
    isLoading:false,
    error:  null,
 }
    


const cartStoreSlice = createSlice(
    {
        name: 'CartSlice',
        initialState,
        reducers:{},
        extraReducers: (builder) => {
            builder

            .addCase(loadCartFromDB.pending, (cartState) => {
                cartState.isLoading = true;
                cartState.error = null;
            })
            .addCase(loadCartFromDB.fulfilled, (cartState, action) => {
                cartState.cartItems = action.payload;
                cartState.isLoading = false;
                cartState.error = null;
            })
            .addCase(loadCartFromDB.rejected, (cartState, action) => {
                cartState.isLoading = false;
                cartState.error = action.payload  || "Failed to load items from Cart";
            })

            
            .addCase(addCartItemToDatabase.pending, (cartState) => {
                cartState.isLoading = true;
                cartState.error = null;
            })
            .addCase(addCartItemToDatabase.fulfilled, (cartState, action) => {
                cartState.isLoading = false;
                cartState.error = null;
                const existingItem = cartState.cartItems.find(
                    (item) => item.book_id === action.payload.book_id
                );  
                // ^^ Here's action Payload has new returned item data to add new count if the same item exist or push it if not 
                if (existingItem) {
                    existingItem.bookOrder.book_count = action.payload.bookOrder.book_count;
                } else {
                    cartState.cartItems.push({
                        book_id: action.payload.book_id,
                        bookOrder: {
                            ...action.payload.bookOrder, 
                            book_img: action.payload.bookOrder.book_img.replace('http://', 'https://'),
                        }
                    });
                }
            })            
            .addCase(addCartItemToDatabase.rejected, (cartState, action) => {
                cartState.isLoading = false;
                cartState.error = action.payload || "Failed to add item to Cart";
            })

            .addCase(deleteCartItemFromDatabase.pending, (cartState)=>{
                cartState.isLoading = true;
                cartState.error = null;
            })
            .addCase(deleteCartItemFromDatabase.fulfilled, (cartState, action)=>{
                cartState.isLoading = false;
                cartState.error = null;
                // ^^ Action payload has the deleted book_id.
                cartState.cartItems = cartState.cartItems.filter((item)=> item.book_id !== action.payload);
            })
            .addCase(deleteCartItemFromDatabase.rejected, (cartState, action)=>{
                cartState.isLoading = false;
                cartState.error = action.payload || "Failed to delete item";
            })



            .addCase(clearUserCartItemFromDatabase.pending, (cartState)=>{
                    cartState.isLoading = true;
                    cartState.error = null;
            })
            .addCase(clearUserCartItemFromDatabase.fulfilled, (cartState)=>{
                cartState.isLoading = false;
                cartState.error = null;
                cartState.cartItems = []
            })
            .addCase(clearUserCartItemFromDatabase.rejected, (cartState, action)=>{
                cartState.isLoading = false;
                cartState.error = action.payload || "Failed to clear cart";
            })

            .addCase(decrementCountOfSpecificCartItem.pending, (cartState)=>{
                cartState.isLoading = true;
                cartState.error = null;
            })
           .addCase(decrementCountOfSpecificCartItem.fulfilled, (cartState, action) => {
                cartState.isLoading = false;
                cartState.error = null;
                if (action.payload) {
                    const index = cartState.cartItems.findIndex(item => item.book_id === action.payload?.book_id);
                    if (index > -1) {
                        const currentBookCount = cartState.cartItems[index].bookOrder.book_count;
                        if(currentBookCount > 1) {
                             cartState.cartItems[index].bookOrder.book_count -= 1;
                        }else {
                            cartState.cartItems.splice(index, 1);
                        }
                    }
                } 
            })
            .addCase(decrementCountOfSpecificCartItem.rejected, (cartState, action)=>{
                cartState.isLoading = false;
                cartState.error = action.payload || "Failed to decrement cart item";
            })

            .addCase(incrementCountOfSpecificCartItem.pending, (cartState)=>{
                cartState.isLoading = true;
                cartState.error = null;
            })
           .addCase(incrementCountOfSpecificCartItem.fulfilled, (cartState, action) => {
                cartState.isLoading = false;
                cartState.error = null;
                const existingIndex = cartState.cartItems.findIndex( item => item.book_id === action.payload.book_id);
                // ^^ if existingIndex equals -1 means it's not found
                if (existingIndex !== -1) {
                    cartState.cartItems[existingIndex].bookOrder.book_count += 1;
                } else {
                    cartState.cartItems.push({
                    book_id: action.payload.book_id,
                    bookOrder: action.payload.bookOrder,
                    });
                }
            })
            .addCase(incrementCountOfSpecificCartItem.rejected, (cartState, action)=>{
                cartState.isLoading = false;
                cartState.error = action.payload || "Failed to increment cart item";
            })
            

        }
    }
)


export const {  } = cartStoreSlice.actions;
export default cartStoreSlice.reducer;
