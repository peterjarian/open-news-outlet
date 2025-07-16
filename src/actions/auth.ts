'use server';

import { db } from '@/lib/drizzle';
import { userTable, verificationTable } from '@/lib/drizzle/schema';
import { eq, gte } from 'drizzle-orm';
import { tryJSONParse } from '@/lib/try-json-parse';

import { failure, success } from '.';
import { authClient } from '@/lib/auth/client';
import { InviteUserData, LoginData, loginSchema } from '@/schemas/auth';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { tryCatch } from '@/lib/try-catch';
import { randomBytes } from 'crypto';
import { resend } from '@/lib/resend';
import { env } from '@/env';

export async function sendMagicLink({ email }: LoginData) {
  const validate = await loginSchema.safeParseAsync({ email });
  if (!validate.success) return failure(validate.error.issues[0].message);

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

  if (error) {
    console.log('[AUTH] Failed to create magic link', error);
    return failure('Failed to create a magic link.');
  }

  return success('A magic link was sent to your email.');
}

export async function inviteUser({ name, email }: InviteUserData) {
  const validate = await loginSchema.safeParseAsync({ email });
  if (!validate.success) return failure(validate.error.issues[0].message);

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.role !== 'admin') {
    return failure('You are not allowed to invite people.');
  }

  // make sure the person invited isn't a user
  const { data, error } = await tryCatch(
    db.select().from(userTable).where(eq(userTable.email, email)),
  );

  if (error) {
    console.log('[AUTH] Failed to invite a user:', error);
    return failure('Failed to invite the user.');
  }

  if (data.length > 0) return failure('A user with this email already exists.');

  const { error: createUserError } = await tryCatch(
    auth.api.createUser({
      body: {
        email,
        name,
        password: randomBytes(32).toString('hex'),
        role: 'user',
      },
    }),
  );

  if (createUserError) {
    console.log('[AUTH] Failed to create invited user:', error);
    return failure('Failed to create the user.');
  }

  const { error: resendError } = await resend.emails.send({
    from: env.RESEND_EMAIL,
    to: email,
    subject: `Invite for ${env.NEXT_PUBLIC_BRAND_NAME}`,
    text: `${env.NEXT_PUBLIC_BASE_URL}/admin`,
  });

  if (resendError) {
    console.log('[AUTH] Failed to send email to user:', resendError);
    return failure('Failed to send the email, the user can still login.');
  }

  return success('Instructions where send to the person.');
}
