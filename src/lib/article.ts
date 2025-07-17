import { generateHTML, JSONContent } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { htmlToText } from 'html-to-text';
import countWords from 'words-count';
import { ArticleStatus } from './drizzle/schema';

export function getWordCount(content: JSONContent) {
  const text = htmlToText(generateHTML(content, [StarterKit]));
  return countWords(text);
}

export function calculateReadTime(words: number) {
  return Math.ceil(words / 200);
}

export function getStatusColor(status: ArticleStatus) {
  switch (status) {
    case ArticleStatus.CONCEPT:
      return 'bg-gray-400';
    case ArticleStatus.PUBLISHED:
      return 'bg-green-500';
  }
}
