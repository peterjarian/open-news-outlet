'use server';

import { tryCatch } from '@/lib/try-catch';
import { success, failure } from './index';
import { uploadImageToS3 } from '@/lib/s3';
import { MAX_UPLOAD_SIZE } from '@/constants';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function uploadImage(file: File) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return failure('You are not allowed to upload files');

  if (!file.type.startsWith('image/')) return failure('Only images are allowed');
  if (file.size > MAX_UPLOAD_SIZE) return failure('File size too large. Maximum size is 5MB');

  const { data: url, error: uploadError } = await tryCatch(uploadImageToS3(file));

  if (uploadError) {
    console.log('[S3] Failed to upload article image', uploadError);
    return failure('Failed to upload image');
  }

  return success({ url });
}
