import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { type UpdateUserData } from '@/schemas/users';
import { useUser } from '@/hooks/use-user';

export function ProfileImage() {
  const { user } = useUser();
  const [profileImage, setProfileImage] = useState(
    user.image || '/placeholder.svg?height=120&width=120',
  );
  const { watch, setValue } = useFormContext<UpdateUserData>();
  const name = watch('name') || user.name;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProfileImage(imageUrl);
        setValue('image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Image</CardTitle>
        <CardDescription>Upload and manage your profile photo</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center space-x-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profileImage || '/placeholder.svg'} alt="Profile" />
            <AvatarFallback className="text-lg">
              {name
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
              onChange={handleImageUpload}
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
