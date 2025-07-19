import { useFormContext, Controller } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { type UpdateUserData } from '@/schemas/users';
import { useUserProvider } from '@/hooks/users/use-user-provider';

export function PersonalInformation() {
  const { watch, control } = useFormContext<UpdateUserData>();
  const isPublicProfile = watch('isPublicProfile');
  const { user } = useUserProvider();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Name Information</CardTitle>
        <CardDescription>Your display name and byline information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            defaultValue={user.name}
            disabled
            className="bg-muted"
          />
          <p className="text-muted-foreground text-sm">
            Only administrators can modify your full name
          </p>
        </div>
        <FormField
          control={control}
          name="bylineName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Byline Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your byline name" {...field} />
              </FormControl>
              <FormMessage />
              <p className="text-muted-foreground text-sm">
                This is how your name will appear in article bylines
              </p>
            </FormItem>
          )}
        />
        <div className="bg-muted/50 flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <Label htmlFor="public-profile" className="text-base font-medium">
              Show Profile Information
            </Label>
            <p className="text-muted-foreground text-sm">
              {isPublicProfile
                ? 'Your profile information will be visible on published articles'
                : 'You will appear as anonymous on published articles'}
            </p>
          </div>
          <Controller
            name="isPublicProfile"
            control={control}
            render={({ field }) => (
              <Switch id="public-profile" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
