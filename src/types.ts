import { InferSelectModel } from 'drizzle-orm';
import { userTable } from './lib/drizzle/schema';

export enum ArticleStatus {
  CONCEPT = 'concept',
  PUBLISHED = 'published',
}

export type ApiErrorResponse = {
  data: null;
  error: string;
};

export type ApiSuccessResponse<T> = {
  data: T;
  error: null;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type UserProps = InferSelectModel<typeof userTable>;

export type GetUsersApiResponse = {
  users: UserProps[];
  total: number;
};
