
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createClient } from '@/utils/supabase/client';
import { setUserAddress, setUserImg, setUserPhone } from '@/lib/redux/UserSlice/UserSlice';
import toast from 'react-hot-toast';

export const loadUserProfileFromDB = createAsyncThunk(
  'user/loadUserProfileFromDB',
  async (user_id: string, { dispatch }) => {
    const supabase = createClient();
    
    const { data, error:userUpdateError } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', user_id)
      .maybeSingle();

    if (userUpdateError) {
        console.log(data)
        toast.error(userUpdateError.message);
        return;
    }
    console.log('From loadUser:  '+ user_id);
    console.log(data);
    // Dispatch each part to Redux
    if (data.address) dispatch(setUserAddress(data.address));
    if (data.phonenumber) dispatch(setUserPhone(data.phonenumber));
    if (data.avatar_url) dispatch(setUserImg(data.avatar_url));

    toast.success('Profile is updated Successfully 👌');

    return data;
  }
);
