import { ArticleContext } from '@/providers/article';
import { use } from 'react';

export function useArticle() {
  const context = use(ArticleContext);
  if (!context) throw new Error('useArticle must be used within a ArticleProvider');
  return context;
}
