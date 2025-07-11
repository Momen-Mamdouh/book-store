// src/utils/profileHelpers/changeAvatarImg.ts

import { createClient } from '@/utils/supabase/client';

export async function uploadUserAvatar(file: File) {
  const supabase = createClient();

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (!file || file.size === 0 || !userId) {
    return { error: 'Invalid file or user ID.' };
  }

  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/avatar.${fileExt}`;

  // Delete any previous file to avoid MIME conflicts (optional)
  await supabase.storage.from('avatars').remove([filePath]);

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    return { error: `Upload failed: ${uploadError.message}` };
  }

  // Get the public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from('avatars').getPublicUrl(filePath);

  // Update DB
  const { error: dbError } = await supabase
    .from('users')
    .update({ avatarUrl: publicUrl })
    .eq('id', userId);

  if (dbError) {
    return { error: `DB update failed: ${dbError.message}` };
  }

  return { publicUrl };
}
