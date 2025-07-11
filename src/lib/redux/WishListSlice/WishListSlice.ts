import { createSlice } from "@reduxjs/toolkit";
import {  IBookOrders } from "@/app/_Interfaces/IAddedBookData";

import { loadWishListFromDB } from "@/store/thunks/WishListThunks/loadWishListFromDB";
import { addWishListItemToDatabase } from "@/store/thunks/WishListThunks/addWishListItemToDatabase";
import { deleteWhishListFromDatabase } from "@/store/thunks/WishListThunks/deleteWhishListFromDatabase";
import { clearWishListFromDatabase } from "@/store/thunks/WishListThunks/clearWishListFromDatabase";




interface wishListState {
    wishListItems:IBookOrders[],
    isLoading:boolean,
    error: string | null | unknown,
}

const initialState:wishListState = {
    wishListItems:[],
    isLoading:true,
    error:  null,
 }
    


const cartStoreSlice = createSlice(
    {
        name: 'CartSlice',
        initialState,
        reducers:{     
        },

        extraReducers: (builder) => {
            builder

            .addCase(loadWishListFromDB.pending, (wishListState) => {
                wishListState.isLoading = true;
                wishListState.error = null;
            })
            .addCase(loadWishListFromDB.fulfilled, (wishListState, action) => {
                wishListState.wishListItems = action.payload;
                wishListState.isLoading = false;
                wishListState.error = null;
            })
            .addCase(loadWishListFromDB.rejected, (wishListState, action) => {
                wishListState.isLoading = false;
                wishListState.error = action.payload || "Failed to load items from WishList";
            })

            
            .addCase(addWishListItemToDatabase.pending, (wishListState) => {
                wishListState.isLoading = true;
                wishListState.error = null;
            })
            .addCase(addWishListItemToDatabase.fulfilled, (wishListState, action) => {
                wishListState.isLoading = false;
                wishListState.error = null;

                const existingItem = wishListState.wishListItems.find(
                    (item) => item.book_id === action.payload.book_id
                );

                if (!existingItem) { 
                    wishListState.wishListItems.push({
                        book_id: action.payload.book_id,
                        bookOrder: action.payload.bookOrder
                    }); 
                }else{
                    wishListState.error = 'Already Exist in WishList';
                } 
            })            
            .addCase(addWishListItemToDatabase.rejected, (wishListState, action) => {
                wishListState.isLoading = false;
                wishListState.error = action.payload || "Failed to add item to WishList";
            })


            .addCase(deleteWhishListFromDatabase.pending, (wishListState)=>{
                wishListState.isLoading = true;
                wishListState.error = null;
            })
            .addCase(deleteWhishListFromDatabase.fulfilled, (wishListState, action)=>{
                wishListState.isLoading = false;
                wishListState.error = null;
                wishListState.wishListItems = wishListState.wishListItems.filter((item)=> item.book_id !== action.payload);   
            })
            .addCase(deleteWhishListFromDatabase.rejected, (wishListState, action)=>{
                wishListState.isLoading = false;
                wishListState.error = action.payload || "Failed to delete item from WishList";
          
            })

            .addCase(clearWishListFromDatabase.pending, (wishListState)=>{
                    wishListState.isLoading = true;
                    wishListState.error = null;
            })
            .addCase(clearWishListFromDatabase.fulfilled, (wishListState)=>{
                wishListState.isLoading = false;
                wishListState.error = null;
                // ^ Here we only clear the items as it for the user login only no need to take action payload which has the user_id
                wishListState.wishListItems = []
            })
            .addCase(clearWishListFromDatabase.rejected, (wishListState, action)=>{
                wishListState.isLoading = false;
                wishListState.error = action.payload || "Failed to clear cart";
            })

            
        }
    }
)


export const {  } = cartStoreSlice.actions;
export default cartStoreSlice.reducer;
