'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import ResponseDialog from '@/app/_Components/Loaders/responseDialog/responseDialog';

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const handleRedirect = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (!sessionData.session || sessionError) {
        router.replace('/login');
        return;
      };

      const user = sessionData.session.user;

      // ✅ 1. Check if user already exists in your `users` table
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!existingUser || fetchError) {
        const { error: insertError } = await supabase.from('users').insert({
          id: user.id,
          email: user.email,
          username: user.user_metadata?.username ?? '',
          phone: user.phone ?? null,
        });

        if (insertError) {
          console.error('Failed to insert user into public.users:', insertError.message);
        };
      };

      setShowDialog(true);
    };

    handleRedirect();
  }, [router, supabase]);

  const handleDialogClose = () => {
    router.replace('/profile');
  };

  return(
          <>  
             {showDialog && (
              <ResponseDialog
                  open={showDialog}
                  title="Welcome to Book Store 👋"
                  message="Your account successfully Login 👍"
                  buttonText="Go to Profile"
                  onConfirm={handleDialogClose}
              />
            )}
          </>
       );
}
