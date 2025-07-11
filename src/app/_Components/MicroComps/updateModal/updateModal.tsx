'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid,  IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/reduxStore';
import { IEditedPart } from '@/app/(main)/profile/page';

import { updateUserProfile } from '@/utils/profileHelpers/updateUserProfile';

export default function UpdateModal({openState, setOpenState, user_id, editedSection:modalFields}:
                {openState:boolean, setOpenState: Dispatch<SetStateAction<boolean>>, user_id:string, editedSection:IEditedPart[]}) {

    const {userAddress, userPhone, userImg} = useSelector((userState:RootState)=> userState.userStore);
    const dispatch = useDispatch<AppDispatch>();


    const [formValues, setFormValues] = useState({
        address: userAddress,
        phone: userPhone,
        avatar_url: userImg,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));

    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updateData: Record<string, string> = {};
        modalFields.forEach((field) => {
            updateData[field.name] = formValues[field.name as keyof typeof formValues];
        });

        const success = await updateUserProfile(updateData, user_id, dispatch);

        if(success) setOpenState(false);
    };

  return (
    <>

      <Dialog open={openState} onClose={() => setOpenState(false)} fullWidth maxWidth="md">

        <DialogTitle>
            Update Acoount Data
          <IconButton
            aria-label="close"
            onClick={() => setOpenState(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container spacing={2}>
                {modalFields.map((field)=>(
                        <Grid  size={{ xs: 12, sm: 6 }} key={field.name}>
                            <TextField
                              fullWidth
                              name={field.name}
                              label={field.label}
                              value={formValues[field.name as keyof typeof formValues] || ""}
                              onChange={handleChange}
                              variant="outlined"
                            />
                        </Grid>
                ))}
              


            </Grid>
          </DialogContent>

          <DialogActions>
            <Button type="submit" variant="contained" color="warning">
              Update Profile
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
