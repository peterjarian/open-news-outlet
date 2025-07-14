'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { failure, success } from '.';
import { db } from '@/lib/drizzle';
import { articleTable } from '@/lib/drizzle/schema';
import { tryCatch } from '@/lib/try-catch';
import { slugify } from '@/lib/utils';
import { CreateArticleData, createArticleSchema } from '@/schemas/articles';
import DOMPurify from 'isomorphic-dompurify';

export async function createArticle(article: CreateArticleData) {
  const validate = await createArticleSchema.safeParseAsync(article);
  if (!validate.success) return failure(validate.error.issues[0].message);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return failure('You are not allowed to create an article.');

  const purified = {
    title: DOMPurify.sanitize(validate.data.title),
    description: DOMPurify.sanitize(validate.data.description),
  } as const;

  const { data: createdArticle, error } = await tryCatch(
    db
      .insert(articleTable)
      .values({
        title: purified.title,
        slug: slugify(purified.title),
        description: purified.description,
        featuredImage: '',
        authorId: session.user.id,
        status: 'concept',
      })
      .returning(),
  );

  if (error) {
    console.log('[ARTICLES] Failed to create article, probably because it already exists', error);
    return failure('An article with this title already exists.');
  }

  return success(createdArticle[0]);
}
