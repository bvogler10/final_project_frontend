'use client';

import { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import { Post } from '@/types/Post';

interface PostProps {
    post: Post,
    isFollowing: boolean,
}

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
  
export const PostListItem: FC<PostProps> = ({
    post,
    isFollowing,
}) => (
    <Card className='flex flex-col bg-card text-card-foreground'>
        <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={post.user_info.avatar} alt={`@${post.user_info.username}`} />
          <AvatarFallback>{post.user_info.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
            <p className="text-sm font-semibold">@{post.user_info.username}</p>
            <p className="text-xs text-muted-foreground">{getTimeAgo(new Date(post.created_at))}</p>
        </div>
        {!isFollowing && (
            <Button variant="outline" size="sm" className="ml-auto">
              Follow
            </Button>
        )}
    </CardHeader>
    <CardContent>
    <p className="mb-2 text-sm">{post.caption}</p>
    <div className="flex-grow">
      <img
        src={post.image_url}
        alt={`Post by ${post.user_info.username}`}
        width="300"
        className="rounded-lg object-cover w-full h-auto"
      />
      </div>
      
    </CardContent>
    <CardFooter className="flex justify-between">
        <div className="flex gap-2">
        <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4 mr-1" />
            <span className="text-xs">Like</span>
        </Button>
        <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span className="text-xs">Comment</span>
        </Button>
        </div>
        <Button variant="ghost" size="sm">
        <Bookmark className="h-4 w-4 mr-1" />
        <span className="text-xs">Save</span>
        </Button>
    </CardFooter>
  </Card>
);