import { env } from '@/env';
import { db } from '@/lib/drizzle';
import { articleTable } from '@/lib/drizzle/schema';
import { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { generateHTML } from '@tiptap/html/server';
import StarterKit from '@tiptap/starter-kit';

export const metadata: Metadata = {
  title: env.NEXT_PUBLIC_BRAND_NAME,
  description:
    'An open-source platform solution to empower anyone to create, manage, and publish articles.',
};

export default async function Page() {
  const x = await db
    .select()
    .from(articleTable)
    .where(eq(articleTable.slug, 'test-if-things-work'))
    .limit(1);
  const article = x[0];

  console.log(generateHTML(article.content!, [StarterKit]));

  return <div dangerouslySetInnerHTML={{ __html: generateHTML(article.content!, [StarterKit]) }} />;
}
