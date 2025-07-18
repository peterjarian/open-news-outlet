import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { env } from '../env';
import { tryCatch } from './try-catch';
import { randomUUID } from 'crypto';

export type BucketCategories = 'avatars';

export const s3 = new S3Client({
  endpoint: env.S3_ENDPOINT,
  region: 'us-east-1',
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

export async function uploadImageToS3(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const key = `uploads/${Date.now()}-${file.name}`;

  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: key,
    Body: Buffer.from(buffer),
    ContentType: file.type,

    ACL: 'public-read',
  });

  await s3.send(command);

  console.log(`${env.S3_ENDPOINT}/${env.S3_BUCKET_NAME}/${key}`);

  return `${env.S3_ENDPOINT}/${env.S3_BUCKET_NAME}/${key}`;
}

export async function removeFileFromBucket(key: string): Promise<boolean> {
  const command = new DeleteObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: key,
  });

  console.log(key);

  const { error } = await tryCatch(s3.send(command));

  if (error) {
    console.log('[S3] Failed to remove file from S3', error);
    return false;
  }

  return true;
}

export function getKeyFromUrl(url: string) {
  const pathname = new URL(url).pathname;
  const pathParts = pathname.split('/').filter(Boolean);

  if (pathParts.length >= 2) {
    return pathParts.slice(1).join('/');
  }

  return pathname;
}

export async function uploadFileToBucket(category: BucketCategories, file: File) {
  const uuid = randomUUID();
  const extension = file.name.split('.').pop() ?? '';

  let key = `${category}/${uuid}`;
  if (extension) key += `.${extension}`;

  const buffer = await file.arrayBuffer();

  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: key,
    Body: Buffer.from(buffer),
    ContentType: file.type,
    ACL: 'public-read',
  });

  const { error } = await tryCatch(s3.send(command));

  if (error) {
    console.log('[S3] Failed to add file to S3', error);
    return null;
  }

  return `${env.S3_ENDPOINT}/${env.S3_BUCKET_NAME}/${key}`;
}
