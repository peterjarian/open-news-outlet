'use client';

import { ReactNode } from 'react';

type ProvidersProps = {
    children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
    return children;
}
