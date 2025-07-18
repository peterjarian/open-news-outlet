'use client';

import { userTable } from '@/lib/drizzle/schema';
import { InferSelectModel } from 'drizzle-orm';
import { createContext, ReactNode, useState, useMemo } from 'react';

type User = InferSelectModel<typeof userTable>;

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
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
  const [currentUser, setCurrentUser] = useState<User>(initialUser);

  const contextValue = useMemo(() => {
    return {
      user: currentUser,
      setUser: setCurrentUser,
      changed,
      setChanged,
    };
  }, [currentUser, changed, setChanged]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}
