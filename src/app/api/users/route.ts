import { auth } from '@/lib/auth';
import { db } from '@/lib/drizzle';
import { userTable } from '@/lib/drizzle/schema';
import { paginationSchema } from '@/lib/zod/pagination';
import { ApiResponse, GetUsersApiResponse } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

const schema = paginationSchema;

export async function GET(req: NextRequest) {
  const searchParams = {
    limit: req.nextUrl.searchParams.get('limit'),
    offset: req.nextUrl.searchParams.get('offset'),
  };

  const validate = await schema.safeParseAsync(searchParams);

  if (!validate.success) {
    return NextResponse.json<ApiResponse<GetUsersApiResponse>>(
      {
        error: validate.error.issues[0].message,
        data: null,
      },
      { status: 400 },
    );
  }

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json<ApiResponse<GetUsersApiResponse>>(
      {
        error: 'You are not allowed to see user data.',
        data: null,
      },
      { status: 401 },
    );
  }

  console.log(validate.data);

  const [users, total] = await Promise.all([
    db.select().from(userTable).limit(validate.data.limit).offset(validate.data.offset),
    db.$count(userTable),
  ]);

  return NextResponse.json<ApiResponse<GetUsersApiResponse>>({
    error: null,
    data: {
      users,
      total,
    },
  });
}
