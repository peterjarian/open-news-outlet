import { HoverPrefetchLink } from '../common/hover-prefetch-link';
import { cn } from '@/lib/utils';
import { CenteredContainer } from './centered-container';

type NotFoundLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export function NotFoundLayout({ children, className }: NotFoundLayoutProps) {
  return <CenteredContainer className={className}>{children}</CenteredContainer>;
}

type NotFoundLayoutHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function NotFoundLayoutHeader({ children, className }: NotFoundLayoutHeaderProps) {
  return <h1 className={cn('mb-2 text-4xl font-bold', className)}>{children}</h1>;
}

type NotFoundLayoutDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

export function NotFoundLayoutDescription({ children, className }: NotFoundLayoutDescriptionProps) {
  return <p className={cn('text-muted-foreground mb-6', className)}>{children}</p>;
}

type NotFoundLayoutActionsProps = {
  children: React.ReactNode;
  className?: string;
};

export function NotFoundLayoutActions({ children, className }: NotFoundLayoutActionsProps) {
  return <div className={cn('', className)}>{children}</div>;
}

// Backward compatibility component
type NotFoundLayoutLegacyProps = {
  description: string;
  action: {
    label: string;
    href: string;
  };
};

export function NotFoundLayoutLegacy({ description, action }: NotFoundLayoutLegacyProps) {
  return (
    <NotFoundLayout>
      <NotFoundLayoutHeader>Page not found</NotFoundLayoutHeader>
      <NotFoundLayoutDescription>{description}</NotFoundLayoutDescription>
      <NotFoundLayoutActions>
        <HoverPrefetchLink
          href={action.href}
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded px-4 py-2 transition"
        >
          {action.label}
        </HoverPrefetchLink>
      </NotFoundLayoutActions>
    </NotFoundLayout>
  );
}
