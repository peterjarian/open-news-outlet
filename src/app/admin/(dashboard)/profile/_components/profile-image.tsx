import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { useUser } from '@/hooks/use-user';

export function ProfileImage() {
  const { user, setChanged } = useUser();
  const { setValue } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setValue('image', selectedFile, { shouldDirty: true });
      setChanged(true);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Image</CardTitle>
        <CardDescription>Upload and manage your profile photo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={preview || user.image || undefined} alt="Profile" />
            <AvatarFallback className="text-lg">
              {user.name
                ?.split(' ')
                .map((n: string) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <label
            htmlFor="image-upload"
            className="bg-primary text-primary-foreground hover:bg-primary/90 absolute -right-2 -bottom-2 cursor-pointer rounded-full p-2 transition-colors"
          >
            <Camera className="h-4 w-4" />
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground mb-2 text-sm">
            Click the camera icon to upload a new profile image. Recommended size: 400x400px
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            Change Photo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
