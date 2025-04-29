import { MagnifyingGlass, SignIn } from '@phosphor-icons/react/dist/ssr';
import { IconWrapper } from '../icon-wrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Separator from '../separator/separator';
import { LogoLink } from '../logo-link';
import PopularSections from './popular-sections';
import SectionsAction from './actions/sections';

export default function NavBar() {
    return (
        <header>
            <nav className="flex h-16 items-center justify-between border px-4 md:px-6">
                <SectionsAction className="md:hidden" />

                <LogoLink size="md" className="md:order-1" />

                <Button variant="ghost" size="icon" className="md:hidden" asChild>
                    <Link href="/sign-up">
                        <IconWrapper icon={SignIn} className="size-6" />
                    </Link>
                </Button>

                <PopularSections />

                <div className="order-2 hidden items-center md:flex">
                    <SectionsAction />
                    <Separator orientation="vertical" className="mx-2" />
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/search">
                            <IconWrapper icon={MagnifyingGlass} className="size-6" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/sign-up">
                            <IconWrapper icon={SignIn} className="size-6" />
                        </Link>
                    </Button>
                </div>
            </nav>
        </header>
    );
}
