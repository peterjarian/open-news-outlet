import type { Metadata } from 'next';
import { Newsreader } from 'next/font/google';
import './globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const newsreader = Newsreader({
    subsets: ['latin'],
    weight: ['300', '400', '600', '700'],
    style: ['normal', 'italic'],
});

export const metadata: Metadata = {
    title: 'Open News Outlet',
    description: 'An open-source platform solution to empower anyone to create, manage, and publish articles',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${newsreader.className} antialiased`}>
                <NuqsAdapter>{children}</NuqsAdapter>
            </body>
        </html>
    );
}
