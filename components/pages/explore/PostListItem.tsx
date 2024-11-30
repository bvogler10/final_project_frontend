'use client';

import { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';

// Define the PostItem component
interface PostItemProps {
  username: string;
  userAvatar: string;
  avatarFallback: string;
  timestamp: string;
  imageSrc: string;
  caption: string;
}

export const PostListItem: FC<PostItemProps> = ({
  username,
  userAvatar,
  avatarFallback,
  timestamp,
  imageSrc,
  caption,
}) => (
  <Card className="mb-4">
    <CardHeader>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={userAvatar} alt={`@${username}`} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{username}</CardTitle>
          <p className="text-sm text-muted-foreground">{timestamp}</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <img
        src={imageSrc}
        alt={`Post by ${username}`}
        className="w-full rounded-md"
      />
      <p className="mt-4">{caption}</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <div className="flex space-x-4">
        <Button variant="ghost" size="sm">
          <Heart className="mr-2 h-4 w-4" />
          Like
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="mr-2 h-4 w-4" />
          Comment
        </Button>
      </div>
      <Button variant="ghost" size="sm">
        <Bookmark className="mr-2 h-4 w-4" />
        Save
      </Button>
    </CardFooter>
  </Card>
);