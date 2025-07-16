import { auth } from '@/lib/auth';
import { db } from '@/lib/drizzle';
import { userTable } from '@/lib/drizzle/schema';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { InferSelectModel } from 'drizzle-orm';

type User = InferSelectModel<typeof userTable>;

type SuccessResponse = {
  success: true;
  data: User[];
};

type ErrorResponse = {
  success: false;
  error: string;
};

export type UsersApiResponse = SuccessResponse | ErrorResponse;

const paginationSchema = z.object({
  offset: z.number().default(1),
  limit: z.number().default(10),
});

export async function GET(req: NextRequest): Promise<NextResponse<UsersApiResponse>> {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({
      success: false,
      error: 'You are not allowed to get users.',
    });
  }

  const pagination = await paginationSchema.safeParseAsync(req.nextUrl.searchParams);

  if (!pagination.success) {
    return NextResponse.json({
      success: false,
      error: pagination.error.issues[0].message,
    });
  }

  const users = await db
    .select()
    .from(userTable)
    .limit(pagination.data.limit)
    .offset(pagination.data.offset);

  return NextResponse.json({
    success: true,
    data: users,
  });
}
