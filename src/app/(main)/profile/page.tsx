'use client'

import { Box, Typography, Grid } from '@mui/material';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/reduxStore';

import OrdersCard from '@/app/_Components/MicroComps/OrdersCard/OrdersCard';
import UpdateModal from '@/app/_Components/MicroComps/updateModal/updateModal';
import ProfileCard from '@/app/_Components/MicroComps/ProfileCard/ProfileCard';
import {  IUserProfileData } from '@/app/_Interfaces/IUserData';
import { useProfileLogic } from '@/app/hooks/useProfileLogic';
import BooksResponseLoader from '@/app/_Components/Loaders/BooksResponseLoader/BooksResponseLoader';


export interface IEditedPart{
    label:string,
    name:string,
    value:string,
}

export default function Profile() {

    const dispatch = useDispatch<AppDispatch>();
    const { user, userPhone, userAddress, isLoading: userLoading }  = useSelector((userState:RootState)=> userState.userStore);
    const user_id = user?.id ?? '';
    useProfileLogic(user_id, dispatch);
    const {ordersItems, isLoading:ordersLoading} = useSelector((orderState:RootState)=> orderState.orderStore);

    const [modalState, setModalState] = useState<boolean>(false);
    const [modalFields, setModalFields] = useState<IEditedPart[]>([]);

    
    const userData:IUserProfileData = {
        name:  user?.user_metadata?.username  ?? 'Guest',
        email: user?.email ?? 'No Email',
        phone: user?.user_metadata?.phone ? user?.user_metadata?.phone : 'Not Provided',
        avatarUrl: user?.user_metadata?.avatar_url ?? '',
        mainAddress: user?.user_metadata?.address ? user?.user_metadata?.address : 'Not Provided',
    };

  const openModalWithField = (label: string, name: string, value: string) => {
    setModalFields([{ label, name, value }]);
    setModalState(true);
  };

  return (
    <>
        {user &&  
                  <Box  className="  p-6 min-h-screen container">
                      <Typography variant="h5" className="mb-4 font-semibold flex items-center justify-center lg:justify-start">
                          Profile Overview
                      </Typography>

                      <Grid container spacing={2} className="my-6 flex items-center justify-center lg:justify-start">
                        <Grid size={{ xs: 12, md: 6 }}>
                            {userLoading && <BooksResponseLoader /> }
                            {!userLoading &&  <ProfileCard userData={userData} userAddress={userAddress} userPhone={userPhone} openModalWithField={openModalWithField}/>}
                        </Grid>
                      </Grid>

                      {ordersLoading && <BooksResponseLoader />}
                      {!ordersLoading && ordersItems.length !== 0 && <OrdersCard orders={ordersItems}/>}

                      {modalState && <UpdateModal editedSection={modalFields} openState={modalState} setOpenState={setModalState} user_id={user_id!} />}
                    
                  </Box>
          }

        {!user && <BooksResponseLoader />}
    </>
  );
}

