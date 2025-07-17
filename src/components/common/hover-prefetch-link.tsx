'use client';

import Link from 'next/link';
import { ComponentProps, useState } from 'react';

export function HoverPrefetchLink({
  href,
  children,
  ...props
}: ComponentProps<'a'> & { href: string }) {
  const [active, setActive] = useState(false);

  return (
    <Link
      {...props}
      href={href}
      prefetch={active ? null : false}
      onTouchStart={() => setActive(true)}
      onMouseDown={() => {
        console.log('Prefetching');
        setActive(true);
      }}
    >
      {children}
    </Link>
  );
}
