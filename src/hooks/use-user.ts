import { UserContext } from '@/providers/user';
import { use } from 'react';

export function useUser() {
  const context = use(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}
