'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ToolBar, ToolBarSkeleton } from './tool-bar';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { type JSONContent } from '@tiptap/react';
import { Heading } from '@tiptap/extension-heading';

type TextEditorProps = {
  content?: JSONContent;
  onChange(content: JSONContent): void;
};

export function TextEditor({ content, onChange }: TextEditorProps) {
  const [isReady, setIsReady] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit.configure({ heading: false }), Heading.configure({ levels: [2, 3] })],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-base m-5 focus:outline-none prose-h2:text-lg prose-h2:mt-3 prose-h2:mb-1 prose-h3:text-base prose-h3:mt-2 prose-h3:mb-1 prose-p:text-sm prose-p:my-1 prose-li:my-0 prose-ul:my-1 prose-ol:my-1 text-foreground',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
    onCreate() {
      setIsReady(true);
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!content) editor?.commands.setContent({ type: 'doc', content: [] });
  }, [content, editor?.commands]);

  if (!isReady || !editor) {
    return <TextEditorSkeleton />;
  }

  return (
    <div className="rounded-md border">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function TextEditorSkeleton() {
  return (
    <div className="rounded-md border">
      <ToolBarSkeleton />
      <div className="bg-background min-h-[300px] p-5">
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
