'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/server'
import type { User } from '@supabase/supabase-js';

export function useSupabaseUser() {
    const [user, setUser] = useState<null | User>(null);
;
  useEffect(() => {
    const getUser = async () => {
       const supabase = await createClient();
      const {data} = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    };

    getUser();
  }, []);

  return { user };
}
