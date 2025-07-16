import { JSONContent } from '@tiptap/react';
import {
  AnyPgColumn,
  pgTable,
  integer,
  text,
  timestamp,
  boolean,
  serial,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core';

export enum ArticleStatus {
  CONCEPT = 'concept',
  DRAFT = 'draft',
  REVIEW = 'review',
  PUBLISHED = 'published',
}

export function enumToPgEnum<T extends Record<string, string | number>>(
  myEnum: T,
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum).map((value) => String(value)) as [T[keyof T], ...T[keyof T][]];
}

export const statusEnum = pgEnum('status', enumToPgEnum(ArticleStatus));

export const categoryTable = pgTable('categories', {
  id: serial().primaryKey(),
  title: text().notNull(),
  slug: text().unique().notNull(),
  parentId: integer().references((): AnyPgColumn => categoryTable.id),
});

export const articleTable = pgTable('articles', {
  id: serial().primaryKey(),
  slug: text().unique(),
  title: text().notNull(),
  description: text().notNull(),
  seoTitle: text(),
  seoDescription: text(),
  featuredImage: text(),
  content: jsonb().$type<JSONContent>(),
  archived: boolean().notNull().default(false),
  categoryId: integer().references(() => categoryTable.id),
  authorId: text().references(() => userTable.id),
  status: statusEnum('status').notNull().default(ArticleStatus.CONCEPT),
  publishedAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text('role'),
  banned: boolean('banned'),
  banReason: text('ban_reason'),
  banExpires: timestamp('ban_expires'),
});

export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  impersonatedBy: text('impersonated_by'),
});

export const accountTable = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verificationTable = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()),
});
