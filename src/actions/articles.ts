'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { failure, success } from '.';
import { db } from '@/lib/drizzle';
import { ArticleStatus, articleTable } from '@/lib/drizzle/schema';
import { tryCatch } from '@/lib/try-catch';
import { slugify } from '@/lib/utils';
import {
  CreateArticleData,
  createArticleSchema,
  UpdateArticleData,
  updateArticleSchema,
} from '@/schemas/articles';
import DOMPurify from 'isomorphic-dompurify';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

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
      })
      .returning(),
  );

  if (error) {
    console.log('[ARTICLES] Failed to create article, probably because it already exists', error);
    return failure('An article with this title already exists.');
  }

  revalidatePath('/admin/articles');

  return success(createdArticle[0]);
}

export async function saveArticle(id: number, data: UpdateArticleData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return failure('You are not allowed to update this article.');

  const validate = await updateArticleSchema.safeParseAsync(data);
  if (!validate.success) return failure(validate.error.issues[0].message);

  const { data: foundArticles, error: findError } = await tryCatch(
    db
      .select()
      .from(articleTable)
      .where(eq(articleTable.id, Number(id)))
      .limit(1),
  );

  if (findError) {
    console.log('[ARTICLES] Failed to find article:', findError);
    return failure('Failed to find article.');
  }

  const article = foundArticles[0];

  if (!article) {
    console.log('[ARTICLES] Article not found for id:', id);
    return failure('Article not found.');
  }

  if (article.authorId !== session.user.id) {
    return failure('You are not allowed to update this article.');
  }

  const purified = {
    title: validate.data.title ? DOMPurify.sanitize(validate.data.title) : undefined,
    description: validate.data.description
      ? DOMPurify.sanitize(validate.data.description)
      : undefined,
  } as const;

  const { data: updatedArticles, error: updateError } = await tryCatch(
    db
      .update(articleTable)
      .set({
        title: purified.title,
        description: purified.description,
        content: data.content,
        updatedAt: new Date(),
        status: data.status as ArticleStatus,
      })
      .where(eq(articleTable.id, Number(id)))
      .returning(),
  );

  if (updateError) {
    console.log('[ARTICLES] Failed to update article', updateError);
    return failure('Failed to update article.');
  }

  revalidatePath('/admin/articles');

  return success(updatedArticles[0]);
}

export async function archiveArticle(id: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return failure('You are not allowed to archive this article.');

  const { data, error } = await tryCatch(
    db.update(articleTable).set({ archived: true }).where(eq(articleTable.id, id)).returning(),
  );

  if (error) {
    console.log('[ARTICLE] Failed to archive article:', error);
    return failure('Failed to archive the article.');
  }

  return success(data[0]);
}

export async function deleteArticle(id: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return failure('You are not allowed to delete this article.');

  const { error } = await tryCatch(db.delete(articleTable).where(eq(articleTable.id, id)));

  if (error) {
    console.log('[ARTICLE] Failed to delete article:', error);
    return failure('Failed to delete the article.');
  }

  revalidatePath('/admin/articles');

  return success({});
}
