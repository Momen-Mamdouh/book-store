
'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/redux/UserSlice/UserSlice';
import { User } from '@supabase/supabase-js';

export default function ReduxHydrator({ user }: { user: User | null }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(user));
  }, [user, dispatch]);

  return null; 
}
