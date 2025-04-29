'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { IconWrapper } from '../../icon-wrapper';
import { ListBullets } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { popularSections } from '@/lib/mock-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

interface ShowSectionsActionProps {
    className?: string;
}

export default function ShowSectionsAction({ className }: ShowSectionsActionProps) {
    return (
        <div className={className}>
            <Sheet>
                <SheetTrigger className="flex items-center" asChild>
                    <Button variant="ghost" size="icon">
                        <IconWrapper icon={ListBullets} className="size-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="text-lg">All sections</SheetTitle>
                    </SheetHeader>

                    <Accordion type="multiple" className="flex w-full flex-col gap-4 px-4">
                        {popularSections.map((section) =>
                            section.subs?.length ? (
                                <AccordionItem key={section.name} value={section.name} className="border-b-0">
                                    <AccordionTrigger className="text-md py-0 hover:no-underline">
                                        {section.name}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-md mt-2 flex flex-col space-y-2 pl-4">
                                        {section.subs.map((sub) => (
                                            <Link key={sub.id} href={`${section.id}/${sub.id}`}>
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            ) : (
                                <Link key={section.id} href={section.id} className="text-md">
                                    {section.name}
                                </Link>
                            ),
                        )}
                    </Accordion>
                </SheetContent>
            </Sheet>
        </div>
    );
}
