import { LogoLink } from '../logo-link';
import Link from 'next/link';
import FooterSocials from './socials';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="flex h-16 flex-col items-center justify-between border-t md:flex-row md:px-6">
            <LogoLink className="mt-6 mb-4 whitespace-nowrap md:mt-0 md:mr-8 md:mb-0" />
            <FooterSocials className="mb-6 md:order-3 md:mb-0" />

            <div className="flex w-full justify-between border-t px-4 py-4 md:justify-start md:border-none md:px-0">
                <span className="mr-4">© {currentYear}</span>
                <div className="space-x-4 underline">
                    <Link href="/cookies">Cookies</Link>
                    <Link href="/terms-of-service">Terms of service</Link>
                </div>
            </div>
        </footer>
    );
}
