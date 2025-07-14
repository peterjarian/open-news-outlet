'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { failure, success } from '.';
import { db } from '@/lib/drizzle';
import { articleTable } from '@/lib/drizzle/schema';
import { tryCatch } from '@/lib/try-catch';
import { slugify } from '@/lib/utils';
import { CreateArticleData, createArticleSchema } from '@/schemas/articles';
import { generateJSON } from '@tiptap/html/server';
import StarterKit from '@tiptap/starter-kit';
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
    content: DOMPurify.sanitize(validate.data.content),
  } as const;

  const { error } = await tryCatch(
    db.insert(articleTable).values({
      title: purified.title,
      slug: slugify(purified.title),
      description: purified.description,
      content: JSON.stringify(generateJSON(purified.content, [StarterKit])),
      featuredImage: '',
      authorId: session.user.id,
      status: 'published',
    }),
  );

  if (error) {
    console.log('[ARTICLES] Failed to create article, probably because it already exists', error);
    return failure('An article with this title already exists.');
  }

  return success('Article created');
}
