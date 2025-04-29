import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type TailwindBreakpoints = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'default';

export function getTwCurrentBreakPoint(screenWidth: number): TailwindBreakpoints {
    let breakpoint: TailwindBreakpoints = 'default';

    switch (true) {
        case screenWidth >= 640 && screenWidth < 768:
            breakpoint = 'sm';
        case screenWidth >= 768 && screenWidth < 1024:
            breakpoint = 'md';
        case screenWidth >= 1024 && screenWidth < 1280:
            breakpoint = 'xl';
        case screenWidth >= 1280:
            breakpoint = '2xl';
    }

    return breakpoint;
}
