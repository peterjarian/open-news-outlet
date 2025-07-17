import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '../env';

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
