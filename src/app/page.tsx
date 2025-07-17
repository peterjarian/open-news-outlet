import { env } from '@/env';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: env.NEXT_PUBLIC_BRAND_NAME,
  description:
    'An open-source platform solution to empower anyone to create, manage, and publish articles.',
};

export default function Page() {
  return <p>hello</p>;
}
