'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { IconWrapper } from '../icon-wrapper';
import { popularSections } from '@/lib/mock-data';

export default function PopularSections() {
    return (
        <ol className="order-2 hidden items-center space-x-6 lg:flex">
            {popularSections.map((section) => (
                <li key={section.name}>
                    {!section.subs?.length ? (
                        <Link href={section.id}>{section.name}</Link>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-x-1">
                                {section.name} <IconWrapper icon={CaretDown} size="16" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {/* We always want to display the frontpage in the dropdown menu for accessibility reasons */}
                                <DropdownMenuItem asChild>
                                    <Link href={section.id}>Frontpage</Link>
                                </DropdownMenuItem>

                                {section.subs?.map((sub) => (
                                    <DropdownMenuItem key={sub.id} asChild>
                                        <Link href={`${section.id}/${sub.id}`}>{sub.name}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </li>
            ))}
        </ol>
    );
}
