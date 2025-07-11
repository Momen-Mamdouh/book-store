

import {  IOrder, IOrderBooksIds } from "@/app/_Interfaces/IAddedBookData";
import { createSlice } from "@reduxjs/toolkit";

import { loadOrdersFromDB } from "@/store/thunks/OrdersThunk/loadOrdersFromDB";
import { deleteOrderItemFromDatabase } from "@/store/thunks/OrdersThunk/deleteOrderItemFromDatabase";
import { clearUserOrdersFromDatabase } from "@/store/thunks/OrdersThunk/clearUserOrdersFromDatabase";



interface OrdersState {
    ordersItems:IOrder[],
    orderBooksId: IOrderBooksIds[]
    isLoading:boolean,
    error: string | null | unknown,
}

const initialState:OrdersState = {
    ordersItems:[],
    orderBooksId: [],
    isLoading:false,
    error:  null,
 }
    


const cartStoreSlice = createSlice(
    {
        name: 'OrdersSlice',
        initialState,
        reducers:{

            defineOrderBooksIds:(orderState, action)=>{
                orderState.orderBooksId = action.payload 
                 
            }

        },

        extraReducers: (builder) => {
            builder

            .addCase(loadOrdersFromDB.pending, (OrdersState) => {
                OrdersState.isLoading = true;
            })
            .addCase(loadOrdersFromDB.fulfilled, (OrdersState, action) => {
                OrdersState.ordersItems = action.payload;
                OrdersState.isLoading = false;
            })
            .addCase(loadOrdersFromDB.rejected, (OrdersState, action) => {
                OrdersState.isLoading = false;
                OrdersState.error = action.payload;
            })


            .addCase(deleteOrderItemFromDatabase.pending, (OrdersState)=>{
                OrdersState.isLoading = true;
                OrdersState.error = null;
            })
            .addCase(deleteOrderItemFromDatabase.fulfilled, (OrdersState, action)=>{
                OrdersState.isLoading = false;
                OrdersState.error = null;
                OrdersState.ordersItems = OrdersState.ordersItems.filter((item)=> item.book_id !== action.payload);
            })
            .addCase(deleteOrderItemFromDatabase.rejected, (OrdersState, action)=>{
                OrdersState.isLoading = false;
                OrdersState.error = action.payload || "Failed to delete item";
            })


            .addCase(clearUserOrdersFromDatabase.pending, (OrdersState)=>{
                    OrdersState.isLoading = true;
                    OrdersState.error = null;
            })
            .addCase(clearUserOrdersFromDatabase.fulfilled, (OrdersState)=>{
                OrdersState.isLoading = false;
                OrdersState.error = null;
                OrdersState.ordersItems = []
            })
            .addCase(clearUserOrdersFromDatabase.rejected, (OrdersState, action)=>{
                OrdersState.isLoading = false;
               OrdersState.error = action.payload || "Failed to Clear Orders items";
            })
        }
    }
)


export const { defineOrderBooksIds } = cartStoreSlice.actions;
export default cartStoreSlice.reducer;
