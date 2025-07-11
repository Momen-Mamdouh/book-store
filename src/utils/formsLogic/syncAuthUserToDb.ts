'use client'

import { createClient } from '@/utils/supabase/client';

export async function syncAuthUserToDb(
  userId: string,
  updateFields: Record<string, unknown>
) {
  const supabase = createClient();

  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .maybeSingle();
    

    if (fetchError) {
      console.error('Error:', fetchError.message);
      return { success: false, error: fetchError };
    }



    let dbOp;

    if (!existingUser) {

      dbOp = await supabase.from('users').insert({
        id: userId,
        ...updateFields,
      });
      } else {
        dbOp = await supabase.from('users')
          .update(updateFields)
          .eq('id', userId);
      }
  

  if (dbOp.error) {
    console.error('Failed to sync public.users:', dbOp.error.message);
    return { success: false, error: dbOp.error };
  }

  return { success: true };
}
