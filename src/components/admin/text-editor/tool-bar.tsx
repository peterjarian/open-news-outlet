import { Bold, Heading2, Heading3, Italic, List, ListOrdered, Strikethrough } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { Toggle } from '@/components/ui/toggle';

export function ToolBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const Options = [
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive('heading', { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive('bold'),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive('italic'),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive('strike'),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive('orderedList'),
    },
  ];

  return (
    <div className="space-x-2 border-b p-2">
      {Options.map((option, index) => (
        <Toggle key={index} pressed={option.pressed} onPressedChange={option.onClick}>
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}

export function ToolBarSkeleton() {
  const icons = [
    <Heading2 key="h2" className="size-4" />,
    <Heading3 key="h3" className="size-4" />,
    <Bold key="bold" className="size-4" />,
    <Italic key="italic" className="size-4" />,
    <Strikethrough key="strike" className="size-4" />,
    <List key="list" className="size-4" />,
    <ListOrdered key="ordered" className="size-4" />,
  ];

  return (
    <div className="space-x-2 border-b p-2">
      {icons.map((icon, i) => (
        <Toggle key={i}>{icon}</Toggle>
      ))}
    </div>
  );
}
