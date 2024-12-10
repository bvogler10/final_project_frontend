"use client";

// File: PostListItem.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the component for an individual post item in the list

import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Post } from "@/types/Post";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import apiService from "@/app/services/apiService";
import Link from "next/link";

interface PostProps {
  post: Post;
  isFollowing: boolean;
}

// a function to generate the correct string for how long ago the post was made
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

// post list item component, when clicked opens a dialog to show the expanded post
export const PostListItem: FC<PostProps> = ({ post, isFollowing }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  // handles the follow button to follow this user
  const handleFollow = async () => {
    const otherUser = post.user_info.id;
    try {
      console.log("following", otherUser);
      const response = await apiService.follow(`/api/user/follow/${otherUser}`);
      if (response) {
        console.log("Follow Response:", response);
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  return (
    <>
      <Card className="flex flex-col bg-card text-card-foreground border-none">
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
            <CardTitle>
              <Link
                href={`${window.location.origin}/profiles/${post.user_info.id}`}
              >
                @{post.user_info.username}
              </Link>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {getTimeAgo(new Date(post.created_at))}
            </p>
          </div>
          {!isFollowing && (
            <Button
              onClick={() => handleFollow()}
              size="sm"
              className="ml-auto bg-secondary"
            >
              Follow
            </Button>
          )}
        </CardHeader>
        <CardContent onClick={openDialog}>
          <p className="mb-2 text-sm">{post.caption}</p>
          <div className="flex-grow">
            {post.image_url !== "" && (
              <div className="relative w-full aspect-square">
                <img
                  src={post.image_url}
                  alt={`Post by ${post.user_info.username}`}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogHeader>
            <DialogTitle>@{post.user_info.username}</DialogTitle>
            <DialogDescription>
              {post.caption || "No caption provided"}
            </DialogDescription>
            <Button
              onClick={closeDialog}
              className="absolute top-2 right-2 p-1 rounded-full text-xl text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>
          <DialogContent className="w-auto max-w-[90vw] h-auto max-h-[90vh] overflow-hidden">
            <div className="flex flex-col h-full">
              {/* User Info and Caption at the Top */}
              <div className="flex flex-col p-4 mb-2">
                <Link
                  href={`${window.location.origin}/profiles/${post.user_info.id}`}
                >
                  <p className="text-lg font-semibold">
                    @{post.user_info.username}
                  </p>
                </Link>
                <p className="text-sm text-muted-foreground">
                  {post.caption || "No caption provided"}
                </p>
              </div>

              {/* Image below */}
              {post.image_url !== "" && (
                <div className="relative w-full max-w-[90vw] h-auto">
                  <img
                    src={post.image_url}
                    alt={`Post by ${post.user_info.username}`}
                    className="rounded-lg object-contain w-full max-h-[70vh] mx-auto"
                  />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
