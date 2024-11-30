'use client';

import { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import { Post } from '@/types/Post';


const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
      year: 60 * 60 * 24 * 365,
      month: 60 * 60 * 24 * 30,
      week: 60 * 60 * 24 * 7,
      day: 60 * 60 * 24,
      hour: 60 * 60,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const value = Math.floor(seconds / secondsInUnit);
      if (value >= 1) {
        return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-value, unit as Intl.RelativeTimeFormatUnit);
      }
    }

    return 'just now';
  };
  
export const PostListItem: FC<Post> = ({
    id,
    user,
    created_at,
    image_url,
    caption,
    user_info,
}) => (
  <Card className="w-1/2 mb-4">
    <CardHeader>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={user_info.avatar} alt={`@${user_info.username}`} />
          <AvatarFallback>{user_info.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{user_info.username}</CardTitle>
          <p className="text-sm text-muted-foreground">{getTimeAgo(new Date(created_at))}</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <img
        src={image_url}
        alt={`Post by ${user_info.username}`}
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