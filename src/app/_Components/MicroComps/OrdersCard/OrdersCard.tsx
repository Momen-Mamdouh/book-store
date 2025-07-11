

'use client';

import React from 'react';

import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TableContainer, Typography, Chip, Stack } from '@mui/material';

import { IOrder } from '@/app/_Interfaces/IAddedBookData';
import ClearAllItemsBtn from '@/app/_Components/Buttons/ClearAllItemsBtn/ClearAllItemsBtn';
import DeleteItemBtn from '@/app/_Components/Buttons/DeleteItemBtn/DeleteItemBtn';



export default function OrdersCard({ orders }: {orders:IOrder[]}) {

  return (
    <div className='container'>
        <TableContainer component={Paper} sx={{ mt: 4, p:2, backgroundColor:'inherit' }}>
            <Stack direction='row' sx={{display:'flex', justifyContent:{sm:'center'}, alignItems:'center'}}>
                <Typography variant="h6" sx={{ px: 4 }}>
                    Your Orders 
                </Typography>

                {orders.length !== 0 && orders[0].user_id &&  <ClearAllItemsBtn user_id={orders[0].user_id} inWhichComp={'orders'} />}
            </Stack>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell align="right">Books</TableCell>
                <TableCell align="right">Total Price</TableCell>
            </TableRow>
            </TableHead>

            <TableBody>
            {orders.map((order) => (
                <TableRow key={order.id}>
                <TableCell sx={{width:'25%'}}>{order.order_id}</TableCell>

                <TableCell>{order.created_at?.split("T").slice(0)[0]}</TableCell>
                <TableCell>
                    <Chip
                    label={'In Transit'}
                    color={ 'warning'}
                    variant="outlined"
                    />
                </TableCell>

                <TableCell>{order.user_id && (<DeleteItemBtn book_id={order.book_id} user_id={order.user_id} inWhichComp="orders" />)}</TableCell>
                <TableCell className='text-xl' align="right">{order.book_count}</TableCell>
                <TableCell align="right">£E {Number((order.book_price * order.book_count).toFixed(2))}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}
