'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ReactNode } from 'react';
import { createClient } from '@/utils/supabase/client';
import { loadWishListFromDB } from '@/store/thunks/WishListThunks/loadWishListFromDB';
import { loadCartFromDB } from '@/store/thunks/CartThunks/loadCartFromDB';
import { setUser, setUserId } from '@/lib/redux/UserSlice/UserSlice';
import { AppDispatch } from '@/lib/redux/reduxStore';


export default function UserHydrationProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      const user = data?.user
      const userId = data?.user?.id;

      if (userId) {
        dispatch(setUser(user));
        dispatch(setUserId(userId));
        dispatch(loadCartFromDB(userId)); 
        dispatch(loadWishListFromDB(userId));
      }
    };

    fetchUser();
  }, [dispatch]);

  return <>{children}</>;
}
