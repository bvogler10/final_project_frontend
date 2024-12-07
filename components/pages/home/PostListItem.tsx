"use client";

import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Bookmark, X } from "lucide-react";
import { Post } from "@/types/Post";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PostProps {
  post: Post;
  isFollowing: boolean;
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
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        -value,
        unit as Intl.RelativeTimeFormatUnit
      );
    }
  }

  return "just now";
};

export const PostListItem: FC<PostProps> = ({ post, isFollowing }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Card
        className="flex flex-col bg-card text-card-foreground border-none"
        onClick={openDialog}
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage
              src={post.user_info.avatar}
              alt={`@${post.user_info.username}`}
            />
            <AvatarFallback>
              {post.user_info.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">@{post.user_info.username}</p>
            <p className="text-xs text-muted-foreground">
              {getTimeAgo(new Date(post.created_at))}
            </p>
          </div>
          {!isFollowing && (
            <Button size="sm" className="ml-auto bg-secondary">
              Follow
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-sm">{post.caption}</p>
          <div className="flex-grow">
            {post.image_url !== "" && (
              <img
                src={post.image_url}
                alt={`Post by ${post.user_info.username}`}
                width="300"
                className="rounded-lg object-cover w-full h-auto"
              />
            )}
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
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogDescription>
              Create a new account by filling out the form below.
            </DialogDescription>
            <Button
              onClick={closeDialog}
              className="absolute top-2 right-2 p-1 rounded-full text-xl text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>
          <DialogContent className="w-[80vw] max-w-[1000px] h-[80vh] overflow-hidden">
            <div className="relative flex flex-col md:flex-row gap-4 h-full">
              <div className="flex-shrink-0 w-full md:w-1/2 h-full">
                {post.image_url !== "" && (
                  <img
                    src={post.image_url}
                    alt={`Post by ${post.user_info.username}`}
                    className="rounded-lg object-cover w-full h-full"
                  />
                )}
              </div>

              <div className="flex flex-col justify-start md:w-1/2 h-full p-4">
                <p className="text-lg font-semibold">
                  @{post.user_info.username}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {post.caption}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
