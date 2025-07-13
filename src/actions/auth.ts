'use server';

import { db } from '@/lib/drizzle';
import { verificationTable } from '@/lib/drizzle/schema';
import { gte } from 'drizzle-orm';
import { tryJSONParse } from '@/lib/try-json-parse';

import { failure, success } from '.';
import { authClient } from '@/lib/auth/client';

export async function sendMagicLink(email: string) {
  const verifications = await db
    .select()
    .from(verificationTable)
    .where(gte(verificationTable.createdAt, new Date(Date.now() - 60 * 1000)));

  const verification = verifications.find((v) => {
    const data = tryJSONParse<{ email: string }>(v.value);
    if (data.isErr()) return failure('Failed to parse verification data');
    if (data.value.email) return v;
  });

  if (verification) {
    const message =
      'A magic link was recently sent to this email. Please check your inbox or try again in a minute.';
    return failure(message);
  }

  const { error } = await authClient.signIn.magicLink({
    email,
    callbackURL: '/admin/sign-in',
  });

  if (error) return failure('Failed to create a magic link.');

  return success('A magic link was sent to your email.');
}
