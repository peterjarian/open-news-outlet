import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IconWrapper } from '../icon-wrapper';
import { EnvelopeSimple, InstagramLogo, XLogo, YoutubeLogo } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils';

interface FooterSocialsProps {
    className?: string;
}

export default function FooterSocials({ className }: FooterSocialsProps) {
    return (
        <div className={cn(className, 'flex space-x-3')}>
            <Button size="icon" asChild>
                <Link href="mailto:contact@example.com">
                    <IconWrapper icon={EnvelopeSimple} className="size-5" />
                </Link>
            </Button>
            <Button size="icon" asChild>
                <Link href="https://x.com">
                    <IconWrapper icon={XLogo} className="size-5" />
                </Link>
            </Button>
            <Button size="icon" asChild>
                <Link href="https://instagram.com">
                    <IconWrapper icon={InstagramLogo} className="size-5" />
                </Link>
            </Button>
            <Button size="icon" asChild>
                <Link href="https://youtube.com">
                    <IconWrapper icon={YoutubeLogo} className="size-5" />
                </Link>
            </Button>
        </div>
    );
}
