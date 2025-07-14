'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TextEditor } from '@/components/admin/text-editor';
import { InferSelectModel } from 'drizzle-orm';
import { articleTable } from '@/lib/drizzle/schema';
import { tryJSONParse } from '@/lib/try-json-parse';
import { generateHTML, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';

type ArticlePageClientProps = {
  article: InferSelectModel<typeof articleTable>;
};

function getInitialContent(content: string | null) {
  if (!content) return '';

  const res = tryJSONParse<JSONContent>(content);

  if (res.isErr()) {
    console.log('[WARNING] Failed to parse article content to HTML');
    return content;
  }

  return generateHTML(res.value, [StarterKit]);
}

export function ArticlePageClient({ article }: ArticlePageClientProps) {
  const [defaultContent, setDefaultContent] = useState('');

  useEffect(() => {
    setDefaultContent(getInitialContent(article.content));
  }, [article.content]);

  const handleSave = () => {
    // You'll implement the server action here
    console.log('Save article:', article);
  };

  const handlePublish = () => {
    // You'll implement the server action here
    console.log('Publish article:', { ...article, status: 'published' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <p className="text-muted-foreground">Edit article details and content</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Article Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" defaultValue={article.title} placeholder="Enter article title" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                defaultValue={article.description || ''}
                placeholder="Enter article description"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input
                id="featuredImage"
                defaultValue={article.featuredImage || ''}
                placeholder="Enter image URL"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                defaultValue={article.status}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <TextEditor
              content={defaultContent}
              onChange={(content) => console.log('Content changed:', content)}
            />
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={handleSave} variant="outline">
            Save Draft
          </Button>
          <Button onClick={handlePublish}>
            {article.status === 'published' ? 'Update Published' : 'Publish'}
          </Button>
        </div>
      </div>
    </div>
  );
}
