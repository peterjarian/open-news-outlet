import '../globals.css';
import { NavBar } from '@/components/global/nav-bar';
import { Footer } from '@/components/global/footer';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar />
            <main className="px-4 md:px-6">{children}</main>
            <Footer />
        </>
    );
}
