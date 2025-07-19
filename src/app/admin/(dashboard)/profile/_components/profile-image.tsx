import { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, X } from 'lucide-react';
import { useUserProvider } from '@/hooks/providers/use-user-provider';

export function ProfileImage() {
  const { user, setChanged } = useUserProvider();
  const { setValue, watch } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const image = watch('image');

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setValue('image', selectedFile, { shouldDirty: true });
      setChanged(true);
    }
  }

  function handleUpload() {
    fileInputRef.current?.click();
  }

  function handleRemove() {
    setPreview(null);
    setValue('image', null, { shouldDirty: true });
    setChanged(true);
  }

  const displayImage = preview || (image !== null ? user.image : null);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Profile picture</CardTitle>
          <CardDescription>Upload and manage your profile picture</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={displayImage || undefined} alt="Profile picture" />
          <AvatarFallback className="text-lg">
            {user.name
              ?.split(' ')
              .map((name: string) => name[0])
              .join('')}
          </AvatarFallback>
        </Avatar>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleUpload}
            className="flex items-center gap-2"
          >
            <Camera />
            Upload
          </Button>
          {displayImage && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemove}
              className="flex items-center gap-2"
            >
              <X />
              Remove
            </Button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
}
