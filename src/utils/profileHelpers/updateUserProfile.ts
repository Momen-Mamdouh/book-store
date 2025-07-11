
import { AppDispatch } from '@/lib/redux/reduxStore';
import { setUserAddress, setUserImg, setUserPhone } from '@/lib/redux/UserSlice/UserSlice';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';


export async  function  updateUserProfile(
        updateData:Record<string, string>,
        user_id:string,
        dispatch:AppDispatch,
    ){


    const supabase = createClient();

    // ^^1st update userMetadata in auth 
    const { error: authUpdateError } = await supabase.auth.updateUser({
            data: updateData,
    });

    // ^^2nd check for update userMetadata in auth errors
    if (authUpdateError) {
        toast.error(authUpdateError.message);
        return false;
    }

    // ^^3rd decalare the updated data and phone be alone as it's name is diff in public.users
    const { phone, ...editedData } = updateData;

    // ^^4th update public.users with the same data updated in auth.users
    const { error: dbUpdateError } = await supabase
        .from("users")
        .update({...editedData, phonenumber:phone})
        .eq("user_id", user_id);

    // ^^5th check for any update errors in public.users 
    if (dbUpdateError) {
        toast.error(dbUpdateError.message);
        return false;
    }

    // ^^6th dipatch these updates in redux to use data from redux updated
    if (updateData.address) dispatch(setUserAddress(updateData.address));
    if (updateData.phonenumber) dispatch(setUserPhone(updateData.phonenumber)); 
    if (updateData.avatar_url) dispatch(setUserImg(updateData.avatar_url));
    toast.success('Profile Updated');
    return true;
}