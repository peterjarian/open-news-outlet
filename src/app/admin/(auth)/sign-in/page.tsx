'use client';

import { sendMagicLink } from '@/actions/auth';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck } from 'lucide-react';
import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { useSearchParams } from 'next/navigation';
import { LoginData, loginSchema } from '@/schemas/auth';

function getErrorMessage(error: string) {
  switch (error) {
    case 'INVALID_TOKEN':
      return 'The magic link you used is invalid. Please request a new sign-in link.';
    case 'EXPIRED_TOKEN':
      return 'The magic link has expired. Please request a new sign-in link to continue.';
    default:
      return 'An unknown error occurred. Please try again or contact support if the issue persists.';
  }
}

function ErrorDisplay({ showError }: { showError: boolean }) {
  const error = useSearchParams().get('error');

  if (!error || !showError) return null;

  return (
    <Alert variant="destructive">
      <AlertDescription>{getErrorMessage(error)}</AlertDescription>
    </Alert>
  );
}

const renderer: CountdownRendererFn = ({ total, completed }) => {
  if (completed) return null;
  const secs = Math.ceil(total / 1000);
  return <span>{secs}</span>;
};

export default function Page() {
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdownDate, setCountdownDate] = useState<number | null>(null);
  const [showError, setShowError] = useState(true);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '' },
  });

  async function handleSubmit({ email }: LoginData) {
    setIsSubmitting(true);
    setShowError(false);

    const res = await sendMagicLink({ email });

    if (res.error) {
      toast.error(res.error);
      setIsSubmitting(false);
      return;
    }

    toast.success(res.data);
    setIsMagicLinkSent(true);
    setIsSubmitting(false);
    setCountdownDate(Date.now() + 59000);
  }

  function handleUseAnotherEmail() {
    setIsMagicLinkSent(false);
    setCountdownDate(null);
  }

  async function handleResendEmail() {
    if (countdownDate && Date.now() < countdownDate) {
      return;
    }

    setIsSubmitting(true);
    const res = await sendMagicLink(form.getValues());

    if (res.error) {
      toast.error(res.error);
      setIsSubmitting(false);
      return;
    }

    toast.success(res.data);
    setCountdownDate(Date.now() + 59000);
    setIsSubmitting(false);
  }

  function handleCountdownComplete() {
    setCountdownDate(null);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <Suspense>
          <ErrorDisplay showError={showError} />
        </Suspense>

        {isMagicLinkSent ? (
          <Card className="w-full border-0 shadow-none sm:border sm:shadow-sm">
            <CardContent className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-lg">
                <CircleCheck className="size-7 text-green-600" />
              </div>
              <h3 className="mb-1.5 font-semibold">Check your email</h3>
              <p className="text-muted-foreground text-sm">
                We&apos;ve sent a magic link to <strong>{form.getValues().email}</strong>. Please
                check your inbox and follow the link to sign in.
              </p>
            </CardContent>
            <CardFooter className="text-muted-foreground mx-auto flex gap-x-2 text-xs">
              <button
                type="button"
                className="cursor-pointer border-none bg-transparent p-0 text-inherit hover:underline"
                onClick={handleUseAnotherEmail}
              >
                Use another email
              </button>
              <span
                className="text-muted-foreground pointer-events-none select-none"
                aria-hidden="true"
              >
                |
              </span>
              <button
                type="button"
                className={`border-none bg-transparent p-0 text-inherit ${
                  countdownDate && Date.now() < countdownDate
                    ? 'opacity-70'
                    : 'cursor-pointer hover:underline'
                }`}
                onClick={handleResendEmail}
                disabled={isSubmitting || Boolean(countdownDate && Date.now() < countdownDate)}
              >
                Resend email
                {countdownDate && (
                  <span>
                    {' '}
                    (
                    <Countdown
                      date={countdownDate}
                      renderer={renderer}
                      onComplete={handleCountdownComplete}
                    />
                    )
                  </span>
                )}
              </button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="w-full border-0 shadow-none sm:border sm:shadow-sm">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your email below to login to your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form id="login-form" onSubmit={form.handleSubmit(handleSubmit)}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="user@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button type="submit" form="login-form" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <LoadingSpinner /> : <span>Login</span>}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  );
}
