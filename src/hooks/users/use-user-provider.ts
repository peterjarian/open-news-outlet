import { UserContext } from '@/providers/user';
import { use } from 'react';

export function useUserProvider() {
  const context = use(UserContext);
  if (!context) throw new Error('useUserProvider must be used within a UserProvider');
  return context;
}
