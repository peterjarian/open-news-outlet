import type { Metadata } from 'next';
import { Newsreader } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/global/nav-bar';
import { Footer } from '@/components/global/footer';

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
                <NavBar />
                <main className="px-4 md:px-6">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
