'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { ToolBar } from './tool-bar';

type TextEditorProps = {
  content?: string;
  onChange(richText: string): void;
};

export function TextEditor({ content, onChange }: TextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-base m-5 focus:outline-none prose-h2:text-lg prose-h2:mt-3 prose-h2:mb-1 prose-h3:text-base prose-h3:mt-2 prose-h3:mb-1 prose-p:text-sm prose-p:my-1 prose-li:my-0 prose-ul:my-1 prose-ol:my-1',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="rounded-md border">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
