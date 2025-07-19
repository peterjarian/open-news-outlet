'use server';

import { UpdateUserData, updateUserSchema } from '@/schemas/users';
import { failure, success } from '.';
import { db } from '@/lib/drizzle';
import { userTable } from '@/lib/drizzle/schema';
import { tryCatch } from '@/lib/try-catch';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getKeyFromUrl, removeFileFromBucket, uploadFileToBucket } from '@/lib/s3';
import { eq } from 'drizzle-orm';

export async function updateUser(id: string, input: UpdateUserData) {
  console.log(input);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || (session.user.role !== 'admin' && session.user.id !== id)) {
    return failure('You are not allowed to update this user.');
  }

  const validate = await updateUserSchema.safeParseAsync(input);
  if (!validate.success) return failure(validate.error.issues[0].message);

  let newImageUrl = null;
  let oldImageKey = null;

  if (validate.data.image !== undefined) {
    const { data: currentUser, error: fetchError } = await tryCatch(
      db.select({ image: userTable.image }).from(userTable).where(eq(userTable.id, id)),
    );

    if (fetchError || !currentUser.length) {
      return failure('Failed to fetch current user data');
    }

    if (currentUser[0].image) {
      oldImageKey = getKeyFromUrl(currentUser[0].image);
    }

    // If image is null, we're removing it
    // If image is a File, we're uploading a new one
    if (validate.data.image) {
      newImageUrl = await uploadFileToBucket('avatars', validate.data.image);
      if (!newImageUrl) return failure('Failed to upload image.');
    }
  }

  const updateData = {
    bylineName: input.bylineName,
    isPublicProfile: input.isPublicProfile,
    ...(newImageUrl && { image: newImageUrl }),
    ...(validate.data.image === null && { image: null }),
  };

  const { data: userUpdateData, error: userUpdateError } = await tryCatch(
    db.update(userTable).set(updateData).where(eq(userTable.id, id)).returning(),
  );

  if (userUpdateError || !userUpdateData.length) {
    console.log('[USERS] Failed to update user:', userUpdateError);
    return failure('Failed to update the user');
  }

  if (oldImageKey) {
    await removeFileFromBucket(oldImageKey);
  }

  return success(userUpdateData[0]);
}
