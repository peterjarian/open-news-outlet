import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, Mail, Twitter, Linkedin } from 'lucide-react';
import { type UpdateUserData } from '@/schemas/users';
import { SocialAccount } from '@/types';
import { useUser } from '@/hooks/use-user';

export function SocialPlatforms() {
  const { user } = useUser();
  const { watch, setValue } = useFormContext<UpdateUserData>();
  const socialPlatforms = watch('socialPlatforms') || [];

  const addSocialPlatform = () => {
    const newPlatform = {
      platform: SocialAccount.EMAIL,
      userId: user.id,
    };
    setValue('socialPlatforms', [...socialPlatforms, newPlatform]);
  };

  const removeSocialPlatform = (index: number) => {
    setValue(
      'socialPlatforms',
      socialPlatforms.filter((_, i) => i !== index),
    );
  };

  const updateSocialPlatform = (index: number, platform: SocialAccount) => {
    setValue(
      'socialPlatforms',
      socialPlatforms.map((p, i) => (i === index ? { ...p, platform } : p)),
    );
  };

  const getSocialIcon = (platform: SocialAccount) => {
    switch (platform) {
      case SocialAccount.EMAIL:
        return <Mail className="h-4 w-4" />;
      case SocialAccount.TWITTER:
        return <Twitter className="h-4 w-4" />;
      case SocialAccount.LINKEDIN:
        return <Linkedin className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Social Platforms
          <Button
            type="button"
            onClick={addSocialPlatform}
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Platform
          </Button>
        </CardTitle>
        <CardDescription>Manage your social media platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {socialPlatforms.map((platform, index) => (
            <div key={index} className="flex items-center space-x-3 rounded-lg border p-4">
              <div className="flex min-w-0 flex-1 items-center space-x-2">
                <div className="flex min-w-[140px] items-center space-x-2">
                  {getSocialIcon(platform.platform)}
                  <Select
                    value={platform.platform}
                    onValueChange={(value: SocialAccount) => updateSocialPlatform(index, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={SocialAccount.EMAIL}>Email</SelectItem>
                      <SelectItem value={SocialAccount.TWITTER}>Twitter (X)</SelectItem>
                      <SelectItem value={SocialAccount.LINKEDIN}>LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSocialPlatform(index)}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {socialPlatforms.length === 0 && (
            <div className="text-muted-foreground py-8 text-center">
              <p>No social platforms added yet.</p>
              <p className="text-sm">Click &quot;Add Platform&quot; to get started.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
