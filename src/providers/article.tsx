'use client';

import { articleTable } from '@/lib/drizzle/schema';
import { InferSelectModel } from 'drizzle-orm';
import { createContext, ReactNode, useState } from 'react';

type ArticleContextType = {
  article: InferSelectModel<typeof articleTable>;
  setArticle: (article: InferSelectModel<typeof articleTable>) => void;
  changed: boolean;
  setChanged: (changed: boolean) => void;
};

export const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

type ArticleProviderProps = {
  initialArticle: InferSelectModel<typeof articleTable>;
  children: ReactNode;
};

export function ArticleProvider({ initialArticle, children }: ArticleProviderProps) {
  const [changed, setChanged] = useState(false);
  const [article, setArticle] = useState<InferSelectModel<typeof articleTable>>(initialArticle);

  return (
    <ArticleContext.Provider
      value={{
        article,
        setArticle,
        changed,
        setChanged,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
}
