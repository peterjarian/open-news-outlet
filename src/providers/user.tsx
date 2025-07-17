'use client';

import { userTable } from '@/lib/drizzle/schema';
import { InferSelectModel } from 'drizzle-orm';
import { createContext, ReactNode, useState } from 'react';

type User = InferSelectModel<typeof userTable>;

type UserContextType = {
  user: User;
  setUser: (article: User) => void;
  changed: boolean;
  setChanged: (changed: boolean) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  initialUser: User;
  children: ReactNode;
};

export function UserProvider({ initialUser, children }: UserProviderProps) {
  const [changed, setChanged] = useState(false);
  const [user, setUser] = useState<User>(initialUser);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        changed,
        setChanged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
